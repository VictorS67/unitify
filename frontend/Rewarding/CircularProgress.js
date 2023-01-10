import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  Animated,
  TextInput,
  StyleSheet,
  Easing,
} from "react-native";
import Svg, { G, Circle } from "react-native-svg";

export default function CircularProgress({
  percentage = 3444,
  radius = 100,
  strokeWidth = 10,
  duration = 500,
  color = "tomato",
  delay = 500,
  textColor,
  max = 3000,
}) {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const circleRef = useRef();
  const inputRef = React.useRef();
  const halfCircle = radius + strokeWidth;
  const circleCircumference = 2 * Math.PI * radius;

  const [runOnce, sRunOnce] = useState(false);

  const animation = (toValue) => {
    return Animated.timing(animatedValue, {
      toValue,
      duration,
      delay: 1000,
      useNativeDriver: false,
      easing: Easing.out(Easing.ease),
    }).start(() => {
      // animation(toValue === 0 ? percentage : 0);
    });
  };

  useEffect(() => {
    animation(percentage);

    animatedValue.addListener((v) => {
      const maxPerc = (100 * Math.min(v.value, max)) / max;
      const strokeDashoffset =
        circleCircumference - (circleCircumference * maxPerc) / 100;

      if (inputRef?.current) {
        inputRef.current.setNativeProps({
          text: `${Math.round(v.value)}`,
        });
      }
      if (circleRef?.current) {
        circleRef.current.setNativeProps({
          strokeDashoffset,
        });
      }
    });

    return () => {
      animatedValue.removeAllListeners();
    };
  }, [percentage]);

  return (
    <View
      style={{
        width: radius * 2,
        height: radius * 2,
      }}
    >
      <Svg
        width={radius * 2}
        height={radius * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
      >
        <G rotation={"-180"} origin={`${halfCircle}, ${halfCircle}`}>
          <Circle
            cx={"50%"}
            cy={"50%"}
            r={radius}
            fill={"transparent"}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinejoin={"round"}
            strokeOpacity={0.1}
          />
          <Circle
            ref={circleRef}
            cx={"50%"}
            cy={"50%"}
            r={radius}
            fill={"transparent"}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circleCircumference}
            strokeDashoffset={circleCircumference}
            strokeLinecap={"round"}
          />
        </G>
      </Svg>
      <TextInput
        ref={inputRef}
        underlineColorAndroid={"transparent"}
        editable={false}
        defaultValue={"0"}
        style={[
          StyleSheet.absoluteFillObject,
          { fontSize: radius / 2, color: textColor ?? color },
          { fontWeight: "900", textAlign: "center" },
        ]}
      />
    </View>
  );
}
