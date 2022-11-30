import React from "react";
import { Text, View, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import Card from "../UI/Card";
import { normalize } from "../Tool/FontSize";

const UserAvatarWindow = props => {

    return (
        <View style={props.style}>
            <Card style={styles.userCard} childrenStyle={styles.userCardContent}>
                <FontAwesome5 name="user" size={normalize(35)} color="black" />
            </Card>
            <Text style={styles.userName}>
                {props.userName}
            </Text>
        </View> 
    );

};

const styles = StyleSheet.create({
    userCard: {
        width: normalize(80),
        height: normalize(80),
        borderRadius: normalize(80/2)
    },
    userCardContent: {
        flex: 1,
        alignItems: 'center', 
        justifyContent: 'center'
    },
    userName: {
        fontSize: normalize(17),
        fontWeight: "bold",
        marginTop: normalize(5),
        marginBottom: normalize(10)
    }
});

export default UserAvatarWindow;
