import { Router } from "express";

import { uploadStudentFiles } from "../middleware/studentmulter.middleware.js";

import { verifyAPIKey, verifyJWT } from "../middleware/auth.middleware.js";
import handleFormData from "../middleware/handleFormData.js";

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
  uploadSingleMarksheet,
  uploadSingleProfile,
} from "../middleware/updateStudentMarksheet.middleware.js";

const router = Router();

router.put(
  "/updatebasicdetails",
  verifyAPIKey,
  verifyJWT,
  handleFormData,
  updateBasicDetails
);

router.put(
  "/updatetenthdetails",
  verifyAPIKey,
  verifyJWT,
  uploadSingleMarksheet.single("tenth_marksheet"),
  updateClassTenthDetails
);

router.put(
  "/updatetwelfthdetails",
  verifyAPIKey,
  verifyJWT,
  uploadSingleMarksheet.single("twelfth_marksheet"),
  updateClassTweflthDetails
);

router.put(
  "/updatediplomadetails",
  verifyAPIKey,
  verifyJWT,
  uploadSingleMarksheet.single("diploma_marksheet"),
  updateDiplomaDetails
);

router.put(
  "/updatecollegedetails",
  verifyAPIKey,
  verifyJWT,
  uploadStudentFiles.fields([
    // { name: "student_profile_image", maxCount: 1 },
    { name: "student_cv", maxCount: 1 },
    { name: "student_marksheet", maxCount: 6 },
  ]),

  updateCollegeDetails
);

router.put(
  "/updateprofileimage",
  verifyAPIKey,
  verifyJWT,
  uploadStudentFiles.fields([{ name: "student_profile_image", maxCount: 1 }]),

  updateProfileImage
);

router.put(
  "/updateskills",

  verifyAPIKey,
  verifyJWT,
  handleFormData,
  updateSkills
);

export default router;
