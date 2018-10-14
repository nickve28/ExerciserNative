import React, { Component } from "react";
import { AsyncStorage } from "react-native"

class AppSession extends Component {
  state = { login: null, ready: false };

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

  render() {
    const { render } = this.props;
    const { login, ready } = this.state;
    if (!ready) return null;
    return render({ login, logout: this.logout, onLoginSuccess: this.onLoginSuccess });
  }
}

export default AppSession;
