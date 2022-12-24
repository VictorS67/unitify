import React, { useEffect, useState, useRef } from "react";
import { Text, View, StyleSheet, Pressable, Alert, Platform } from 'react-native';
import { Provider, useSelector, useDispatch } from "react-redux";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import * as Device from 'expo-device';
import * as TaskManager from 'expo-task-manager';
import * as Location from "expo-location";

import LoginUser from "./Users/LoginUser";
import MainPage from "./Main/Main";
import UserPage from "./Users/UserPage";
import Map from "./Map/Map";
import Card from "./UI/Card";
import { updateNavInfo } from "./store/map-actions";
import { mapActions } from "./store/map-slice";
import { mainActions } from "./store/main-slice";
import { normalize } from "./Tool/FontSize";

const NOTIFICATION_TASK_NAME = "BACKGROUND-NOTIFICATION-TASK";

TaskManager.defineTask(NOTIFICATION_TASK_NAME, ({ data, error }) => {
    if (error) {
        // Error occurred - check `error.message` for more details.
        return;
    }
    if (data) {
        // do something with the locations captured in the background

        console.log("notification: ", data);
        return;
    }
});

Notifications.registerTaskAsync(NOTIFICATION_TASK_NAME);

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

function Notification() {

    const dispatch = useDispatch();
    const tripnav = useSelector((state) => state.tripnav);

    const [expoPushToken, sExpoPushToken] = useState('');
    const [notification, sNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    const triggerNotifications = async () => {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "This is a title",
                body: "Here is the notification body",
                data: {
                    data: "this is data"
                },
                sound: true,
            },
            trigger: {
                seconds: 2
            }
        });

        return "send!";
    }

    const registerForPushNotificationsAsync = async (dispatch) => {
        let token;

        if (Platform.OS === "andriod") {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;

            if (existingStatus !== "granted") {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }

            if (finalStatus !== "granted") {
                dispatch(mapActions.sErrorMsg(
                    {
                        message: 'Notification: Failed to get push token for push notification!'
                    }
                ));

                return;
            }

            token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log("token: ", token);
        } else {
            dispatch(mapActions.sErrorMsg(
                {
                    message: 'Notification: Must use physical device for Push Notifications'
                }
            ));
        }

        return token;
    }

    useEffect(() => {
        registerForPushNotificationsAsync(dispatch).then(token => sExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            sNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log("response: ", response);
        })

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        }
    }, [dispatch]);

    useEffect(() => {
        console.log("speed: ", tripnav.speed);
        triggerNotifications().then(result => console.log("result: ", result));
    }, [tripnav.speed])

    return (
        null
    );
}

export default Notification;
