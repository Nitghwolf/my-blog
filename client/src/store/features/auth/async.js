import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

export const registerUser = createAsyncThunk(
    'auth/registerUser', 
    async ({username, password}) => {
        try{
            const { data } = await axios.post('auth/registration', {
                username, password
            });
            if(data.token){
                window.localStorage.setItem('token', data.token);
            }
            return data;
        }
        catch(error){
            console.log(error);
        }
});

export const loginUser = createAsyncThunk(
    'auth/loginUser', 
    async ({username, password}) => {
        try{
            const { data } = await axios.post('auth/login', {
                username, password
            });
            if(data.token){
                window.localStorage.setItem('token', data.token);
            }
            return data;
        }
        catch(error){
            console.log(error);
        }
});

export const getUser = createAsyncThunk(
    'auth/getUser', 
    async () => {
        try{
            const { data } = await axios.get('auth/getMe');
            return data;
        }
        catch(error){
            console.log(error);
        }
});