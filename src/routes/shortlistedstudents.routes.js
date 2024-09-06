import { Router } from "express";
import { verifyAPIKey, verifyJWT } from "../middleware/auth.middleware.js";
import handleFormData from "../middleware/handleFormData.js";
import {
  createShortlistedStudent,
  deleteShortlistedStudent,
  getAllShortlistedStudents,
  getShortlistedStudentById,
  updateShortlistedStudent,
  uploadExcelShortlistedStudent,
} from "../controllers/shortlistedstudents.controller.js";

import { uploadShortlistedStudent } from "../middleware/multer.middleware.js";

const router = Router();

// Route to create a new job listing
router.post(
  "/shortlistedstudents",
  verifyJWT,
  handleFormData,
  createShortlistedStudent
);

// Route to get all job listings
router.get("/shortlistedstudents", verifyAPIKey, getAllShortlistedStudents);

// Route to get a specific job listing by ID
router.get("/shortlistedstudents/:id", verifyAPIKey, getShortlistedStudentById);

// Route to update a specific job listing by ID
router.put(
  "/shortlistedstudents/:id",
  verifyJWT,
  handleFormData,
  updateShortlistedStudent
);

// Route to delete a specific job listing by ID
router.delete("/shortlistedstudents/:id", verifyJWT, deleteShortlistedStudent);

router.post(
  "/upload-excel-shortlistedstudents",
  verifyJWT,
  uploadShortlistedStudent,
  uploadExcelShortlistedStudent
);

export default router;
