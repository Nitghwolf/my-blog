import { Router } from "express";
import { createPost, getAllPosts, getPostById } from "../controllers/posts.js";
import { checkAuth } from "../utils/checkAuth.js";

const router = new Router();

//Create Post
router.post('/', checkAuth, createPost);

//Get all posts
router.get('/', getAllPosts);

//Get post by id
router.get('/:id', getPostById);


export default router;