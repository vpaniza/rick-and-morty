"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCharacterByID = exports.getAllCharacters = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const BASE_URL = process.env.RICKANDMORTY_API_BASE_URL || "";
// GET all characters
const getAllCharacters = async (req, res) => {
    try {
        const response = await axios_1.default.get(BASE_URL + "/character");
        if (response.status === 200) {
            const characters = response.data.results.map((ch) => {
                return ({
                    id: ch.id,
                    name: ch.name,
                    status: ch.status,
                    species: ch.species,
                    gender: ch.gender,
                    origin: ch.origin,
                    image: ch.image
                });
            });
            res.json(characters);
        }
        else {
            throw new Error("Unexpected response status: " + response.status);
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getAllCharacters = getAllCharacters;
// GET all characters
const getCharacterByID = async (req, res) => {
    try {
        const response = await axios_1.default.get(BASE_URL + "/character/" + req.params.id);
        if (response.status === 200) {
            const character = {
                id: response.data.id,
                name: response.data.name,
                status: response.data.status,
                species: response.data.species,
                gender: response.data.gender,
                origin: response.data.origin,
                image: response.data.image
            };
            res.json(character);
        }
        else {
            throw new Error("Unexpected response status: " + response.status);
        }
    }
    catch (error) {
        console.error(`Error fetching character id ${req.params.id}`, error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getCharacterByID = getCharacterByID;
//# sourceMappingURL=characterController.js.map