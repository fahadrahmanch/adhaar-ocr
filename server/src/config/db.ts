import mongoose from "mongoose";

export class ConnectDB {
  private DB_URL: string;

  constructor() {
    this.DB_URL = process.env.MONGO_URL || "";
  }

  public async connectDatabase(): Promise<void> {
    try {
      console.log(process.env.MONGO_URL);
      await mongoose.connect(this.DB_URL);

      console.log("Database connected successfully");
    } catch (err: any) {
            console.log(process.env.MONGO_URL);

      console.log("MongoDB connection failed", err.message);

      throw err;
    }
  }
}