import { adharOcrController } from "../controllers/adhar-ocr.controller";
import { AdharOcrUseCase } from "../../application/use-cases/adhar-ocr.use-case";
import { AadhaarValidationService } from "../../application/services/AadhaarValidationService";
const aadhaarValidationService = new AadhaarValidationService();
const adharOcrUseCase = new AdharOcrUseCase(aadhaarValidationService);
export const AdharOcrController = new adharOcrController(adharOcrUseCase);