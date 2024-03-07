"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../routes/user"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const characterApi_1 = __importDefault(require("../routes/characterApi"));
const cors_1 = __importDefault(require("cors"));
const createServer = () => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: false }));
    app.use((0, cookie_parser_1.default)());
    app.use((0, cors_1.default)({
        origin: [
            "http://localhost:3000",
            "http://localhost:8080",
            "https://rickandmortyapi.com/api",
            "https://localhost:8080"
        ],
        credentials: true
    }));
    app.use('/user', user_1.default);
    app.use('/character', characterApi_1.default);
    return app;
};
exports.createServer = createServer;
//# sourceMappingURL=server.js.map