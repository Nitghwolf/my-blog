import { createSlice } from '@reduxjs/toolkit';
import { createPost, getAllPosts, getUserPosts, removePost, updatePost } from './async';

const initialState = {
    posts: [],
    userPosts: [],
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

        //Get user Posts
        [getUserPosts.pending]: (state) => {
            state.isLoading = true;
        },
        [getUserPosts.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.userPosts = action.payload;
        },
        [getUserPosts.rejected]: (state) => {
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

        //Update Post
        [updatePost.pending]: (state) => {
            state.isLoading = true;
        },
        [updatePost.fulfilled]: (state, action) => {
            state.isLoading = false;
            const index = state.posts.findIndex(post => post._id === action.payload._id);
            state.posts[index] = action.payload;
        },
        [updatePost.rejected]: (state) => {
            state.isLoading = false;
        },
    }
});

export default postSlice.reducer;