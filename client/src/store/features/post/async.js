import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

export const createPost = createAsyncThunk(
    'post/createPost', 
    async (params) => {
        try{
            const { data } = await axios.post('/posts', params);
            return data;
        }
        catch(error){
            console.log(error);
        }
});

export const getAllPosts = createAsyncThunk(
    'post/getAllPosts', 
    async () => {
        try{
            const { data } = await axios.get('/posts');
            return data;
        }
        catch(error){
            console.log(error);
        }
});

export const removePost = createAsyncThunk(
    'post/removePost', 
    async (id) => {
        try{
            const { data } = await axios.delete(`/posts/${id}`, id);
            return data;
        }
        catch(error){
            console.log(error);
        }
});