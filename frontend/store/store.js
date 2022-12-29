import { configureStore } from "@reduxjs/toolkit"

import mapSlice from "./map-slice";
import mainSlice from "./main-slice";
import tripnavSlice from "./tripnav-slice";
import userSlice from "./user-slice";

const store = configureStore({
    reducer: {
        map: mapSlice.reducer,
        main: mainSlice.reducer,
        tripnav: tripnavSlice.reducer,
        user: userSlice.reducer
    },
});

export default store;
