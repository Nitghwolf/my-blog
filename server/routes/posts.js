import { Router } from "express";
import { createPost, getAllPosts, getPostById, getUserPosts, removePost, updatePost } from "../controllers/posts.js";
import { checkAuth } from "../utils/checkAuth.js";

const router = new Router();

//Create Post
router.post('/', checkAuth, createPost);

//Get all posts
router.get('/', getAllPosts);

//Get post by id
router.get('/:id', getPostById);

//Get my posts
router.get('/user/myposts', checkAuth, getUserPosts);

//Remove post by id
router.delete('/:id', checkAuth, removePost);

//Update post by id
router.put('/:id', checkAuth, updatePost);

export default router;