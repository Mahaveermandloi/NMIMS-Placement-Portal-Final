import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import adminRoutes from "../src/routes/admin.routes.js";
import userRoutes from "../src/routes/student.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware for parsing JSON and URL-encoded data
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Middleware for parsing cookies
app.use(cookieParser());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// CORS configuration
const allowedOrigins = ["http://localhost:5173"]; // Adjust as needed

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },

    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

// Register admin routes
app.use("/api/admin", adminRoutes);

app.use("/api/student", userRoutes);

// Error handling middleware
app.use(errorHandler);

// Export the app module
export { app };
