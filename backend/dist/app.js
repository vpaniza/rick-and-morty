"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const http_errors_1 = __importDefault(require("http-errors"));
const errorHandler_1 = require("./helpers/errorHandler");
const connection_1 = require("./utils/connection");
const server_1 = require("./utils/server");
dotenv_1.default.config();
const app = (0, server_1.createServer)();
app.use((_req, _res, next) => {
    next((0, http_errors_1.default)(404));
});
const errorHandler = (err, _req, res) => {
    (0, errorHandler_1.handleError)(err, res);
};
app.use(errorHandler);
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
    (0, connection_1.createConnection)();
}
exports.default = app;
//# sourceMappingURL=app.js.map