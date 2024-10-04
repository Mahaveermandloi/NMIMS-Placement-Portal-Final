import { Router } from "express";
import { verifyAPIKey, verifyJWT } from "../middleware/auth.middleware.js";
import handleFormData from "../middleware/handleFormData.js";
import {
  createBranch,
  deleteBranch,
  getAllBranches,
  getBranchById,
  updateBranch,
} from "../controllers/branch.controller.js";

const router = Router();

// Route to create a new job listing
router.post("/branch", verifyJWT, handleFormData, createBranch);

// Route to get all job listings
router.get("/branch", verifyAPIKey, getAllBranches);

// Route to get a specific job listing by ID
router.get("/branch/:id", verifyAPIKey, getBranchById);

// Route to update a specific job listing by ID
router.put("/branch/:id", verifyJWT, handleFormData, updateBranch);

// Route to delete a specific job listing by ID
router.delete("/branch/:id", verifyJWT, deleteBranch);

export default router;
