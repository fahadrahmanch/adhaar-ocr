"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_di_1 = require("../DI/user.di");
const multer_1 = require("../../config/multer");
class userRouter {
    router;
    constructor() {
        this.router = (0, express_1.Router)();
    }
    setupRoutes() {
        this.router.post("/ocr", multer_1.upload.fields([
            { name: "front", maxCount: 1 },
            { name: "back", maxCount: 1 },
        ]), (req, res) => {
            user_di_1.AdharOcrController.upload(req, res);
        });
        return this.router;
    }
}
exports.userRouter = userRouter;
//# sourceMappingURL=user.js.map