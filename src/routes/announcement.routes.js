import { Router } from "express";
import { verifyAPIKey, verifyJWT } from "../middleware/auth.middleware.js";
import handleFormData from "../middleware/handleFormData.js";
import { createAnnouncement, deleteAnnouncement, getAllAnnouncements, getAnnouncementById, updateAnnouncement } from "../controllers/announcement.controller.js";
import { uploadCompanyFiles } from "../middleware/companymulter.middleware.js";

const router = Router();

// Route to create a new job listing
router.post("/announcement", verifyJWT,uploadCompanyFiles , createAnnouncement);

// Route to get all job listings
router.get("/announcement", verifyAPIKey, getAllAnnouncements);

// Route to get a specific job listing by ID
router.get("/announcement/:id", verifyAPIKey, getAnnouncementById);

// Route to update a specific job listing by ID
router.put("/announcement/:id", verifyJWT, uploadCompanyFiles, updateAnnouncement);

// Route to delete a specific job listing by ID
router.delete("/announcement/:id", verifyJWT, deleteAnnouncement);

export default router;
