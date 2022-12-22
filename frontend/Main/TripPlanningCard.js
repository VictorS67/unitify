import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { Divider, ProgressBar } from 'react-native-paper';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

import Card from "../UI/Card";
import SkeletonView from "../UI/Skeleton";
import { normalize } from "../Tool/FontSize";
import { mainActions } from "../store/main-slice";
import { mapActions } from "../store/map-slice";

const getEmissionFromDistance = (distance, travalMode) => {
    if (distance === null) return 0;

    let km = distance / 1000;
    if (travalMode === "DRIVING") {
        km = 250.93 * km;
    } else if (travalMode === "WALKING") {
        km = -250.93 * km;
    } else if (travalMode === "SUBWAY") {
        km = -(250.93 - 41) * km;
    } else if (travalMode === "BUS") {
        km = -(250.93 - 62) * km;
    } else if (travalMode === "BICYCLING") {
        km = -250.93 * km;
    }

    return km;
}

const getCaloriesFromDuration = (duration, travalMode) => {
    if (duration === null) return 0;

    let cal = duration / 3600;
    if (travalMode === "DRIVING") {
        cal = 150 * duration;
    } else if (travalMode === "WALKING") {
        cal = 267 * duration;
    } else if (travalMode === "SUBWAY") {
        cal = 200 * duration;
    } else if (travalMode === "BUS") {
        cal = 200 * duration;
    } else if (travalMode === "BICYCLING") {
        cal = 245 * duration;
    }

    return cal;
}

const getEmissionTrendIcon = (totalEmission, travalMode) => {
    if (travalMode === null) return;

    if (totalEmission === 0) {
        return <MaterialCommunityIcons name="arrow-right" size={normalize(12)} color="black" />;
    }

    if (travalMode === "DRIVING") {
        return <MaterialCommunityIcons name="arrow-top-right" size={normalize(12)} color="black" />;
    } else if (travalMode === "WALKING") {
        return <MaterialCommunityIcons name="arrow-bottom-right" size={normalize(12)} color="black" />;
    } else if (travalMode === "SUBWAY") {
        return <MaterialCommunityIcons name="arrow-bottom-right" size={normalize(12)} color="black" />;
    } else if (travalMode === "BUS") {
        return <MaterialCommunityIcons name="arrow-bottom-right" size={normalize(12)} color="black" />;
    } else if (travalMode === "BICYCLING") {
        return <MaterialCommunityIcons name="arrow-bottom-right" size={normalize(12)} color="black" />;
    }

    return;
}

const TripPlanningCard = (props) => {

    const dispatch = useDispatch();
    const main = useSelector((state) => state.main);
    const map = useSelector((state) => state.map);
    const [otherPlans, sOtherPlans] = useState([]);

    const onNavPress = () => {
        dispatch(mainActions.moveToNextNavStatus());
    }

    const getTotalCalories = (markers) => {
        if (markers.length === 0) return `${0} cal`;

        let cal = 0;
        markers.forEach(marker => {
            cal += getCaloriesFromDuration(marker.duration.value, marker.mode)
        });

        if (cal >= 1000) {
            return `${Math.round(cal / 1000)} kcal`;
        }
        return `${Math.round(cal)} cal`;
    }

    const getTotalEmission = (markers) => {
        if (markers.length === 0) return `${0} g/km`;

        let km = 0;
        markers.forEach(marker => {
            km += getEmissionFromDistance(marker.distance.value, marker.mode)
        });

        return `${Math.round(Math.abs(km))} g/km`;
    }

    const computeEmissionTrend = (markers, travalMode) => {
        if (markers.length === 0) return getEmissionTrendIcon(0, travalMode);

        let km = 0;
        markers.forEach(marker => {
            km += getEmissionFromDistance(marker.distance.value, marker.mode)
        });

        return getEmissionTrendIcon(Math.round(Math.abs(km)), travalMode);
    }

    useEffect(() => {
        if (map.allDirection === null || map.travalMode === null || map.updateInfo === true) return;

        let largestDuration = 0;

        ["DRIVING", "WALKING", "SUBWAY", "BUS", "BICYCLING"].forEach(mode => {
            if (map.allDirection[mode].destination.duration.value > largestDuration) {
                largestDuration = map.allDirection[mode].destination.duration.value;
            }
        });

        Object.entries(map.allDirection).forEach(([key, value]) => {
            if (value.destination.duration.value > largestDuration) {
                largestDuration = value.destination.duration.value;
            }
        });

        // console.log(map.allDirection)
        // console.log(map.travalMode)

        let count = 1;
        let otherPlansTemp = Object.entries(map.allDirection).map(([key, value]) => {
            count += 1;
            if (key != map.travalMode) {
                const anotherPlan = getOtherPlanDetails(
                    value.destination.duration.text,
                    value.destination.duration.value,
                    largestDuration,
                    key,
                    count
                )
    
                return anotherPlan;
            }
            return;
        });

        // console.log(otherPlansTemp);

        sOtherPlans(otherPlansTemp);

    }, [map.updateInfo, map.travalMode, dispatch]);

    const getOtherPlanDetails = (durationText, duration, largestDuration, travalMode, key) => {
        if (
            durationText === null ||
            travalMode === null || 
            largestDuration === null || 
            duration > largestDuration
        ) return;
    
        // console.log("travalMode: ", travalMode);
        // console.log("durationText: ", durationText);
        // console.log("duration: ", duration);
        // console.log("largestDuration: ", largestDuration);
    
        return (
            <React.Fragment key={key}>
                <Divider style={{ width: "100%" }} />
                <Pressable style={styles.optionsChoiceButton} onPress={() => {onTravalModePress(travalMode)}}>
                    <View style={styles.optionsChoiceButtonText}>
                        <Text style={styles.optionsChoiceText}>
                            {travalMode}
                        </Text>
                        <Text style={styles.optionsChoiceText}>
                            {durationText}
                        </Text>
                    </View>
                    <ProgressBar progress={duration/largestDuration} />
                </Pressable>
            </React.Fragment>
        );
    }

    const onTravalModePress = (travalMode) => {
        if (main.navStatus !== "NAV") {
            dispatch(mapActions.sTravalMode(travalMode))
        }
    }

    return (
        <React.Fragment>
        {
            map.origin &&
            map.destination &&
            map.travalMode &&
            (map.polylines.length >= 1) &&
            (map.markers.length >= 1) &&
            map.allDirection &&
            (map.updateInfo === false) &&
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
                            {
                                map.travalMode === "SUBWAY" &&
                                <FontAwesome5 name="subway" size={normalize(30)} color="black" />
                            }
                            {
                                map.travalMode === "BUS" &&
                                <FontAwesome5 name="bus" size={normalize(30)} color="black" />
                            }
                            {
                                map.travalMode === "DRIVING" &&
                                <FontAwesome5 name="car" size={normalize(30)} color="black" />
                            }
                            {
                                map.travalMode === "WALKING" &&
                                <FontAwesome5 name="walking" size={normalize(30)} color="black" />
                            }
                            {
                                map.travalMode === "BICYCLING" &&
                                <FontAwesome5 name="bicycle" size={normalize(30)} color="black" />
                            }
                        </Card>

                        <View style={styles.topChoiceTransInfo}>
                            <View style={styles.topChoiceTransInfoRow}>
                                <Text 
                                    style={styles.topChoiceTransTitle}
                                    numberOfLines={1} 
                                    ellipsizeMode='tail'
                                >
                                    {map.destination.address_simple}
                                </Text>
                            </View>

                            <View style={styles.topChoiceTransInfoRow}>
                                <Text style={styles.topChoiceTransTag}>
                                    <MaterialCommunityIcons name="molecule-co2" size={normalize(24)} color="black" style={{flexGrow: 1}}/>
                                    <View style={styles.topChoiceTransTagText}>
                                        {computeEmissionTrend(map.markers, map.travalMode)}
                                        <Text style={{
                                            textAlign: "center"
                                        }}>
                                            {getTotalEmission(map.markers)}
                                        </Text>
                                    </View>
                                </Text>
                                <Text style={styles.topChoiceTransTag}>
                                    <MaterialCommunityIcons name="fire" size={normalize(22)} color="black" style={{flexGrow: 1}} />
                                    <View style={styles.topChoiceTransTagText}>
                                        <Text style={{
                                            textAlign: "center"
                                        }}>
                                            {getTotalCalories(map.markers)}
                                        </Text>
                                    </View>
                                </Text>
                            </View>
                        </View>
                    </Card>
                </View>

                <Pressable style={styles.button} onPress={onNavPress}>
                    <Text style={styles.buttonTextLarge}>
                        Let's Go!
                    </Text>
                </Pressable>

                <View style={styles.optionsChoice}>
                    <Text style={styles.optionsChoiceTitle}>
                        Other Options
                    </Text>

                    {
                        otherPlans.map((anotherPlan) => {
                            return anotherPlan;
                        })
                    }

                    {/* <Divider style={{ width: "100%" }} />
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
                    </Pressable> */}
                </View>
            </React.Fragment>
        }
        {
            (!(map.origin &&
            map.destination &&
            map.travalMode &&
            (map.polylines.length >= 1) &&
            (map.markers.length >= 1) &&
            map.allDirection) ||
            (map.updateInfo === true)) &&
            <React.Fragment>
                <View style={styles.tripCardContent}>
                    <Card  
                        style={styles.topChoiceTransCard}
                        childrenStyle={styles.topChoiceTransCardContent}
                    >
                        <SkeletonView style={{ 
                            borderRadius: normalize(6),
                            marginHorizontal: normalize(5),
                            marginVertical: normalize(5)
                        }} type={"SQUARE"} height={45} order={1} />

                        <View style={styles.topChoiceTransInfo}>
                            <SkeletonView style={{ 
                                borderRadius: normalize(6),
                                marginHorizontal: normalize(10),
                                width: "95%"
                            }} type={"RECTANGLE"} height={20} order={2} />
                            <SkeletonView style={{ 
                                borderRadius: normalize(6),
                                marginHorizontal: normalize(10),
                                marginVertical: normalize(5),
                                width: "95%"
                            }} type={"RECTANGLE"} height={20} order={3} />
                        </View>
                    </Card>
                </View>

                <SkeletonView style={{ 
                    borderRadius: normalize(4),
                    width: "100%"
                }} type={"RECTANGLE"} height={35} order={2} />

                <View style={styles.optionsChoice}>
                    <Text style={styles.optionsChoiceTitle}>
                        Other Options
                    </Text>
                    <Divider style={{ width: "100%" }} />
                    <SkeletonView style={{ 
                        borderRadius: normalize(4),
                        width: "100%",
                        marginVertical: normalize(5)
                    }} type={"RECTANGLE"} height={35} order={3} />
                    
                    <Divider style={{ width: "100%" }} />
                    <SkeletonView style={{ 
                        borderRadius: normalize(4),
                        width: "100%",
                        marginVertical: normalize(5)
                    }} type={"RECTANGLE"} height={35} order={3} />
                                    
                    <Divider style={{ width: "100%" }} />
                    <SkeletonView style={{ 
                        borderRadius: normalize(4),
                        width: "100%",
                        marginVertical: normalize(5)
                    }} type={"RECTANGLE"} height={35} order={3} />

                    <Divider style={{ width: "100%" }} />
                    <SkeletonView style={{ 
                        borderRadius: normalize(4),
                        width: "100%",
                        marginVertical: normalize(5)
                    }} type={"RECTANGLE"} height={35} order={3} />
                </View>
            </React.Fragment>
        }
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
        fontSize: normalize(20), 
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