import { Router } from "express";
import { verifyAPIKey, verifyJWT } from "../middleware/auth.middleware.js";
import handleFormData from "../middleware/handleFormData.js";
import {
  createJobListing,
  getAllJobListings,
  getJobListingById,
  updateJobListing,
  deleteJobListing,
} from "../controllers/joblisting.controller.js";

const router = Router();

// Route to create a new job listing
router.post("/joblisting", verifyJWT, handleFormData, createJobListing);

// Route to get all job listings
router.get("/joblisting", verifyAPIKey, getAllJobListings);

// Route to get a specific job listing by ID
router.get("/joblisting/:id", verifyAPIKey, getJobListingById);

// Route to update a specific job listing by ID
router.put("/joblisting/:id", verifyJWT, handleFormData, updateJobListing);

// Route to delete a specific job listing by ID
router.delete("/joblisting/:id", verifyJWT, deleteJobListing);

export default router;
