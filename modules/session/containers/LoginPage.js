import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo"
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

const headerColor = "#0097A7";
const borderColor = "#0097A7";
const contentBackground = "#E0E0E0";
const inputBackground = "#E5E5E5";

const styles = StyleSheet.create({
  container: {
    backgroundColor: contentBackground,
    flex: 2,
    position: "relative"
  },
  header: {
    height: 50, 
    backgroundColor: headerColor, 
    justifyContent: "center",
    alignItems: "center"
  },
  content: {
    padding: 20,
    flex: 2
  },
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
    bottom: 20 // same as padding
  }
})

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
      <View style={styles.container}>
        <View style={styles.header}>
          <Text>Exerciser</Text>
        </View>
        <View style={styles.content}>
          <LabeledInput label="username" onChange={this.onChange("username")} />
          <LabeledInput label="password" onChange={this.onChange("password")} secureTextEntry={true} />
          <View style={styles.loginButton}>
            <Button title="Login" onPress={this.login}>Login</Button>
          </View>
        </View>
      </View>
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
