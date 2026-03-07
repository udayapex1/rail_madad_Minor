import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { ConnectDB } from "../db.js";



dotenv.config();

// inline schemas to avoid import issues
const departmentSchema = new mongoose.Schema({ name: String });
const Department = mongoose.models.Department || mongoose.model("Department", departmentSchema);

const userSchema = new mongoose.Schema({
  firstName:   String,
  lastName:    String,
  email:       String,
  password:    String,
  phoneNumber: String,
  role:        String,
  department:  { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
  isActive:    { type: Boolean, default: true },
});
const User = mongoose.models.User || mongoose.model("User", userSchema);

// one employee per department
const employees = [
  {
    firstName:   "Suresh",
    lastName:    "Yadav",
    email:       process.env.HOUSEKEEPING_EMAIL,
    password:    process.env.HOUSEKEEPING_PASSWORD,
    phoneNumber: process.env.HOUSEKEEPING_PHONE,
    deptName:    "Housekeeping",
  },
  {
    firstName:   "Ramesh",
    lastName:    "Gupta",
    email:       process.env.MAINTENANCE_EMAIL,
    password:    process.env.MAINTENANCE_PASSWORD,
    phoneNumber: process.env.MAINTENANCE_PHONE,
    deptName:    "Maintenance",
  },
  {
    firstName:   "Vikram",
    lastName:    "Singh",
    email:       process.env.SECURITY_EMAIL,
    password:    process.env.SECURITY_PASSWORD,
    phoneNumber: process.env.SECURITY_PHONE,
    deptName:    "Security",
  },
  {
    firstName:   "Pooja",
    lastName:    "Sharma",
    email:       process.env.HR_EMAIL,
    password:    process.env.HR_PASSWORD,
    phoneNumber: process.env.HR_PHONE,
    deptName:    "HR",
  },
  {
    firstName:   "Ankit",
    lastName:    "Verma",
    email:       process.env.INFRASTRUCTURE_EMAIL,
    password:    process.env.INFRASTRUCTURE_PASSWORD,
    phoneNumber: process.env.INFRASTRUCTURE_PHONE,
    deptName:    "Infrastructure",
  },
  {
    firstName:   "Neha",
    lastName:    "Joshi",
    email:       process.env.GRIEVANCE_EMAIL,
    password:    process.env.GRIEVANCE_PASSWORD,
    phoneNumber: process.env.GRIEVANCE_PHONE,
    deptName:    "General Grievance",
  },
];

const seedEmployees = async () => {
  try {
    await ConnectDB();

    for (const emp of employees) {
      // find department _id by name
      const dept = await Department.findOne({ name: emp.deptName });
      if (!dept) {
        console.log(`Department not found: ${emp.deptName} — run department seed first`);
        continue;
      }

      // skip if already exists
      const exists = await User.findOne({ email: emp.email });
      if (exists) {
        console.log(`Already exists: ${emp.email}, skipping.`);
        continue;
      }

      const hashedPassword = await bcrypt.hash(emp.password, 10);

      await User.create({
        firstName:   emp.firstName,
        lastName:    emp.lastName,
        email:       emp.email,
        password:    hashedPassword,
        phoneNumber: emp.phoneNumber,
        role:        "department_employee",
        department:  dept._id,
        isActive:    true,
      });

      console.log(`✅ Created: ${emp.email} → ${emp.deptName}`);
    }

    console.log("\nAll employees seeded.");
    await mongoose.disconnect();
    process.exit(0);

  } catch (error) {
    console.error("Employee seeding failed:", error.message);
    process.exit(1);
  }
};

seedEmployees();