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
    mongo: process.env.MONGO_URI ? "loaded" : "MISSING",
    cloudinary: process.env.CLOUDINARY_API_KEY ? "loaded" : "MISSING",
  });
  try {
    const { rawText } = req.body;
    const files = req.files;

    console.log("\n--- [DEBUG] NEW COMPLAINT SUBMISSION ---");
    console.log("Raw Text:", rawText);
    console.log("Files Attached:", files ? files.length : 0);

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

      console.log(`[DEBUG] Cloudinary Upload Success: ${mediaFiles.length} files`);
      if (firstImageUrl) console.log(`[DEBUG] Primary Image URL: ${firstImageUrl}`);
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
    } else if (rawText) {
      const aiResult = await categorizeComplaint(null, rawText);
      category = aiResult.category;
      urgency = aiResult.urgency;
      confidence = aiResult.confidence;
      description = aiResult.description;
    }

    console.log("[DEBUG] AI Categorization Result:");
    console.log(`  - Category: ${category}`);
    console.log(`  - Urgency:  ${urgency}`);
    console.log(`  - Confidence: ${confidence}`);

    // ── 3. Smart Department Routing ────────────────────────────────────────
    const departmentId = await getRoutedDepartment(category);

    console.log(`[DEBUG] Routed to Department ID: ${departmentId}`);

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

    await newComplaint.populate("department", "name");

    await sendComplaintMail({
      to: user.email,
      name: user.firstName,
      complaintId: newComplaint.complaintId,
      pnrNumber: newComplaint.pnrNumber,
      category: newComplaint.category,
      urgency: newComplaint.urgency,
      department: newComplaint.department?.name ?? "Railways",
      status: newComplaint.status,
      createdAt: newComplaint.createdAt,
    });
    // ── 6. Response ────────────────────────────────────────────────────────
    const responsePayload = {
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
    };

    console.log("\n[DEBUG] Final Response:");
    console.log(JSON.stringify(responsePayload, null, 2));

    return res.status(201).json(responsePayload);
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

// ── Get Department Complaints (Department Employee / Admin) ────────────────────
export const getDepartmentComplaints = async (req, res) => {
  try {
    if (req.user.role !== "department_employee" && req.user.role !== "admin") {
      return res.status(403).json({ 
        success: false, 
        message: "Access denied. Only department employees can view these complaints." 
      });
    }

    const { status, urgency } = req.query;
    const filter = {};

    if (req.user.role === "department_employee") {
      if (!req.user.department) {
        return res.status(400).json({ 
          success: false, 
          message: "User is not assigned to any department" 
        });
      }
      filter.department = req.user.department;
    }

    if (status) filter.status = status;
    if (urgency) filter.urgency = urgency;

    const complaints = await Complaint.find(filter)
      .populate("department", "name description")
      .populate("submittedBy", "firstName lastName email phoneNumber")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Department complaints fetched successfully",
      data: complaints,
    });
  } catch (error) {
    console.error("Get department complaints error:", error.message);
    return errorResponse(res, "Something went wrong", 500);
  }
};

// ── Update Complaint Status (Department Employee / Admin) ────────────────────
export const updateComplaintStatus = async (req, res) => {
  try {
    if (req.user.role !== "department_employee" && req.user.role !== "admin") {
      return res.status(403).json({ 
        success: false, 
        message: "Access denied. Only department employees or admins can update complaints." 
      });
    }

    const { complaintId } = req.params;
    const { status, note } = req.body;

    if (!status) {
      return res.status(400).json({ success: false, message: "Status is required" });
    }

    const complaint = await Complaint.findOne({ complaintId });

    if (!complaint) {
      return res.status(404).json({ success: false, message: "Complaint not found" });
    }

    // Check if the department employee belongs to the same department as the complaint
    if (req.user.role === "department_employee") {
      if (!req.user.department || complaint.department.toString() !== req.user.department.toString()) {
        return res.status(403).json({ 
          success: false, 
          message: "You can only update complaints assigned to your department." 
        });
      }
    }

    complaint.status = status;
    complaint.timeline.push({
      status,
      note: note || `Status updated to ${status}`,
      updatedBy: req.user.userId,
      updatedAt: new Date(),
    });

    await complaint.save();

    return res.status(200).json({
      success: true,
      message: "Complaint status updated successfully",
      data: complaint,
    });
  } catch (error) {
    console.error("Update complaint status error:", error.message);
    return errorResponse(res, "Something went wrong", 500);
  }
};
