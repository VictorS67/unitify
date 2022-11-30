import React, { useState } from "react";
import { View, StyleSheet } from 'react-native';
import { Divider } from 'react-native-paper';
import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';

import Card from "../UI/Card";
import ButtonRow from "../UI/ButtonRow";
import { normalize } from "../Tool/FontSize";

const SettingIcon = () => {
    return(
        <Ionicons name="md-settings-sharp" size={normalize(24)} style={styles.fontIcon} color="black" />
    );
};

const SignatureIcon = () => {
    return(
        <FontAwesome5 name="signature" size={normalize(24)} style={styles.fontIcon} color="black" />
    );
};

const LogoutIcon = () => {
    return(
        <MaterialIcons name="logout" size={normalize(24)} style={styles.fontIcon} color="black" />
    );
};

const InformationIcon = () => {
    return(
        <Ionicons name="information-circle-outline" size={normalize(24)} style={styles.fontIcon}  color="black" />
    );
}

const UserSettingWindow = props => {

    return (
        <View style={props.style}>
            <Card style={styles.userSettingCard} childrenStyle={styles.userSettingCardContent}>
                <ButtonRow icon={SignatureIcon()} text={"Champion Signature"} />
                <ButtonRow icon={SettingIcon()} text={"Setting"} />
                <ButtonRow icon={InformationIcon()} text={"App Information"} />
                <Divider style={{ width: "100%" }} />
                <ButtonRow icon={LogoutIcon()} text={"Logout"} />
            </Card>
        </View>
    );

};

const styles = StyleSheet.create({
    userSettingCard: {
        width: "95%",
        borderRadius: normalize(20),
        paddingVertical: normalize(10),
        paddingHorizontal: normalize(10),
        flex: 1
    },
    userSettingCardContent: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between"
    }
});

export default UserSettingWindow;
