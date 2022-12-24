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
        allDirection: null,
        updateInfo: true,
        zoom: false
    },
    reducers: {
        sPosition(state, action) {
            const position = action.payload;

            let zoom = 0.02;
            if (state.zoom === true) {
                zoom = 0.002;
            }

            state.position = {
                ...position,
                latitudeDelta: zoom, 
                longitudeDelta: zoom
            };

            console.log("POSITION: ", state.position)
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
            state.origin = state.allDirection[mode].origin;
            state.destination = state.allDirection[mode].destination;
            state.polylines = state.allDirection[mode].steps;
            state.markers = state.allDirection[mode].markers;
        },
        updatingInfo(state) {
            state.updateInfo = true;
        },
        updatingInfoComplete(state) {
            state.updateInfo = false;
        },
        zoomIn(state) {
            state.zoom = true;

            state.position = {
                ...state.position,
                latitudeDelta: 0.002, 
                longitudeDelta: 0.002
            };

            state.centerLocation = true;

            console.log("POSITION: ", state.position);
        },
        zoomOut(state) {
            state.zoom = false;

            state.position = {
                ...state.position,
                latitudeDelta: 0.02, 
                longitudeDelta: 0.02
            };

            state.centerLocation = true;

            console.log("POSITION: ", state.position);
        },
        resetMap(state) {
            state.travalMode = "DRIVING"; // Travel Mode
            state.origin = null; // Origin information
            state.destination = null; // Destination information
            state.polylines = []; // Polylines from origin destination
            state.markers = []; // Markers with customized text on map
            state.allDirection = null;
        }
    },
});

export const mapActions = mapSlice.actions;

export default mapSlice;
