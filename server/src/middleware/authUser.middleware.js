import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/User.model.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    dotenv.config();

    let token = req.cookies.jwt;

    if (!token && req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // ✅ sirf zaroori fields
  req.user = {
  userId:     user._id,
  role:       user.role,
  department: user.department,
};

    next();
  } catch (error) {
    console.log("Auth Error:", error);
    return res.status(401).json({ error: "User not authenticated" });
  }
};