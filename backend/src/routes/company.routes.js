import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { uploadCompanyFiles } from "../middleware/companymulter.middleware.js";
import {
  createCompany,
  deleteCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
} from "../controllers/company.controller.js";

const router = Router();

router.post("/register-company", verifyJWT, uploadCompanyFiles, createCompany);

router.get("/get-all-companies", verifyJWT, getAllCompanies);

router.get("/get-company-by-id/:id", verifyJWT, getCompanyById);

router.put("/update-company/:id", verifyJWT, uploadCompanyFiles, updateCompany);

router.delete("/delete-company/:id", verifyJWT, deleteCompany);

export default router;
