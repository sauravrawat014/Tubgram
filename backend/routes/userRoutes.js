import { Router } from "express";
import { getMe, login, signup } from "../controllers/userController.js";
import { authUser } from "../middleware/authUser.js";

const userRouter = new Router();

userRouter.post('/login', login);
userRouter.post('/signup', signup);
userRouter.get('/user/me', authUser, getMe); 

export default userRouter;