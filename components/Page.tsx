import React from "react";
import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

const contentBackground = "#E0E0E0";

const styles = StyleSheet.create({
  page: {
    backgroundColor: contentBackground,
    flex: 2
  }
});

export interface Props {
  children: ReactNode
};

const Page = ({ children }: Props) =>
  <View style={styles.page}>
    {children}
  </View>;

export default Page;
