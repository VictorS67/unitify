import { createSlice } from '@reduxjs/toolkit';
const newData = {
    rank:"10th",
    name: "John 12312313123123131",
    score: Math.floor(Math.random() * 100).toString(),
    iconUrl:
      "https://www.shareicon.net/data/128x128/2016/09/15/829473_man_512x512.png",
    signature:"I am king of the world!"
};
const trialData = [
    { name: 'We Tu Lo', score: 1000,rank: 1, iconUrl: 'https://st2.depositphotos.com/1006318/5909/v/950/depositphotos_59094043-stock-illustration-profile-icon-male-avatar.jpg' },
    { name: 'Adam Savage', score: 12, rank: 2, iconUrl: 'https://www.shareicon.net/data/128x128/2016/09/15/829473_man_512x512.png' },
    { name: 'Derek Black', score: 244, rank: 3, iconUrl: 'http://ttsbilisim.com/wp-content/uploads/2014/09/20120807.png' },
    { name: 'Erika White', score: 0, rank: 4, iconUrl: 'http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-eskimo-girl.png' },
    { name: 'Atony Davis', score: 20, rank: 5, iconUrl: 'https://static.witei.com/static/img/profile_pics/avatar4.png' },
    { name: 'Jimmy Ba', score: 20, rank: 5, iconUrl: 'https://static.witei.com/static/img/profile_pics/avatar4.png' },
    { name: 'Magjic Johnson abasdsdawe123456789434242424242', score: 20, rank: 6, iconUrl: 'https://static.witei.com/static/img/profile_pics/avatar4.png' },
    { name: 'Happy 1', score: 200, rank: 7, iconUrl: 'https://static.witei.com/static/img/profile_pics/avatar4.png' },
    { name: 'Happy 2', score: 202, rank: 9, iconUrl: 'https://static.witei.com/static/img/profile_pics/avatar4.png' },
    { name: 'Happy 3', score: 23, rank: 21, iconUrl: 'https://static.witei.com/static/img/profile_pics/avatar4.png' },
    { name: 'Happy 4', score: 28, rank: 44, iconUrl: 'https://static.witei.com/static/img/profile_pics/avatar4.png' },
    { name: 'Happy 5', score: 60, rank: 111, iconUrl: 'https://static.witei.com/static/img/profile_pics/avatar4.png' },
];

const leaderSlice = createSlice({
    name:'leaderboard',
    initialState:{
        champion: newData,
        users: trialData,
        ismonthly: true,
        // champsig:'',
        weekchampion: newData,
        weeklyusers:trialData,
    },
    reducers:{
        sChampSig(state, action){
            const champion = action.payload;
            state.champion = champion;
        },
        sMonthlyBoard(state, action){
            const users = action.payload;
            state.users = users;
        },
        sWeeklyboard(state, action){
            const weeklyusers = action.payload;
            state.weeklyusers = weeklyusers;
        },
        sWeekChampSig(state, action){
            const weeklychamp = action.payload;
            state.weekchampion = weeklychamp;
        }
    }
})

export const leaderActions = leaderSlice.actions;
export default leaderSlice;