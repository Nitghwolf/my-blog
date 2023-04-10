import { Router } from "express";
import { createComment } from "../controllers/comment.js";
import { checkAuth } from "../utils/checkAuth.js";

const router = new Router();

//Create comment
//http://localhost:3000/api/comments/:id
router.post('/:id', checkAuth, createComment);

export default router;