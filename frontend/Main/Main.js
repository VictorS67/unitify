import React, { useState, useEffect } from "react";
import { View, StyleSheet,  Keyboard } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import Card from "../UI/Card";
import StatusBar from "../UI/StatusBar";
import Map from "../Map/Map";
import TripCard from "./TripCard";
import UsageCard from "./UsageCard";
import MileCard from "./MileCard";
import { normalize } from "../Tool/FontSize";


const MainPage = props => {

    const [keyboardStatus, setKeyboardStatus] = useState(false);

    useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
          setKeyboardStatus(true);
        });

        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
          setKeyboardStatus(false);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    return (
        <View style={styles.container}>
            <View style={[styles.container, {flex: 1}]}>
                <Map />
                <Card style={styles.userCard} childrenStyle={styles.userCardContent}>
                    <FontAwesome5 name="user" size={normalize(26)} color="black" />
                </Card>
            </View>
            <View style={[styles.container, (keyboardStatus === false) ? {flex: 1.3} : {flex: 0.4}]}>
                <View style={[styles.container, {flex: 1}]}>
                    <TripCard distance={0.2} duration={320} speed={0.3} pause={3} />
                </View>
                {
                    keyboardStatus === false &&
                    <View style={[styles.container, {flex: 2}]}>
                        <MileCard />
                        <UsageCard />
                    </View>
                }
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#ecf0f1'
    },
    userCard: {
        alignSelf: "flex-end",
        right: normalize(20),
        top: normalize(35),
        width: normalize(50),
        height: normalize(50),
        borderRadius: normalize(50/2)
    },
    userCardContent: {
        flex: 1,
        alignItems: 'center', 
        justifyContent: 'center'
    }
});

export default MainPage;
