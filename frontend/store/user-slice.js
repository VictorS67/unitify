import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: { 
        isLogin: false
    },
    reducers: {
        login(state) {
            state.isLogin = true;
        },
        logout(state) {
            state.isLogin = false;
        }
    },
});

export const userActions = userSlice.actions;

export default userSlice;
