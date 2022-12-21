import { createSlice } from '@reduxjs/toolkit';

const mapSlice = createSlice({
    name: 'map',
    initialState: { 
        centerLocation: false,
        position: null, // Current position of the user
        travalMode: "DRIVING", // Travel Mode
        origin: null, // Origin information
        destination: null, // Destination information
        polylines: [], // Polylines from origin destination
        markers: [], // Markers with customized text on map
        errorMsg: null, // Error message for getting locations from user
        allDirection: null
    },
    reducers: {
        sPosition(state, action) {
            const position = action.payload;
            state.position = position;
        },
        sTravalMode(state, action) {
            const travalMode = action.payload;
            state.travalMode = travalMode;
        },
        sOrigin(state, action) {
            const origin = action.payload;
            state.origin = origin;
        },
        sDestination(state, action) {
            const destination = action.payload;
            state.destination = destination;
        },
        sPolylines(state, action) {
            const polylines = action.payload;
            state.polylines = polylines;
        },
        sMarkers(state, action) {
            const markers = action.payload;
            state.markers = markers;
        },
        sErrorMsg(state, action) {
            const errorMsg = action.payload;
            state.errorMsg = errorMsg;
        },
        sAllDirection(state, action) {
            const allDirection = action.payload;
            state.allDirection = allDirection;
        },
        toggleCenterLocation(state) {
            state.centerLocation = !state.centerLocation;
        },
        updateDirectionFromAll(state, action) {
            const mode = action.payload;
            state.origin = allDirection[mode].origin;
            state.destination = allDirection[mode].destination;
            state.polylines = allDirection[mode].steps;
            state.markers = allDirection[mode].markers;
        }
    },
});

export const mapActions = mapSlice.actions;

export default mapSlice;
