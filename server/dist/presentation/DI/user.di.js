"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdharOcrController = void 0;
const adhar_ocr_controller_1 = require("../controllers/adhar-ocr.controller");
const adhar_ocr_use_case_1 = require("../../application/use-cases/adhar-ocr.use-case");
const AadhaarValidationService_1 = require("../../application/services/AadhaarValidationService");
const aadhaarValidationService = new AadhaarValidationService_1.AadhaarValidationService();
const adharOcrUseCase = new adhar_ocr_use_case_1.AdharOcrUseCase(aadhaarValidationService);
exports.AdharOcrController = new adhar_ocr_controller_1.adharOcrController(adharOcrUseCase);
//# sourceMappingURL=user.di.js.map