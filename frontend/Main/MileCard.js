import React from "react";
import { Text, View, StyleSheet, useWindowDimensions, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";

import { normalize } from "../Tool/FontSize";

const MileCard = props => {

    const user = useSelector((state) => state.user);

    return (
        <View style={styles.mileCard}>
            <View style={styles.mileCardTitle}>
                <Text style={styles.titleText}>
                    Miles
                </Text>
                <Pressable 
                    style={styles.button}
                    onPress={() => {props.navigation.navigate('Leaderboard');}}
                >
                    <MaterialIcons name="leaderboard" size={normalize(14)} color="black" />
                    <Text style={{ fontSize: normalize(12), textAlign: "center", textTransform: 'uppercase' }}>
                        &nbsp;Leaderboard
                    </Text>
                </Pressable>
            </View>
            <View style={styles.mileCardContent}>
                <View style={styles.statCard}>
                    <Text style={styles.mileText}>
                        {
                            (user.currentRank !== null)
                            ? user.currentRank
                            : ''
                        }
                    </Text>
                    <Text style={styles.normalText}>
                        Rank
                    </Text>
                </View>

                <View style={styles.statCard}>
                    <Text style={styles.mileText}>
                        {
                            (user.monthlyMiles !== null)
                            ? user.monthlyMiles
                            : ''
                        }
                    </Text>
                    <Text style={styles.normalText}>
                        Month
                    </Text>
                </View>

                <View style={styles.statCard}>
                    <Text style={styles.mileText}>
                    {
                            (user.totalMiles !== null)
                            ? user.totalMiles
                            : ''
                        }
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
    mileCard: { 
        flex: 1, 
        backgroundColor: "orange", 
        padding: normalize(10)
    },
    mileCardTitle: { 
        flexDirection: "row", 
        justifyContent: "space-between", 
        paddingBottom: normalize(5) 
    },
    mileCardContent: { 
        flexDirection: "row", 
        justifyContent: "space-around",
        alignItems: "center",
        flexGrow: 1
    },
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
