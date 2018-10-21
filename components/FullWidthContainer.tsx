import React from "react";
import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

const contentBackground = "#E0E0E0";

const styles = StyleSheet.create({
  container: {
    flex: 2
  }
});

interface Props {
  children: ReactNode
};

const FullWidthContainer = ({ children }: Props) =>
  <View style={styles.container}>
    {children}
  </View>;

export default FullWidthContainer;
