import React, { useState } from "react";
import { Text, Alert, Button, TextInput, View, StyleSheet, Linking } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

import UserPage from "./UserPage";
import UserChampionSignWindow from "./UserChampionSignWindow";
import Card from "../UI/Card";
import { normalize } from "../Tool/FontSize";

const Profile = props => {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            initialRouteName="ProfileMain"
        >
            <Stack.Screen 
                name="ProfileMain" 
                component={UserPage} 
                options={{
                    headerShown: true,
                    title: "Profile",
                }}
            />
            <Stack.Screen 
                name="ChampionSignature" 
                component={UserChampionSignWindow} 
                options={{
                    headerShown: true,
                    title: "Champion Signature",
                }}
            />
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({

});

export default Profile;