import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, Alert } from 'react-native';
import { Divider } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";

import Card from "../UI/Card";
import { normalize } from "../Tool/FontSize";
import { changeChampionSignature } from "../store/user-actions";

const UserChampionSignWindow = props => {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const [chamSign, sChamSign] = useState(user.championSignature);
    const [maxWordCount, sMaxWordCount] = useState(50 - user.championSignature.length);

    const onChangeTextChampionSign = (chamSignChange) => {
        if (chamSignChange.length <= maxWordCount) {
            sChamSign(chamSignChange);
        }
    }

    const onPressChangeChampionSign = () => {
        if (chamSign !== "") {
            dispatch(changeChampionSignature(user.id, chamSign))
            .then((resolve) => {
                const result = JSON.parse(resolve);
                if (result.status === 200) {
                    Alert.alert(
                        "Success",
                        "You have changed your champion signature.",
                        [
                            { 
                                text: "OK", 
                                onPress: () => console.log("OK")
                            }
                        ]
                    );
                } else {
                    console.log("result message: ", result["message"])
                    Alert.alert(
                        "Ah no",
                        result.message,
                        [
                            { 
                                text: "Try Again", 
                                onPress: () => console.log("Try Again")
                            }
                        ]
                    );
                }
            })
        }
    }

    useEffect(() => {
        sChamSign(user.championSignature);
        sMaxWordCount(50 - user.championSignature.length);
    }, [user.championSignature, dispatch]);

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

                <TouchableOpacity 
                    style={{
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
                    }}
                    onPress = {() => {onPressChangeChampionSign()}}
                >
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
