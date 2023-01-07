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
      const index = state.leaderBoard.findIndex(
        (item) => item.userId === targetId
      );

      state.leaderBoard[index].likeNumber =
        state.leaderBoard[index].likeNumber !== null
          ? state.leaderBoard[index].likeNumber + 1
          : 1;

      state.leaderBoard[index].isLiked = true;
    },
    unlikeUserInLeaderBoard(state, action) {
      const targetId = action.payload;
      const index = state.leaderBoard.findIndex(
        (item) => item.userId === targetId
      );

      state.leaderBoard[index].likeNumber =
        state.leaderBoard[index].likeNumber !== null
          ? state.leaderBoard[index].likeNumber - 1
          : 0;

      state.leaderBoard[index].isLiked = false;
    },
  },
});

export const leaderActions = leaderSlice.actions;

export default leaderSlice;
