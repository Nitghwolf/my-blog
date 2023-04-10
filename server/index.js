import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import fileUpload from 'express-fileupload';

import authRouter from './routes/auth.js';
import postRouter from './routes/posts.js';
import commentRouter from './routes/comment.js';

const app = express();
dotenv.config();

//Constants
const PORT = process.env.PORT || 3000;
const USER = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

//Middleware
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.static('uploads'));

//Routes
app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
app.use('/api/comments', commentRouter);

async function start(){
    try{
        await mongoose.connect(
            `mongodb+srv://${USER}:${PASSWORD}@cluster0.37n7kwl.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
        );

        app.listen(PORT, () => console.log(`Server started on ${PORT} port`))
    }
    catch (error){
        console.log(error);
    }
};

start();