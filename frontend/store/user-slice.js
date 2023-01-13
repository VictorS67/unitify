import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    sendNotificationToken: false,
    checkutoLogin: false,
    isLogin: false,
    id: "",
    email: "",
    userName: "",
    championSignature: "",
    currentRank: null,
    championTimes: null,
    likeNumber: null,
    dailyMiles: null,
    monthlyMiles: null,
    totalMiles: null,
    whoILiked: [],
    whoLikedMe: [],
  },
  reducers: {
    login(state, action) {
      const user = action.payload;
      state.id = user._id;
      state.userName = user.username;
      state.isLogin = true;
    },
    logout(state) {
      state.sendNotificationToken = false;
      state.checkutoLogin = false;
      state.isLogin = false;
      state.id = "";
      state.email = "";
      state.userName = "";
      state.championSignature = "";
      state.currentRank = null;
      state.championTimes = null;
      state.likeNumber = null;
      state.dailyMiles = null;
      state.monthlyMiles = null;
      state.totalMiles = null;
      state.whoILiked = [];
      state.whoLikedMe = [];
    },
    checkAutoLogin(state) {
      state.checkutoLogin = true;
    },
    updateLatestUser(state, action) {
      const user = action.payload;
      state.id = user._id;
      state.email = user.email;
      state.userName = user.userName;
      state.championSignature = user.championSignature;
      state.currentRank = user.currentRank;
      state.likeNumber = user.likeNumber;
      state.dailyMiles = user.dailyMiles;
      state.monthlyMiles = user.monthlyMiles;
      state.totalMiles = user.totalMiles;
      state.whoILiked = user.whoILiked;
      state.whoLikedMe = user.whoLikedMe;
    },
    changeChampionSignature(state, action) {
      const championSignature = action.payload;
      state.championSignature = championSignature;
    },
    changeEmail(state, action) {
      const email = action.payload;
      state.email = email;
    },
    sLikeNumber(state, action) {
      const likenumber = action.payload;
      state.likeNumber = likenumber;
      console.log(state, likenumber);
    },
    addWhoILike(state, action) {
      const userId = action.payload;
      state.whoILiked.push(userId);
    },
    sendToken(state) {
      state.sendNotificationToken = true;
    },
    addMiles(state, payload) {
      const miles = action.payload;
      state.dailyMiles =
        state.dailyMiles === null ? miles : state.dailyMiles + miles;
      state.monthlyMiles =
        state.monthlyMiles === null ? miles : state.monthlyMiles + miles;
      state.totalMiles =
        state.totalMiles === null ? miles : state.totalMiles + miles;
    },
    likeSelf(state) {
      state.likeNumber = state.likeNumber === null ? 1 : state.likeNumber + 1;
      if (state.id !== "") {
        state.whoLikedMe.push(state.id);
        state.whoILiked.push(state.id);
      }
    },
    unlikeSelf(state) {
      state.likeNumber = state.likeNumber === null ? 0 : state.likeNumber - 1;
      if (state.id !== "") {
        state.whoLikedMe = state.whoLikedMe.filter((who) => who === state.id);
        state.whoILiked = state.whoILiked.filter((who) => who === state.id);
      }
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
