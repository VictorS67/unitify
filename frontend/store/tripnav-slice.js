import { createSlice } from '@reduxjs/toolkit';

const tripnavSlice = createSlice({
    name: 'tripnav',
    initialState: { 
        distance: 0.2,
        duration: 320,
        speed: 0.3, 
        pause: 3,
        travalModes: [], // Travel Mode during navigation
        polylines: [], // Polylines from initial position during navigation
    },
    reducers: {
        resetTripNav(state) {
            state.distance = 0.0,
            state.duration = 0,
            state.speed = 0.0, 
            state.pause = 0
        },
        sTravalModes(state, action) {
            const travalModes = action.payload;
            state.travalModes = travalModes;
        },
        sPolylines(state, action) {
            const polylines = action.payload;
            state.polylines = polylines;
        }
    },
});

export const tripnavActions = tripnavSlice.actions;

export default tripnavSlice;
