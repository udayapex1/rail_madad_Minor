import express from "express";
import dotenv from "dotenv"
import { ConnectDB } from "./config/db.js";
import mongoose from "mongoose";

dotenv.config();

const app = express();
ConnectDB();

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