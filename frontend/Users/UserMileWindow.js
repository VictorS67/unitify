import React, { useState } from "react";
import { Text, View, StyleSheet } from 'react-native';

import Card from "../UI/Card";
import { normalize } from "../Tool/FontSize";

const UserMileWindow = props => {

    return (
        <View style={props.style}>
            <View style={styles.userMileCollection}>
                <Card style={styles.mileCard} childrenStyle={styles.mileCardContent}>
                    <Text style={styles.mileText}>
                        {props.rank}
                    </Text>
                    <Text style={styles.normalText}>
                        Rank
                    </Text>
                </Card>
                <Card style={styles.mileCard} childrenStyle={styles.mileCardContent}>
                    <Text style={styles.mileText}>
                        {props.month}
                    </Text>
                    <Text style={styles.normalText}>
                        Month
                    </Text>
                </Card>
                <Card style={styles.mileCard} childrenStyle={styles.mileCardContent}>
                    <Text style={styles.mileText}>
                        {props.total}
                    </Text>
                    <Text style={styles.normalText}>
                        Total
                    </Text>
                </Card>
            </View>
        </View> 
    );

};

const styles = StyleSheet.create({
    userMileCollection: { 
        flex: 1, 
        width: "100%",
        flexDirection: "row", 
        justifyContent: "space-around",
        alignItems: "center",
        paddingHorizontal: normalize(5)
    },
    mileCard: {
        borderRadius: normalize(20)
    },
    mileCardContent: {
        flex: 1,
        alignItems: 'center', 
        justifyContent: 'center',
        paddingVertical: normalize(5),
        paddingHorizontal: normalize(15)
    },
    normalText: {
        fontSize: normalize(14),
        marginBottom: normalize(3),
        marginTop: normalize(2)
    },
    mileText: {
        fontSize: normalize(30),
        textAlign: "left",
        textTransform: 'uppercase'
    }
});

export default UserMileWindow;
