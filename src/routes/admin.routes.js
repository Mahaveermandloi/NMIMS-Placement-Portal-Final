import { Router } from "express";

import {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  reGenerateAccessToken,
} from "../controllers/admin.controller.js";

import {
  sendOtp,
  verifyOtp,
  updatePassword,
  resendOtp,
} from "../controllers/forgetpassword.controller.js";
import handleFormData from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", registerAdmin);
router.post("/login", handleFormData, loginAdmin);
router.post("/logout", verifyJWT, logoutAdmin);
router.get("/refresh-token", reGenerateAccessToken);

router.post("/forget-password", handleFormData, sendOtp);
router.post("/verify-otp", handleFormData, verifyOtp);
router.post("/resend-otp", handleFormData, resendOtp);

router.post("/update-password/:email", handleFormData , updatePassword);

export default router;
