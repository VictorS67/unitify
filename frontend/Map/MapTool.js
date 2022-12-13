import React, { useRef, useEffect, useImperativeHandle } from "react";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { normalize } from "../Tool/FontSize";
import { getLocation, GOOGLE_MAP_API } from "../Utils/GoogleMap";
import { updateDirection } from "../store/map-actions";
import { mapActions } from "../store/map-slice";


const MapTool = (props) => {

    const dispatch = useDispatch();
    const map = useSelector((state) => state.map);

    const destinationAddRef = useRef(null);

    useEffect(() => {
        // console.log(travalMode, '- Has changed')
        if (map.destination && map.destination.address_simple) {
            destinationAddRef.current?.setAddressText(map.destination.address_simple);
        }
    }, [map.destination, dispatch]) // <-- here put the parameter to listen

    const onSearchPress = () => {
        if (destinationAddRef.current && destinationAddRef.current.getAddressText() !== "") {
            let text = destinationAddRef.current.getAddressText();

            if (map.destination && map.destination.address_simple && text === map.destination.address_simple) {
                text = map.destination.address;
            }

            getLocation(text)
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
        <View style={[{
            width: "100%",
            flex: 1,
            paddingHorizontal: normalize(3)
        }, props.style]}>
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
                        () => dispatch(mapActions.sTravalMode("DRIVING"))
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
                        () => dispatch(mapActions.sTravalMode("WALKING"))
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
                        () => dispatch(mapActions.sTravalMode("SUBWAY"))
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
                        () => dispatch(mapActions.sTravalMode("BUS"))
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
                        () => dispatch(mapActions.sTravalMode("BICYCLING"))
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
                    ref={destinationAddRef}
                    placeholder="Type a place"
                    query={{key: GOOGLE_MAP_API}}
                    enablePoweredByContainer={false}
                    fetchDetails={true}
                    onFail={error => console.log(error)}
                    onNotFound={() => console.log('no results')}
                    renderLeftButton={() => {
                        return (
                            <View style={{ flexDirection: "row", flex: 0.3}}>
                                <TouchableOpacity 
                                    style={[styles.buttonInputClear, {backgroundColor: "transparent"}]} 
                                    onPress={
                                        () => goToCurrentPosition()
                                    }
                                > 
                                    <Ionicons name="locate" size={normalize(24)} color="black" />
                                </TouchableOpacity>
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
                                    <FontAwesome5 name="search" size={normalize(15)} color="black" />
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
    listView: {},
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