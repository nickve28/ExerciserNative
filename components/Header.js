import React from "react";
import { StyleSheet, View } from "react-native";

const headerColor = "#0097A7";

const styles = StyleSheet.create({
  header: {
    height: 50, 
    backgroundColor: headerColor, 
    justifyContent: "center",
    alignItems: "center"
  }
});

const Header = ({ children }) =>
  <View style={styles.header}>
    {children}
  </View>;

export default Header;
