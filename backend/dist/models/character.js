"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const characterSchema = new mongoose_1.default.Schema({
    _id: mongoose_1.default.Schema.Types.ObjectId,
    id: Number,
    name: String,
    status: String,
    species: String,
    gender: String,
    origin: {
        name: String,
        url: String
    },
    image: String
});
const Character = mongoose_1.default.model('Character', characterSchema);
exports.default = Character;
//# sourceMappingURL=character.js.map