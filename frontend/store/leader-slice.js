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
    likeUserInLeaderBoard(state, action) {
      const targetId = action.payload;
      const lead = state.leaderBoard.find((item) => item._id === targetId);
      if (lead !== undefined) {
        lead.likeNumber = lead.likeNumber !== null ? lead.likeNumber + 1 : 1;
      }
    },
    unlikeUserInLeaderBoard(state, action) {
      const targetId = action.payload;
      const lead = state.leaderBoard.find((item) => item._id === targetId);
      if (lead !== undefined) {
        lead.likeNumber = lead.likeNumber !== null ? lead.likeNumber - 1 : 0;
      }
    },
  },
});

export const leaderActions = leaderSlice.actions;

export default leaderSlice;
