import React from "react";
import { Text, View, StyleSheet, Pressable, useWindowDimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { FontAwesome5, MaterialCommunityIcons, Ionicons, Octicons } from '@expo/vector-icons';

import Card from "../UI/Card";
import { normalize } from "../Tool/FontSize";
import { tripnavActions } from "../store/tripnav-slice";


function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);

    var hDisplay = h > 0 ? h : 0;
    var mDisplay = m > 0 ? m : 0;
    return [hDisplay, mDisplay]; 
}

const TripNavCard = (props) => {

    const dispatch = useDispatch();
    const tripnav = useSelector((state) => state.tripnav);

    const [hour, minute] = secondsToHms(tripnav.duration);
    const { height, width, scale, fontScale } = useWindowDimensions();

    return (
        <React.Fragment>
            <View style={styles.tripCardContent}>
                <View style={styles.flexColumn}>
                    <Text style={styles.cardText}>
                        Distance
                    </Text>
                    <Card style={{ width: normalize(0.1 * width), height: normalize(0.1 * width) }} childrenStyle={styles.navItemCardContent}>
                        <MaterialCommunityIcons name="map-marker-distance" size={normalize(24)} color="black" />
                    </Card>
                    <Text style={styles.cardText}>
                        <Text style={styles.statText}>
                            {tripnav.distance}
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
                    <Card style={{ width: normalize(0.1 * width), height: normalize(0.1 * width) }} childrenStyle={styles.navItemCardContent}>
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
                    <Card style={{ width: normalize(0.1 * width), height: normalize(0.1 * width) }} childrenStyle={styles.navItemCardContent}>
                        <Ionicons name="speedometer" size={normalize(24)} color="black" />
                    </Card>
                    <Text style={styles.cardText}>
                        <Text style={styles.statText}>
                            {tripnav.speed}
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
                    <Card style={{ width: normalize(0.1 * width), height: normalize(0.1 * width) }} childrenStyle={styles.navItemCardContent}>
                        <FontAwesome5 name="hand-paper" size={normalize(24)} color="black" />
                    </Card>
                    <Text style={styles.cardText}>
                        <Text style={styles.statText}>
                            {tripnav.pause}
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
        </React.Fragment>
    );
};

const styles = StyleSheet.create({
    tripCardContent: {
        flexDirection: "row", 
        justifyContent: "space-around",
        alignItems: "center",
        paddingVertical: normalize(5)
    },
    flexColumn: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: "50%"
    },
    cardText: {
        fontSize: normalize(12),
        textAlign: "center",
        textTransform: 'uppercase',
        marginBottom: normalize(3),
        marginTop: normalize(2)
    },
    navItemCardContent: {
        flex: 1,
        alignItems: 'center', 
        justifyContent: 'center'
    },
    statText: {
        fontWeight: "bold"
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
});


export default TripNavCard;