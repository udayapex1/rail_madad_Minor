import express from "express";
import dotenv from "dotenv"
import { ConnectDB } from "./src/config/db.js";
import mongoose from "mongoose";
import userRoutes from "./src/routes/auth.routes.js"
import cors from "cors"
import cookieParser from "cookie-parser";

dotenv.config();


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
try {
  ConnectDB();
} catch (error) {
  console.log(error);
}

app.use(cookieParser())

app.use("/api/auth" ,userRoutes);
app.get("/health", (req, res) => {
  const healthcheck = {
    status: "OK",
    service: "pnr-status-api",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    database:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected"
  };

  res.status(200).json(healthcheck);
});

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})