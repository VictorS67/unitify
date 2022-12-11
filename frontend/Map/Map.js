import React, { useState, useEffect, useRef } from "react";
import { Text, View, SafeAreaView, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import * as Location from "expo-location";
import MapView, { Marker, Polyline } from "react-native-maps";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { decode } from "@mapbox/polyline";

import TalkBubble from "../UI/TalkBubble";
import PolylineInfo from "../UI/PolylineInfo";
import { normalize } from "../Tool/FontSize";
import { getDirections, getLocation, GOOGLE_MAP_API } from "../Utils/GoogleMap";
import { mapActions } from "../store/map-slice";


function Map() {

    const mapRef = useRef(null);
    const destinationAddRef = useRef(null);

    const dispatch = useDispatch();
    const map = useSelector((state) => state.map);

    const polyline_colors = {
        "DRIVING": "#f07167",
        "TRANSIT": "#00afb9",
        "WALKING":  "#ef8354",
        "BICYCLING": "#60d394"
    }

    useEffect(() => {
        // console.log(travalMode, '- Has changed')
        if (map.position && map.origin && map.destination) {
            updateDirection(map.position, map.destination, map.travalMode);
        }
    }, [map.travalMode, dispatch]) // <-- here put the parameter to listen

    const goToCurrentPosition = () => {
        //Animate the user to new region. Complete this animation in 3 seconds
        mapRef.current.animateToRegion(map.position);
    };

    const updateDirection = (position, destination, travalMode) => {
        getDirections(
            `${position.latitude},${position.longitude}`, 
            `${destination.latitude},${destination.longitude}`,
            travalMode
        )
        .then(
            direction => {
                // console.log("DIRECTION");
                // console.log(direction);
                dispatch(mapActions.sOrigin(direction.origin));
                dispatch(mapActions.sDestination(direction.destination));
                dispatch(mapActions.sPolylines(direction.steps));
                dispatch(mapActions.sMarkers(direction.markers));

                if (direction.destination !== null) {
                    destinationAddRef.current?.setAddressText(direction.destination.address);
                }
            }
        )
        .catch(
            err => {
                console.log("Something went wrong");
            }
        );
    };

    const onMapPress = (e) => {
        const coordinate = e.nativeEvent.coordinate;

        // console.log("COORDINATE");
        // console.log(coordinate);

        mapRef.current.animateToRegion({
            "latitude": coordinate.latitude, 
            "longitude": coordinate.longitude, 
            "latitudeDelta": map.position.latitudeDelta, 
            "longitudeDelta": map.position.longitudeDelta
        });

        //fetch the coordinates and then store its value into the coords Hook.
        updateDirection(map.position, coordinate, map.travalMode);
    }

    const onSearchPress = () => {
        if (destinationAddRef.current && destinationAddRef.current.getAddressText() !== "") {

            getLocation(
                destinationAddRef.current.getAddressText()
            )
            .then(
                locationInfo => {
                    // console.log("LOCATION INFO");
                    // console.log(locationInfo);
                    updateDirection(map.position, locationInfo, map.travalMode);
                }
            )
            .catch(
                err => {
                    console.log("Something went wrong");
                }
            )
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            {
                map.position &&
                <View style={styles.mapContainer}>
                    <MapView 
                        onPress={onMapPress}
                        style={styles.map} 
                        showsUserLocation={true}
                        initialRegion={map.position}
                        provider={MapView.PROVIDER_GOOGLE}
                        showsMyLocationButton={false}
                        showsCompass={false}
                        showsIndoors={true}
                        showsIndoorLevelPicker={true}
                        loadingEnabled={true}
                        showsBuildings={false}
                        showsTraffic={false}
                        ref={mapRef} //assign our ref to this MapView
                    >
                        {
                            map.origin &&
                            <Marker
                                coordinate={{
                                    "latitude": map.origin.latitude, 
                                    "longitude": map.origin.longitude
                                }}
                                title={map.origin.address}
                                key={"origin_loc"}
                            />
                        }
                        {
                            map.destination &&
                            <Marker
                                coordinate={{
                                    "latitude": map.destination.latitude, 
                                    "longitude": map.destination.longitude
                                }}
                                title={map.destination.address}
                                description={`distance: ${map.destination.distance} duration: ${map.destination.duration}`}
                                key={`destination_loc`}
                            />
                        }
                        {
                            map.origin &&
                            map.destination &&
                            (map.polylines.length >= 1) &&
                            (
                                map.polylines.map((element, index)  => {

                                    let coords = decode(element.polyline.points).map((coord) => {
                                        return {
                                            "latitude": coord[0],
                                            "longitude": coord[1]
                                        }
                                    });

                                    return (
                                        <Polyline 
                                            coordinates={coords}
                                            strokeWidth={6}
                                            strokeColor={polyline_colors[element.travel_mode]}
                                            fillColor={polyline_colors[element.travel_mode]}
                                            key={`polyline_${index}`}
                                        />
                                    )
                                })
                            )
                        }
                        {
                            (map.markers.length >= 1) &&
                            (
                                map.markers.map((element, index)  => {

                                    return (
                                        <Marker 
                                            coordinate={element}
                                            key={`marker_${index}`}
                                        >

                                            <TalkBubble>
                                                <PolylineInfo 
                                                    mode={element.mode} 
                                                    distance={element.distance} 
                                                    duration={element.duration}
                                                />
                                            </TalkBubble>
                                        </Marker>
                                    )
                                })
                            )
                        }

                    </MapView>

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
                </View>
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: "100%",
        width: "100%"
    },
    mapContainer: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "flex-end"
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    inputContainer: {
        flexDirection: "row",
        backgroundColor: "transparent",
        flexWrap: 'wrap',
        width: "75%"
    },
    inputBox: {
        flexDirection: "row",
        width: "80%",
        height: "100%",
        backgroundColor: "white",
        marginHorizontal: normalize(3),
        borderRadius: normalize(20)
    },
    input: {
        width: "85%",
        height: "100%",
        paddingVertical: normalize(5),
        paddingHorizontal: normalize(10),
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

export default Map;