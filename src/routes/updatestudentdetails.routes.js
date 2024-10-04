// import { Router } from "express";

// import { uploadStudentFiles } from "../middleware/studentmulter.middleware.js";

// import { verifyAPIKey, verifyJWT } from "../middleware/auth.middleware.js";
// import handleFormData from "../middleware/handleFormData.js";
// import { uploadImage } from "../middleware/cloudinary.middleware.js";

// import {
//   updateBasicDetails,
//   updateClassTenthDetails,
//   updateClassTweflthDetails,
//   updateCollegeDetails,
//   updateDiplomaDetails,
//   updateProfileImage,
//   updateSkills,
// } from "../controllers/updatestudentdetails.controller.js";

// import {
//   uploadSingleMarksheet,
//   uploadSingleProfile,
// } from "../middleware/updateStudentMarksheet.middleware.js";

// const router = Router();

// router.put(
//   "/updatebasicdetails",
//   verifyAPIKey,
//   verifyJWT,
//   handleFormData,
//   updateBasicDetails
// );

// router.put(
//   "/updatetenthdetails",
//   verifyAPIKey,
//   verifyJWT,
//   uploadSingleMarksheet.single("tenth_marksheet"),
//   updateClassTenthDetails
// );

// router.put(
//   "/updatetwelfthdetails",
//   verifyAPIKey,
//   verifyJWT,
//   uploadSingleMarksheet.single("twelfth_marksheet"),
//   updateClassTweflthDetails
// );

// router.put(
//   "/updatediplomadetails",
//   verifyAPIKey,
//   verifyJWT,
//   uploadSingleMarksheet.single("diploma_marksheet"),
//   updateDiplomaDetails
// );

// router.put(
//   "/updatecollegedetails",
//   verifyAPIKey,
//   verifyJWT,
//   uploadStudentFiles.fields([
//     // { name: "student_profile_image", maxCount: 1 },
//     { name: "student_cv", maxCount: 1 },
//     { name: "student_marksheet", maxCount: 6 },
//   ]),

//   updateCollegeDetails
// );

// router.put(
//   "/updateprofileimage",
//   verifyAPIKey,
//   verifyJWT,
//   // uploadStudentFiles.fields([{ name: "student_profile_image", maxCount: 1 }]),

//   updateProfileImage
// );

// router.put(
//   "/updateskills",

//   verifyAPIKey,
//   verifyJWT,
//   handleFormData,
//   updateSkills
// );

// export default router;























import { Router } from "express";
// import { uploadStudentFile, uploadMultipleFiles } from "../middleware/cloudinary.middleware.js"; 
import { verifyAPIKey, verifyJWT } from "../middleware/auth.middleware.js";

import { uploadProfileImage } from "../middleware/cloudinary.middleware.js"; // Adjust the path accordingly


import {
  updateBasicDetails,
  updateClassTenthDetails,
  updateClassTweflthDetails,
  updateCollegeDetails,
  updateDiplomaDetails,
  updateProfileImage,
  updateSkills,
} from "../controllers/updatestudentdetails.controller.js";

const router = Router();

// Update Profile Image Route (using Cloudinary upload middleware)
// router.put(
//   "/updateprofileimage",
//   verifyAPIKey,
//   verifyJWT,
//   uploadStudentFile.single("student_profile_image"), // Upload profile image to Cloudinary
//   updateProfileImage // Controller to handle the rest
// );


router.put(
  "/updateprofileimage",
  verifyAPIKey,
  verifyJWT,
  uploadProfileImage.single("student_profile_image"), // Use the single method for image uploads
  updateProfileImage
);

// Update College Details with multiple file upload (images, PDF, Excel)
router.put(
  "/updatecollegedetails",
  verifyAPIKey,
  verifyJWT,
  // uploadMultipleFiles, // Middleware for handling multiple files (e.g., CV, marksheets)
  updateCollegeDetails // Controller to handle logic
);

// Other routes remain unchanged
router.put("/updatebasicdetails", verifyAPIKey, verifyJWT, updateBasicDetails);
router.put("/updatetenthdetails", verifyAPIKey, verifyJWT, updateClassTenthDetails);
router.put("/updatetwelfthdetails", verifyAPIKey, verifyJWT, updateClassTweflthDetails);
router.put("/updatediplomadetails", verifyAPIKey, verifyJWT, updateDiplomaDetails);
router.put("/updateskills", verifyAPIKey, verifyJWT, updateSkills);

export default router;
