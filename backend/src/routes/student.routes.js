import { Router } from "express";

import {
  loginStudent,
  // registerAdmin,
  // loginAdmin,
  // logoutAdmin,
  // reGenerateAccessToken,
  getAllStudentDetails,
  registerStudent,
  getStudentDetailsById,
} from "../controllers/student.controller.js";

import handleFormData from "../middleware/handleFormData.js";
import { verifyAPIKey, verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", registerStudent);
router.post("/login", handleFormData, loginStudent);

router.get(
  "/get-all-student-details",
  verifyAPIKey,
  verifyJWT,
  getAllStudentDetails
);

router.get(
  "/get-student-details-by-id/:student_sap_no",
  verifyAPIKey,
  verifyJWT,
  getStudentDetailsById
);

// router.post("/logout", verifyJWT, logoutUser);
// router.get("/refresh-token", reGenerateAccessToken);
// router.get("/forget-password", handleFormData, sendOtp);
// router.post("/verify-otp", handleFormData, verifyOtp);
// router.post("/update-password/:email", handleFormData, updatePassword);

export default router;
