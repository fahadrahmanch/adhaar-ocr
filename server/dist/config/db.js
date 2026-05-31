"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class ConnectDB {
    DB_URL;
    constructor() {
        this.DB_URL = process.env.MONGO_URL || "";
    }
    async connectDatabase() {
        try {
            console.log(process.env.MONGO_URL);
            await mongoose_1.default.connect(this.DB_URL);
            console.log("Database connected successfully");
        }
        catch (err) {
            console.log(process.env.MONGO_URL);
            console.log("MongoDB connection failed", err.message);
            throw err;
        }
    }
}
exports.ConnectDB = ConnectDB;
//# sourceMappingURL=db.js.map