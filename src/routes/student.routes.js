import { Router } from "express";
import multer from "multer";
import { uploadStudentFiles } from "../middleware/studentmulter.middleware.js";
import {
  loginStudent,
  registerStudent,
  getAllStudentDetails,
  getStudentDetailsById,
  reGenerateAccessToken,
  updateStudentProfile,
  getProfile,
  updateStudentPassword,
  getStudentDetailsByBranch,
  getProfileImage,
} from "../controllers/student.controller.js";
import { verifyAPIKey, verifyJWT } from "../middleware/auth.middleware.js";
import handleFormData from "../middleware/handleFormData.js";

const router = Router();

const handleConditionalFileUploads = (req, res, next) => {
 
  const fields = [
    { name: "student_cv", maxCount: 1 },
    { name: "student_profile_image", maxCount: 1 },
    { name: "student_marksheet", maxCount: 6 },
  ];
  
  const upload = uploadStudentFiles.fields(fields);

  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: err.message });
    } else if (err) {
      return res.status(500).json({ error: err.message });
    }
    next();
  });
};

// Define the routes
router.post(
  "/register",
  uploadStudentFiles.fields([
    { name: "student_profile_image", maxCount: 1 }, // Multiple profile images allowed
    { name: "student_cv", maxCount: 1 }, // Single CV allowed
    { name: "student_marksheet", maxCount: 6 }, // Multiple marksheets allowed
  ]),
  registerStudent
);

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

router.get("/refresh-token", reGenerateAccessToken);

router.put(
  "/update-profile",
  verifyJWT,
  handleConditionalFileUploads, // Use the conditional upload middleware
  updateStudentProfile
);

router.put(
  "/update-student-password",
  verifyJWT,
  handleFormData,
  updateStudentPassword
);

router.get("/get-student-by-branch", verifyJWT, getStudentDetailsByBranch);

router.get("/get-profile", verifyJWT, verifyAPIKey, getProfile);

router.get("/get-profile-image", verifyJWT, verifyAPIKey, getProfileImage);

export default router;
