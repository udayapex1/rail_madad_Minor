import { User } from "../models/User.model.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { successResponse, errorResponse } from "../utils/responseHandler.js";

export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phoneNumber } = req.body;
    const requiredFields = {
      email,
      firstName,
      lastName,
      password,
      phoneNumber,
    };
    const missingFields = Object.entries(requiredFields)
      .filter(([key, value]) => !value)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: "Missing required fields",
        missingFields,
      });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      // return res.status(409).json({ message: "User already exists , Try login with Entered email" });
      return res.errorResponse(
        res,
        "User already exists , Try login with Entered emai",
        409,
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
    });

    await newUser.save();

    return successResponse(res, newUser, "User registered successfully", 201);
  } catch (error) {}
};

export const loginUser = async (req, res) => {
  console.log("Register User:");
};
