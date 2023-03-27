import { Router } from "express";
import { createPost, getAllPosts } from "../controllers/posts.js";
import { checkAuth } from "../utils/checkAuth.js";

const router = new Router();

//Create Post
router.post('/', checkAuth, createPost);

//Get all posts
router.get('/', getAllPosts);


export default router;