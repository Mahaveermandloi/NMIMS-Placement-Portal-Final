import { Router } from "express";
import { verifyAPIKey, verifyJWT } from "../middleware/auth.middleware.js";
import handleFormData from "../middleware/handleFormData.js";
import {
  createPlacedStudent,
  getAllPlacedStudents,
  deletePlacedStudent,
  getPlacedStudentById,
  updatePlacedStudentProfile,
  updatePlacedStudent,
} from "../controllers/placedstudents.controller.js";

const router = Router();

router.post("/placedstudents", verifyJWT, handleFormData, createPlacedStudent);

router.get("/placedstudents", verifyAPIKey, getAllPlacedStudents);

router.get("/placedstudents/:id", verifyAPIKey, getPlacedStudentById);

router.put(
  "/placedstudents/:id",
  verifyJWT,
  handleFormData,
  updatePlacedStudent
);

router.delete("/placedstudents/:id", verifyJWT, deletePlacedStudent);

router.put("/updateplacedstudents", updatePlacedStudentProfile);

export default router;
