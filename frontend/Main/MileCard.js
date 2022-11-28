import React from "react";
import { Text, View, StyleSheet, useWindowDimensions, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { normalize } from "../Tool/FontSize";

const MileCard = props => {
    return (
        <View style={{ flex: 0.8, backgroundColor: "orange", padding: normalize(10) }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: normalize(5) }}>
                <Text style={styles.titleText}>
                    Miles
                </Text>
                <Pressable style={styles.button}>
                    <MaterialIcons name="leaderboard" size={normalize(14)} color="black" />
                    <Text style={{ fontSize: normalize(12), textAlign: "center", textTransform: 'uppercase' }}>
                        &nbsp;Leaderboard
                    </Text>
                </Pressable>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                <View style={styles.statCard}>
                    <Text style={styles.mileText}>
                        3
                    </Text>
                    <Text style={styles.normalText}>
                        Rank
                    </Text>
                </View>

                <View style={styles.statCard}>
                    <Text style={styles.mileText}>
                        8104
                    </Text>
                    <Text style={styles.normalText}>
                        Month
                    </Text>
                </View>

                <View style={styles.statCard}>
                    <Text style={styles.mileText}>
                        10024
                    </Text>
                    <Text style={styles.normalText}>
                        Total
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    titleText: {
        fontSize: normalize(18),
        textAlign: "left",
        textTransform: 'uppercase'
    },
    mileText: {
        fontSize: normalize(30),
        textAlign: "left",
        textTransform: 'uppercase'
    },
    normalText: {
        fontSize: normalize(14),
        textAlign: "left",
        textTransform: 'uppercase',
        marginBottom: normalize(3),
        marginTop: normalize(2)
    },
    statCard: { 
        alignItems: "center", 
        paddingHorizontal: normalize(5)
    },
    button: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: normalize(5),
        paddingHorizontal: normalize(10),
        borderRadius: normalize(4),
        elevation: normalize(3),
        backgroundColor: 'green'
    }
});

export default MileCard;
