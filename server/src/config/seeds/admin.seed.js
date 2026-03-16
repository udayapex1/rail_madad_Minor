import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { ConnectDB } from "../db.js";
dotenv.config();

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  phoneNumber: String,
  role: String,
  department: { type: mongoose.Schema.Types.ObjectId, default: null },
  isActive: { type: Boolean, default: true },
});
const User = mongoose.models.User || mongoose.model("User", userSchema);

const seedAdmin = async () => {
  try {
    await ConnectDB();

    const exists = await User.findOne({ email: "admin@railmadad.com" });
    if (exists) {
      console.log("Admin already exists, skipping.");
      await mongoose.disconnect();
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("admin@123", 10);

    await User.create({
      firstName: "Super",
      lastName: "Admin",
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword, // bcrypt of process.env.ADMIN_PASSWORD
      phoneNumber: process.env.ADMIN_PHONE,
      role: "admin",
      department: null,
    });

    console.log("✅ Admin seeded: admin@railmadad.com / admin@123");
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Admin seeding failed:", error.message);
    process.exit(1);
  }
};

seedAdmin();
