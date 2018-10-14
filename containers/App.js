import React, { Component } from "react";
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import LoginPage from "../modules/session/containers/LoginPage";
import LoggedInApp from "./LoggedInApp";
import { create } from "handlebars";

const uri = "http://192.168.1.9:4000/api/graphql";

const createClient = getToken => {
  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = getToken(); 
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  });

  const client = new ApolloClient({
    uri
  });
  client.link.concat(authLink);
  return client;
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
        login 
        ? <LoggedInApp onLogoutClick={this.logout} />
        : <LoginPage onLoginSuccess={this.onLoginSuccess} />
      </ApolloProvider>
    );
  }
}
