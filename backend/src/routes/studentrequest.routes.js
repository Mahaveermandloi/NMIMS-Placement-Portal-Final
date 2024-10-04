import { Router } from "express";

import {
  getAllPendingStudents,
  approveStudentRequest,
  rejectStudentRequest,
  getStudentRequestById,
} from "../controllers/studentrequest.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import handleFormData from "../middleware/handleFormData.js";

const router = Router();

router.get(
  "/student-request",
  verifyJWT,
  handleFormData,
  getAllPendingStudents
);

router.get("/student-request/:student_sap_no", verifyJWT, getStudentRequestById);

router.put(
  "/student-request",
  verifyJWT,
  handleFormData,
  approveStudentRequest
);

router.delete(
  "/student-request",
  verifyJWT,
  handleFormData,
  rejectStudentRequest
);



export default router;
