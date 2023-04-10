import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

export const createComment = createAsyncThunk(
    'post/createComment', 
    async ({postId, comment}) => {
        try{
            const { data } = await axios.post(`/comments/${postId}`, {postId, comment});
            return data;
        }
        catch(error){
            console.log(error);
        }
});

export const getPostComments = createAsyncThunk(
    'post/getPostComments', 
    async (postId) => {
        try{
            const { data } = await axios.get(`/posts/comments/${postId}`);
            return data;
        }
        catch(error){
            console.log(error);
        }
});