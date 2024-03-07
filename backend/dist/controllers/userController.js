"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.markAsFavoriteHandler = exports.getUserFavorites = exports.getUser = exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("./../models/user"));
const user_2 = require("../services/user");
const register = async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(422).json({
                message: 'Unprocessable entity: missing params',
            });
        }
        const verifyUsername = await user_1.default.findOne({ username: req.body.username });
        if (verifyUsername) {
            return res.status(409).json({
                message: "Username already exists"
            });
        }
        else {
            if (req.body.username.length < 8) {
                return res.status(403).json({
                    message: 'Username must contain at least 8 characters',
                });
            }
            const hashPassword = await bcryptjs_1.default.hash(req.body.password, 10);
            const user = new user_1.default({
                username: req.body.username,
                password: hashPassword,
            });
            const response = await user.save();
            return res.status(201).json({
                message: 'User created successfully',
                result: response,
            });
        }
    }
    catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const user = await user_1.default.findOne({ username: req.body.username });
        if (!user) {
            return res.status(401).json({
                message: "Authentication failed",
            });
        }
        else {
            const isPasswordValid = await bcryptjs_1.default.compare(req.body.password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({
                    message: "Authentication failed",
                });
            }
            const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET || "a-secret-encoder");
            return res.status(200).json({ message: "Login successful", token: "Bearer " + token, username: user.username, favorites: user.favorites });
        }
    }
    catch (err) {
        res.status(500).json({
            error: err,
        });
    }
};
exports.login = login;
const getUser = async (req, res) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }
        const user = await user_1.default.findOne({ username: req.params.username });
        if (!user) {
            return res.status(401).json({
                message: "Authentication failed",
            });
        }
        else {
            return res.status(200).json({ username: user.username, favorites: user.favorites });
        }
    }
    catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getUser = getUser;
const getUserFavorites = async (req, res) => {
    try {
        const user = await user_1.default.findOne({ username: req.params.username });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        else {
            return res.status(200).json({ favorites: user.favorites });
        }
    }
    catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getUserFavorites = getUserFavorites;
const markAsFavoriteHandler = async (req, res) => {
    try {
        const userId = req.params.username;
        const characterId = parseInt(req.body.data.characterId);
        const result = await (0, user_2.markCharacterAsFavorite)(userId, characterId);
        res.json(result);
    }
    catch (error) {
        console.error('Error marking character as favorite:', error.message);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
exports.markAsFavoriteHandler = markAsFavoriteHandler;
//# sourceMappingURL=userController.js.map