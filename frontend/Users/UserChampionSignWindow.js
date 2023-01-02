import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';

import Card from "../UI/Card";
import { normalize } from "../Tool/FontSize";

const UserChampionSignWindow = props => {

    const [chamSign, sChamSign] = useState('');
    const [maxWordCount, sMaxWordCount] = useState(50);

    const onChangeTextChampionSign = (chamSignChange) => {
        if (chamSignChange.length <= maxWordCount) {
            sChamSign(chamSignChange);
        }
    }

    return (
        <View style={props.style}>
            <View style={{
                marginHorizontal: normalize(10)
            }}>
                <View style={{
                    flexDirection: "row",
                    alignItems: 'center', 
                    justifyContent: 'center',
                    height: normalize(50),
                    window: "100%"
                }}>
                    <TextInput
                        value={chamSign}
                        onChangeText={(chamSignChange) => onChangeTextChampionSign(chamSignChange)}
                        placeholder={'Write champion signature...'}
                        style={styles.input}
                    />
                    <Text style={{flexShrink: 1, paddingHorizontal: normalize(10), fontSize: normalize(16)}}>
                        {maxWordCount - chamSign.length}
                    </Text>
                </View>

                <TouchableOpacity style={{
                    marginHorizontal: normalize(10),
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "dodgerblue",
                    marginTop: normalize(20),
                    paddingVertical: normalize(10),
                    borderRadius: normalize(5),
                    elevation: 3,
                    shadowOffset: { width: 1, height: 1 },
                    shadowColor: '#333',
                    shadowOpacity: 0.3,
                    shadowRadius: normalize(2),
                }}>
                    <Text
                        style={{
                            fontSize: normalize(18),
                            color: "white"
                        }}
                    >
                        SUBMIT
                    </Text>
                </TouchableOpacity>
            </View>
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
