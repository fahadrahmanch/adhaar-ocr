import { Router, Request, Response } from "express";
import { AdharOcrController } from "../DI/user.di";
import { upload } from "../../config/multer";

export class userRouter {
  private router: Router;

  constructor() {
    this.router = Router();
  }

  setupRoutes() {
    this.router.post(
      "/ocr",
      upload.fields([
        { name: "front", maxCount: 1 },
        { name: "back", maxCount: 1 },
      ]),
      (req: Request, res: Response) => {

        AdharOcrController.upload(req, res);
      }
    );

    return this.router;
  }
}