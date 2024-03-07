"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("./../controllers/userController");
const auth_1 = require("../middlewares/auth");
const userRouter = express_1.default.Router();
// POST route to register new user
userRouter.post("/register", userController_1.register);
// POST route to login a user
userRouter.post("/login", userController_1.login);
// GET route to retrieve a user
userRouter.get("/:username", userController_1.getUser);
// GET route to retreive just user favorites
userRouter.get("/:username/favorite", auth_1.authenticate, userController_1.getUserFavorites);
// PUT route to update user favorites
userRouter.put("/:username/favorite", auth_1.authenticate, userController_1.markAsFavoriteHandler);
exports.default = userRouter;
//# sourceMappingURL=user.js.map