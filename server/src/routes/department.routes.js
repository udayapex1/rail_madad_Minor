import express from "express"
import { getDepartmentById , getDepartments } from "../controllers/department.controller.js"


const router = express.Router();

router.get("/" , getDepartments);
router.get("/:id" , getDepartmentById);

export default router;