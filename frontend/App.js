import React, { useState, useEffect, useRef } from "react";
import { Text, MaskedViewComponent, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { point } from '@turf/helpers';
import destination from '@turf/destination';
import * as Location from "expo-location";
import MapView, { Marker, Polyline } from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import { decode } from "@mapbox/polyline";

import { Ionicons } from '@expo/vector-icons';

import LoginUser from "./Users/LoginUser";
import MainPage from "./Main/Main";
import UserPage from "./Users/UserPage";
import { normalize } from "./Tool/FontSize";

const GOOGLE_MAP_API = "AIzaSyAtc6gbQfdI-YdE7SoIeBXJMPmSV_LuOCk";

function App() {

    const mapRef = useRef(null);

    // Current position of the user
    const [position, sPosition] = useState(null);
    
    // Origin information
    const [origin, sOrigin] = useState(null);

    // Destination information
    const [destination, sDestination] = useState(null);

    // Polylines from origin destination
    const [polylines, sPolylines] = useState([]);

    // Markers with customized text on map
    const [markers, sMarkers] = useState([]);

    // Error message for getting locations from user
    const [errorMsg, sErrorMsg] = useState(null);

    const polyline_colors = {
        "DRIVING": "#f07167",
        "TRANSIT": "#00afb9",
        "WALKING":  "#ef8354",
        "BICYCLING": "#60d394"
    }

    useEffect(() => {
        (async () => {
        
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                sErrorMsg('Permission to access location was denied');
                return;
            }
        
            let curr_location = await Location.getCurrentPositionAsync({});
            console.log(curr_location)
            sPosition({
                latitude: curr_location.coords.latitude,
                longitude: curr_location.coords.longitude,
                latitudeDelta: 0.02, 
                longitudeDelta: 0.02
            })
        })();
    }, []);

    const goToCurrentPosition = () => {
        //Animate the user to new region. Complete this animation in 3 seconds
        mapRef.current.animateToRegion(position);
    };

    const onMapPress = (e) => {

        const coordinate = e.nativeEvent.coordinate;

        // setCoords(coordinate);
        mapRef.current.animateToRegion({
            "latitude": coordinate.latitude, 
            "longitude": coordinate.longitude, 
            "latitudeDelta": position.latitudeDelta, 
            "longitudeDelta": position.longitudeDelta
        });

        //fetch the coordinates and then store its value into the coords Hook.
        getDirections(
            `${position.latitude},${position.longitude}`, 
            `${coordinate.latitude},${coordinate.longitude}`
        )
        .then(
            direction => {
                // sCoords(coords);
                // console.log(coords);

                sOrigin(direction.origin);
                sDestination(direction.destination);

                console.log(direction.steps);
                sPolylines(direction.steps);
                sMarkers(direction.markers);
            }
        )
        .catch(
            err => {
                console.log("Something went wrong");
            }
        );
    }

    const getDirections = async (startLoc, destinationLoc) => {
        try {
            const KEY = GOOGLE_MAP_API; //put your API key here.

            //otherwise, you'll have an 'unauthorized' error.
            let resp = await fetch(
                `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${KEY}&departure_time=now&mode=transit&transit_mode=subway`
            );
            let respJson = await resp.json();
            let leg = respJson.routes[0].legs[0];
            let origin_info = {
                "latitude": leg.start_location.lat,
                "longitude": leg.start_location.lng,
                "address": leg.start_address
            }
            let destination_info = {
                "latitude": leg.end_location.lat,
                "longitude": leg.end_location.lng,
                "distance": leg.distance.text,
                "duration": leg.duration.text,
                "address": leg.end_address
            }
            let steps = leg.steps;
            console.log(respJson.routes[0]);

            let markers = steps.map((step) => {
                console.log("STEP");
                console.log(step);
                console.log(step.steps);

                let coords = decode(step.polyline.points).map((coord) => {
                    return {
                        "latitude": coord[0],
                        "longitude": coord[1]
                    }
                });

                let mid_coord = coords[Math.floor(coords.length / 2) + 1];

                return mid_coord;
            });

            console.log("MARKER");
            console.log(markers);

            return {
                "origin": origin_info,
                "destination": destination_info,
                "steps": steps,
                "markers": markers
            };
        } catch (error) {
            return error;
        }
    };

    return (
        <View style={styles.container}>
            {
                position &&
                <View style={styles.mapContainer}>
                    <MapView 
                        onPress={onMapPress}
                        style={styles.map} 
                        showsUserLocation={true}
                        initialRegion={position}
                        provider={MapView.PROVIDER_GOOGLE}
                        showsMyLocationButton={false}
                        showsCompass={true}
                        showsIndoors={true}
                        showsIndoorLevelPicker={true}
                        loadingEnabled={true}
                        showsBuildings={false}
                        showsTraffic={false}
                        ref={mapRef} //assign our ref to this MapView
                    >
                        {
                            origin &&
                            <Marker
                                coordinate={{
                                    "latitude": origin.latitude, 
                                    "longitude": origin.longitude
                                }}
                                title={origin.address}
                                key={"origin_loc"}
                            />
                        }
                        {
                            destination &&
                            <Marker
                                coordinate={{
                                    "latitude": destination.latitude, 
                                    "longitude": destination.longitude
                                }}
                                title={destination.address}
                                description={`distance: ${destination.distance} duration: ${destination.duration}`}
                                key={`destination_loc`}
                            />
                        }
                        {
                            origin &&
                            destination &&
                            (polylines.length >= 1) &&
                            (
                                polylines.map((element, index)  => {

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
                            (markers.length >= 1) &&
                            (
                                markers.map((element, index)  => {

                                    return (
                                        <Marker 
                                            coordinate={element}
                                            key={`marker_${index}`}
                                        />
                                    )
                                })
                            )
                        }
                    </MapView>

                    <View style={styles.buttonContainer}>
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

            {/* <Text style={styles.map}>{text}</Text> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mapContainer: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end"
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    buttonContainer: {
        flexDirection: "row",
        marginVertical: normalize(10),
        backgroundColor: "transparent",
        alignItems: "center"
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "dodgerblue",
        paddingVertical: normalize(5),
        paddingHorizontal: normalize(10),
        borderRadius: normalize(20)
    },
    buttonText: {
        fontSize: normalize(13)
    }
});

export default App;
