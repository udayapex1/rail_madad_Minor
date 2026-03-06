import express from "express"
import { loginUser , registerUser } from "../controllers/auth.controllers.js"

const router  = express.Router();

router.post("/register" , registerUser);

export default router;