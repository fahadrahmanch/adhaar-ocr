import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { userRouter } from "./presentation/routes/user";
dotenv.config();

export class app {
    private app: Application;
    constructor() {
        this.app = express();
        this.setupMiddlewares();
    }

    setupMiddlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.userRoutes();
    }

    userRoutes(){
    
        const user = new userRouter();
        this.app.use("/", user.setupRoutes());
    }

    public getApp(): Application {
        return this.app;
    }
   
}