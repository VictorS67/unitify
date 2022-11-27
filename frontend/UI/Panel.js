import React from "react";
import { View, StyleSheet } from 'react-native';


const Panel = props => {
    return (
        <View style={styles.card}>
            <View style={styles.cardContent}>
                {props.children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        elevation: 3,
        backgroundColor: '#fff'
    },
    cardContent: {
        marginHorizontal: 5,
        marginVertical: 5
    }
})

export default Panel;