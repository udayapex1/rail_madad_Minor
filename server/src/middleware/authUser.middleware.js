import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/User.model.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    dotenv.config();

    // Check for token in cookies first
    let token = req.cookies.jwt;

    // If not in cookies, check the Authorization header
    if (!token && req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    console.log("Token:", token);

    if (!token) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Auth Error:", error);
    return res.status(401).json({ error: "User not authenticated" });
  }
};
