import { Router } from "express";

import {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  reGenerateAccessToken,
} from "../controllers/admin.controller.js";
import handleFormData from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
const router = Router();

router.post("/register", registerAdmin);
router.post("/login", handleFormData, loginAdmin);
router.post("/logout", verifyJWT, logoutAdmin);
router.get("/refresh-token",reGenerateAccessToken);
// router.get("/forget-password" , forgetPassword);

export default router;
