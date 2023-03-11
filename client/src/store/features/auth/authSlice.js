import { createSlice } from '@reduxjs/toolkit';
import { getUser, loginUser, registerUser } from './async';


const initialState = {
    user: null,
    token: null,
    isLoading: false,
    status: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isLoading = false;
            state.status = null;
        }
    },

    extraReducers: {
        //registration User
        [registerUser.pending]: (state) => {
            state.isLoading = true;
            state.status = null;
        },
        [registerUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.status = action.payload.message;
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        [registerUser.rejected]: (state, action) => {
            state.status = action.payload.message;
            state.isLoading = false;
        },
        // login User
        [loginUser.pending]: (state) => {
            state.isLoading = true;
            state.status = null;
        },
        [loginUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.status = action.payload.message;
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        [loginUser.rejected]: (state, action) => {
            state.status = action.payload.message;
            state.isLoading = false;
        },
        // get User token
        [getUser.pending]: (state) => {
            state.isLoading = true;
            state.status = null;
        },
        [getUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.status = null;
            state.user = action.payload?.user;
            state.token = action.payload?.token;
        },
        [getUser.rejected]: (state, action) => {
            state.status = action.payload.message;
            state.isLoading = false;
        },
    }
});

export const { logout } = authSlice.actions;

export const checkIsAuth = (state) => Boolean(state.auth.token);

export default authSlice.reducer;