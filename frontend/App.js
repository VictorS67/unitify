import React, { useState, useEffect, useRef } from "react";
import { Text, TextInput, View, SafeAreaView, StyleSheet, Button, TouchableOpacity } from 'react-native';
import * as Location from "expo-location";
import MapView, { Marker, Polyline } from "react-native-maps";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { decode } from "@mapbox/polyline";
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

import LoginUser from "./Users/LoginUser";
import MainPage from "./Main/Main";
import UserPage from "./Users/UserPage";
import TalkBubble from "./UI/TalkBubble";
import PolylineInfo from "./UI/PolylineInfo";
import { normalize } from "./Tool/FontSize";

const GOOGLE_MAP_API = "AIzaSyAtc6gbQfdI-YdE7SoIeBXJMPmSV_LuOCk";

function App() {

    const mapRef = useRef(null);
    const destinationAddRef = useRef(null);

    // Current position of the user
    const [position, sPosition] = useState(null);

    // Travel Mode
    const [travalMode, sTravalMode] = useState("DRIVING");
    
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
            // console.log(curr_location)
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

        // console.log("COORDINATE");
        // console.log(coordinate);

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
            `${coordinate.latitude},${coordinate.longitude}`,
            travalMode
        )
        .then(
            direction => {
                // sCoords(coords);
                // console.log(coords);
                // console.log("DIRECTION");
                // console.log(direction);
                sOrigin(direction.origin);
                sDestination(direction.destination);
                
                if (direction.destination !== null) {
                    destinationAddRef.current?.setAddressText(direction.destination.address);
                }

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

    const getLocation = async (addressString) => {
        try {
            const KEY = GOOGLE_MAP_API; //put your API key here.
            //otherwise, you'll have an 'unauthorized' error.

            const stringURL = addressString.replace(/\s/g, '+');

            // console.log("stringURL")
            // console.log(stringURL)

            let resp = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${stringURL}&key=${KEY}`
            );
            let respJson = await resp.json();
            let respLocation = respJson.results[0].geometry.location;
            let respAddress = respJson.results[0].formatted_address;
            // console.log(respJson.results[0])

            return {
                "latitude": respLocation.lat, 
                "longitude": respLocation.lng,
                "address": respAddress
            }

        } catch (error) {
            return error;
        }
        
    }

    const getDirections = async (startLoc, destinationLoc, travalModeString) => {
        try {
            const KEY = GOOGLE_MAP_API; //put your API key here.
            //otherwise, you'll have an 'unauthorized' error.

            //Search for different traval mode
            let travalModeFilter = "&mode=driving";
            if (travalModeString === "SUBWAY") {
                travalModeFilter = "&mode=transit&transit_mode=subway";
            } else if (travalModeString === "BUS") {
                travalModeFilter = "&mode=transit&transit_mode=bus";
            } else if (travalModeString === "BICYCLING") {
                travalModeFilter = "&mode=bicycling";
            } else if (travalModeString === "WALKING") {
                travalModeFilter = "&mode=walking";
            }

            // console.log("DESTINATION")
            // console.log(destinationLoc)

            let resp = await fetch(
                `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${KEY}&departure_time=now${travalModeFilter}`
            );
            let respJson = await resp.json();
            // console.log("ROUTE");
            // console.log(respJson.routes);

            if ((respJson.routes.length === 0) || (respJson.routes[0].legs.length === 0)) {
                return {
                    "origin": null,
                    "destination": null,
                    "steps": [],
                    "markers": []
                }
            }

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
            // console.log(respJson.routes[0]);

            let markers = [];
            if ((travalModeString === "SUBWAY") || (travalModeString === "BUS")) {
                markers = steps.map((step) => {
                    let traval_mode = step.travel_mode;
                    if (step.travel_mode === "TRANSIT") {
                        traval_mode = step.transit_details.line.vehicle.type;
    
                        if ((traval_mode === "BUS") || (traval_mode === "TRAM")) {
                            traval_mode = "BUS";
                        } else {
                            traval_mode = "SUBWAY";
                        }
                    }
    
                    let coords = decode(step.polyline.points);
                    let mid_coord = coords[Math.floor(coords.length / 2)];
    
                    // console.log("MID COORD");
                    // console.log(mid_coord);
    
                    return {
                        "latitude": mid_coord[0],
                        "longitude": mid_coord[1],
                        "distance": step.distance.text,
                        "duration": step.duration.text,
                        "mode": traval_mode
                    };
                });
            } else {
                let points = decode(respJson.routes[0].overview_polyline.points);
                let mid_coord = points[Math.floor(points.length / 2)];

                // console.log("MID COORD");
                // console.log(mid_coord);

                markers = [{
                    "latitude": mid_coord[0],
                    "longitude": mid_coord[1],
                    "distance": leg.distance.text,
                    "duration": leg.duration.text,
                    "mode": travalModeString
                }]
            }

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
        <SafeAreaView style={styles.container}>
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
                                            onPress={async () => {
                                                if (destinationAddRef.current && destinationAddRef.current.getAddressText() !== "") {

                                                    getLocation(
                                                        destinationAddRef.current.getAddressText()
                                                    )
                                                    .then(
                                                        locationInfo => {
                                                            // console.log("LOCATION INFO");
                                                            // console.log(locationInfo);
                                                            getDirections(
                                                                `${position.latitude},${position.longitude}`, 
                                                                `${locationInfo.latitude},${locationInfo.longitude}`,
                                                                travalMode
                                                            )
                                                            .then(
                                                                direction => {
                                                                    // console.log("DIRECTION");
                                                                    // console.log(direction);
                                                                    sOrigin(direction.origin);
                                                                    sDestination(direction.destination);
                                                                    
                                                                    if (direction.destination !== null) {
                                                                        destinationAddRef.current?.setAddressText(direction.destination.address);
                                                                    }
                                                    
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
                                                    )
                                                    .catch(
                                                        err => {
                                                            console.log("Something went wrong");
                                                        }
                                                    )
                                                }
                                            }}
                                        > 
                                            <FontAwesome5 name="search" size={normalize(15)} color="black" />
                                        </TouchableOpacity>
                                    </View>
                                );
                            }}
                            styles={{
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
                            }
                            }
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity 
                            style={[styles.buttonSquare, (travalMode === "DRIVING") && styles.buttonActive]} 
                            onPress={
                                () => sTravalMode("DRIVING")
                            }
                        > 
                            <FontAwesome5 name="car" size={normalize(14)} color="black" />
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={[styles.buttonSquare, (travalMode === "WALKING") && styles.buttonActive]} 
                            onPress={
                                () => sTravalMode("WALKING")
                            }
                        > 
                            <FontAwesome5 name="walking" size={normalize(14)} color="black" />
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={[styles.buttonSquare, (travalMode === "SUBWAY") && styles.buttonActive]} 
                            onPress={
                                () => sTravalMode("SUBWAY")
                            }
                        > 
                            <FontAwesome5 name="subway" size={normalize(14)} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.buttonSquare, (travalMode === "BUS") && styles.buttonActive]} 
                            onPress={
                                () => sTravalMode("BUS")
                            }
                        > 
                            <FontAwesome5 name="bus" size={normalize(14)} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.buttonSquare, (travalMode === "BICYCLING") && styles.buttonActive]} 
                            onPress={
                                () => sTravalMode("BICYCLING")
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

            {/* <Text style={styles.map}>{text}</Text> */}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
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

export default App;
