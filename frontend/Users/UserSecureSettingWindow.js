import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, Button, Pressable, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';

import Card from "../UI/Card";
import { normalize } from "../Tool/FontSize";

const renderSettingColumn = (title, content, event, showNext) => {

    return (
        <React.Fragment>
            <Pressable style={{
                flexDirection: "row",
                padding: normalize(5),
                height: normalize(50)
            }}
            onPress={event}
            >
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    paddingLeft: normalize(10)
                }}>
                    <Text style={{
                        fontSize: normalize(16),
                        fontWeight: "bold"
                    }}>
                        {title}
                    </Text>
                </View>
                {
                    (content !== null) &&
                    <View style={[{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "flex-end",
                        paddingHorizontal: normalize(10)
                    }]}>
                        <Text style={{
                            fontSize: normalize(14),
                            color: "gray"
                        }}>
                            {content}
                        </Text>
                    </View>
                }
                {
                    (showNext === null || showNext === true) &&
                    <View style={{
                        flexShrink: 1,
                        justifyContent: "center",
                        paddingRight: normalize(10)
                    }}>
                        <FontAwesome5 name="angle-right" size={normalize(24)} color="black" />
                    </View>
                }
            </Pressable>
            <Divider style={{ width: "100%" }} />
        </React.Fragment>
    );
}

const UserSecureSettingWindow = props => {

    return (
        <View style={props.style}>
            {renderSettingColumn('User Name', 'test', () => {}, false)}
            {renderSettingColumn('Email', 'test@test.com', () => {props.navigation.navigate("ChangeEmail")}, true)}
            {renderSettingColumn('Password', null, () => {props.navigation.navigate("ChangePassword")}, true)}
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

export default UserSecureSettingWindow;
