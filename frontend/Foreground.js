import React, { useEffect } from "react";
import { Text, View, StyleSheet, Pressable, Alert } from 'react-native';
import { Provider, useSelector, useDispatch } from "react-redux";
import * as Location from "expo-location";

import SignupUser from "./Users/SignupUser";
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
    const user = useSelector((state) => state.user);

    useEffect(() => {
        if (user.isLogin === true && map.errorMsg !== null) {
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
    }, [map.errorMsg, user.isLogin, dispatch]);

    return (
        <React.Fragment>
            {
                (user.isLogin === true) &&
                <MainPage />
            }
            {
                (user.isLogin === false) &&
                <SignupUser />
            }
        </React.Fragment>
    );
}

export default Foreground;