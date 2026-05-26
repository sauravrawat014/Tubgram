import { Router } from "express";
import { authUser } from "../middleware/authUser.js";
import { getTop, saveInteraction } from "../controllers/interactionController.js";

const interactionRouter = new Router();

interactionRouter.get('/top',authUser, getTop);
interactionRouter.post('/save',authUser,saveInteraction);

export default interactionRouter;