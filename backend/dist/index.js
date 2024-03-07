"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
let port = process.env.PORT || '8080';
if (process.env.NODE_ENV === 'test') {
    port = '8081'; // Override port to 8081 during testing
}
try {
    app_1.default.listen(port, () => {
        console.log(`Connected successfully on port ${port}`);
    });
}
catch (error) {
    if (error instanceof Error) {
        console.log(`Error occured: (${error.message})`);
    }
}
//# sourceMappingURL=index.js.map