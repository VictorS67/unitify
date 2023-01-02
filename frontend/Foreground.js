import React, { useEffect } from "react";
import { Text, View, StyleSheet, Pressable, Alert } from 'react-native';
import { Provider, useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Profile from "./Users/Profile";
import Auth from "./Users/Auth";
import SignupUser from "./Users/SignupUser";
import LoginUser from "./Users/LoginUser";
import MainPage from "./Main/Main";
import UserPage from "./Users/UserPage";
import Map from "./Map/Map";
import Card from "./UI/Card";
import { mapActions } from "./store/map-slice";
import { mainActions } from "./store/main-slice";
import { normalize } from "./Tool/FontSize";
import { getUser } from "./store/user-actions";

function Foreground() {

    const dispatch = useDispatch();
    const map = useSelector((state) => state.map);
    const user = useSelector((state) => state.user);

    const Stack = createNativeStackNavigator();

    useEffect(() => {
        if (user.isLogin === true && map.errorMsg !== null) {
            dispatch(mainActions.resetNavStatusToInit());
            dispatch(mapActions.resetMap());

            Alert.alert(
                "Error!",
                map.errorMsg.message,
                [
                    { 
                        text: "OK", 
                        onPress: () => console.log("OK Pressed") 
                    }
                ]
            );
        }

        if (user.isLogin === false && user.checkutoLogin === false) {
            dispatch(getUser());
        }
    }, [map.errorMsg, user.isLogin, dispatch]);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {
                    user.isLogin ? (
                        <>
                            <Stack.Screen 
                                name="Home" 
                                component={MainPage} 
                                options={{
                                    headerShown: false,
                                    animationTypeForReplace: (!user.isLogin) ? 'pop': 'push',
                                }}
                            />
                            <Stack.Screen 
                                name="Profile"
                                component={Profile} 
                                options={{
                                    headerShown: false
                                }}
                            />
                        </>
                    ) : (
                        <>
                            <Stack.Screen 
                                name="Auth" 
                                component={Auth} 
                                options={{
                                    headerShown: false
                                }}
                            />
                        </>
                    )
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Foreground;