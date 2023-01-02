import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, Button, Pressable, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';

import Card from "../UI/Card";
import { normalize } from "../Tool/FontSize";

const renderChangeColumn = (title, content, event) => {

    return (
        <React.Fragment>
            <View style={{
                flexDirection: "row",
                padding: normalize(5),
                height: normalize(50)
            }}>
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    paddingLeft: normalize(10)
                }}>
                    <Text style={{
                        fontSize: normalize(14),
                        fontWeight: "bold"
                    }}>
                        {title}
                    </Text>
                </View>
                <TextInput
                    value={content}
                    onChangeText={event}
                    placeholder={'Write it here...'}
                    style={styles.input}
                />
            </View>
            <Divider style={{ width: "100%" }} />
        </React.Fragment>
    );
}

const UserChangeEmailWindow = props => {

    const [newEmail, sNewEmail] = useState('');

    return (
        <View style={props.style}>
            {renderChangeColumn('Email', newEmail, (newEmailChange) => {sNewEmail(newEmailChange)})}
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
    );

};

const styles = StyleSheet.create({
    input: {
        flex: 3,
        padding: normalize(5),
        fontSize: normalize(14)
    },
});

export default UserChangeEmailWindow;