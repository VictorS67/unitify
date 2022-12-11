import { createSlice } from '@reduxjs/toolkit';

const mapSlice = createSlice({
    name: 'map',
    initialState: { 
        position: null, // Current position of the user
        travalMode: "DRIVING", // Travel Mode
        origin: null, // Origin information
        destination: null, // Destination information
        polylines: [], // Polylines from origin destination
        markers: [], // Markers with customized text on map
        errorMsg: null // Error message for getting locations from user
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
        }
    },
});

export const mapActions = mapSlice.actions;

export default mapSlice;
