import { Router } from "express";

import {
  loginStudent,
  // registerAdmin,
  // loginAdmin,
  // logoutAdmin,
  // reGenerateAccessToken,
  registerStudent,
} from "../controllers/student.controller.js";

import handleFormData from "../middleware/multer.middleware.js";
// import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", registerStudent);

router.post("/login", handleFormData, loginStudent);

// router.post("/logout", verifyJWT, logoutUser);
// router.get("/refresh-token", reGenerateAccessToken);
// router.get("/forget-password", handleFormData, sendOtp);
// router.post("/verify-otp", handleFormData, verifyOtp);
// router.post("/update-password/:email", handleFormData, updatePassword);

export default router;
