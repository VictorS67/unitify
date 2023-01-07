import React from "react";
import { View, StyleSheet } from "react-native";

import { normalize } from "../Tool/FontSize";

const Card = (props) => {
  return (
    <View style={[styles.card, props.style]}>
      <View style={[styles.cardContent, props.childrenStyle]}>
        {props.children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: normalize(6),
    elevation: 3,
    backgroundColor: "#fff",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: normalize(2),
    marginHorizontal: normalize(5),
    marginVertical: normalize(5),
  },
  cardContent: {
    marginHorizontal: normalize(5),
    marginVertical: normalize(5),
  },
});

export default Card;
