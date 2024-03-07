import express from "express";
import { register, login, markAsFavoriteHandler, getUser, getUserFavorites } from "./../controllers/userController";
import { authenticate } from "../middlewares/auth";

const userRouter = express.Router();

// POST route to register new user
userRouter.post("/register", register);

// POST route to login a user
userRouter.post("/login", login);

// GET route to retrieve a user
userRouter.get("/:username", getUser);

// GET route to retreive just user favorites
userRouter.get("/:username/favorite", authenticate, getUserFavorites);

// PUT route to update user favorites
userRouter.put("/:username/favorite", authenticate, markAsFavoriteHandler);

export default userRouter;
