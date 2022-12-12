import React, { useEffect } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import * as Location from "expo-location";

import LoginUser from "./Users/LoginUser";
import MainPage from "./Main/Main";
import UserPage from "./Users/UserPage";
import Map from "./Map/Map";
import { mapActions } from "./store/map-slice";

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
                    longitude: curr_location.coords.longitude,
                    latitudeDelta: 0.02, 
                    longitudeDelta: 0.02
                }
            ));
        })();
    }, [dispatch]);

    return (
        <MainPage />
    );
}

export default Foreground;