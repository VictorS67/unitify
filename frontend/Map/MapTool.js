import React, { useState, useRef, useEffect, useImperativeHandle } from "react";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { Octicons, Ionicons, FontAwesome5, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import Card from "../UI/Card";
import { normalize } from "../Tool/FontSize";
import { getLocation, GOOGLE_MAP_API } from "../Utils/GoogleMap";
import { updateDirection, updateAllDirection } from "../store/map-actions";
import { mapActions } from "../store/map-slice";
import { mainActions } from "../store/main-slice";


const MapTool = (props) => {

    const dispatch = useDispatch();
    const map = useSelector((state) => state.map);
    const main = useSelector((state) => state.main);

    const originAddRef = useRef(null);
    const destinationAddRef = useRef(null);

    useEffect(() => {
        // console.log(travalMode, '- Has changed')
        if (map.destination && map.destination.address_simple) {
            destinationAddRef.current?.setAddressText(map.destination.address_simple);
        }
    }, [map.destination, dispatch]) // <-- here put the parameter to listen

    useEffect(() => {
        // console.log(travalMode, '- Has changed')
        if (map.origin && map.origin.address_simple) {
            originAddRef.current?.setAddressText(map.origin.address_simple);
        }
    }, [map.origin, dispatch]) // <-- here put the parameter to listen

    const onSwitchPress = () => {
        if (
            destinationAddRef.current && 
            destinationAddRef.current.getAddressText() !== "" &&
            originAddRef.current &&
            originAddRef.current.getAddressText() !== ""
        ) {
            let origin_info = map.origin;
            let destination_info = map.destination;
            
            dispatch(mapActions.sOrigin({
                "latitude": destination_info.latitude,
                "longitude": destination_info.longitude,
                "address": destination_info.address,
                "address_simple": destination_info.address_simple
            }));

            dispatch(mapActions.sDestination({
                "latitude": origin_info.latitude,
                "longitude": origin_info.longitude,
                "distance": destination_info.distance,
                "duration": destination_info.duration,
                "address": origin_info.address,
                "address_simple": origin_info.address_simple
            }));

            if (main.navStatus !== "NAV") {
                dispatch(updateAllDirection(destination_info, origin_info, map.travalMode));
            }
        }
    }

    const onSearchPress = async () => {
        if (destinationAddRef.current && destinationAddRef.current.getAddressText() !== "") {
            let text = destinationAddRef.current.getAddressText();

            if (map.destination && map.destination.address_simple && text === map.destination.address_simple) {
                text = map.destination.address;
            }

            try {
                const destinationLocInfo = await getLocation(text);

                if (originAddRef.current && originAddRef.current.getAddressText() !== "") {
                    let text = originAddRef.current.getAddressText();

                    if (map.origin && map.origin.address_simple && text === map.origin.address_simple) {
                        text = map.origin.address;
                    }

                    const originLocInfo = await getLocation(text);

                    dispatch(updateAllDirection(originLocInfo, destinationLocInfo, map.travalMode));
                } else {
                    dispatch(updateAllDirection(map.position, destinationLocInfo, map.travalMode));
                }

                if (main.navStatus === "INIT") {
                    dispatch(mainActions.moveToNextNavStatus());
                }

            } catch (err) {
                console.log("getLocation: Something went wrong");
            }
        }
    }

    const onTravalModePress = (travalMode) => {
        if (main.navStatus !== "NAV") {
            dispatch(mapActions.sTravalMode(travalMode))
        }
    }

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
                    justifyContent: "flex-end"
                }}>
                    <Card style={{
                        top: normalize(10),
                        width: normalize(50),
                        height: normalize(50),
                        borderRadius: normalize(50/2),
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
                            onPress={
                                () => goToCurrentPosition()
                            }
                        > 
                            <Ionicons name="locate" size={normalize(24)} color="black" />
                        </TouchableOpacity>
                    </Card>
                </View>
            </View>
            <View style={[{
                width: "100%",
                flex: 1,
                paddingHorizontal: normalize(3),
                paddingTop: normalize(5)
            }, props.style]}>
                <View style={{
                    flexDirection: "row", 
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    paddingBottom: normalize(10),
                    paddingHorizontal: normalize(10)
                }}>
                    <View style={{ flexDirection: "row" }}>
                        <MaterialCommunityIcons name="transit-connection-variant" size={normalize(20)} color="black" />
                        <Text style={{ fontSize: normalize(16), paddingHorizontal: normalize(10) }}>
                            Planning Your Trip
                        </Text>
                    </View>
                </View>

                <ScrollView style={{
                    flexDirection: "row",
                    marginBottom: normalize(5),
                    backgroundColor: "transparent",
                    flexWrap: 'nowrap',
                    maxHeight: normalize(25),
                    paddingHorizontal: normalize(3)
                }} horizontal={true} contentContainerStyle={{ flexGrow: 1, height: '100%' }} showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity 
                        style={[styles.buttonSquare, (map.travalMode === "DRIVING") && styles.buttonActive]} 
                        onPress={
                            () => onTravalModePress("DRIVING")
                        }
                    > 
                        <FontAwesome5 name="car" size={normalize(14)} color="black" />
                        <Text style={styles.buttonText}>
                            &nbsp;Car
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[styles.buttonSquare, (map.travalMode === "WALKING") && styles.buttonActive]} 
                        onPress={
                            () => onTravalModePress("WALKING")
                        }
                    > 
                        <FontAwesome5 name="walking" size={normalize(14)} color="black" />
                        <Text style={styles.buttonText}>
                            &nbsp;Walking
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[styles.buttonSquare, (map.travalMode === "SUBWAY") && styles.buttonActive]} 
                        onPress={
                            () => onTravalModePress("SUBWAY")
                        }
                    > 
                        <FontAwesome5 name="subway" size={normalize(14)} color="black" />
                        <Text style={styles.buttonText}>
                            &nbsp;Subway
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.buttonSquare, (map.travalMode === "BUS") && styles.buttonActive]} 
                        onPress={
                            () => onTravalModePress("BUS")
                        }
                    > 
                        <FontAwesome5 name="bus" size={normalize(14)} color="black" />
                        <Text style={styles.buttonText}>
                            &nbsp;Shuttle Bus
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.buttonSquare, (map.travalMode === "BICYCLING") && styles.buttonActive]} 
                        onPress={
                            () => onTravalModePress("BICYCLING")
                        }
                    > 
                        <FontAwesome5 name="bicycle" size={normalize(12)} color="black" />
                        <Text style={styles.buttonText}>
                            &nbsp;Bicycling
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
                <View style={styles.inputContainer}>
                    <GooglePlacesAutocomplete
                        ref={originAddRef}
                        placeholder="Current Location"
                        query={{key: GOOGLE_MAP_API}}
                        enablePoweredByContainer={false}
                        fetchDetails={true}
                        onFail={error => console.log(error)}
                        onNotFound={() => console.log('no results')}
                        textInputHide={(originAddRef.current && originAddRef.current.getAddressText() !== "")? false :  true}
                        renderLeftButton={() => {
                            return (
                                <View style={{ flexDirection: "row", flex: 0.3}}>
                                    <View 
                                        style={[styles.buttonInputClear, {backgroundColor: "transparent"}]} 
                                    > 
                                        <FontAwesome name="home" size={normalize(22)} color="black" />
                                    </View>
                                </View>
                            );
                        }}

                        renderRightButton={() => {
                            return (
                                <View style={{ flexDirection: "row", flex: (props.keyboardStatus && props.keyboardStatus === true)? 0.7: 0.5}}>
                                    {
                                        (props.keyboardStatus) &&
                                        (props.keyboardStatus === true) &&
                                        <TouchableOpacity 
                                            style={
                                                {
                                                    flex: 0.7,
                                                    backgroundColor: "transparent",
                                                    borderRadius: normalize(5),
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    marginHorizontal: normalize(3)
                                                }
                                            } 
                                            onPress={
                                                () => { 
                                                    originAddRef.current.clear();
                                                    originAddRef.current.blur();
                                                }
                                            }
                                        > 
                                            <Ionicons name="close" size={normalize(24)} color="black" />
                                        </TouchableOpacity>
                                    }
                                    <TouchableOpacity 
                                        style={[styles.buttonInputClear, {backgroundColor: "transparent"}]} 
                                        onPress={onSwitchPress}
                                    > 
                                        <Octicons name="arrow-switch" size={normalize(20)} color="black" />
                                    </TouchableOpacity>
                                </View>
                            );
                        }}

                        renderRow={(rowData) => {
                            const title = rowData.structured_formatting.main_text;
                            const address = rowData.structured_formatting.secondary_text;
                            return (
                                <View>
                                <Text style={{ fontSize: 13 }}>{title}</Text>
                                <Text style={{ fontSize: 10 }}>{address}</Text>
                            </View>
                            );
                        }}
                        styles={googlePlaceStyles}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <GooglePlacesAutocomplete
                        ref={destinationAddRef}
                        placeholder="Where To?"
                        query={{key: GOOGLE_MAP_API}}
                        enablePoweredByContainer={false}
                        fetchDetails={true}
                        onFail={error => console.log(error)}
                        onNotFound={() => console.log('no results')}
                        renderLeftButton={() => {
                            return (
                                <View style={{ flexDirection: "row", flex: 0.3}}>
                                    <View 
                                        style={[styles.buttonInputClear, {backgroundColor: "transparent"}]} 
                                    > 
                                        <Ionicons name="ios-location-sharp" size={normalize(22)} color="black" />
                                    </View>
                                </View>
                            );
                        }}

                        renderRightButton={() => {
                            return (
                                <View style={{ flexDirection: "row", flex: (props.keyboardStatus && props.keyboardStatus === true)? 0.7: 0.5}}>
                                    {
                                        (props.keyboardStatus) &&
                                        (props.keyboardStatus === true) &&
                                        <TouchableOpacity 
                                            style={
                                                {
                                                    flex: 0.7,
                                                    backgroundColor: "transparent",
                                                    borderRadius: normalize(5),
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    marginHorizontal: normalize(3)
                                                }
                                            } 
                                            onPress={
                                                () => { 
                                                    destinationAddRef.current.clear();
                                                    destinationAddRef.current.blur();
                                                }
                                            }
                                        > 
                                            <Ionicons name="close" size={normalize(24)} color="black" />
                                        </TouchableOpacity>
                                    }
                                    <TouchableOpacity 
                                        style={[styles.buttonInputClear, {backgroundColor: "transparent"}]} 
                                        onPress={onSearchPress}
                                    > 
                                        <FontAwesome5 name="search" size={normalize(18)} color="black" />
                                    </TouchableOpacity>
                                </View>
                            );
                        }}

                        renderRow={(rowData) => {
                            const title = rowData.structured_formatting.main_text;
                            const address = rowData.structured_formatting.secondary_text;
                            return (
                                <View>
                                <Text style={{ fontSize: 13 }}>{title}</Text>
                                <Text style={{ fontSize: 10 }}>{address}</Text>
                            </View>
                            );
                        }}
                        styles={googlePlaceStyles}
                    />
                </View>
            </View>
        </React.Fragment>

    );
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        backgroundColor: "transparent",
        flexWrap: 'wrap'
    },
    buttonContainer: {
        flexDirection: "row",
        marginVertical: normalize(5),
        backgroundColor: "transparent",
        flexWrap: 'nowrap',
        width: "75%"
    },
    button: {
        flex: 4,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "dodgerblue",
        paddingVertical: normalize(5),
        paddingHorizontal: normalize(10),
        borderRadius: normalize(20),
        marginHorizontal: normalize(3)
    },
    buttonSquare: {
        // flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "dodgerblue",
        // height: normalize(20),
        borderRadius: normalize(5),
        marginHorizontal: normalize(3),
        paddingVertical: normalize(5),
        paddingHorizontal: normalize(8)
    },
    buttonInputClear: {
        flex: 1,
        backgroundColor: "dodgerblue",
        borderRadius: normalize(5),
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: normalize(3)
    },
    buttonActive: {
        backgroundColor: "#ff8d1e"
    },
    buttonText: {
        fontSize: normalize(13)
    }
});

const googlePlaceStyles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: normalize(3),
        backgroundColor: "transparent"
    },
    textInputContainer: {
        flexDirection: 'row',
        marginBottom: normalize(2)
    },
    textInput: {
        backgroundColor: 'transparent',
        height: "100%",
        borderRadius: normalize(5),
        paddingVertical: normalize(5),
        paddingHorizontal: normalize(10),
        fontSize: normalize(15),
        flex: 2,
    },
    poweredContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        borderColor: '#c8c7cc',
        borderTopWidth: 0.5,
    },
    powered: {},
    listView: {
        maxHeight: normalize(120)
    },
    row: {
        height: normalize(45),
        backgroundColor: "transparent"
    },
    separator: {
        height: 0.5,
        backgroundColor: '#c8c7cc',
    },
    description: {},
    loader: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        height: 20,
    },
});

export default MapTool;