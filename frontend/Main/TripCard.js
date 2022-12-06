import React from "react";
import { Text, View, StyleSheet, Pressable, useWindowDimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { Divider, ProgressBar } from 'react-native-paper';
import { FontAwesome5, MaterialCommunityIcons, Ionicons, Octicons } from '@expo/vector-icons';

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
    const { height, width, scale, fontScale } = useWindowDimensions();

    const trending = "up";

    return (
        <View style={styles.tripCard}>
            <View style={styles.tripCardTitle}>
                <Text style={styles.titleText}>
                    Your Trip
                </Text>
                {/* <Pressable style={styles.button}>
                    <FontAwesome5 name="question-circle" size={normalize(14)} color="black" />
                    <Text style={{ fontSize: normalize(12), textAlign: "center", textTransform: 'uppercase' }}>
                        &nbsp;Not My Trip
                    </Text>
                </Pressable> */}
            </View>
            <React.Fragment>
                <View style={styles.tripCardContent}>
                    <Card  
                        style={{ 
                            width: "100%", 
                            height: normalize(60)
                        }}
                        childrenStyle={{
                            flex: 1,
                            flexDirection: "row",
                            alignItems: 'space-around', 
                            padding: normalize(5),
                            width: "100%"
                        }}
                    >

                        <Card  
                            style={{ 
                                width: normalize(45), 
                                height: normalize(45),
                                backgroundColor: "blue"
                            }}
                            childrenStyle={{
                                flex: 1,
                                flexDirection: "row",
                                alignItems: 'center', 
                                justifyContent: 'center'
                            }}
                        >
                            <FontAwesome5 name="subway" size={normalize(30)} color="black" />
                        </Card>

                        <View style={{
                            flexGrow: 1,
                            alignItems: "space-around",
                        }}>
                            <View style={{
                                paddingHorizontal: normalize(5),
                                flex: 1,
                                flexDirection: "row",
                                alignItems: "space-between",
                                width: "100%"
                            }}>
                                <Text style={{
                                    fontSize: normalize(18),
                                    maxWidth: "90%",
                                    flex: 1
                                }}
                                    numberOfLines={1} 
                                    ellipsizeMode='tail'
                                >
                                    40 St George St
                                </Text>
                            </View>

                            <View style={{
                                paddingHorizontal: normalize(5),
                                flex: 1,
                                flexDirection: "row",
                                alignItems: "space-between",
                                width: "100%"
                            }}>
                                <Text style={{
                                    fontSize: normalize(12),
                                    flex: 1
                                }}
                                >
                                    <MaterialCommunityIcons name="molecule-co2" size={normalize(24)} color="black" style={{flexGrow: 1}}/>
                                    <View style={{
                                        flexDirection: "row",
                                        flex: 1
                                    }}>
                                        {
                                            (trending === "neutral") &&
                                            <MaterialCommunityIcons name="arrow-right" size={normalize(12)} color="black" />
                                        }
                                        {
                                            (trending === "up") &&
                                            <MaterialCommunityIcons name="arrow-top-right" size={normalize(12)} color="black" />
                                        }
                                        {
                                            (trending === "down") &&
                                            <MaterialCommunityIcons name="arrow-bottom-right" size={normalize(12)} color="black" />
                                        }
                                        <Text style={{
                                            textAlign: "center"
                                        }}>
                                            252 g/km
                                        </Text>
                                    </View>

                                    
                                </Text>
                                <Text 
                                    style={{
                                        fontSize: normalize(12),
                                        flex: 1
                                    }}
                                >
                                    <MaterialCommunityIcons name="fire" size={normalize(22)} color="black" style={{flexGrow: 1}} />
                                    <View style={{
                                        flexDirection: "row",
                                        flex: 1
                                    }}>
                                        <Text style={{
                                            textAlign: "center"
                                        }}>
                                            91 cal/h
                                        </Text>
                                    </View>
                                </Text>
                            </View>
                        </View>
                    </Card>
                </View>
                <Pressable style={styles.button}>
                    <Text style={{ fontSize: normalize(22), textAlign: "center", textTransform: 'uppercase' }}>
                        Let's Go!
                    </Text>
                </Pressable>
                <View style={{
                    flexGrow: 1,
                    paddingVertical: normalize(5)
                }}>
                    <Text style={{
                        paddingVertical: normalize(5)
                    }}>
                        Other Options
                    </Text>
                    <Divider style={{ width: "100%" }} />
                    <Pressable style={{ 
                        paddingVertical: normalize(10)
                    }}>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: "100%",
                            paddingBottom: normalize(5)
                        }}>
                            <Text style={{ fontSize: normalize(14), textTransform: 'uppercase' }}>
                                CAR
                            </Text>
                            <Text style={{ fontSize: normalize(14), textTransform: 'uppercase' }}>
                                5 mins
                            </Text>
                        </View>
                        <ProgressBar progress={0.5} />
                    </Pressable>
                    
                    <Divider style={{ width: "100%" }} />
                    <Pressable style={{ 
                        paddingVertical: normalize(10)
                    }}>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: "100%",
                            paddingBottom: normalize(5)
                        }}>
                            <Text style={{ fontSize: normalize(14), textTransform: 'uppercase' }}>
                                BUS
                            </Text>
                            <Text style={{ fontSize: normalize(14), textTransform: 'uppercase' }}>
                                10 mins
                            </Text>
                        </View>
                        <ProgressBar progress={0.8} />
                    </Pressable>

                                    
                    <Divider style={{ width: "100%" }} />
                    <Pressable style={{ 
                        paddingVertical: normalize(10)
                    }}>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: "100%",
                            paddingBottom: normalize(5)
                        }}>
                            <Text style={{ fontSize: normalize(14), textTransform: 'uppercase' }}>
                                Walking
                            </Text>
                            <Text style={{ fontSize: normalize(14), textTransform: 'uppercase' }}>
                                15 mins
                            </Text>
                        </View>
                        <ProgressBar progress={0.9} />
                    </Pressable>
                    <Divider style={{ width: "100%" }} />
                    <Pressable style={{ 
                        paddingVertical: normalize(10)
                    }}>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: "100%",
                            paddingBottom: normalize(5)
                        }}>
                            <Text style={{ fontSize: normalize(14), textTransform: 'uppercase' }}>
                                Bicycling
                            </Text>
                            <Text style={{ fontSize: normalize(14), textTransform: 'uppercase' }}>
                                8 mins
                            </Text>
                        </View>
                        <ProgressBar progress={0.6} />
                    </Pressable>
                </View>
            </React.Fragment>

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
