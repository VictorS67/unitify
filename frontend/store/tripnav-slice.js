import { createSlice } from "@reduxjs/toolkit";

const tripnavSlice = createSlice({
  name: "tripnav",
  initialState: {
    distance: 0.0,
    duration: 0,
    speed: 0.0,
    pause: 0,
    idleTimestamp: null,
    startTimestamp: null,
    isPaused: false,
    isTerminated: false,
    isColdTerminated: false,
    coldTerminatedInfo: "",
    travalDurations: [], // Travel Mode during navigation
    currTravalMode: "DRIVING",
    otherTravalDistance: 0.0,
  },
  reducers: {
    resetTripNav(state) {
      state.distance = 0.0;
      state.duration = 0;
      state.speed = 0.0;
      state.pause = 0;
      state.coldTerminatedInfo = "";
      state.isColdTerminated = false;
      state.isPaused = false;
      state.isTerminated = false;
      state.idleTimestamp = null;
      state.startTimestamp = null;
      state.travalDurations = [];
      state.otherTravalDistance = 0.0;
      state.currTravalMode = "DRIVING";
    },
    addTravalMode(state, action) {
      if (state.isPaused || state.isTerminated || state.isColdTerminated)
        return;

      const travalMode = action.payload;

      console.log("travalDurations: ", state.travalDurations);
      console.log("new TravalMode: ", travalMode);

      if (state.startTimestamp === null || state.travalDurations.length === 0) {
        if (travalMode === "CURRENT") return;

        state.startTimestamp = Date.now();
        state.travalDurations.push({
          travalMode: travalMode,
          duration: 0,
          distance: 0.0,
        });
        state.currTravalMode = travalMode;
        state.otherTravalDistance = state.distance;
        return;
      }

      if (
        travalMode === "CURRENT" ||
        travalMode ===
          state.travalDurations[state.travalDurations.length - 1].travalMode
      ) {
        state.travalDurations[state.travalDurations.length - 1] = {
          travalMode:
            state.travalDurations[state.travalDurations.length - 1].travalMode,
          duration: Number(
            ((Date.now() - state.startTimestamp) / 1000).toFixed(0)
          ),
          distance: state.distance - state.otherTravalDistance,
        };
      } else {
        console.log("what is my travalMode? ", travalMode);
        state.startTimestamp = Date.now();
        state.travalDurations.push({
          travalMode: travalMode,
          duration: 0,
          distance: 0.0,
        });
        state.currTravalMode = travalMode;
        state.otherTravalDistance = state.distance;
      }
    },
    sSpeed(state, action) {
      if (state.isPaused || state.isTerminated || state.isColdTerminated)
        return;

      const speed = action.payload;
      state.speed = speed;

      console.log("date now: ", Date.now());
      console.log("idleTimestamp: ", state.idleTimestamp);

      if (speed !== 0) {
        state.idleTimestamp = null;
        state.idleTimestamp = Date.now();
      } else if (state.idleTimestamp === null) {
        state.idleTimestamp = Date.now();
      } else if (Math.floor((Date.now() - state.idleTimestamp) / 1000) > 300) {
        // Auto-Terminated (Cold) if user is paused for 5 mins
        state.isColdTerminated = true;
        state.coldTerminatedInfo = "You are idle for 5 minutes! ";
      }
    },
    addDistance(state, action) {
      if (state.isPaused || state.isTerminated || state.isColdTerminated)
        return;

      const distance = action.payload;

      console.log("add distance: ", distance);
      state.distance += distance;
    },
    addDuration(state, action) {
      if (state.isPaused || state.isTerminated || state.isColdTerminated)
        return;

      const duration = action.payload;

      console.log("add duration: ", duration);
      state.duration += duration;
    },
    togglePause(state) {
      if (state.isTerminated || state.isColdTerminated) return;

      if (!state.isPaused) {
        state.pause += 1;
        state.speed = 0;
      }

      state.isPaused = !state.isPaused;
    },
    terminate(state) {
      state.isTerminated = true;
    },
    coldTerminate(state) {
      state.isColdTerminated = true;
    },
  },
});

export const tripnavActions = tripnavSlice.actions;

export default tripnavSlice;
