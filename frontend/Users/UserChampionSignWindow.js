import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { Divider } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';

import Card from "../UI/Card";
import { normalize } from "../Tool/FontSize";

const UserChampionSignWindow = props => {

    const [chamSign, sChamSign] = useState('');

    return (
        <View style={props.style}>
            <Card
                childrenStyle={{
                    flexDirection: "row",
                    alignItems: 'center', 
                    justifyContent: 'center',
                    height: normalize(50),
                    window: "100%"
                }}
            >
                <TextInput
                    value={chamSign}
                    onChangeText={(chamSign) => sChamSign(chamSign)}
                    placeholder={'Write champion signature...'}
                    style={styles.input}
                />
                <Text style={{flexShrink: 1, paddingHorizontal: normalize(10), fontSize: normalize(16)}}>
                    35
                </Text>
            </Card>
        </View>
    );

};

const styles = StyleSheet.create({
    input: {
        flex: 8,
        padding: normalize(5),
        fontSize: normalize(16)
    },
});

export default UserChampionSignWindow;
