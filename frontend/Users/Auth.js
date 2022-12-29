import React, { useState } from "react";
import { Text, Alert, Button, TextInput, View, StyleSheet, Linking } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

import LoginUser from "./LoginUser";
import SignupUser from "./SignupUser";
import Card from "../UI/Card";
import { normalize } from "../Tool/FontSize";

const Auth = props => {
    
    const Tab = createBottomTabNavigator();

    return (
        // <Stack.Navigator initialRouteName="Login">
        //     <Stack.Screen 
        //         name="Login"
        //         component={LoginUser}
        //         // options={{
        //         //     headerShown: false
        //         // }}
        //     />
        //     <Stack.Screen 
        //         name="Signup"
        //         component={SignupUser}
        //         // options={{
        //         //     headerShown: false
        //         // }}
        //     />
        // </Stack.Navigator>
        <Tab.Navigator 
            initialRouteName="Login"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === "Login") {
                        iconName = focused
                            ? "person-circle"
                            : "person-circle-outline";
                    } else if (route.name === "Signup") {
                        iconName = focused
                            ? "add-circle"
                            : "add-circle-outline";
                    }

                    return <Ionicons name={iconName} size={size} color={color} />
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray'
            })}
        >
            <Tab.Screen 
                name="Login"
                component={LoginUser}
                options={{
                    headerShown: false,
                    title: "Login"
                }}
            />
            <Tab.Screen 
                name="Signup"
                component={SignupUser}
                options={{
                    headerShown: false,
                    title: "Sign Up"
                }}
            />
        </Tab.Navigator>
    )
};

const styles = StyleSheet.create({

});

export default Auth;