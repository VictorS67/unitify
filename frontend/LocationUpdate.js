import React, { useEffect, useState, useRef } from "react";
import { AppState } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";

import { updateNavInfo } from "./store/map-actions";
import { mapActions } from "./store/map-slice";

const LOCATION_TASK_NAME = "background-location-task";
let foregroundSubscription = null;

function LocationUpdate() {
  const dispatch = useDispatch();
  const map = useSelector((state) => state.map);
  const main = useSelector((state) => state.main);

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [position, sPosition] = useState(null);

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
        sPosition(curr_location);
      }
    }
  });

  const updateLocationForeground = async () => {
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
        timeInterval: 5000,
        distanceInterval: 0,
      },
      (curr_location) => {
        console.log("Foreground: location update", curr_location);
        sPosition(curr_location);
      }
    );
  };

  const updateLocationBackground = async () => {
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
  };

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log("App has come to the foreground!");
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log("AppState", appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (appStateVisible.match(/inactive|background/)) {
      updateLocationBackground();
    } else {
      updateLocationForeground();
    }
  }, [appStateVisible]);

  useEffect(() => {
    if (position !== null) {
      console.log("Update Position to server: ", position);
      if (main.navStatus !== "NAV") {
        dispatch(
          mapActions.sPosition({
            ...position.coords,
            timestamp: position.timestamp,
          })
        );
      } else if (main.navStatus === "NAV") {
        dispatch(
          updateNavInfo(map.position, {
            ...position.coords,
            timestamp: position.timestamp,
          })
        ).then(() => {
          dispatch(
            mapActions.sPosition({
              ...position.coords,
              timestamp: position.timestamp,
            })
          );
        });
      }
    }
  }, [main.navStatus, position, dispatch]);

  return null;
}

export default LocationUpdate;
