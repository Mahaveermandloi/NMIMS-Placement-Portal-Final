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
import { upload } from "../middleware/cloudinary.middleware.js";

const router = Router();

// router.post("/register-company", verifyJWT, uploadCompanyFiles, createCompany);

// router.post("/register-company", verifyJWT, upload.single(""), createCompany);
// router.put("/update-company/:id", verifyJWT, uploadCompanyFiles, updateCompany);

router.post(
  "/register-company",
  verifyJWT,
  upload.single("company_logo"), 
  createCompany
);

router.put(
  "/update-company/:id",
  verifyJWT, 
  upload.single("company_logo"), 
  updateCompany 
);

router.get("/get-all-companies", verifyJWT, getAllCompanies);

router.get("/get-company-by-id/:id", verifyJWT, getCompanyById);

router.delete("/delete-company/:id", verifyJWT, deleteCompany);

export default router;
