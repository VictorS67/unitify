import React, { useRef, useEffect } from "react";
import { StyleSheet, View, Dimensions, Animated, Platform } from "react-native";

import { normalize } from "../Tool/FontSize";

const SkeletonView = (props) => {
  const circleAnimatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(750),
        Animated.timing(circleAnimatedValue, {
          toValue: 1,
          duration: 750,
          useNativeDriver: true, // Add this line
        }),
      ]),
      {
        iterations: -1,
      }
    ).start();
  }, []);

  const fadeOpacity1 = circleAnimatedValue.interpolate({
    inputRange: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    outputRange: [1, 0.5, 0.4, 0.4, 0.2, 0.2, 0.4, 0.5, 0.8, 0.8, 1],
  });

  const fadeOpacity2 = circleAnimatedValue.interpolate({
    inputRange: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    outputRange: [1, 0.8, 0.5, 0.4, 0.4, 0.2, 0.2, 0.4, 0.5, 0.8, 1],
  });

  const fadeOpacity3 = circleAnimatedValue.interpolate({
    inputRange: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    outputRange: [1, 0.8, 0.8, 0.5, 0.4, 0.4, 0.2, 0.2, 0.5, 0.8, 1],
  });

  const fadeOpacityChoices = {
    1: fadeOpacity1,
    2: fadeOpacity2,
    3: fadeOpacity3,
  };

  return (
    <React.Fragment>
      {props.type === "CIRCLE" && (
        <Animated.View
          style={[
            {
              width: normalize(props.height),
              height: normalize(props.height),
              borderRadius: normalize(props.height / 2),
              backgroundColor: "#ECEFF1",
              overflow: "hidden",
              opacity: fadeOpacityChoices[`${props.order}`],
            },
            props.style,
          ]}
        ></Animated.View>
      )}
      {props.type === "RECTANGLE" && (
        <Animated.View
          style={[
            {
              backgroundColor: "#ECEFF1",
              width: "100%",
              height: normalize(props.height),
              opacity: fadeOpacityChoices[`${props.order}`],
            },
            props.style,
          ]}
        ></Animated.View>
      )}
      {props.type === "SQUARE" && (
        <Animated.View
          style={[
            {
              width: normalize(props.height),
              height: normalize(props.height),
              borderRadius: normalize(6),
              backgroundColor: "#ECEFF1",
              overflow: "hidden",
              opacity: fadeOpacityChoices[`${props.order}`],
            },
            props.style,
          ]}
        ></Animated.View>
      )}
      {props.type === "CARD" && (
        <Animated.View
          style={[
            {
              width: normalize(props.height),
              height: normalize(props.height),
              backgroundColor: "#ECEFF1",
              overflow: "hidden",
              opacity: fadeOpacityChoices[`${props.order}`],
            },
            styles.card,
            props.style,
          ]}
        ></Animated.View>
      )}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECEFF1",
    paddingTop: 24,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  card: {
    elevation: 3,
    backgroundColor: "#ECEFF1",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: normalize(2),
    marginHorizontal: normalize(5),
    marginVertical: normalize(5),
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default SkeletonView;
