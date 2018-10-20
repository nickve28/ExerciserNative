import React from "react";
import { ReactNode } from "react";
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

export interface Props {
  children: ReactNode
};

const Header = ({ children }: Props) =>
  <View style={styles.header}>
    {children}
  </View>;

export default Header;
