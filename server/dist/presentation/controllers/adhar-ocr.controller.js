"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adharOcrController = void 0;
class adharOcrController {
    adharOcrUseCase;
    constructor(adharOcrUseCase) {
        this.adharOcrUseCase = adharOcrUseCase;
    }
    async upload(req, res) {
        try {
            const files = req.files;
            const front = files?.['front']?.[0];
            const back = files?.['back']?.[0];
            const result = await this.adharOcrUseCase.execute(front, back);
            console.log("final result : ", result);
            res.status(200).json(result);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    }
}
exports.adharOcrController = adharOcrController;
//# sourceMappingURL=adhar-ocr.controller.js.map