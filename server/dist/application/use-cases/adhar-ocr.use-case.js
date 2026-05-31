"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdharOcrUseCase = void 0;
const Aadhaar_entity_1 = require("../../domain/entities/Aadhaar.entity");
const tesseract_js_1 = __importDefault(require("tesseract.js"));
const sharp_1 = __importDefault(require("sharp"));
class AdharOcrUseCase {
    aadhaarValidationService;
    constructor(aadhaarValidationService) {
        this.aadhaarValidationService = aadhaarValidationService;
    }
    async execute(frontImage, backImage) {
        if (!frontImage || !backImage) {
            throw new Error("Front and back Aadhaar images are required");
        }
        // preprocess images
        await (0, sharp_1.default)(frontImage.path)
            .grayscale()
            .normalize()
            .sharpen()
            .toFile("uploads/front-processed.jpg");
        await (0, sharp_1.default)(backImage.path)
            .grayscale()
            .normalize()
            .sharpen()
            .toFile("uploads/back-processed.jpg");
        // OCR
        const frontResult = await tesseract_js_1.default.recognize("uploads/front-processed.jpg", "eng+mal");
        const backResult = await tesseract_js_1.default.recognize("uploads/back-processed.jpg", "eng+mal");
        // Strip out the Malayalam unicode block (0D00-0D7F) to leave only English text
        const frontText = frontResult.data.text.replace(/[\u0D00-\u0D7F]/g, "");
        const backText = backResult.data.text.replace(/[\u0D00-\u0D7F]/g, "");
        // detect actual front side
        const isFrontSide = (text) => {
            const upper = text.toUpperCase();
            return (upper.includes("GOVERNMENT") ||
                upper.includes("FEMALE") ||
                upper.includes("MALE"));
        };
        let actualFrontText = "";
        let actualBackText = "";
        if (isFrontSide(frontText)) {
            actualFrontText = frontText;
            actualBackText = backText;
        }
        else {
            actualFrontText = backText;
            actualBackText = frontText;
        }
        console.log("actual front text :", actualFrontText);
        console.log("actual back text :", actualBackText);
        // validation
        const isValidFront = this.aadhaarValidationService.isAadhaarFront(actualFrontText);
        if (!isValidFront) {
            throw new Error("Invalid Aadhaar front image");
        }
        const isValidBack = this.aadhaarValidationService.isAadhaarBack(actualBackText);
        if (!isValidBack) {
            throw new Error("Invalid Aadhaar back image");
        }
        // aadhaar number
        const aadhaarNumber = actualFrontText.match(/\d{4}\s\d{4}\s\d{4}/)?.[0] || "";
        // dob
        let dob = "";
        // If OCR merged DD/MM/YYYY into DDMM/YYYY (e.g., 2001/1980 for 20/01/1980)
        let processedFrontText = actualFrontText.replace(/(\d{2})(\d{2})\/(\d{4})/, "$1/$2/$3");
        const strictDobMatch = processedFrontText.match(/\b\d{2}\/\d{2}\/\d{4}\b/);
        if (strictDobMatch) {
            dob = strictDobMatch[0];
        }
        else {
            const yearMatch = processedFrontText.match(/\b(19|20)\d{2}\b/);
            if (yearMatch) {
                dob = yearMatch[0];
            }
        }
        // gender
        const gender = actualFrontText.match(/Male|Female/i)?.[0] || "";
        // name
        const lines = actualFrontText
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean);
        console.log("lines : ", lines);
        let name = "";
        for (let i = 0; i < lines.length; i++) {
            const current = lines[i].toUpperCase();
            if (current.includes("MALE") ||
                current.includes("FEMALE")) {
                if (i > 0) {
                    const prevLine = lines[i - 1].toUpperCase();
                    // Check if the line before Gender is actually the DOB line
                    if (prevLine.includes("DOB") ||
                        prevLine.includes("BOS") || // OCR often misreads DOB as BOS
                        prevLine.includes("YEAR") ||
                        /\d{4}/.test(prevLine)) {
                        // If it's the DOB line, the name is one line further up
                        if (i > 1) {
                            name = lines[i - 2];
                        }
                    }
                    else {
                        // Otherwise, it's the name
                        name = lines[i - 1];
                    }
                }
                break;
            }
        }
        // address & pincode logic
        let address = "";
        const addressStart = actualBackText.toLowerCase().indexOf("address");
        if (addressStart !== -1) {
            address = actualBackText.substring(addressStart);
        }
        else {
            address = actualBackText;
        }
        // safely remove Aadhaar numbers using word boundaries so it doesn't eat into the pincode!
        address = address
            .replace(/^address\s*:?\s*/i, "")
            .replace(/\b\d{4}\s?\d{4}\s?\d{4}\b/g, "") // remove 12-digit Aadhaar numbers
            .replace(/Aadhaar.*?Adhikar/gi, "") // remove Aadhaar tagline
            .replace(/1947|1800.*/g, ""); // remove helpline numbers
        // extract pincode before it might get mangled. Look for 6 digits, or a 5-digit number at the end of the text.
        const pinMatch = address.match(/\b\d{6}\b/) || address.match(/\b\d{5}\b(?!.*\d)/);
        const pincode = pinMatch ? pinMatch[0] : "";
        // Further clean up address text (remove non-standard characters from Malayalam OCR failures like @, =, {, }, [, ])
        address = address
            .replace(/[^a-zA-Z0-9\s,./()-]/g, " ") // replace weird symbols with space
            .replace(/\s+/g, " ");
        // Attempt to start address from W/O, S/O, D/O, C/O to cut out initial Malayalam garbage
        const careOfMatch = address.match(/\b[SWDC]\/O\b/i);
        if (careOfMatch && careOfMatch.index) {
            address = address.substring(careOfMatch.index);
        }
        // Clean up spaces and commas
        address = address
            .replace(/[.,-]+(?=\s*\d{5,6})/g, "") // remove ., - before pincode
            .replace(/\s*,\s*/g, ", ")
            .replace(/,\s*[.-]+\s*/g, ", ")
            .replace(/([,.-]\s*){2,}/g, ", ")
            .trim();
        // remove any trailing punctuation left at the end
        address = address.replace(/[,.-]+$/, "").trim();
        console.log("NAME :", name);
        console.log("DOB :", dob);
        console.log("GENDER :", gender);
        console.log("ADDRESS :", address);
        console.log("PINCODE :", pincode);
        const adharEntity = new Aadhaar_entity_1.AadhaarEntity(aadhaarNumber, name, dob, gender, address, pincode);
        return adharEntity.toJSON();
    }
}
exports.AdharOcrUseCase = AdharOcrUseCase;
//# sourceMappingURL=adhar-ocr.use-case.js.map