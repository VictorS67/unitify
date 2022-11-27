import React, { useState } from "react";
import { Text, View, StyleSheet } from 'react-native';


const MainPage = props => {
    <View style={styles.container}>
        <View style={{ flex: 1, backgroundColor: "red" }} />
        <View style={{ flex: 2, backgroundColor: "darkorange" }} />
        <View style={{ flex: 3, backgroundColor: "green" }} />
    </View>
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-end',
        backgroundColor: '#ecf0f1'
    }
});

export default MainPage;
