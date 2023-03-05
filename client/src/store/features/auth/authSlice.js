import { createSlice } from '@reduxjs/toolkit';
import { registerUser } from './async';


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

    },

    extraReducers: {
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
    }
});


export default authSlice.reducer;