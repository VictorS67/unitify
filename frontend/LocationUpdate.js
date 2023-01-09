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
let foregroundSubscription = null;

function LocationUpdate() {
  const dispatch = useDispatch();
  const map = useSelector((state) => state.map);
  const main = useSelector((state) => state.main);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    (async () => {
      // Check if foreground permission is granted
      const { granted } = await Location.getForegroundPermissionsAsync();
      if (!granted) {
        console.log("Foreground: location tracking denied");
        return;
      }

      const hasStarted = await Location.hasStartedLocationUpdatesAsync(
        LOCATION_TASK_NAME
      );
      if (hasStarted) {
        await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
        console.log("Foreground: Background Location tacking stopped");
      }

      // Make sure that foreground location tracking is not running
      foregroundSubscription?.remove();

      // Start watching position in real-time
      foregroundSubscription = await Location.watchPositionAsync(
        {
          // For better logs, we set the accuracy to the most sensitive option
          accuracy: Location.Accuracy.BestForNavigation,
        },
        (curr_location) => {
          console.log("Foreground: location update");
          if (main.navStatus !== "NAV") {
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
      );
    })();

    (async () => {
      // Don't track position if permission is not granted
      const { granted } = await Location.getBackgroundPermissionsAsync();
      if (!granted) {
        console.log("Background: location tracking denied");
        return;
      }

      // Make sure the task is defined otherwise do not start tracking
      const isTaskDefined = await TaskManager.isTaskDefined(LOCATION_TASK_NAME);
      if (!isTaskDefined) {
        console.log("Background: Task is not defined");

        TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
          if (error) {
            // Error occurred - check `error.message` for more details.
            return;
          }
          if (data) {
            const { locations } = data;
            const curr_location = locations[0];
            if (curr_location) {
              console.log("Location in background", curr_location);
              if (main.navStatus !== "NAV") {
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
          }
        });
        return;
      }

      foregroundSubscription?.remove();

      // Don't track if it is already running in background
      const hasStarted = await Location.hasStartedLocationUpdatesAsync(
        LOCATION_TASK_NAME
      );
      if (hasStarted) {
        console.log("Background: Already started");
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
  }, [dispatch]);

  return null;
}

export default LocationUpdate;
