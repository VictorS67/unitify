import React, { useState } from "react";
import { Text, View, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import StatusBar from "../UI/StatusBar";
import TopBar from "../UI/TopBar";
import UserAvatarWindow from "./UserAvatarWindow";
import UserStatWindow from "./UserStatWindow";
import UserMileWindow from "./UserMileWindow";
import UserSettingWindow from "./UserSettingWindow";
import { normalize } from "../Tool/FontSize";

const UserPage = props => {

    return (
        <View style={styles.container}>
            <StatusBar style={styles.statusBar}/>

            <TopBar style={styles.topBar}>
                <Text style={styles.topBarLeft}>
                    <FontAwesome5 name="angle-left" size={normalize(28)} color="black" />
                </Text>
                <Text style={[styles.topBarCenter, styles.topBarText]}>
                    Profile
                </Text>
                <Text style={styles.topBarRight}>

                </Text>
            </TopBar>

            <UserAvatarWindow style={styles.userAvatarWindow} userName={"User Name"} />

            <UserStatWindow style={styles.userStatWindow} champion={3} like={3} visit={20} />

            <UserMileWindow style={styles.userMileWindow} rank={3} month={8104} total={10024} />

            <UserSettingWindow style={styles.userSettingWindow} />

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#ecf0f1'
    },
    statusBar: {
        backgroundColor: '#ecf0f1'
    },
    topBar: {
        backgroundColor: '#ecf0f1'
    },
    topBarCenter: {
        textAlign: "center"
    },
    topBarText: {
        fontSize: normalize(18)
    },
    topBarLeft: {
        width: normalize(40),
        textAlign: "left"
    },
    topBarRight: {
        width: normalize(40),
        textAlign: "right"
    },
    userAvatarWindow: {
        flex: 2.4,
        justifyContent: "center",
        alignItems: "center"
    },
    userStatWindow: {
        flex: 1.1,
    },
    userMileWindow: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center"
    },
    userSettingWindow: {
        flex: 5,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default UserPage;
