import React, { useState } from "react";
import {
  Text,
  Alert,
  Button,
  TextInput,
  View,
  StyleSheet,
  Linking,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

import UserPage from "./UserPage";
import UserChampionSignWindow from "./UserChampionSignWindow";
import UserSecureSettingWindow from "./UserSecureSettingWindow";
import UserChangePassWindow from "./UserChangePassWindow";
import UserChangeEmailWindow from "./UserChangeEmailWindow";
import AppInfo from "./AppInfo";
import Card from "../UI/Card";
import { normalize } from "../Tool/FontSize";

const Profile = (props) => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="ProfileMain">
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
      <Stack.Screen
        name="SecureSetting"
        component={UserSecureSettingWindow}
        options={{
          headerShown: true,
          title: "Settings",
        }}
      />
      <Stack.Screen
        name="ChangeEmail"
        component={UserChangeEmailWindow}
        options={{
          headerShown: true,
          title: "Change Email",
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={UserChangePassWindow}
        options={{
          headerShown: true,
          title: "Change Password",
        }}
      />
      <Stack.Screen
        name="AppInfo"
        component={AppInfo}
        options={{
          headerShown: true,
          title: "",
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default Profile;
