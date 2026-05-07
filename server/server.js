import express from "express";
import dotenv from "dotenv";
import { ConnectDB } from "./src/config/db.js";
import mongoose from "mongoose";
import userRoutes from "./src/routes/auth.routes.js";
import departmentRoutes from "./src/routes/department.routes.js";
import complaintRoutes from "./src/routes/complaint.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import os from "os";

dotenv.config();

if (process.env.NODE_ENV !== "production") {
  console.log("ENV CHECK →", {
    openrouter: process.env.OPENROUTER_API_KEY ? "loaded" : "MISSING",
    // mongo:      process.env.MONGO_URI          ? "loaded" : "MISSING",
    cloudinary: process.env.CLOUDINARY_API_KEY ? "loaded" : "MISSING",
  });
}

const app = express();

// --- HELPER: Human-readable Uptime ---
const getReadableUptime = () => {
  const seconds = process.uptime();
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${d}d ${h}h ${m}m ${s}s`;
};

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://rail-madad-green.vercel.app",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

try {
  ConnectDB();
} catch (error) {
  console.log(error);
}

app.use(cookieParser());
app.use("/api/auth", userRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/complaints", complaintRoutes);

// --- COOL HEALTH CHECK ENDPOINT ---
app.get("/health", async (req, res) => {
  const start = Date.now();
  const dbState = mongoose.connection.readyState;

  // Mapping mongoose states to human words/emojis
  const dbStatusMap = {
    0: "Disconnected ❌",
    1: "Connected 🟢",
    2: "Connecting 🟡",
    3: "Disconnecting 🟠",
  };

  let dbLatency = "N/A";
  if (dbState === 1) {
    try {
      // Actually ping the DB to check responsiveness
      await mongoose.connection.db.admin().ping();
      dbLatency = `${Date.now() - start}ms`;
    } catch (e) {
      dbLatency = "Error";
    }
  }

  const healthData = {
    status: dbState === 1 ? "Operational 🚀" : "Degraded ⚠️",
    timestamp: new Date().toISOString(),
    uptime: getReadableUptime(),
    database: {
      connection: dbStatusMap[dbState] || "Unknown",
      latency: dbLatency,
    },
    system: {
      load_avg: os.loadavg().map(l => l.toFixed(2)),
      free_mem: `${(os.freemem() / 1024 / 1024 / 1024).toFixed(2)} GB`,
      platform: os.platform(),
    },
    process: {
      memory_heap: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,
      node_version: process.version,
    },
    network: {
      interface: Object.keys(os.networkInterfaces())[0],
      host: os.hostname()
    }
  };

  // Return 503 if DB is not connected so monitoring tools alert you
  res.status(dbState === 1 ? 200 : 503).json(healthData);
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`🚀 Engine started on http://localhost:${port}`);
});