import React, { useState, useEffect, useRef } from "react";
import { Text, MaskedViewComponent, View, StyleSheet, Button } from 'react-native';
import { point } from '@turf/helpers';
import destination from '@turf/destination';
import * as Location from "expo-location";

import LoginUser from "./Users/LoginUser";
import MainPage from "./Main/Main";
import UserPage from "./Users/UserPage";
import MapView from "react-native-maps";

function App() {

    const mapRef = useRef(null);
    const [location, sLocation] = useState(null);
    const [position, sPosition] = useState(null);
    const [errorMsg, sErrorMsg] = useState(null);

    const [south, sSouth] = useState(null);
    const [west, sWest] = useState(null); 
    const [north, sNorth] = useState(null);
    const [east, sEast] = useState(null);

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
        sPosition(region);
    }

    const goToCurrentPosition = () => {
        //Animate the user to new region. Complete this animation in 3 seconds
        mapRef.current.animateToRegion(position);
    };

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

    return (
        <View style={styles.container}>
            {
                location && 
                position &&
                <View style={styles.mapContainer}>
                    <MapView 
                        // onRegionChangeComplete={onRegionChangeComplete}
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

                    </MapView>

                    <Button onPress={() => goToCurrentPosition()} title="Locate Myself" />
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
        ...StyleSheet.absoluteFillObject,
    },
    button: {

    }

});

export default App;
