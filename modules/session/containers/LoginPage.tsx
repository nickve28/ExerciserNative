import React from "react";
import { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo"
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import Header from "../../../components/Header";
import Page from "../../../components/Page";
import Container from "../../../components/Container";

const borderColor = "#0097A7";
const inputBackground = "#E5E5E5";

const styles = StyleSheet.create({
  content: {
    flex: 2,
    position: "relative"
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
    bottom: 0,
    left: 0,
    width: "100%"
  }
});

const LabeledInput = ({ label, onChange, ...props }) =>
  <View style={styles.input}>
    <Text>{label}</Text>
    <TextInput {...props} style={styles.inputArea} onChangeText={onChange} />
  </View>

interface Props {
  onLoginSuccess(payload: { id: number, token: string }): void,
  mutate(payload: { 
    variables: { 
      username: string, 
      password: string 
    } 
  }): Promise<any>
};

interface State {
  username: string,
  password: string
};

class LoginPage extends Component<Props, State> {
  state = { 
    username: "",
    password: ""
  };

  onChange = field => value => this.setState({ [field]: value });

  login = async () => {
    const { username, password } = this.state;
    const { mutate: login, onLoginSuccess } = this.props;
    
    const response = await login({ variables: { username, password } });
    const { data } = response;
    onLoginSuccess(data.login);
  };

  render() {
    return (
      <Page>
        <Header>
          <Text>Login</Text>
        </Header>
        <Container>
          <View style={styles.content}>
            <LabeledInput label="username" onChange={this.onChange("username")} />
            <LabeledInput label="password" onChange={this.onChange("password")} secureTextEntry={true} />
            <View style={styles.loginButton}>
              <Button title="Login" onPress={this.login}>Login</Button>
            </View>
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

interface ExportProps {
  onLoginSuccess(payload: { id: number, token: string }): void,
};

export default graphql<ExportProps>(query)(LoginPage)
