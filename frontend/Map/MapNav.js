import React, { useRef, useEffect, useImperativeHandle, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Modal, Alert, Pressable, useWindowDimensions } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { Ionicons, FontAwesome5, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

import ProgressBar from "../UI/ProgressBar";
import Card from "../UI/Card";
import { normalize } from "../Tool/FontSize";
import { getLocation, GOOGLE_MAP_API, searchNearBy } from "../Utils/GoogleMap";
import { updateDirection } from "../store/map-actions";
import { mapActions } from "../store/map-slice";
import { mainActions } from "../store/main-slice";
import { tripnavActions } from "../store/tripnav-slice";
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

    const { height, width, scale, fontScale } = useWindowDimensions();

    const [progressChildren, sProgressChildren] = useState([]);
    const [totalDuration, sTotalDuration] = useState(map.destination.duration.value);
    const [emission, sEmission] = useState(0);
    const [calories, sCalories] = useState(0);
    const [startTime, sStartTime] = useState("00:00");
    const [showTravalModes, sShowTravalModes] = useState(false);
    const [showFinishReport, sShowFinishReport] = useState(false);
    const [showTerminateReport, sShowTerminateReport] = useState(false);
    const [changeTravalModes, sChangeTravalModes] = useState([]);

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
        let durationLength = tripnav.travalDurations.length;
        let durations = [];
    
        tripnav.travalDurations.forEach(travalDuration => {
            progressChildrenTemp.push({
                progressColor: colors[travalDuration.travalMode],
                steps: Number(travalDuration.duration)
            });

            durations.push(Number(travalDuration.duration));
    
            actualDuration += Number(travalDuration.duration);
            actualEmission += getEmissionFromDistance(Number(travalDuration.distance) * 1000, travalDuration.travalMode);
            actualCalories += getCaloriesFromDuration(Number(travalDuration.duration), travalDuration.travalMode);
        });

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

    }, [tripnav.travalDurations, tripnav.currTravalMode]);

    useEffect(() => {
        if (tripnav.isTerminated === true) {
            sShowFinishReport(true);
        }
    }, [tripnav.isTerminated]);

    useEffect(() => {
        if (tripnav.isColdTerminated === true) {
            sShowTerminateReport(true);
        }
    }, [tripnav.isColdTerminated]);

    const goToCurrentPosition = () => {
        if (map.centerLocation === false) {
            dispatch(mapActions.toggleCenterLocation());
        }
    }

    const searchAvailableTravalModes = async () => {
        try {
            const modes = ["DRIVING", "WALKING", "SUBWAY", "BUS", "BICYCLING"];
    
            let changeTravalModesTemp = [];
            for (let index = 0; index < modes.length; index++) {
                if (modes[index] !== tripnav.currTravalMode) {
                    let testTravalMode = modes[index];
                    console.log("testTravalMode: ", testTravalMode);

                    if (testTravalMode === "BUS" || testTravalMode === "SUBWAY") {
                        const nearBy = await searchNearBy(
                            `${map.position.latitude},${map.position.longitude}`, 
                            testTravalMode
                        );
                        console.log("nearBy: ", nearBy);

                        changeTravalModesTemp.push(renderChangeTravalMode(testTravalMode, nearBy, index));

                    } else {
                        changeTravalModesTemp.push(renderChangeTravalMode(testTravalMode, true, index));
                    }
                } 
            }

            sShowTravalModes(true);
            sChangeTravalModes(changeTravalModesTemp);
        } catch (error) {
            console.log("SearchNearBy: Something is wrong.")
        }
    }

    const changeTravalMode = (travalMode, isAvailable) => {
        if (isAvailable === true) {
            console.log("add travalMode... ", travalMode);
            dispatch(tripnavActions.addTravalMode(travalMode));
        }

        sShowTravalModes(false);
        sChangeTravalModes([]);
    }

    const renderChangeTravalMode = (travalMode, isAvailable, key) => {

        return (
            <Pressable 
                style={{
                    width: normalize(width/3.5),
                    height: normalize(width/3),
                    backgroundColor: 'green',
                    borderColor: 'white',
                    borderWidth: 1,
                    margin: normalize(5),
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: normalize(10),
                    elevation: 2
                }} 
                key={key}
                onPress={() => {changeTravalMode(travalMode, isAvailable)}}
            >
                {
                    travalMode === "SUBWAY" &&
                    <React.Fragment>
                        <FontAwesome5 name="subway" size={normalize(45)} color="black" />
                        <Text style={{ fontSize: normalize(16), marginTop: normalize(5) }}>
                            Subway
                        </Text>
                        {
                            isAvailable === false &&
                            <Text style={{ fontSize: normalize(10), bottom: normalize(15), position: "absolute" }}>
                                Not Available
                            </Text>
                        }
                    </React.Fragment>
                }
                {
                    travalMode === "BUS" &&
                    <React.Fragment>
                        <FontAwesome5 name="bus" size={normalize(45)} color="black" />
                        <Text style={{ fontSize: normalize(16), marginTop: normalize(5) }}>
                            Bus
                        </Text>
                        {
                            isAvailable === false &&
                            <Text style={{ fontSize: normalize(10), bottom: normalize(15), position: "absolute" }}>
                                Not Available
                            </Text>
                        }
                    </React.Fragment>
                }
                {
                    travalMode === "DRIVING" &&
                    <React.Fragment>
                        <FontAwesome5 name="car" size={normalize(45)} color="black" />
                        <Text style={{ fontSize: normalize(16), marginTop: normalize(5) }}>
                            Driving
                        </Text>
                        {
                            isAvailable === false &&
                            <Text style={{ fontSize: normalize(10), bottom: normalize(15), position: "absolute" }}>
                                Not Available
                            </Text>
                        }
                    </React.Fragment>
                }
                {
                    travalMode === "WALKING" &&
                    <React.Fragment>
                        <FontAwesome5 name="walking" size={normalize(45)} color="black" />
                        <Text style={{ fontSize: normalize(16), marginTop: normalize(5) }}>
                            Walking
                        </Text>
                        {
                            isAvailable === false &&
                            <Text style={{ fontSize: normalize(10), bottom: normalize(15), position: "absolute" }}>
                                Not Available
                            </Text>
                        }
                    </React.Fragment>
                }
                {
                    travalMode === "BICYCLING" &&
                    <React.Fragment>
                        <FontAwesome5 name="bicycle" size={normalize(45)} color="black" />
                        <Text style={{ fontSize: normalize(16), marginTop: normalize(5) }}>
                            Bicycling
                        </Text>
                        {
                            isAvailable === false &&
                            <Text style={{ fontSize: normalize(10), bottom: normalize(15), position: "absolute" }}>
                                Not Available
                            </Text>
                        }
                    </React.Fragment>
                }
            </Pressable>
        );
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
                            onPress={searchAvailableTravalModes}
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

            <Modal
                animationType="fade"
                transparent={true}
                visible={showTravalModes}
                onRequestClose={() => {
                    // Alert.alert("Modal has been closed.");
                    sShowTravalModes(!showTravalModes);
                    sChangeTravalModes([]);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={{
                        flex: 0.45,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
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
                        {
                            changeTravalModes.map((changeTravalMode) => {
                                return changeTravalMode;
                            })
                        }
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="fade"
                transparent={true}
                visible={showFinishReport}
                onRequestClose={() => {
                    // Alert.alert("Modal has been closed.");
                    sShowFinishReport(!showFinishReport);
                    dispatch(mainActions.moveToNextNavStatus());
                    dispatch(mapActions.resetMap());
                }}
            >
                <View style={styles.centeredView}>
                    <View style={{
                        flex: 0.25,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
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
                                <FontAwesome5 name="crown" size={normalize(24)} color="black" />
                            </View>
                        </Card>

                        <View style={{
                            flex: 1,
                            justifyContent: "flex-start",
                            alignItems: "center",
                            marginTop: normalize(50)
                        }}>
                            <Text style={{ fontSize: normalize(20), fontWeight: "bold" }}>
                                Congratulations
                            </Text>
                            <Text style={{ fontSize: normalize(16), marginTop: normalize(10) }}>
                                Your trip has been successfully saved!
                            </Text>
                        </View>

                        <View style={{
                            position: "absolute",
                            bottom: normalize(20),
                            flexDirection: "row",
                            width: "100%"
                        }}>
                            <Pressable style={[
                                styles.button, 
                                { 
                                    position: "absolute", 
                                    right: normalize(10), 
                                    bottom: 0 
                                }
                            ]} 
                            onPress={() => {
                                sShowFinishReport(false);
                                dispatch(mainActions.moveToNextNavStatus());
                                dispatch(mapActions.resetMap());
                            }}>
                                <Text style={{ fontSize: normalize(16), textAlign: "center", textTransform: 'uppercase' }}>
                                    Got it
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="fade"
                transparent={true}
                visible={showTerminateReport}
                onRequestClose={() => {
                    // Alert.alert("Modal has been closed.");
                    sShowTerminateReport(!showTerminateReport);
                    dispatch(mainActions.moveToNextNavStatus());
                    dispatch(mapActions.resetMap());
                }}
            >
                <View style={styles.centeredView}>
                    <View style={{
                        flex: 0.25,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
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
                                backgroundColor: "dodgerblue",
                                flex: 1,
                                alignItems: 'center', 
                                justifyContent: 'center'
                            }}>
                                <Ionicons name="information" size={normalize(24)} color="black" />
                            </View>
                        </Card>

                        <View style={{
                            flex: 1,
                            justifyContent: "flex-start",
                            alignItems: "center",
                            marginTop: normalize(50)
                        }}>
                            <Text style={{ fontSize: normalize(20), fontWeight: "bold" }}>
                                Information
                            </Text>
                            <Text style={{ fontSize: normalize(16), marginTop: normalize(10) }}>
                                {tripnav.coldTerminatedInfo}Your trip has been terminated!
                            </Text>
                        </View>

                        <View style={{
                            position: "absolute",
                            bottom: normalize(20),
                            flexDirection: "row",
                            width: "100%"
                        }}>
                            <Pressable style={[
                                styles.button, 
                                { 
                                    position: "absolute", 
                                    right: normalize(10), 
                                    bottom: 0 
                                }
                            ]} 
                            onPress={() => {
                                sShowTerminateReport(false);
                                dispatch(mainActions.moveToNextNavStatus());
                                dispatch(mapActions.resetMap());
                            }}>
                                <Text style={{ fontSize: normalize(16), textAlign: "center", textTransform: 'uppercase' }}>
                                    Got it
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </React.Fragment>

    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: normalize(20),
        padding: normalize(30),
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: normalize(400)
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
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

export default MapNav;