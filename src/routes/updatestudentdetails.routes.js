import { Router } from "express";
import { verifyAPIKey, verifyJWT } from "../middleware/auth.middleware.js";

import {
  retrieveResource,
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
import handleFormData from "../middleware/handleFormData.js";

import { upload2  , upload} from "../middleware/cloudinary.middleware.js";

const router = Router();

router.put(
  "/updateprofileimage",
  verifyAPIKey,
  verifyJWT,
  upload.single("student_profile_image"),
  updateProfileImage
);



router.put(
  "/updatecollegedetails",
  verifyAPIKey,
  verifyJWT,
  uploadMultipleFiles, // Middleware for handling multiple files (e.g., CV, marksheets)
  updateCollegeDetails // Controller to handle logic
);

// Other routes remain unchanged
router.put("/updatebasicdetails", verifyAPIKey, verifyJWT, handleFormData, updateBasicDetails);

router.put(
  "/updatetenthdetails",
  verifyAPIKey,
  verifyJWT,
  upload2.single("tenth_marksheet"),
  updateClassTenthDetails
);


router.put(
  "/updatetwelfthdetails",
  verifyAPIKey,
  verifyJWT,
  upload2.single("twelfth_marksheet"),
  
  updateClassTweflthDetails
);
router.put(
  "/updatediplomadetails",
  verifyAPIKey,
  verifyJWT,
  upload2.single("diploma_marksheet"),
  
  updateDiplomaDetails
);

router.put("/updateskills", verifyAPIKey, verifyJWT, handleFormData ,updateSkills);

router.put("/retrieveResource", handleFormData,  retrieveResource);

export default router;
