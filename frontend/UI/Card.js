import React from "react";
import { View, StyleSheet } from 'react-native';


const Card = props => {
    return (
        <View style={[styles.card, props.style]}>
            <View style={[styles.cardContent, props.childrenStyle]}>
                {props.children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 6,
        elevation: 3,
        backgroundColor: '#fff',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 5,
        marginVertical: 5
    },
    cardContent: {
        marginHorizontal: 5,
        marginVertical: 5
    }
})

export default Card;
