import { Router } from "express";
import { verifyAPIKey, verifyJWT } from "../middleware/auth.middleware.js";
import handleFormData from "../middleware/handleFormData.js";
import {
  createShortlistedStudent,
  deleteExcel,
  deleteShortlistedStudent,
  getAllExcels,
  getAllShortlistedStudents,
  getShortlistedStudentById,
  updateShortlistedStudent,
  uploadExcelShortlistedStudent,
} from "../controllers/shortlistedstudents.controller.js";

// import { upload } from "../middleware/cloudinary.middleware.js";
import { excelupload } from "../middleware/multer2.middleware.js";
const router = Router();

router.post(
  "/shortlistedstudents",
  verifyJWT,
  handleFormData,
  createShortlistedStudent
);

router.get("/shortlistedstudents", verifyAPIKey, getAllShortlistedStudents);

router.get("/shortlistedstudents/:id", verifyAPIKey, getShortlistedStudentById);

router.put(
  "/shortlistedstudents/:id",
  verifyJWT,
  handleFormData,
  updateShortlistedStudent
);

router.delete("/shortlistedstudents/:id", verifyJWT, deleteShortlistedStudent);

router.post(
  "/upload-excel-shortlistedstudents",
  verifyJWT,
  excelupload.single("excel_file"),
  uploadExcelShortlistedStudent // Handle the uploaded file
);

router.get("/get-all-shortlisted-excels", verifyJWT, getAllExcels);

router.delete("/delete-file/:id", verifyJWT, deleteExcel);

export default router;
