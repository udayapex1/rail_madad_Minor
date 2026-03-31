import express from "express";
import Department from "../models/Department.model.js";
import { successResponse , errorResponse } from "../utils/responseHandler.js";


export const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    return successResponse(res, { data: departments, message: "Departments fetched successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findById(id);
    if (!department) {
      return errorResponse(res, "Department not found", 404);
    }
    return successResponse(res, { data: department, message: "Department fetched successfully" });
  } catch (error) {
    console.log(error);
    return errorResponse(res, "Something went wrong", 500);
  }
};