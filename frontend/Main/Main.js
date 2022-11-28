import React from "react";
import { Text, View, StyleSheet, useWindowDimensions, Pressable } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

import Card from "../UI/Card";
import TripCard from "./TripCard";
import UsageCard from "./UsageCard";
import MileCard from "./MileCard";
import { normalize } from "../Tool/FontSize";


const MainPage = props => {

    return (
        <View style={styles.container}>
            <View style={[styles.container]}>
                <Card style={styles.userCard} childrenStyle={styles.userCardContent}>
                    <FontAwesome5 name="user" size={normalize(26)} color="black" />
                </Card>
            </View>
            <View style={[styles.container, {flex: 1.3}]}>
                <TripCard distance={0.2} duration={320} speed={0.3} pause={3} />
                <MileCard />
                <UsageCard />
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
        marginLeft: normalize(20),
        marginTop: normalize(30),
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
