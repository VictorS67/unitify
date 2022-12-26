import React, { useRef, useEffect, useImperativeHandle, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { Ionicons, FontAwesome5, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import ProgressBar from "../UI/ProgressBar";
import Card from "../UI/Card";
import { normalize } from "../Tool/FontSize";
import { getLocation, GOOGLE_MAP_API } from "../Utils/GoogleMap";
import { updateDirection } from "../store/map-actions";
import { mapActions } from "../store/map-slice";
import { mainActions } from "../store/main-slice";
import { getEmissionFromDistance, getCaloriesFromDuration, getEmissionTrendIconByNumber } from "../Utils/TravalInfo";

const renderTripInfo = (currentTravalMode) => {

    if (currentTravalMode === "SUBWAY") {
        return (
            <React.Fragment>
                <FontAwesome5 name="subway" size={normalize(20)} color="black" />
                <Text style={{ fontSize: normalize(16), paddingHorizontal: normalize(10) }}>
                    Taking Subway
                </Text>
            </React.Fragment>
        );
    }

    if (currentTravalMode === "BUS") {
        return (
            <React.Fragment>
                <FontAwesome5 name="bus" size={normalize(20)} color="black" />
                <Text style={{ fontSize: normalize(16), paddingHorizontal: normalize(10) }}>
                    Taking Shuttle Bus
                </Text>
            </React.Fragment>
        );
    }

    if (currentTravalMode === "WALKING") {
        return (
            <React.Fragment>
                <FontAwesome5 name="walking" size={normalize(20)} color="black" />
                <Text style={{ fontSize: normalize(16), paddingHorizontal: normalize(10) }}>
                    Walking
                </Text>
            </React.Fragment>
        );
    }

    if (currentTravalMode === "DRIVING") {
        return(
            <React.Fragment>
                <FontAwesome5 name="car" size={normalize(20)} color="black" />
                <Text style={{ fontSize: normalize(16), paddingHorizontal: normalize(10) }}>
                    Driving A Car
                </Text>
            </React.Fragment>
        );
    }

    if (currentTravalMode === "BICYCLING") {
        return(
            <React.Fragment>
                <FontAwesome5 name="bicycle" size={normalize(20)} color="black" />
                <Text style={{ fontSize: normalize(16), paddingHorizontal: normalize(10) }}>
                    Bicycling
                </Text>
            </React.Fragment>
        );
    }

    return;
}

const MapNav = (props) => {

    const dispatch = useDispatch();
    const map = useSelector((state) => state.map);
    const main = useSelector((state) => state.main);
    const tripnav = useSelector((state) => state.tripnav);

    const [progressChildren, sProgressChildren] = useState([]);
    const [totalDuration, sTotalDuration] = useState(map.destination.duration.value);
    const [emission, sEmission] = useState(0);
    const [calories, sCalories] = useState(0);
    const [startTime, sStartTime] = useState("00:00");

    useEffect(() => {
        const colors = {
            "DRIVING": "#f07167",
            "TRANSIT": "#00afb9",
            "WALKING":  "#ef8354",
            "BICYCLING": "#60d394"
        }

        const progressChildrenTemp = [];
        let actualCalories = 0;
        let actualEmission = 0;
        let actualDuration = 0;
        let durationLength = Object.keys(tripnav.travalDurations).length;
        let durations = [];
    
        for (const [travalMode, value] of Object.entries(tripnav.travalDurations)) {
            progressChildrenTemp.push({
                progressColor: colors[travalMode],
                steps: Number(value.duration)
            });
            durations.push(Number(value.duration));
    
            actualDuration += Number(value.duration);
            actualEmission += getEmissionFromDistance(Number(value.distance) * 1000, travalMode);
            actualCalories += getCaloriesFromDuration(Number(value.duration), travalMode);
        }

        let finalDuration = totalDuration > actualDuration? totalDuration : actualDuration;
        sTotalDuration(finalDuration);
        sEmission(actualEmission);
        sCalories(actualCalories);

        if (durationLength === 1) {
            progressChildrenTemp[durationLength - 1].steps = finalDuration;
        } else if (durationLength > 1) {
            progressChildrenTemp[durationLength - 1].steps += finalDuration - durations.reduce((a, b) => a + b, 0);
        }

        sProgressChildren(progressChildrenTemp);

        const [hour, minute, second] = (new Date(tripnav.startTimestamp)).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false}).split(':')
        sStartTime(`${hour}:${minute}`);

    }, [tripnav.travalDurations, dispatch]);

    const goToCurrentPosition = () => {
        if (map.centerLocation === false) {
            dispatch(mapActions.toggleCenterLocation());
        }
    }

    return (
        <React.Fragment>
            <View style={{
                ...StyleSheet.absoluteFillObject,
                width: "100%",
                alignItems: "flex-end",
                justifyContent: "space-between"
            }}>
                <View style={{
                    flexDirection: "row",
                    width: "100%",
                    top: normalize(-35),
                    justifyContent: "space-between"
                }}>
                    <Card style={{
                        position: "absolute",
                        left: normalize(5),
                        top: normalize(15),
                        width: normalize(140),
                        height: normalize(30),
                        borderRadius: normalize(10),
                        zIndex: 3, // works on ios
                        elevation: 3, // works on android
                    }} childrenStyle={{
                        flex: 1,
                        alignItems: 'center', 
                        justifyContent: 'center'
                    }}>
                        <TouchableOpacity 
                            style={{
                                flex: 1,
                                backgroundColor: "transparent",
                                borderRadius: normalize(5),
                                alignItems: "center",
                                justifyContent: "center",
                                marginHorizontal: normalize(3)
                            }}
                        > 
                            <Text style={{ fontSize: normalize(14) }}>
                                Change Transit Type
                            </Text>
                        </TouchableOpacity>
                    </Card>

                    <Card style={{
                        position: "absolute",
                        right: normalize(5),
                        top: normalize(5),
                        width: normalize(50),
                        height: normalize(50),
                        borderRadius: normalize(50/2),
                        zIndex: 3, // works on ios
                        elevation: 3, // works on android
                    }} childrenStyle={{
                        flex: 1,
                        alignItems: 'center', 
                        justifyContent: 'center',
                    }}>
                        <TouchableOpacity 
                            style={{
                                flex: 1,
                                backgroundColor: "transparent",
                                borderRadius: normalize(5),
                                alignItems: "center",
                                justifyContent: "center",
                                marginHorizontal: normalize(3),
                                width: normalize(50),
                                height: normalize(50),
                            }}
                            onPress={goToCurrentPosition}
                        > 
                            <Ionicons name="locate" size={normalize(24)} color="black" />
                        </TouchableOpacity>
                    </Card>
                </View>
            </View>

            <View style={[{
                width: "100%",
                flex: 1,
                paddingHorizontal: normalize(10),
                paddingTop: normalize(20)
            }, props.style]}>

                <View style={{
                    flexDirection: "row", 
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    paddingBottom: normalize(10)
                }}>
                    <View style={{ flexDirection: "row" }}>
                        {renderTripInfo(tripnav.currTravalMode)}
                    </View>
                </View>

                <ProgressBar 
                    step={Number(tripnav.duration.toFixed(0))} 
                    steps={totalDuration} 
                    style={
                        {
                            progressBackColor: "transparent",
                            height: 10,
                            borderRadius: 3
                        }
                    }
                    progressChildren={progressChildren}
                />

                <View style={{
                    flexDirection: "row", 
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%"
                }}>
                    <Text>
                        Start at {startTime}
                    </Text>
                    <Text>
                        <MaterialCommunityIcons name="molecule-co2" size={normalize(24)} color="black" style={{flexGrow: 1}}/>
                        <View style={{flexDirection: "row", flex: 1}}>
                            {getEmissionTrendIconByNumber(emission)}
                            <Text style={{
                                textAlign: "center"
                            }}>
                                {Number(Math.abs(emission).toFixed(1))} g/km
                            </Text>
                        </View>
                    </Text>
                    <Text>
                        <MaterialCommunityIcons name="fire" size={normalize(22)} color="black" style={{flexGrow: 1}} />
                        <View style={{flexDirection: "row", flex: 1}}>
                            <Text style={{
                                textAlign: "center"
                            }}>
                                { calories >= 1000? `${Number((calories / 1000).toFixed(1))} kcal` : `${calories} cal`}
                            </Text>
                        </View>
                    </Text>
                </View>
            </View>
        </React.Fragment>

    );
}

const styles = StyleSheet.create({

});

export default MapNav;