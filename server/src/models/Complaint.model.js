// src/models/Complaint.model.js

import mongoose from "mongoose";

// ─── Timeline Sub Schema ───────────────────────────────────────────────────────
const timelineSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["Pending", "InProgress", "Resolved"],
      required: true,
    },
    note: {
      type: String,
      trim: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false },
);

// ─── AI Metadata Sub Schema ────────────────────────────────────────────────────
const aiMetadataSchema = new mongoose.Schema(
  {
    model: {
      type: String,
    },
    confidence: {
      type: Number,
      min: 0,
      max: 1,
    },
    description: {
      type: String,
    },
    processedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false },
);

// ─── Main Complaint Schema ─────────────────────────────────────────────────────
const complaintSchema = new mongoose.Schema(
  {
    complaintId: {
      type: String,
      unique: true,
      required: true,
    },

    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ref to Media collection
    mediaFiles: [
      {
        url: { type: String, required: true },
        publicId: { type: String, required: true },
        type: { type: String, enum: ["image", "video", "audio"] },
        format: { type: String },
        size: { type: Number },
      },
    ],

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },

    // typed by user (optional)
    rawText: {
      type: String,
      trim: true,
      default: "",
    },

    // extracted by OCR from image
    extractedText: {
      type: String,
      trim: true,
      default: "",
    },

    category: {
      type: String,
      enum: [
        "Cleanliness",
        "Damage",
        "Staff Behaviour",
        "Security",
        "Facilities",
        "Other",
      ],
      required: true,
    },

    urgency: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "InProgress", "Resolved"],
      default: "Pending",
    },

    // status history
    timeline: [timelineSchema],

    // AI response metadata
    aiMetadata: aiMetadataSchema,

    // ref to ChatSession (created after complaint)
    chatSession: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChatSession",
      default: null,
    },
    pnrNumber: {
  type:  String,
  trim:  true,
  default: null,   // optional
},
  },
  { timestamps: true },
);

export default mongoose.model("Complaint", complaintSchema);
