import React from "react";
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

import Card from "../UI/Card";
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

    return (
        <View style={{ flex: 1, justifyContent: "space-between", backgroundColor: "green", padding: normalize(10) }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: normalize(5) }}>
                <Text style={styles.titleText}>
                    Current Trip
                </Text>
                <Pressable style={styles.button}>
                    <FontAwesome5 name="question-circle" size={normalize(14)} color="black" />
                    <Text style={{ fontSize: normalize(12), textAlign: "center", textTransform: 'uppercase' }}>
                        &nbsp;Not My Trip
                    </Text>
                </Pressable>
            </View>
            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-around" }}>
                <View style={styles.flexColumn}>
                    <Text style={styles.cardText}>
                        Distance
                    </Text>
                    <Card style={styles.statCard} childrenStyle={styles.userCardContent}>
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
                    <Card style={styles.statCard} childrenStyle={styles.userCardContent}>
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
                    <Card style={styles.statCard} childrenStyle={styles.userCardContent}>
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
                    <Card style={styles.statCard} childrenStyle={styles.userCardContent}>
                        <FontAwesome5 name="hand-paper" size={normalize(24)} color="black" />
                    </Card>
                    <Text style={styles.cardText}>
                        <Text style={styles.statText}>
                            {props.pause}
                        </Text>
                    </Text>
                </View>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
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
        alignItems: "center"
    },
    button: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: normalize(5),
        paddingHorizontal: normalize(10),
        borderRadius: normalize(4),
        elevation: 3,
        backgroundColor: 'orange'
    },
    statText: {
        fontWeight: "bold"
    },
    statCard: { 
        width: normalize(40), 
        height: normalize(40) 
    }
});

export default TripCard;
