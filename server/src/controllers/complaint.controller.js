// src/controllers/complaint.controller.js

import { generateComplaintId } from "../utils/generateComplaintId.js";
import { uploadToCloudinary } from "../services/upload.service.js";
import { categorizeComplaint } from "../services/ai/categorize.service.js";
import { getRoutedDepartment } from "../services/routing.service.js";
import Complaint from "../models/Complaint.model.js";
import { User } from "../models/User.model.js";
import * as dotenv from "dotenv";
import { successResponse, errorResponse } from "../utils/responseHandler.js";
import { sendComplaintMail } from "../utils/sendMail.js";

dotenv.config();

export const submitComplaint = async (req, res) => {
 
  console.log("ENV CHECK →", {
  openrouter: process.env.OPENROUTER_API_KEY ? "loaded" : "MISSING",
  mongo:      process.env.MONGO_URI          ? "loaded" : "MISSING",
  cloudinary: process.env.CLOUDINARY_API_KEY ? "loaded" : "MISSING",
});

  console.log("req.user →", req.user);
  try {
    const { rawText } = req.body;
    const files = req.files;

    // ── Validation ─────────────────────────────────────────────────────────
    if ((!files || files.length === 0) && !rawText) {
      return errorResponse(
        res,
        "Please provide an image, video, audio or text",
        400,
      );
    }

    // ── 1. Upload files to Cloudinary ──────────────────────────────────────
    let mediaFiles = [];
    let firstImageUrl = null;

    if (files && files.length > 0) {
      for (const file of files) {
        const uploaded = await uploadToCloudinary(file.buffer, file.mimetype);
        mediaFiles.push(uploaded);

        if (!firstImageUrl && uploaded.type === "image") {
          firstImageUrl = uploaded.url;
        }
      }
    }

    // ── 2. AI — Categorize + Urgency (single call) ─────────────────────────
    let category = "Other";
    let urgency = "Low";
    let confidence = 0.5;
    let description = rawText || "";

    if (firstImageUrl) {
      const aiResult = await categorizeComplaint(firstImageUrl, rawText || "");
      category = aiResult.category;
      urgency = aiResult.urgency;
      confidence = aiResult.confidence;
      description = aiResult.description;
    }

    // ── 3. Smart Department Routing ────────────────────────────────────────
    const departmentId = await getRoutedDepartment(category);

    // ── 4. Generate Unique Complaint ID ────────────────────────────────────
    const complaintId = generateComplaintId();

    // ── 5. Save to MongoDB ─────────────────────────────────────────────────
    const newComplaint = await Complaint.create({
      complaintId,
      submittedBy: req.user.userId,
      mediaFiles,
      department: departmentId,
      rawText: rawText || "",
      category,
      urgency,
      status: "Pending",
      timeline: [
        {
          status: "Pending",
          note: "Complaint registered successfully",
          updatedBy: req.user.userId,
          updatedAt: new Date(),
        },
      ],
      aiMetadata: {
        model: "qwen/qwen3-vl-235b-a22b-thinking",
        confidence,
        description,
        processedAt: new Date(),
      },
    });

    const user = await User.findById(req.user.userId).select("firstName email");

    await sendComplaintMail({
      to: user.email,
      name: user.firstName,
      complaintId: newComplaint.complaintId,
      pnrNumber: newComplaint.pnrNumber,
      category: newComplaint.category,
      urgency: newComplaint.urgency,
      department:newComplaint.department.departmentId, // populate karo pehle
      status: newComplaint.status,
      createdAt: newComplaint.createdAt,
    });
    // ── 6. Response ────────────────────────────────────────────────────────
    return res.status(201).json({
      success: true,
      message: "Complaint registered successfully",
      data: {
        complaintId: newComplaint.complaintId,
        category: newComplaint.category,
        urgency: newComplaint.urgency,
        department: departmentId,
        status: newComplaint.status,
        mediaCount: mediaFiles.length,
      },
    });
  } catch (error) {
    console.error("Complaint submission error:", error); // ← full error print karo
    return errorResponse(res, "Something went wrong", 500);
  }
};

// ── Get My Complaints (Passenger) ──────────────────────────────────────────────
export const getMyComplaints = async (req, res) => {
  try {
    const { status, category } = req.query;

    const filter = { submittedBy: req.user.userId };
    if (status) filter.status = status;
    if (category) filter.category = category;

    const complaints = await Complaint.find(filter)
      .populate("department", "name")
      .sort({ createdAt: -1 });
    console.log(complaints);
    return res.status(200).json({
      success: true,
      message: "Complaints fetched successfully",
      data: complaints,
    });
  } catch (error) {
    console.error("Get complaints error:", error.message);
    return errorResponse(res, "Something went wrong", 500);
  }
};

// ── Get Single Complaint (Passenger) ───────────────────────────────────────────
export const getComplaintById = async (req, res) => {
  try {
    const { complaintId } = req.params;

    const complaint = await Complaint.findOne({ complaintId })
      .populate("department", "name description")
      .populate("submittedBy", "firstName lastName email");

    if (!complaint) {
      return res
        .status(404)
        .json({ success: false, message: "Complaint not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Complaint fetched successfully",
      data: complaint,
    });
  } catch (error) {
    console.error("Get complaint error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};
