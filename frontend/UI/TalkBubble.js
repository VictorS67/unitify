import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { normalize } from '../Tool/FontSize';

const TalkBubble = props => {
    return (
        <View style={styles.talkBubble}>
            <View style={styles.talkBubbleSquare}>
                { props.children }
            </View>
            <View style={styles.talkBubbleTriangle} />
        </View>
    );
}

const styles = StyleSheet.create({
    talkBubble: {
        backgroundColor: "transparent",
        flex: 1,
        alignItems: "center"
    },
    talkBubbleSquare: {
        width: normalize(55),
        height: normalize(35),
        backgroundColor: "blue",
        borderRadius: normalize(10),
        paddingHorizontal: normalize(5),
        paddingVertical: normalize(5),
        borderColor: "green",
        borderWidth: normalize(2),
        flex: 1
    },
    talkBubbleTriangle: {
        top: normalize(-1.5),
        width: 0,
        height: 0,
        borderTopColor: "blue",
        borderTopWidth: normalize(10),
        borderLeftColor: "transparent",
        borderLeftWidth: normalize(10),
        borderRightColor: "transparent",
        borderRightWidth: normalize(10),
        borderBottomColor: "transparent",
        borderBottomWidth: normalize(0),
    }
});

export default TalkBubble;
