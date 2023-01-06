import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Pressable, Alert } from "react-native";
import { Provider, useSelector, useDispatch } from "react-redux";
import * as Notifications from "expo-notifications";
import * as TaskManager from "expo-task-manager";
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

const LOCATION_TASK_NAME = "background-location-task";

function Background() {
  const dispatch = useDispatch();
  const map = useSelector((state) => state.map);
  const main = useSelector((state) => state.main);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    console.log("BACKGROUND START");
    if (user.isLogin) {
      if (map.position === null) {
        // dispatch(mapActions.initUpdate());

        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== "granted") {
            dispatch(
              mapActions.sErrorMsg({
                message: "Permission to access location was denied",
              })
            );
            return;
          }

          let curr_location = await Location.getCurrentPositionAsync({});
          // console.log("init position: ", curr_location);
          dispatch(
            mapActions.sPosition({
              ...curr_location.coords,
              timestamp: curr_location.timestamp,
            })
          );
        })();
      } else {
        // console.log("update: ", map.initUpdateTask);
        TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
          if (error) {
            // Error occurred - check `error.message` for more details.
            return;
          }
          if (data) {
            const { locations } = data;
            // do something with the locations captured in the background
            console.log("Background: ", locations);
            console.log("map.position: ", map.position);
            console.log("main.navStatus: ", main.navStatus);

            let curr_location = locations[locations.length - 1];

            if (map.position === null || main.navStatus !== "NAV") {
              dispatch(
                mapActions.sPosition({
                  ...curr_location.coords,
                  timestamp: curr_location.timestamp,
                })
              );
            } else if (main.navStatus === "NAV") {
              dispatch(
                updateNavInfo(map.position, {
                  ...curr_location.coords,
                  timestamp: curr_location.timestamp,
                })
              ).then(() => {
                dispatch(
                  mapActions.sPosition({
                    ...curr_location.coords,
                    timestamp: curr_location.timestamp,
                  })
                );
              });
            }
          }
        });

        (async () => {
          let { status: foregroundStatus } =
            await Location.requestForegroundPermissionsAsync();
          let { status: backgroundStatus } =
            await Location.requestBackgroundPermissionsAsync();

          if (foregroundStatus !== "granted") {
            dispatch(
              mapActions.sErrorMsg({
                message: "Foreground: Permission to access location was denied",
              })
            );
            return;
          }

          if (backgroundStatus !== "granted") {
            dispatch(
              mapActions.sErrorMsg({
                message: "Background: Permission to access location was denied",
              })
            );
            return;
          }

          await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
            accuracy: Location.Accuracy.BestForNavigation,
            timeInterval: 5000,
            distanceInterval: 0,
            showsBackgroundLocationIndicator: true,
            foregroundService: {
              notificationTitle: "Location",
              notificationBody: "Location tracking in background",
              notificationColor: "#fff",
            },
          });
        })();
      }
    } else {
      TaskManager.isTaskRegisteredAsync(LOCATION_TASK_NAME).then(
        (isRegistered) => {
          console.log(
            "isDefined: ",
            TaskManager.isTaskDefined(LOCATION_TASK_NAME)
          );
          console.log("isRegistered: ", isRegistered);
          console.log("user not login: ", !user.isLogin);
          if (
            !user.isLogin &&
            isRegistered &&
            TaskManager.isTaskDefined(LOCATION_TASK_NAME)
          ) {
            async () => {
              await TaskManager.unregisterTaskAsync(LOCATION_TASK_NAME);
            };
          }
          console.log();
        }
      );
    }
  }, [map.position, user.isLogin, dispatch]);

  // useEffect(() => {
  //     sPrevPosition(map.position);

  //     console.log("prevPosition: ", prevPosition);
  // }, [map.position]);

  return null;
}

export default Background;
