import { User } from "../models/User.model.js";
import bcrypt from "bcryptjs";
import { successResponse, errorResponse } from "../utils/responseHandler.js";
import createToken from "../jwt/authToken.js";

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
      return res
        .status(400)
        .json({ message: "Missing required fields", missingFields });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return errorResponse(
        res,
        "User already exists, Try login with entered email",
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
  } catch (error) {
    console.log(error);
    return errorResponse(res, "Something went wrong", 500);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const requiredFields = { email, password };

    const missingFields = Object.entries(requiredFields)
      .filter(([key, value]) => !value)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      return res
        .status(400)
        .json({ message: "Missing required fields", missingFields });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return errorResponse(
        res,
        "User not found with this email, Please register first",
        404,
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return errorResponse(res, "Invalid credentials", 401);
    }

    const token = await createToken(user._id, res);

    return successResponse(res, {
      user,
      token,
      message: "User logged in successfully",
    });
  } catch (error) {
    console.log(error);
    return errorResponse(res, "Something went wrong", 500);
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return successResponse(res, null, "User logged out successfully");
  } catch (error) {
    console.log(error);
    return errorResponse(res, "Something went wrong", 500);
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return errorResponse(res, "User not found", 404);
    }

    return successResponse(res, { user }, "User profile retrieved successfully");
  } catch (error) {
    console.log(error);
    return errorResponse(res, "Something went wrong", 500);
  }
};
