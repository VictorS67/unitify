import React, { useRef, useEffect, useImperativeHandle } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { normalize } from "../Tool/FontSize";
import { getLocation, GOOGLE_MAP_API } from "../Utils/GoogleMap";
import { updateDirection } from "../store/map-actions";
import { mapActions } from "../store/map-slice";


function MapTool() {

    const dispatch = useDispatch();
    const map = useSelector((state) => state.map);

    const destinationAddRef = useRef(null);

    useEffect(() => {
        // console.log(travalMode, '- Has changed')
        if (map.destination && map.destination.address) {
            destinationAddRef.current?.setAddressText(map.destination.address);
        }
    }, [map.destination, dispatch]) // <-- here put the parameter to listen

    const onSearchPress = () => {
        if (destinationAddRef.current && destinationAddRef.current.getAddressText() !== "") {

            getLocation(
                destinationAddRef.current.getAddressText()
            )
            .then(
                locationInfo => {
                    // console.log("LOCATION INFO");
                    // console.log(locationInfo);
                    dispatch(updateDirection(map.position, locationInfo, map.travalMode));
                }
            )
            .catch(
                err => {
                    console.log("getLocation: Something went wrong");
                }
            )
        }
    }

    const goToCurrentPosition = () => {
        if (map.centerLocation === false) {
            dispatch(mapActions.toggleCenterLocation());
        }
    }

    return (
        <React.Fragment>
            <View style={styles.inputContainer}>
                <GooglePlacesAutocomplete
                    ref={destinationAddRef}
                    placeholder="Type a place"
                    query={{key: GOOGLE_MAP_API}}
                    fetchDetails={true}
                    onFail={error => console.log(error)}
                    onNotFound={() => console.log('no results')}
                    renderRightButton={() => {
                        return (
                            <View style={{ flexDirection: "row", flex: 1}}>
                                <TouchableOpacity 
                                    style={styles.buttonInputClear} 
                                    onPress={
                                        () => { 
                                            destinationAddRef.current.clear();
                                            destinationAddRef.current.blur();
                                        }
                                    }
                                > 
                                    <Ionicons name="close" size={normalize(24)} color="black" />
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={styles.buttonInputClear} 
                                    onPress={onSearchPress}
                                > 
                                    <FontAwesome5 name="search" size={normalize(15)} color="black" />
                                </TouchableOpacity>
                            </View>
                        );
                    }}
                    styles={googlePlaceStyles}
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={[styles.buttonSquare, (map.travalMode === "DRIVING") && styles.buttonActive]} 
                    onPress={
                        () => dispatch(mapActions.sTravalMode("DRIVING"))
                    }
                > 
                    <FontAwesome5 name="car" size={normalize(14)} color="black" />
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.buttonSquare, (map.travalMode === "WALKING") && styles.buttonActive]} 
                    onPress={
                        () => dispatch(mapActions.sTravalMode("WALKING"))
                    }
                > 
                    <FontAwesome5 name="walking" size={normalize(14)} color="black" />
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.buttonSquare, (map.travalMode === "SUBWAY") && styles.buttonActive]} 
                    onPress={
                        () => dispatch(mapActions.sTravalMode("SUBWAY"))
                    }
                > 
                    <FontAwesome5 name="subway" size={normalize(14)} color="black" />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.buttonSquare, (map.travalMode === "BUS") && styles.buttonActive]} 
                    onPress={
                        () => dispatch(mapActions.sTravalMode("BUS"))
                    }
                > 
                    <FontAwesome5 name="bus" size={normalize(14)} color="black" />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.buttonSquare, (map.travalMode === "BICYCLING") && styles.buttonActive]} 
                    onPress={
                        () => dispatch(mapActions.sTravalMode("BICYCLING"))
                    }
                > 
                    <FontAwesome5 name="bicycle" size={normalize(12)} color="black" />
                </TouchableOpacity>


                <TouchableOpacity 
                    style={styles.button} 
                    onPress={
                        () => goToCurrentPosition()
                    }
                > 
                    <Ionicons name="locate" size={normalize(15)} color="black" />
                    <Text style={styles.buttonText}>
                        &nbsp;Locate Myself
                    </Text>
                </TouchableOpacity>
            </View>
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        backgroundColor: "transparent",
        flexWrap: 'wrap',
        width: "75%"
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
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "dodgerblue",
        height: "100%",
        borderRadius: normalize(5),
        marginHorizontal: normalize(3)
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
    },
    textInputContainer: {
        flexDirection: 'row',
        marginBottom: normalize(2)
    },
    textInput: {
        backgroundColor: '#FFFFFF',
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
    listView: {},
    row: {
        backgroundColor: '#FFFFFF',
        padding: 13,
        height: normalize(35),
        flexDirection: 'row',
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