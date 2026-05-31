"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = require("./presentation/routes/user");
dotenv_1.default.config();
class app {
    app;
    constructor() {
        this.app = (0, express_1.default)();
        this.setupMiddlewares();
    }
    setupMiddlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.userRoutes();
    }
    userRoutes() {
        const user = new user_1.userRouter();
        this.app.use("/", user.setupRoutes());
    }
    getApp() {
        return this.app;
    }
}
exports.app = app;
//# sourceMappingURL=index.js.map