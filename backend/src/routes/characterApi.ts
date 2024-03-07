import express from "express";
import { authenticate } from "../middlewares/auth";
import { getAllCharacters, getCharacterByID } from "../controllers/characterController";
const characterRouter = express.Router();

characterRouter.use(authenticate);

// GET route to register new user
characterRouter.get("/", getAllCharacters);

// GET route to retrive a user
characterRouter.get("/:id", getCharacterByID);

export default characterRouter;
