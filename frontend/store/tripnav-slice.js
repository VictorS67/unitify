import { createSlice } from '@reduxjs/toolkit';

const tripnavSlice = createSlice({
    name: 'tripnav',
    initialState: { 
        distance: 0.2,
        duration: 320,
        speed: 0.3, 
        pause: 3
    },
    reducers: {
        resetTripNav(state) {
            state.distance = 0.0,
            state.duration = 0,
            state.speed = 0.0, 
            state.pause = 0
        }
    },
});

export const tripnavActions = tripnavSlice.actions;

export default tripnavSlice;
