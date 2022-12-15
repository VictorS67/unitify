import React, { useEffect, useRef } from "react";
import { Animated, View, Text, StyleSheet } from "react-native";

import { normalize } from "../Tool/FontSize";

const ProgressBar = ({step, steps, height, style, progressChildren}) => {

    const [width, sWidth] = React.useState(0);
    const animatedValue = useRef(new Animated.Value(-1000)).current;
    const reactive = useRef(new Animated.Value(-1000)).current;

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: reactive,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, []);

    useEffect(() => {
        reactive.setValue(-width + (width * step) / steps)
    }, [step, width]);

    let progress = []
    for (let i = progressChildren.length - 1; i >= 0; i--) {
        let progressChild = progressChildren[i];
        let width = progressChild.steps / steps * 100;

        progress.push(
            <View
                key = {i}
                style={
                    {
                        backgroundColor: progressChild.progressColor,
                        height: "100%",
                        width: `${width}%`,
                        borderRadius: normalize(style.borderRadius)
                    }
                }
            >
            </View>
		)
    }

    return (
        <View 
        onLayout={(e) => {
            const newWidth = e.nativeEvent.layout.width;
            sWidth(newWidth);
        }}
        style={{
            height: normalize(style.height),
            backgroundColor: style.progressBackColor,
            borderRadius: normalize(style.borderRadius),
            overflow: "hidden",
        }}>
            <Animated.View 
                style={{
                    height: normalize(style.height),
                    width: "100%",
                    borderRadius: normalize(style.borderRadius),
                    // backgroundColor: "rgba(0,0,0,0.5)",
                    position: "absolute",
                    left: 0,
                    top: 0,
                    transform: [{
                        translateX: animatedValue
                    }]
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        width: "100%",
                        height: "100%",
                        backgroundColor: "transparent"
                    }}
                >
                    { progress }
                </View>
            </Animated.View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center"
    }
})

export default ProgressBar;
