import { createSlice } from '@reduxjs/toolkit';
import { createComment, getPostComments } from './async';

const initialState = {
    comments: [],
    isLoading: false,
};

export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {

    },

    extraReducers: {
        //Create Post
        [createComment.pending]: (state) => {
            state.isLoading = true;
        },
        [createComment.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.comments.push(action.payload);
        },
        [createComment.rejected]: (state) => {
            state.isLoading = false;
        },

        //Get post comments
        [getPostComments.pending]: (state) => {
            state.isLoading = true;
        },
        [getPostComments.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.comments = action.payload;
        },
        [getPostComments.rejected]: (state) => {
            state.isLoading = false;
        },
    },
});

export default commentSlice.reducer;