import React, { useState, useEffect } from "react";
import { Text, MaskedViewComponent, View, StyleSheet } from 'react-native';
import { point } from '@turf/helpers';
import destination from '@turf/destination';
import * as Location from "expo-location";

import LoginUser from "./Users/LoginUser";
import MainPage from "./Main/Main";
import UserPage from "./Users/UserPage";
import MapView from "react-native-maps";

function App() {

    const [location, sLocation] = useState(null);
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
        
            let location = await Location.getCurrentPositionAsync({});
            console.log(location)
            sLocation(location);
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
                <MapView 
                    onRegionChangeComplete={onRegionChangeComplete}
                    style={styles.map} 
                    showsUserLocation
                    initialRegion={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.latitude,
                        latitudeDelta: 0.02, 
                        longitudeDelta: 0.02,
                    }}
                    provider={MapView.PROVIDER_GOOGLE}
                />
            }

            {/* <Text style={styles.map}>{text}</Text> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: '100%',
      textAlign: 'center'
    },

});

export default App;
