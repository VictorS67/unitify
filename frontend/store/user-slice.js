import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: { 
        checkutoLogin: false,
        isLogin: false,
        id: '',
        email: '',
        userName: '',
        championSignature: '',
        currentRank: null,
        championTimes: null,
        likeNumber: null,
        monthlyMiles: null,
        totalMiles: null,
        whoIliked:[],
        whoLikedMe:[],
    },
    reducers: {
        login(state, action) {
            const user = action.payload;
            state.id = user._id;
            state.userName = user.username;
            state.isLogin = true;
        },
        logout(state) {
            state.checkutoLogin = false;
            state.isLogin = false;
            state.id = '';
            state.email = '';
            state.userName = '';
            state.championSignature = '';
            state.currentRank = null;
            state.championTimes = null;
            state.likeNumber = null;
            state.monthlyMiles = null;
            state.totalMiles = null;
        },
        checkAutoLogin(state) {
            state.checkutoLogin = true;
        },
        updateLatestUser(state, action) {
            const user = action.payload;

            console.log("update latest user: ", user)

            state.id = user._id;
            state.email = user.email;
            state.userName = user.userName;
            state.championSignature = user.championSignature;
            state.currentRank = user.currentRank;
            state.likeNumber = user.likeNumber;
            state.monthlyMiles = user.monthlyMiles;
            state.totalMiles = user.totalMiles;
            //I added these two
            state.whoIliked = user.whoIliked;
            state.whoLikedMe = user.whoLikedMe;

            console.log("state.totalMiles: ", state.totalMiles)
        },
        changeChampionSignature(state, action) {
            const championSignature = action.payload;
            state.championSignature = championSignature;
        },
        changeEmail(state, action) {
            const email = action.payload;
            state.email = email;
        },
        sLikeNumber(state, action){
            const likenumber = action.payload;
            state.likeNumber = likenumber;
            console.log(state,likenumber);
        }
    },
});

export const userActions = userSlice.actions;

export default userSlice;
