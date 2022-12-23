import React, { useEffect } from "react";
import { Text, View, StyleSheet, Pressable, Alert } from 'react-native';
import { Provider, useSelector, useDispatch } from "react-redux";
import * as Location from "expo-location";

import LoginUser from "./Users/LoginUser";
import MainPage from "./Main/Main";
import UserPage from "./Users/UserPage";
import Map from "./Map/Map";
import Card from "./UI/Card";
import { mapActions } from "./store/map-slice";
import { mainActions } from "./store/main-slice";
import { normalize } from "./Tool/FontSize";

function Foreground() {

    const dispatch = useDispatch();
    const map = useSelector((state) => state.map);

    useEffect(() => {
        (async () => {
        
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                dispatch(mapActions.sErrorMsg(
                    {
                        message: 'Permission to access location was denied'
                    }
                ));
                return;
            }
        
            let curr_location = await Location.getCurrentPositionAsync({});
            // console.log(curr_location)
            dispatch(mapActions.sPosition(
                {
                    latitude: curr_location.coords.latitude,
                    longitude: curr_location.coords.longitude
                }
            ));
        })();
    }, [dispatch]);

    useEffect(() => {
        if (map.errorMsg !== null) {
            dispatch(mainActions.resetNavStatusToInit());
            dispatch(mapActions.resetMap());

            Alert.alert(
                "Alert Title",
                map.errorMsg.message,
                [
                    { 
                        text: "OK", 
                        onPress: () => console.log("OK Pressed") 
                    }
                ]
            );
        }
    }, [map.errorMsg, dispatch]);

    return (
        <MainPage />
    );
}

export default Foreground;