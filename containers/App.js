import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import ApolloClient from 'apollo-client';
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloLink } from "apollo-link";
import { ApolloProvider } from 'react-apollo';
import { setContext } from "apollo-link-context";
import LoginPage from "../modules/session/containers/LoginPage";
import LoggedInApp from "./LoggedInApp";

const uri = "http://192.168.1.9:4000/api/graphql";

const defaultOptions = {
  watchQuery: {
    fetchPolicy: "cache-and-network"
  }
};

const cache = new InMemoryCache();

const createClient = getToken => {
   // need to remove apollo boost and configure client here
  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = getToken(); 
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ""
      }
    }
  });

  const httpLink = new HttpLink({ uri });

  return new ApolloClient({
    link: ApolloLink.from([authLink, httpLink]),
    cache,
    defaultOptions
  });
};

class App extends Component {
  state = { login: null, ready: false };

  constructor(props) {
    super(props);
    this.client = createClient(this.getToken);
  }

  // Needs to poll token and stuff
  async componentDidMount() {
    const login = await AsyncStorage.getItem("@login");
    this.setState({ 
      login: login && JSON.parse(login), 
      ready: true 
    });
  }

  onLoginSuccess = async loginData => {
    await AsyncStorage.setItem("@login", JSON.stringify(loginData));
    this.setState({ login: loginData });
  };

  logout = async () => {
    await AsyncStorage.removeItem("@login");
    this.setState({ login: null });
    return;
  }

  getToken = () => {
    const { login } = this.state;
    return login ? login.token : null;
  };

  render() {
    const { render } = this.props;
    const { login, ready } = this.state;
    if (!ready) return null;
    
    return (
      <ApolloProvider client={this.client}>
        {login 
        ? <LoggedInApp onLogoutClick={this.logout} />
        : <LoginPage onLoginSuccess={this.onLoginSuccess} />}
      </ApolloProvider>
    );
  }
}

export default App;
