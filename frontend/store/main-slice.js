import { createSlice } from '@reduxjs/toolkit';

const mainSlice = createSlice({
    name: 'main',
    initialState: { 
        keyboardStatus: false,
        scrollHeight: 30,
        pageY: null,
        pageYOffest: 0,
        maxHeight: 17,
        minHeight: 17,
        navStatus: "INIT", // "INIT" -> "PLAN" -> "NAV"
    },
    reducers: {
        sKeyboardStatus(state, action) {
            const keyboardStatus = action.payload;
            state.keyboardStatus = keyboardStatus;
        },
        sScrollHeight(state, action) {
            const scrollHeight = action.payload;
            state.scrollHeight = scrollHeight;
        },
        sPageY(state, action) {
            const pageY = action.payload;
            state.pageY = pageY;
        },
        sPageYOffest(state, action) {
            const pageYOffest = action.payload;
            state.pageYOffest = pageYOffest;
        },
        sMinHeight(state, action) {
            const minHeight = action.payload;
            state.minHeight = minHeight;
        },
        resetPageY(state) {
            state.pageYOffest = 0;
            state.pageY = null;
        },
        cropScrollHeight(state) {
            state.scrollHeight = Math.max(Math.min(state.scrollHeight, state.minHeight), state.maxHeight);
        },
        moveToNextNavStatus(state) {
            if (state.navStatus === "INIT") {
                state.navStatus = "PLAN";
                state.minHeight = 50;
            } else if (state.navStatus === "PLAN") {
                state.navStatus = "NAV";
                state.minHeight = 63;
            } else if (state.navStatus === "NAV") {
                state.navStatus === "INIT";
                state.minHeight = 17;
            }
        }
    },
});

export const mainActions = mainSlice.actions;

export default mainSlice;
