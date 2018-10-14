import React from "react";
import { StyleSheet, View } from "react-native";

const contentBackground = "#E0E0E0";

const styles = StyleSheet.create({
  page: {
    backgroundColor: contentBackground,
    flex: 2,
    position: "relative"
  }
});

const Page = ({ children }) =>
  <View style={styles.page}>
    {children}
  </View>;

export default Page;
