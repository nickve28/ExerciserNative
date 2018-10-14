/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { Component } from "react";
import LoginPage from "./modules/session/containers/LoginPage";

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const uri = "http://192.168.1.9:4000/api/graphql";

const client = new ApolloClient({
  uri
});

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <LoginPage />
      </ApolloProvider>
    );
  }
}
