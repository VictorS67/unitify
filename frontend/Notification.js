import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Alert,
  Platform,
} from "react-native";
import { Provider, useSelector, useDispatch } from "react-redux";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import * as Device from "expo-device";
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";

import LoginUser from "./Users/LoginUser";
import MainPage from "./Main/Main";
import UserPage from "./Users/UserPage";
import Map from "./Map/Map";
import Card from "./UI/Card";
import { updateNavInfo } from "./store/map-actions";
import { mapActions } from "./store/map-slice";
import { updateNotificationToken } from "./store/user-actions";
import { mainActions } from "./store/main-slice";
import { normalize } from "./Tool/FontSize";

const NOTIFICATION_TASK_NAME = "BACKGROUND-NOTIFICATION-TASK";

// const handleNewNotification = async (notificationObject) => {
//   try {
//     // const newNotification = {
//     //     id: notificationObject.messageId,
//     //     date: notificationObject.sentTime,
//     //     title: notificationObject.data.title,
//     //     body: notificationObject.data.message,
//     //     data: JSON.parse(notificationObject.data.body),
//     // }
//     // add the code to do what you need with the received notification  and, e.g., set badge number on app icon
//     // console.log("new notification: ", notificationObject);
//     await Notifications.setBadgeCountAsync(1);
//   } catch (error) {
//     console.error(error);
//   }
// };

// TaskManager.defineTask(
//   NOTIFICATION_TASK_NAME,
//   ({ data, error, executionInfo }) => {
//     console.log("define task...");
//     handleNewNotification(data);
//   }
// );

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

function Notification() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [expoPushToken, sExpoPushToken] = useState("");
  const [notification, sNotification] = useState(null);
  const notificationListener = useRef();
  const responseListener = useRef();

  // const triggerNotifications = async () => {
  //     await Notifications.scheduleNotificationAsync({
  //         content: {
  //             title: "This is a title",
  //             body: "Here is the notification body",
  //             data: {
  //                 data: "this is data"
  //             },
  //             sound: true,
  //         },
  //         trigger: {
  //             seconds: 2
  //         }
  //     });

  //     return "send!";
  // }

  const registerForPushNotificationsAsync = async (dispatch) => {
    let token;

    if (Platform.OS === "andriod") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        dispatch(
          mapActions.sErrorMsg({
            message:
              "Notification: Failed to get push token for push notification!",
          })
        );

        return;
      }

      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log("token: ", token);
    } else {
      dispatch(
        mapActions.sErrorMsg({
          message:
            "Notification: Must use physical device for Push Notifications",
        })
      );
    }

    return token;
  };

  useEffect(() => {
    // register task to run whenever is received while the app is in the background
    Notifications.registerTaskAsync(NOTIFICATION_TASK_NAME);

    registerForPushNotificationsAsync(dispatch).then((token) => {
      sExpoPushToken(token);
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("notification listener: ", notification);
        sNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        // console.log("response: ", response);
        // console.log("response trigger: ", response.trigger);
        // handleNewNotification(response, () => {});
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
      Notifications.unregisterTaskAsync(NOTIFICATION_TASK_NAME);
    };
  }, [dispatch]);

  useEffect(() => {
    if (
      user.id !== "" &&
      expoPushToken !== "" &&
      user.sendNotificationToken === false
    ) {
      dispatch(updateNotificationToken(user.id, expoPushToken));
    }
  }, [user.id, expoPushToken, dispatch]);

  // useEffect(() => {
  //     const interval = setInterval(() => {
  //         triggerNotifications().then(result => console.log("result: ", result));
  //     }, 5 * 6000);

  //     return () => clearInterval(interval);
  // }, [])

  // useEffect(() => {
  //   handleNewNotification(notification);
  // }, [notification]);

  return null;
}

export default Notification;
