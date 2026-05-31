
import { app } from ".";
import http from "http";
import dotenv from "dotenv";
dotenv.config();

const application = new app();
async function startServer() {
  const PORT = process.env.PORT;
  const server = http.createServer(application.getApp());


  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
startServer();