import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Divider } from "react-native-paper";
import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";

import Card from "../UI/Card";
import ButtonRow from "../UI/ButtonRow";
import { normalize } from "../Tool/FontSize";
import { userActions } from "../store/user-slice";
import { tripnavActions } from "../store/tripnav-slice";
import { mainActions } from "../store/main-slice";
import { mapActions } from "../store/map-slice";
import { logoutUser } from "../store/user-actions";
import { computeMiles } from "../Utils/ComputeMiles";
import { addMiles } from "../store/user-actions";

const SettingIcon = () => {
  return (
    <Ionicons
      name="md-settings-sharp"
      size={normalize(24)}
      style={styles.fontIcon}
      color="black"
    />
  );
};

const SignatureIcon = () => {
  return (
    <FontAwesome5
      name="signature"
      size={normalize(24)}
      style={styles.fontIcon}
      color="black"
    />
  );
};

const LogoutIcon = () => {
  return (
    <MaterialIcons
      name="logout"
      size={normalize(24)}
      style={styles.fontIcon}
      color="black"
    />
  );
};

const InformationIcon = () => {
  return (
    <Ionicons
      name="information-circle-outline"
      size={normalize(24)}
      style={styles.fontIcon}
      color="black"
    />
  );
};

const UserSettingWindow = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const tripnav = useSelector((state) => state.tripnav);
  const main = useSelector((state) => state.main);

  const onPressNoSaveQuit = () => {
    dispatch(tripnavActions.resetTripNav());
    dispatch(mainActions.resetNavStatusToInit());
    dispatch(mapActions.resetMap());
    dispatch(logoutUser());
  };

  const onPressSaveQuit = () => {
    // TODO: Backend API to Save current trip

    addMiles(user.id, computeMiles(tripnav.travalDurations));
    dispatch(tripnavActions.resetTripNav());
    dispatch(mainActions.resetNavStatusToInit());
    dispatch(mapActions.resetMap());
    dispatch(logoutUser());
  };

  const onPressLogout = () => {
    // dispatch(userActions.logout());
    if (main.navStatus === "NAV") {
      Alert.alert(
        "Are You Sure?",
        "Your trip is still running. Logging out will end your trip.",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Return back"),
          },
          {
            text: "Don't Save",
            onPress: () => onPressNoSaveQuit(),
          },
          {
            text: "Save",
            onPress: () => onPressSaveQuit(),
          },
        ]
      );
    } else {
      onPressNoSaveQuit();
    }
  };

  return (
    <View style={props.style}>
      <Card
        style={styles.userSettingCard}
        childrenStyle={styles.userSettingCardContent}
      >
        <TouchableOpacity
          onPress={() => props.navigation.navigate("ChampionSignature")}
        >
          <ButtonRow icon={SignatureIcon()} text={"Champion Signature"} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("SecureSetting")}
        >
          <ButtonRow icon={SettingIcon()} text={"Setting"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate("AppInfo")}>
          <ButtonRow icon={InformationIcon()} text={"App Information"} />
        </TouchableOpacity>
        <Divider style={{ width: "100%" }} />
        <TouchableOpacity
          onPress={() => {
            onPressLogout();
          }}
        >
          <ButtonRow icon={LogoutIcon()} text={"Logout"} />
        </TouchableOpacity>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  userSettingCard: {
    width: "95%",
    borderRadius: normalize(20),
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(10),
    flex: 1,
  },
  userSettingCardContent: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
});

export default UserSettingWindow;
