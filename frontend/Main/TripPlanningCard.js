import React from "react";
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { Divider, ProgressBar } from 'react-native-paper';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

import Card from "../UI/Card";
import { normalize } from "../Tool/FontSize";

const TripPlanningCard = (props) => {

    return (
        <React.Fragment>
            <View style={styles.tripCardContent}>
                <Card  
                    style={styles.topChoiceTransCard}
                    childrenStyle={styles.topChoiceTransCardContent}
                >

                    <Card  
                        style={styles.topChoiceTransIconCard}
                        childrenStyle={styles.topChoiceTransIconCardContent}
                    >
                        <FontAwesome5 name="subway" size={normalize(30)} color="black" />
                    </Card>

                    <View style={styles.topChoiceTransInfo}>
                        <View style={styles.topChoiceTransInfoRow}>
                            <Text 
                                style={styles.topChoiceTransTitle}
                                numberOfLines={1} 
                                ellipsizeMode='tail'
                            >
                                40 St George St
                            </Text>
                        </View>

                        <View style={styles.topChoiceTransInfoRow}>
                            <Text style={styles.topChoiceTransTag}>
                                <MaterialCommunityIcons name="molecule-co2" size={normalize(24)} color="black" style={{flexGrow: 1}}/>
                                <View style={styles.topChoiceTransTagText}>
                                    {
                                        (props.trending === "neutral") &&
                                        <MaterialCommunityIcons name="arrow-right" size={normalize(12)} color="black" />
                                    }
                                    {
                                        (props.trending === "up") &&
                                        <MaterialCommunityIcons name="arrow-top-right" size={normalize(12)} color="black" />
                                    }
                                    {
                                        (props.trending === "down") &&
                                        <MaterialCommunityIcons name="arrow-bottom-right" size={normalize(12)} color="black" />
                                    }
                                    <Text style={{
                                        textAlign: "center"
                                    }}>
                                        252 g/km
                                    </Text>
                                </View>
                            </Text>
                            <Text style={styles.topChoiceTransTag}>
                                <MaterialCommunityIcons name="fire" size={normalize(22)} color="black" style={{flexGrow: 1}} />
                                <View style={styles.topChoiceTransTagText}>
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
                <Text style={styles.buttonTextLarge}>
                    Let's Go!
                </Text>
            </Pressable>
            <View style={styles.optionsChoice}>
                <Text style={styles.optionsChoiceTitle}>
                    Other Options
                </Text>
                <Divider style={{ width: "100%" }} />
                <Pressable style={styles.optionsChoiceButton}>
                    <View style={styles.optionsChoiceButtonText}>
                        <Text style={styles.optionsChoiceText}>
                            CAR
                        </Text>
                        <Text style={styles.optionsChoiceText}>
                            5 mins
                        </Text>
                    </View>
                    <ProgressBar progress={0.5} />
                </Pressable>
                
                <Divider style={{ width: "100%" }} />
                <Pressable style={styles.optionsChoiceButton}>
                    <View style={styles.optionsChoiceButtonText}>
                        <Text style={styles.optionsChoiceText}>
                            BUS
                        </Text>
                        <Text style={styles.optionsChoiceText}>
                            10 mins
                        </Text>
                    </View>
                    <ProgressBar progress={0.8} />
                </Pressable>
                                
                <Divider style={{ width: "100%" }} />
                <Pressable style={styles.optionsChoiceButton}>
                    <View style={styles.optionsChoiceButtonText}>
                        <Text style={styles.optionsChoiceText}>
                            Walking
                        </Text>
                        <Text style={styles.optionsChoiceText}>
                            15 mins
                        </Text>
                    </View>
                    <ProgressBar progress={0.9} />
                </Pressable>

                <Divider style={{ width: "100%" }} />
                <Pressable style={styles.optionsChoiceButton}>
                    <View style={styles.optionsChoiceButtonText}>
                        <Text style={styles.optionsChoiceText}>
                            Bicycling
                        </Text>
                        <Text style={styles.optionsChoiceText}>
                            8 mins
                        </Text>
                    </View>
                    <ProgressBar progress={0.6} />
                </Pressable>
            </View>
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    tripCardContent: {
        flexDirection: "row", 
        justifyContent: "space-around",
        alignItems: "center",
        paddingVertical: normalize(5)
    },
    topChoiceTransCard: { 
        width: "100%", 
        height: normalize(60)
    },
    topChoiceTransCardContent: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'space-around', 
        padding: normalize(5),
        width: "100%"
    },
    topChoiceTransIconCard: { 
        width: normalize(45), 
        height: normalize(45),
        backgroundColor: "blue"
    },
    topChoiceTransIconCardContent: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'center', 
        justifyContent: 'center'
    },
    topChoiceTransInfo: {
        flexGrow: 1,
        alignItems: "space-around",
    },
    topChoiceTransInfoRow: {
        paddingHorizontal: normalize(5),
        flex: 1,
        flexDirection: "row",
        alignItems: "space-between",
        width: "100%"
    },
    topChoiceTransTitle: {
        fontSize: normalize(18),
        maxWidth: "90%",
        flex: 1
    },
    topChoiceTransTag: {
        fontSize: normalize(12),
        flex: 1
    },
    topChoiceTransTagText: {
        flexDirection: "row",
        flex: 1
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
    buttonTextLarge: { 
        fontSize: normalize(22), 
        textAlign: "center", 
        textTransform: 'uppercase' 
    },
    optionsChoice: {
        flexGrow: 1,
        paddingVertical: normalize(5)
    },
    optionsChoiceTitle: {
        paddingVertical: normalize(5),
        fontSize: normalize(14)
    },
    optionsChoiceButton: {
        paddingVertical: normalize(10)
    },
    optionsChoiceButtonText: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingBottom: normalize(5)
    },
    optionsChoiceText: { 
        fontSize: normalize(14), 
        textTransform: 'uppercase' 
    }
});

export default TripPlanningCard;