import React from "react";
import { Text, View, StyleSheet, useWindowDimensions } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import { theme } from "./Theme";
import { normalize } from "../Tool/FontSize";

const ButtonRow = (props) => {
  const { height, width, scale, fontScale } = useWindowDimensions();

  return (
    <View style={[styles.buttonGroup, props.style]}>
      <View
        style={[
          { width: normalize(0.12 * width), height: normalize(0.12 * width) },
          styles.buttonIcon,
          props.styleIcon,
        ]}
      >
        {props.icon}
      </View>
      <View style={[styles.buttonContent, props.styleContent]}>
        <Text style={[styles.buttonContentText, props.styleContentText]}>
          {props.text}
        </Text>
      </View>
      <View style={[styles.buttonNav, props.styleNav]}>
        <FontAwesome5 name="angle-right" size={normalize(24)} color="black" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    flexDirection: "row",
    padding: normalize(5),
  },
  buttonIcon: {
    borderRadius: normalize(15),
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContent: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: normalize(10),
  },
  buttonContentText: {
    fontSize: normalize(16),
    fontWeight: "bold",
    marginBottom: normalize(5),
  },
  buttonNav: {
    flexShrink: 1,
    justifyContent: "center",
  },
});

export default ButtonRow;
