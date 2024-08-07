// import { Router } from "express";

// import {
//   registerAdmin,
//   loginAdmin,
//   logoutAdmin,
//   reGenerateAccessToken,
//   getAdminDetails,
//   updateProfile,
// } from "../controllers/admin.controller.js";

// import {
//   sendOtp,
//   verifyOtp,
//   updatePassword,
//   resendOtp,
// } from "../controllers/forgetpassword.controller.js";

// import handleFormData from "../middleware/handleFormData.js"; // Import the middleware

// import {
//   uploadProfileImage,
//   removeOldProfileImage,
// } from "../middleware/multer.middleware.js";

// import { verifyAPIKey, verifyJWT } from "../middleware/auth.middleware.js";

// const router = Router();

// router.post("/register", uploadProfileImage, registerAdmin);

// router.post("/login", handleFormData, loginAdmin);
// router.post("/logout", verifyJWT, logoutAdmin);
// router.get("/refresh-token", reGenerateAccessToken);

// router.post("/forget-password", handleFormData, sendOtp);
// router.post("/verify-otp", handleFormData, verifyOtp);
// router.post("/resend-otp", handleFormData, resendOtp);

// router.post("/update-password/:email", handleFormData, updatePassword);
// router.get("/get-admin-details", verifyAPIKey, verifyJWT, getAdminDetails);

// // update password and profile_image from profile section

// router.put(
//   "/update-profile",
//   handleFormData,
//   verifyJWT,
//   removeOldProfileImage,
//   handleFormData,
//   uploadProfileImage,
//   updateProfile
// );

// export default router;

import { Router } from "express";
import {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  reGenerateAccessToken,
  getAdminDetails,
  updateProfile,
} from "../controllers/admin.controller.js";
import {
  sendOtp,
  verifyOtp,
  updatePassword,
  resendOtp,
} from "../controllers/forgetpassword.controller.js";
import handleFormData from "../middleware/handleFormData.js";
import {
  uploadAdminProfileImage,
  removeOldProfileImage,
} from "../middleware/multer.middleware.js";
import { verifyAPIKey, verifyJWT } from "../middleware/auth.middleware.js";

import { updateNewPassword } from "../controllers/admin.controller.js";

const router = Router();

router.post("/register", uploadAdminProfileImage, registerAdmin);

router.post("/login", handleFormData, loginAdmin);

router.post("/logout", verifyJWT, logoutAdmin);

router.get("/refresh-token", reGenerateAccessToken);

router.post("/forget-password", handleFormData, sendOtp);
router.post("/verify-otp", handleFormData, verifyOtp);
router.post("/resend-otp", handleFormData, resendOtp);

router.post("/update-password/:email", handleFormData, updatePassword);

router.get("/get-admin-details", verifyAPIKey, verifyJWT, getAdminDetails);

router.put(
  "/update-profile",
  verifyJWT,
  removeOldProfileImage,
  uploadAdminProfileImage,
  updateProfile
);

router.put("/update-new-password", handleFormData, verifyJWT, updateNewPassword);

export default router;
