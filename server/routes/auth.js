import { Router } from "express";
import { getMe, login, registration } from "../controllers/auth.js";
import { checkAuth } from "../utils/checkAuth.js";

const router = new Router();

//Registration
router.post('/registration', registration);

//Login
router.post('/login', login);

//Get profile user
router.get('/getMe', checkAuth, getMe);

export default router;