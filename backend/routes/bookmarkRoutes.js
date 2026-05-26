import { Router } from "express";
import { addBookmark, deleteBookmark, getBookmark } from "../controllers/bookmarkController.js";
import { authUser } from "../middleware/authUser.js";

const bookmarkRouter = new Router();

bookmarkRouter.post('/add',authUser, addBookmark);
bookmarkRouter.get('/get',authUser, getBookmark);
bookmarkRouter.delete('/delete',authUser,deleteBookmark);
export default bookmarkRouter;