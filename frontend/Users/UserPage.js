import React, { useState } from "react";
import { Text, View, StyleSheet } from 'react-native';
import { Divider } from 'react-native-paper';
import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';

import Card from "../UI/Card";
import StatusBar from "../UI/StatusBar";
import TopBar from "../UI/TopBar";
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
        <MaterialIcons name="logout" size={24} style={styles.fontIcon} color="black" />
    );
};

const InformationIcon = () => {
    return(
        <Ionicons name="md-information-circle" size={24} style={styles.fontIcon} color="black" />
    );
}

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

            <View style={[styles.userAvatarWindow]}>
                <Card style={styles.userCard} childrenStyle={styles.userCardContent}>
                    <FontAwesome5 name="user" size={normalize(35)} color="black" />
                </Card>
                <Text style={styles.userName}>
                    User Name
                </Text>
                
            </View> 

            <View style={styles.userStatWindow}>
                <Divider style={{ width: "100%" }} />
                <View style={styles.userStatCollection}>
                    <View style={styles.statCard}>
                        <Text style={styles.statText}>
                            2
                        </Text>
                        <Text style={styles.normalText}>
                            <FontAwesome5 name="trophy" size={normalize(14)} color="black" />
                            &nbsp;Champions
                        </Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statText}>
                            3
                        </Text>
                        <Text style={styles.normalText}>
                            <FontAwesome5 name="thumbs-up" size={normalize(14)} color="black" />
                            &nbsp;Liked
                        </Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statText}>
                            20
                        </Text>
                        <Text style={styles.normalText}>
                            <FontAwesome5 name="user-friends" size={normalize(14)} color="black" />
                            &nbsp;Visited
                        </Text>
                    </View>
                </View>
                <Divider style={{ width: "100%" }} />
            </View>

            <View style={[styles.userMileWindow]}>
                <View style={styles.userMileCollection}>
                    <Card style={styles.mileCard} childrenStyle={styles.mileCardContent}>
                        <Text style={styles.mileText}>
                            3
                        </Text>
                        <Text style={styles.normalText}>
                            Rank
                        </Text>
                    </Card>
                    <Card style={styles.mileCard} childrenStyle={styles.mileCardContent}>
                        <Text style={styles.mileText}>
                            8104
                        </Text>
                        <Text style={styles.normalText}>
                            Month
                        </Text>
                    </Card>
                    <Card style={styles.mileCard} childrenStyle={styles.mileCardContent}>
                        <Text style={styles.mileText}>
                            10024
                        </Text>
                        <Text style={styles.normalText}>
                            Total
                        </Text>
                    </Card>
                </View>
            </View> 

            <View style={styles.userSettingWindow}>
                <Card style={styles.userSettingCard} childrenStyle={styles.userSettingCardContent}>
                    <ButtonRow icon={SignatureIcon()} text={"Chompion Signature"} />
                    <ButtonRow icon={SettingIcon()} text={"Setting"} />
                    <ButtonRow icon={InformationIcon()} text={"App Information"} />
                    <Divider style={{ width: "100%", marginVertical: normalize(5) }} />
                    <ButtonRow icon={LogoutIcon()} text={"Logout"} />
                </Card>
            </View>


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
    },
    userStatCollection: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    userMileCollection: { 
        flex: 1, 
        width: "100%",
        flexDirection: "row", 
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: normalize(5)
    },
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
    },
    mileCard: {
        flex: 1,
        borderRadius: normalize(20)
    },
    mileCardContent: {
        flex: 1,
        alignItems: 'center', 
        justifyContent: 'center',
        paddingVertical: normalize(5),
        paddingHorizontal: normalize(10)
    },
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
    },
    statCard: { 
        alignItems: "center", 
        paddingHorizontal: normalize(5),
        width: "30%"
    },
    statText: {
        fontSize: normalize(16),
        fontWeight: "bold"
    },
    normalText: {
        fontSize: normalize(14),
        marginBottom: normalize(3),
        marginTop: normalize(2)
    },
    fontIcon: {
        textAlign: "center"
    },
    mileText: {
        fontSize: normalize(30),
        textAlign: "left",
        textTransform: 'uppercase'
    }
});

export default UserPage;
