import React from "react";
import { Component } from "react";
import { AsyncStorage } from "react-native";
import ApolloClient from "apollo-client";
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

const createClient = (getToken: Function) => {
   // need to remove apollo boost and configure client here
  const authLink = setContext((_, { headers }) => {
    const token = getToken(); 
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ""
      }
    }
  });

  const httpLink = new HttpLink({ uri });

  // TODO fix type definition
  const apolloOptions: any = {
    link: ApolloLink.from([authLink, httpLink]),
    cache,
    defaultOptions
  };
  
  return new ApolloClient(apolloOptions);
};

interface Props {};

interface State {
  login?: {
    token: string,
    id: number
  },
  ready: boolean
};

class App extends Component<Props, State> {
  client: any; // TODO apollo declaration?

  state = { login: null, ready: false };

  constructor(props) {
    super(props);
    this.client = createClient(this.getToken);
  }

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
