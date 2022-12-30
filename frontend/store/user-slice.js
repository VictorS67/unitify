import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: { 
        checkutoLogin: false,
        isLogin: false,
        id: '',
        userName: ''
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
            state.userName = '';
        },
        checkAutoLogin(state) {
            state.checkutoLogin = true;
        }
    },
});

export const userActions = userSlice.actions;

export default userSlice;
