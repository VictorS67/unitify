import { configureStore } from "@reduxjs/toolkit"

import mapSlice from "./map-slice";
import mainSlice from "./main-slice";
import tripnavSlice from "./tripnav-slice";
import userSlice from "./user-slice";
import leaderSlice from "./leader-slice";
const store = configureStore({
    reducer: {
        map: mapSlice.reducer,
        main: mainSlice.reducer,
        tripnav: tripnavSlice.reducer,
        user: userSlice.reducer,
        leaderboard: leaderSlice.reducer
    },
});

export default store;
