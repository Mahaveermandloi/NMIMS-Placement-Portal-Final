import { Router } from "express";
import { verifyAPIKey, verifyJWT } from "../middleware/auth.middleware.js";

import {
  updateBasicDetails,
  updateClassTenthDetails,
  updateClassTweflthDetails,
  updateCollegeDetails,
  updateDiplomaDetails,
  updateProfileImage,
  updateSkills,
} from "../controllers/updatestudentdetails.controller.js";

import {
  fileupload,
  uploadMultipleFiles,
} from "../middleware/multer2.middleware.js";

const router = Router();

router.put(
  "/updateprofileimage",
  verifyAPIKey,
  verifyJWT,
  fileupload.single("student_profile_image"),
  updateProfileImage
);

// Update College Details with multiple file upload (images, PDF, Excel)
// router.put(
//   "/updatecollegedetails",
//   verifyAPIKey,
//   verifyJWT,
//   uploadMultipleFiles, // Middleware for handling multiple files (e.g., CV, marksheets)
//   updateCollegeDetails // Controller to handle logic
// );

router.put(
  "/updatecollegedetails",
  verifyAPIKey,
  verifyJWT,
  uploadMultipleFiles, // Middleware for handling multiple files (e.g., CV, marksheets)
  updateCollegeDetails // Controller to handle logic
);


// Other routes remain unchanged
router.put("/updatebasicdetails", verifyAPIKey, verifyJWT, updateBasicDetails);

router.put(
  "/updatetenthdetails",
  verifyAPIKey,
  verifyJWT,
  fileupload.single("tenth_marksheet"),
  updateClassTenthDetails
);
router.put(
  "/updatetwelfthdetails",
  verifyAPIKey,
  verifyJWT,
  fileupload.single("twelfth_marksheet"),
  updateClassTweflthDetails
);
router.put(
  "/updatediplomadetails",
  verifyAPIKey,
  verifyJWT,
  fileupload.single("diploma_marksheet"),
  updateDiplomaDetails
);

router.put("/updateskills", verifyAPIKey, verifyJWT, updateSkills);

export default router;
