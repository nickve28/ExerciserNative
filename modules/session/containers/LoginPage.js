import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo"
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import Header from "../../../components/Header";
import Page from "../../../components/Page";
import Container from "../../../components/Container";

const borderColor = "#0097A7";
const inputBackground = "#E5E5E5";

const styles = StyleSheet.create({
  input: {
    marginBottom: 2
  },
  inputArea: {
    marginTop: 8,
    backgroundColor: inputBackground, 
    paddingBottom: 2,
    paddingTop: 2,
    borderBottomWidth: 1,
    borderBottomColor: borderColor 
  },
  loginButton: {
    position: "absolute",
    width: "100%",
    left: 20,
    bottom: 20 // same as Container padding 
  }
});

const LabeledInput = ({ label, onChange, ...props }) =>
  <View style={styles.input}>
    <Text>{label}</Text>
    <TextInput {...props} style={styles.inputArea} onChangeText={onChange} />
  </View>

class LoginPage extends Component {
  state = { 
    username: "",
    password: ""
  };

  onChange = field => value => this.setState({ [field]: value });

  login = () => {
    const { username, password } = this.state;
    const { mutate: login } = this.props;
    
    return login({ variables: { username, password } }).then(response => alert(JSON.stringify(response.data)));
  };

  render() {
    return (
      <Page>
        <Header>
          <Text>Login</Text>
        </Header>
        <Container>
          <LabeledInput label="username" onChange={this.onChange("username")} />
          <LabeledInput label="password" onChange={this.onChange("password")} secureTextEntry={true} />
          <View style={styles.loginButton}>
            <Button title="Login" onPress={this.login}>Login</Button>
          </View>
        </Container>
      </Page>
    );
  }
}

const query = gql`mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    id
    token
  }
}`
export default graphql(query)(LoginPage);
