import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import StatusBar from "../UI/StatusBar";
import TopBar from "../UI/TopBar";
import UserAvatarWindow from "./UserAvatarWindow";
import UserStatWindow from "./UserStatWindow";
import UserMileWindow from "./UserMileWindow";
import UserSettingWindow from "./UserSettingWindow";
import { normalize } from "../Tool/FontSize";
import { getMyStatus } from "../store/user-actions";

const UserPage = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const updateInterval = setInterval(() => {
      // dispatch(getLikeNumber());
      dispatch(getMyStatus(user.id));
    }, 5 * 6000);

    return () => clearInterval(updateInterval);
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <UserAvatarWindow
        style={styles.userAvatarWindow}
        userName={"User Name"}
      />

      <UserStatWindow style={styles.userStatWindow} />

      <UserMileWindow style={styles.userMileWindow} />

      <UserSettingWindow
        style={styles.userSettingWindow}
        navigation={props.navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#ecf0f1",
  },
  statusBar: {
    backgroundColor: "#ecf0f1",
  },
  topBar: {
    backgroundColor: "#ecf0f1",
  },
  topBarCenter: {
    textAlign: "center",
  },
  topBarText: {
    fontSize: normalize(18),
  },
  topBarLeft: {
    width: normalize(40),
    textAlign: "left",
  },
  topBarRight: {
    width: normalize(40),
    textAlign: "right",
  },
  userAvatarWindow: {
    flex: 2.4,
    justifyContent: "center",
    alignItems: "center",
  },
  userStatWindow: {
    flex: 1.1,
  },
  userMileWindow: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  userSettingWindow: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UserPage;
