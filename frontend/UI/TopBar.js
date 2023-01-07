import React from "react";
import { StyleSheet, View } from "react-native";

import { normalize } from "../Tool/FontSize";

const TopBar = (props) => {
  return <View style={[styles.container, props.style]}>{props.children}</View>;
};

const styles = StyleSheet.create({
  container: {
    height: normalize(45),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "yellow",
    paddingLeft: normalize(10),
    paddingRight: normalize(10),
  },
});

export default TopBar;
