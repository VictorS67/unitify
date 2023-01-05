import { createSlice } from "@reduxjs/toolkit";

const leaderSlice = createSlice({
  name: "leaderboard",
  initialState: {
    champion: null,
    leaderBoard: [],
    isMonth: true,
  },
  reducers: {
    sChampSig(state, action) {
      const champion = action.payload;
      state.champion = champion;
    },
    sBoard(state, action) {
      const leaderboard = action.payload;
      state.leaderBoard = leaderboard;
    },
    sIsMonth(state, action) {
      const isMonth = action.payload;
      state.isMonth = isMonth;
    },
  },
});

export const leaderActions = leaderSlice.actions;

export default leaderSlice;
