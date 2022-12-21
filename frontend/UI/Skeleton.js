import React, { useRef, useEffect } from "react";
import { StyleSheet, View, Dimensions, Animated, Platform } from 'react-native';

import { normalize } from "../Tool/FontSize";

const SkeletonView = props => {

    const circleAnimatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.delay(1000),
                Animated.timing(circleAnimatedValue, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true, // Add this line
                })
            ]),
            {
                iterations: -1
            }
        ).start();
    }, []);

    const fadeOpacity = circleAnimatedValue.interpolate({
        inputRange: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        outputRange: [1, 0.8, 0.5, 0.4, 0.4, 0.2, 0.2, 0.4, 0.5, 0.8, 1]
    });

    const fadeOpacity2 = circleAnimatedValue.interpolate({
        inputRange: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        outputRange: [1, 0.6, 0.5, 0.4, 0.2, 0.2, 0.4, 0.5, 0.8, 0.8, 1]
    });

    const fadeOpacity3 = circleAnimatedValue.interpolate({
        inputRange: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        outputRange: [1, 0.8, 0.8, 0.6, 0.5, 0.4, 0.2, 0.2, 0.4, 0.5, 1]
    });

    return (
        <View style={styles.container}>
            <View style={[{ marginBottom: 8 }, styles.card]}>
                <Animated.View style={{ 
                    width: 100, 
                    height: 100, 
                    borderRadius: 60, 
                    backgroundColor: 
                    '#ECEFF1', 
                    overflow: 'hidden', 
                    marginRight: 16,
                    opacity: fadeOpacity2, 
                }}>
                </Animated.View>
                <View style={{ flex: 1, justifyContent: 'space-evenly', overflow: 'hidden' }}>
                    <Animated.View style={{ backgroundColor: '#ECEFF1', height: 32, opacity: fadeOpacity }}></Animated.View>
                    <Animated.View style={{ backgroundColor: '#ECEFF1', height: 32, opacity: fadeOpacity3 }}></Animated.View>
                </View>
            </View>
            <View style={[styles.card, { flexDirection: 'column', flex: 1 }]}>
                <View style={{ flex: 1, padding: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Animated.View style={{ width: Dimensions.get('window').width / 3 - 40, height: 80, backgroundColor: '#ECEFF1', overflow:'hidden', opacity: fadeOpacity2 }}></Animated.View>
                    <Animated.View style={{ width: Dimensions.get('window').width / 3 - 40, height: 80, backgroundColor: '#ECEFF1', overflow:'hidden', opacity: fadeOpacity }}></Animated.View>
                    <Animated.View style={{ width: Dimensions.get('window').width / 3 - 40, height: 80, backgroundColor: '#ECEFF1', overflow:'hidden', opacity: fadeOpacity3 }}></Animated.View>
                </View>
                <View style={{ flex: 1, padding: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Animated.View style={{ width: Dimensions.get('window').width / 3 - 40, height: 80, backgroundColor: '#ECEFF1', overflow:'hidden', opacity: fadeOpacity2 }}></Animated.View>
                    <Animated.View style={{ width: Dimensions.get('window').width / 3 - 40, height: 80, backgroundColor: '#ECEFF1', overflow:'hidden', opacity: fadeOpacity }}></Animated.View>
                    <Animated.View style={{ width: Dimensions.get('window').width / 3 - 40, height: 80, backgroundColor: '#ECEFF1', overflow:'hidden', opacity: fadeOpacity3 }}></Animated.View>
                </View>
                <View style={{ flex: 1, padding: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Animated.View style={{ width: Dimensions.get('window').width / 3 - 40, height: 80, backgroundColor: '#ECEFF1', overflow:'hidden', opacity: fadeOpacity2 }}></Animated.View>
                    <Animated.View style={{ width: Dimensions.get('window').width / 3 - 40, height: 80, backgroundColor: '#ECEFF1', overflow:'hidden', opacity: fadeOpacity }}></Animated.View>
                    <Animated.View style={{ width: Dimensions.get('window').width / 3 - 40, height: 80, backgroundColor: '#ECEFF1', overflow:'hidden', opacity: fadeOpacity3 }}></Animated.View>
                </View>
            </View>
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ECEFF1',
        paddingTop: 24,
        paddingHorizontal: 16,
        paddingBottom: 24
    },
    card: {
        padding: 16,
        shadowColor: 'black',
        borderRadius: 4,
        backgroundColor: '#FAFAFA',
        shadowColor: 'black',
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowOpacity: 0.1,
        flexDirection: 'row'
    },
    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    }
});

export default SkeletonView;
