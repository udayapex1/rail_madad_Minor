import mongoose from "mongoose";
import dotenv from "dotenv";
import { ConnectDB } from "../db.js";

dotenv.config();

const migrate = async () => {
  try {
    await ConnectDB();
    console.log("Connected to DB, running migration...");
    
    const db = mongoose.connection.db;
    const result = await db.collection("complaints").updateMany(
      { prnNumber: { $exists: true } },
      { $rename: { "prnNumber": "pnrNumber" } }
    );
    
    console.log(`Migration complete. Modified ${result.modifiedCount} documents.`);
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
};

migrate();
