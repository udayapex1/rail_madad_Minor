// src/routes/complaint.routes.js

import express                                        from "express";
import { submitComplaint, getMyComplaints, getComplaintById, getDepartmentComplaints, updateComplaintStatus } from "../controllers/complaint.controller.js";
// import { verifyToken }                                from "../middlewares/auth.middleware.js";
import  {isAuthenticated} from "../middleware/authUser.middleware.js";
// import { authorizeRole }                              from "../middlewares/role.middleware.js";
// import { upload }  from "../middlewares/upload.middleware.js";
import { upload } from "../middleware/upload.middleware.js";
const router = express.Router();

router.post("/submit",isAuthenticated,upload.array("files", 5),submitComplaint);

router.get(
  "/my-complaints",
  isAuthenticated,
//   authorizeRole("passenger"),
  getMyComplaints
);

router.get(
  "/department-complaints",
  isAuthenticated,
  getDepartmentComplaints
);

router.patch(
  "/:complaintId/status",
  isAuthenticated,
  updateComplaintStatus
);

router.get(
  "/:complaintId",
  // isAuthenticated,
//   authorizeRole("passenger"),
  getComplaintById
);

export default router;

