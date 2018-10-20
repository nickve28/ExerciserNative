import React from "react";
import { StyleSheet, View } from "react-native";

const contentBackground = "#E0E0E0";

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 2
  }
});

const Container = ({ children }) =>
  <View style={styles.container}>
    {children}
  </View>;

export default Container;
