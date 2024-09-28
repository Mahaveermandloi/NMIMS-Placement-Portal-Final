import { Router } from "express";
import { verifyAPIKey, verifyJWT } from "../middleware/auth.middleware.js";
import { placementStats } from "../controllers/dashboard.controller.js";

const router = Router();

router.get("/dashboard", placementStats);


export default router;
