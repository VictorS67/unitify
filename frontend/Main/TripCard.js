import React from "react";
import { Text, View, StyleSheet, Pressable, useWindowDimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { Divider, ProgressBar } from 'react-native-paper';
import { FontAwesome5, MaterialCommunityIcons, Ionicons, Octicons } from '@expo/vector-icons';

import Card from "../UI/Card";
import TripPlanningCard from "./TripPlanningCard";
import { normalize } from "../Tool/FontSize";

function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);

    var hDisplay = h > 0 ? h : 0;
    var mDisplay = m > 0 ? m : 0;
    return [hDisplay, mDisplay]; 
}

const TripCard = props => {

    const [hour, minute] = secondsToHms(props.duration);
    const { height, width, scale, fontScale } = useWindowDimensions();

    const trending = "up";

    return (
        <View style={styles.tripCard}>
            <View style={styles.tripCardTitle}>
                <Text style={styles.titleText}>
                    Your Trip
                </Text>
            </View>
            <TripPlanningCard trending={trending} />

            {/* <React.Fragment>
                <View style={styles.tripCardContent}>
                    <View style={styles.flexColumn}>
                        <Text style={styles.cardText}>
                            Distance
                        </Text>
                        <Card style={{ width: normalize(0.1 * width), height: normalize(0.1 * width) }} childrenStyle={styles.userCardContent}>
                            <MaterialCommunityIcons name="map-marker-distance" size={normalize(24)} color="black" />
                        </Card>
                        <Text style={styles.cardText}>
                            <Text style={styles.statText}>
                                {props.distance}
                            </Text>
                            <Text>
                                &nbsp;km
                            </Text>
                        </Text>
                    </View>

                    <View style={styles.flexColumn}>
                        <Text style={styles.cardText}>
                            Duration
                        </Text>
                        <Card style={{ width: normalize(0.1 * width), height: normalize(0.1 * width) }} childrenStyle={styles.userCardContent}>
                            <FontAwesome5 name="clock" size={normalize(24)} color="black" />
                        </Card>
                        <Text style={styles.cardText}>
                            <Text style={styles.statText}>
                                {hour}
                            </Text>
                            <Text>
                                &nbsp;h&nbsp;
                            </Text>
                            <Text style={styles.statText}>
                                {minute}
                            </Text>
                            <Text>
                                &nbsp;min
                            </Text>
                        </Text>
                    </View>

                    <View style={styles.flexColumn}>
                        <Text style={styles.cardText}>
                            Speed
                        </Text>
                        <Card style={{ width: normalize(0.1 * width), height: normalize(0.1 * width) }} childrenStyle={styles.userCardContent}>
                            <Ionicons name="speedometer" size={normalize(24)} color="black" />
                        </Card>
                        <Text style={styles.cardText}>
                            <Text style={styles.statText}>
                                {props.speed}
                            </Text>
                            <Text>
                                &nbsp;km/h
                            </Text>
                        </Text>
                    </View>

                    <View style={styles.flexColumn}>
                        <Text style={styles.cardText}>
                            Pause
                        </Text>
                        <Card style={{ width: normalize(0.1 * width), height: normalize(0.1 * width) }} childrenStyle={styles.userCardContent}>
                            <FontAwesome5 name="hand-paper" size={normalize(24)} color="black" />
                        </Card>
                        <Text style={styles.cardText}>
                            <Text style={styles.statText}>
                                {props.pause}
                            </Text>
                        </Text>
                    </View>
                </View>
                <Pressable style={styles.button}>
                    <FontAwesome5 name="question-circle" size={normalize(20)} color="black" />
                    <Text style={{ fontSize: normalize(22), textAlign: "center", textTransform: 'uppercase' }}>
                        &nbsp;Not My Trip
                    </Text>
                </Pressable>
            </React.Fragment> */}
        </View>
    );
};


const styles = StyleSheet.create({
    tripCard: { 
        flex: 1, 
        justifyContent: "flex-start",
        backgroundColor: "green", 
        padding: normalize(10) 
    },
    tripCardTitle: { 
        flexDirection: "row", 
        justifyContent: "space-between", 
        paddingBottom: normalize(5) 
    },
    tripCardContent: {
        flexDirection: "row", 
        justifyContent: "space-around",
        alignItems: "center",
        paddingVertical: normalize(5)
    },
    userCardContent: {
        flex: 1,
        alignItems: 'center', 
        justifyContent: 'center'
    },
    titleText: {
        fontSize: normalize(18),
        textAlign: "left",
        textTransform: 'uppercase'
    },
    cardText: {
        fontSize: normalize(12),
        textAlign: "center",
        textTransform: 'uppercase',
        marginBottom: normalize(3),
        marginTop: normalize(2)
    },
    flexColumn: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: "50%"
    },
    button: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: normalize(5),
        paddingHorizontal: normalize(10),
        borderRadius: normalize(4),
        // elevation: 3,
        backgroundColor: 'orange'
    },
    statText: {
        fontWeight: "bold"
    },
    statCard: { 
        width: "60%", 
        height: "100%"
    }
});

export default TripCard;
