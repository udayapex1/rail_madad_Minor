
import Department from "../models/Department.model.js";

const categoryToDepartment = {
  "Cleanliness":     "Housekeeping",
  "Damage":          "Maintenance",
  "Staff Behaviour": "HR",
  "Security":        "Security",
  "Facilities":      "Infrastructure",
  "Other":           "General Grievance",
};

export const getRoutedDepartment = async (category) => {
  const deptName = categoryToDepartment[category] || "General Grievance";

  const department = await Department.findOne({
    name:     deptName,
    isActive: true,
  });

  if (!department) {
    const fallback = await Department.findOne({ name: "General Grievance" });
    return fallback._id;
  }

  return department._id;
};