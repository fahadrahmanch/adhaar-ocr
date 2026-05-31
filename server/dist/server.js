"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const application = new _1.app();
async function startServer() {
    await application.connectDatabase();
    const PORT = process.env.PORT;
    const server = http_1.default.createServer(application.getApp());
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
startServer();
//# sourceMappingURL=server.js.map