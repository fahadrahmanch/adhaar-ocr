import { AadhaarEntity } from "../../entities/Aadhaar.entity";

export interface IAdharOcrUseCase {
  execute(frontImage?: Express.Multer.File, backImage?: Express.Multer.File): Promise<any>;
}
