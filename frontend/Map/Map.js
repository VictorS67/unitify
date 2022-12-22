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
import MapTool from "./MapTool";
import { normalize } from "../Tool/FontSize";
import { updateDirection, updateAllDirection } from "../store/map-actions";
import { mapActions } from "../store/map-slice";
import { mainActions } from "../store/main-slice";


function Map() {

    const dispatch = useDispatch();
    const map = useSelector((state) => state.map);
    const main = useSelector((state) => state.main);

    const mapRef = useRef(null);

    const polyline_colors = {
        "DRIVING": "#f07167",
        "TRANSIT": "#00afb9",
        "WALKING":  "#ef8354",
        "BICYCLING": "#60d394"
    }

    useEffect(() => {
        // console.log(travalMode, '- Has changed')
        if (map.position && map.origin && map.destination) {

            if (main.navStatus !== "NAV") {
                if (map.allDirection !== null) {
                    dispatch(mapActions.updateDirectionFromAll(map.travalMode));
                } else {
                    dispatch(mapActions.updatingInfo());
                    dispatch(updateAllDirection(map.origin, map.destination, map.travalMode))
                    .then(() => {
                        dispatch(mapActions.updatingInfoComplete())
                    });
                    
                }
            }

            if (main.navStatus === "INIT") {
                dispatch(mainActions.moveToNextNavStatus());
            }
        }
    }, [map.travalMode, dispatch]) // <-- here put the parameter to listen

    useEffect(() => {
        // console.log(travalMode, '- Has changed')
        if (map.position && mapRef.current && map.centerLocation === true) {
            //Animate the user to new region. Complete this animation in 3 seconds
            mapRef.current.animateToRegion(map.position);
            dispatch(mapActions.toggleCenterLocation());
        }
    }, [map.centerLocation, dispatch]) // <-- here put the parameter to listen

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
        if (main.navStatus !== "NAV") {
            // dispatch(updateDirection(map.position, coordinate, map.travalMode));
            dispatch(mapActions.updatingInfo());
            dispatch(updateAllDirection(map.position, coordinate, map.travalMode))
            .then(() => {
                dispatch(mapActions.updatingInfoComplete())
            });

            if (main.navStatus === "INIT") {
                dispatch(mainActions.moveToNextNavStatus());
            }   
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
                                description={`distance: ${map.destination.distance.text} duration: ${map.destination.duration.text}`}
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
                                                    distance={element.distance.text} 
                                                    duration={element.duration.text}
                                                />
                                            </TalkBubble>
                                        </Marker>
                                    )
                                })
                            )
                        }

                    </MapView>

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

export default Map;
