import { createSlice } from '@reduxjs/toolkit';

const tripnavSlice = createSlice({
    name: 'tripnav',
    initialState: { 
        distance: 0.0,
        duration: 0,
        speed: 0.0, 
        pause: 0,
        idleTimestamp: null,
        startTimestamp: null,
        isPaused: false,
        isTerminated: false, 
        travalDurations: [], // Travel Mode during navigation
        currTravalMode: "DRIVING",
        otherTravalDistance: 0.0,
        travalModes: [],
        polylines: [], // Polylines from initial position during navigation
    },
    reducers: {
        resetTripNav(state) {
            state.distance = 0.0;
            state.duration = 0;
            state.speed = 0.0; 
            state.pause = 0;
        },
        addTravalMode(state, action) {
            const travalMode = action.payload;

            console.log("travalDurations: ", state.travalDurations);
            console.log("new TravalMode: ", travalMode);
                        
            if (state.startTimestamp === null || state.travalDurations.length === 0) {
                if (travalMode === "CURRENT") return;

                state.startTimestamp = Date.now();
                state.travalDurations.push({
                    travalMode: travalMode,
                    duration: 0,
                    distance: 0.0
                });
                state.currTravalMode = travalMode;
                state.otherTravalDistance = state.distance;
                return;
            }

            if (
                travalMode === "CURRENT" || 
                travalMode === state.travalDurations[state.travalDurations.length - 1].travalMode
            ) {
                state.travalDurations[state.travalDurations.length - 1] = {
                    travalMode: state.travalDurations[state.travalDurations.length - 1].travalMode,
                    duration: Number(((Date.now() - state.startTimestamp) / 1000).toFixed(0)),
                    distance: state.distance - state.otherTravalDistance
                };
            } else {
                console.log("what is my travalMode? ", travalMode);
                state.startTimestamp = Date.now();
                state.travalDurations.push({
                    travalMode: travalMode,
                    duration: 0,
                    distance: 0.0
                });
                state.currTravalMode = travalMode;
                state.otherTravalDistance = state.distance;
            }
        },
        sPolylines(state, action) {
            const polylines = action.payload;
            state.polylines = polylines;
        },
        sSpeed(state, action) {
            if (state.isPaused === false) {
                const speed = action.payload;
                state.speed = speed;
    
                if (speed !== 0) {
                    state.idleTimestamp = null;
                    state.idleTimestamp = Date.now();
                } else if (state.idleTimestamp === null) {
                    state.idleTimestamp = Date.now();
                } else if (Math.floor(Date.now() - state.idleTimestamp / 1000) > 300) {
                    // Auto-Terminated if user is paused for 2 mins
                    state.isTerminated = true;
                }
            }
        },
        addDistance(state, action) {
            if (state.isPaused === false) {
                const distance = action.payload;

                console.log("add distance: ", distance);
                state.distance += distance;
            }
        },
        addDuration(state, action) {
            if (state.isPaused === false) {
                const duration = action.payload;

                console.log("add duration: ", duration);
                state.duration += duration;
            }
        },
        togglePause(state) {
            if (state.isPaused === false) {
                state.pause += 1;
                state.speed = 0;
            }

            state.isPaused = !state.isPaused;
        }
    },
});

export const tripnavActions = tripnavSlice.actions;

export default tripnavSlice;
