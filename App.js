/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { Component } from "react";
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import LoginPage from "./modules/session/containers/LoginPage";
import AppSession from "./containers/AppSession";
import { Text, View, Button } from "react-native";

const uri = "http://192.168.1.9:4000/api/graphql";

const client = new ApolloClient({
  uri
});

const LoggedInApp = ({ onLogoutClick }) => (
  <View>
    <Text>If you see this, you are logged in</Text>
    <Button title="Logout" onPress={onLogoutClick}>Logout</Button>
  </View>
);

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <AppSession render={({ onLoginSuccess, login, logout }) => (
          login 
          ? <LoggedInApp onLogoutClick={logout} />
          : <LoginPage onLoginSuccess={onLoginSuccess} />
        )} />
      </ApolloProvider>
    );
  }
}
