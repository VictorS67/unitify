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
    const [location, sLocation] = useState(null);
    const [position, sPosition] = useState(null);
    const [errorMsg, sErrorMsg] = useState(null);

    const [south, sSouth] = useState(null);
    const [west, sWest] = useState(null); 
    const [north, sNorth] = useState(null);
    const [east, sEast] = useState(null);
    const [coords, sCoords] = useState([]);

    useEffect(() => {
        (async () => {
        
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                sErrorMsg('Permission to access location was denied');
                return;
            }
        
            let curr_location = await Location.getCurrentPositionAsync({});
            console.log(curr_location)
            sLocation(curr_location);
            sPosition({
                latitude: curr_location.coords.latitude,
                longitude: curr_location.coords.longitude,
                latitudeDelta: 0.02, 
                longitudeDelta: 0.02
            })
        })();
    }, []);

    const onRegionChangeComplete = (region) => {
        const center = point([region.longitude, region.latitude]);
        const verticalMeter = (111 * region.latitudeDelta) / 2;
        const horizontalMeter = (111 * region.longitudeDelta) / 2;
        const options = { units: 'kilometers' };
        const south = destination(center, verticalMeter, 180, options);
        const west = destination(center, horizontalMeter, -90, options);
        const north = destination(center, verticalMeter, 0, options);
        const east = destination(center, horizontalMeter, 90, options);

        sSouth(south.geometry.coordinates[1]);
        sWest(west.geometry.coordinates[0]);
        sNorth(north.geometry.coordinates[1]);
        sEast(east.geometry.coordinates[0]);
    }

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
            coords => {
                sCoords(coords);
                console.log(coords);
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
                `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${KEY}`
            );
            let respJson = await resp.json();
            let points = decode(respJson.routes[0].overview_polyline.points);
            console.log(points);
            let coords = points.map((point, index) => {
                return {
                    latitude: point[0],
                    longitude: point[1]
                };
            });
            return coords;
        } catch (error) {
            return error;
        }
      };

    return (
        <View style={styles.container}>
            {
                location && 
                position &&
                <View style={styles.mapContainer}>
                    <MapView 
                        onRegionChangeComplete={onRegionChangeComplete}
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
                            <Marker
                                coordinate={{
                                    "latitude": position.latitude, 
                                    "longitude": position.longitude
                                }}
                                title={"You are here"}
                                key={"my_location"}
                            />
                        }
                        {
                            (coords.length >= 2) &&
                            <Marker
                                coordinate={coords[coords.length - 1]}
                                key={`selected_coord`}
                            />
                        }
                        {
                            (coords.length >= 2) &&
                            <Polyline 
                                coordinates={coords}
                                strokeWidth={6}
                            />
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
