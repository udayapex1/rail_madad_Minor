import mongoose from "mongoose";
import Department from "../../models/Department.model.js";
import dotenv from "dotenv";
import { ConnectDB } from "../db.js";

dotenv.config();

const departments = [
  {
    name: "Housekeeping",
    description:
      "Handles cleanliness and hygiene complaints in coaches and stations",
  },
  {
    name: "Maintenance",
    description:
      "Handles damage and repair complaints for coaches and equipment",
  },
  {
    name: "Security",
    description: "Handles safety, harassment and emergency complaints via RPF",
  },
  {
    name: "HR",
    description: "Handles staff behaviour and misconduct complaints",
  },
  {
    name: "Infrastructure",
    description: "Handles facility complaints like AC, water, bedroll etc.",
  },
  {
    name: "General Grievance",
    description: "Handles complaints that don't fit other categories",
  },
];

const seedDepartments = async () => {
  try {
    await ConnectDB();
    const existing = await Department.countDocuments();
    if (existing > 0) {
      console.log("Departments already seeded, skipping.");
      process.exit(0);
    }
    await Department.insertMany(departments);
    console.log("Departments seeded successfully.");
    process.exit(0);
  } catch (error) {
    return console.log("Error seeding departments:", error);
  }
};

seedDepartments();
