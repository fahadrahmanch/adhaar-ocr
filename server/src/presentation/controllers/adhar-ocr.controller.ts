import { Request, Response } from "express";
import { IAdharOcrUseCase } from "../../domain/interfaces/use-cases/IAdharOcrUseCase";

export class adharOcrController {
    constructor(private readonly adharOcrUseCase: IAdharOcrUseCase) { }

    async upload(req: Request, res: Response) {
     

        try {
            const files = req.files as { [fieldname: string]: Express.Multer.File[] };
            const front = files?.['front']?.[0];
            const back = files?.['back']?.[0];

            const result = await this.adharOcrUseCase.execute(front, back);
            console.log("final result : ",result)
            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    }
}