import { createSlice } from '@reduxjs/toolkit';
import { createPost, getAllPosts, removePost } from './async';

const initialState = {
    posts: [],
    popularPosts: [],
    isLoading: false
};

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {

    },

    extraReducers: {
        //Create Post
        [createPost.pending]: (state) => {
            state.isLoading = true;
        },
        [createPost.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.posts.push(action.payload);
        },
        [createPost.rejected]: (state) => {
            state.isLoading = false;
        },

        //Get All Posts
        [getAllPosts.pending]: (state) => {
            state.isLoading = true;
        },
        [getAllPosts.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.posts = action.payload.posts;
            state.popularPosts = action.payload.popularPosts;
        },
        [getAllPosts.rejected]: (state) => {
            state.isLoading = false;
        },

        //Delete post
        [removePost.pending]: (state) => {
            state.isLoading = true;
        },
        [removePost.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.posts = state.posts.filter(post => post._id !== action.payload._id);
        },
        [removePost.rejected]: (state) => {
            state.isLoading = false;
        },
    }
});

export default postSlice.reducer;