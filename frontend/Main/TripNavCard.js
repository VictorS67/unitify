import React, { useState } from "react";
import { Text, View, StyleSheet, Pressable, useWindowDimensions, KeyboardAvoidingView, Platform, Modal } from 'react-native';
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

    const [showFinishTrip, sShowFinishTrip] = useState(false);

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
                            {Number((tripnav.distance).toFixed(1))}
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
                            {Number((tripnav.speed).toFixed(1))}
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
            <Pressable style={styles.button} onPress={() => {sShowFinishTrip(true)}}>
                <Text style={{ fontSize: normalize(20), textAlign: "center", textTransform: 'uppercase' }}>
                    Finish Trip
                </Text>
            </Pressable>

            <Modal
                animationType="fade"
                transparent={true}
                visible={showFinishTrip}
                onRequestClose={() => {
                    // Alert.alert("Modal has been closed.");
                    sShowFinishTrip(!showFinishTrip);
                }}
            >
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <View style={{
                        flex: 0.3,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        backgroundColor: "white",
                        borderRadius: normalize(20),
                        padding: normalize(20),
                        alignItems: "center",
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5,
                        width: normalize(width * 2.5/3.5)
                    }}>
                        <Card style={{
                            position: "absolute",
                            top: -normalize(35),
                            width: normalize(70),
                            height: normalize(70),
                            borderRadius: normalize(70/2)
                        }} childrenStyle={{
                            flex: 1,
                            alignItems: 'center', 
                            justifyContent: 'center'
                        }}>
                            <View style={{
                                width: normalize(65),
                                height: normalize(65),
                                borderRadius: normalize(65/2),
                                backgroundColor: "green",
                                flex: 1,
                                alignItems: 'center', 
                                justifyContent: 'center'
                            }}>
                                <FontAwesome5 name="check" size={normalize(24)} color="black" />
                            </View>
                        </Card>

                        <View style={{
                            flex: 1,
                            justifyContent: "flex-start",
                            alignItems: "center",
                            marginTop: normalize(30)
                        }}>
                            <Text style={{ fontSize: normalize(20), fontWeight: "bold" }}>
                                Complete My Trip
                            </Text>
                            <Text style={{ fontSize: normalize(16), marginTop: normalize(10) }}>
                                Are you sure you want to finish your trip? Complete this action will save your current trip records and stop navigation.
                            </Text>
                        </View>

                        <View style={{
                            position: "absolute",
                            bottom: normalize(20),
                            flexDirection: "row",
                            width: "100%"
                        }}>
                            <Pressable style={[styles.button, { backgroundColor: "lightgrey", position: "absolute", left: normalize(10), bottom: 0 }]} onPress={() => {sShowFinishTrip(false)}}>
                                <Text style={{ fontSize: normalize(16), textAlign: "center", textTransform: 'uppercase' }}>
                                    Cancel
                                </Text>
                            </Pressable>
                            <Pressable style={[
                                styles.button, 
                                { 
                                    position: "absolute", 
                                    right: normalize(10), 
                                    bottom: 0 
                                }
                            ]} 
                            onPress={() => {
                                sShowFinishTrip(false);
                                dispatch(tripnavActions.terminate());
                            }}>
                                <Text style={{ fontSize: normalize(16), textAlign: "center", textTransform: 'uppercase' }}>
                                    Finish
                                </Text>
                            </Pressable>
                        </View>

                    </View>
                </View>
            </Modal>
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