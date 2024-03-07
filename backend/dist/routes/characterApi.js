"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const characterController_1 = require("../controllers/characterController");
const characterRouter = express_1.default.Router();
characterRouter.use(auth_1.authenticate);
// GET route to register new user
characterRouter.get("/", characterController_1.getAllCharacters);
// GET route to retrive a user
characterRouter.get("/:id", characterController_1.getCharacterByID);
exports.default = characterRouter;
//# sourceMappingURL=characterApi.js.map