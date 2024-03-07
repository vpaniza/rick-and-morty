"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.markCharacterAsFavorite = void 0;
const user_1 = __importDefault(require("../models/user"));
const markCharacterAsFavorite = async (userId, characterId) => {
    try {
        const user = await user_1.default.findOne({ username: userId });
        let response;
        if (!user) {
            throw new Error("User not found");
        }
        if (user.favorites.includes(characterId)) { //Remove from favorites
            user.favorites = user.favorites.filter((ch) => ch !== characterId);
            response = { success: true, message: "Character removed from favorites" };
        }
        else {
            user.favorites.push(characterId);
            response = { success: true, message: "Character marked as favorite" };
        }
        await user.save();
        return response;
    }
    catch (err) {
        console.error("Error marking character as favorite: ", err.message);
        return { success: false, message: err.message };
    }
};
exports.markCharacterAsFavorite = markCharacterAsFavorite;
//# sourceMappingURL=user.js.map