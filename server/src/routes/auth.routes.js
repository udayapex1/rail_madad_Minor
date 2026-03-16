import express from "express"
import {isAuthenticated} from "../middleware/authUser.middleware.js"
import { loginUser , registerUser , logoutUser , getUserProfile } from "../controllers/auth.controllers.js"

const router  = express.Router();

router.post("/register" , registerUser);
router.post("/login" , loginUser);
router.post("/logout" , logoutUser);
router.get("/profile"  , isAuthenticated, getUserProfile);

export default router;