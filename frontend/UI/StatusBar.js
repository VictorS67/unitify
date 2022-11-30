import React from 'react';
import { StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';

const StatusBar = props => {
    return (
        <View style={[styles.statusBar, props.style]} />
    );
}

const styles = StyleSheet.create({
    statusBar: {
        backgroundColor: '#C2185B',
        height: Constants.statusBarHeight
    }
});

export default StatusBar;
