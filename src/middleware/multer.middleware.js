// import multer from "multer";
// import path from "path";
// import { fileURLToPath } from "url";
// import express from "express";

// const app = express();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Setup storage with multer.diskStorage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     if (file.fieldname === "profile_image" && file.mimetype.includes("image")) {
//       cb(null, path.join(__dirname, "..", "uploads", "Admin", "ProfileImage"));
//     } else {
//       cb(new Error("Unsupported file type"), null);
//     }
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// // Create multer instance without file size limit
// const upload = multer({
//   storage: storage,
//   // Remove file size limit
// });

// const uploadProfileImage = upload.single("profile_image");

// export default uploadProfileImage;




import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import { Admin } from "../models/admin.model.js"; // Adjust the import path as needed

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "profile_image" && file.mimetype.includes("image")) {
      cb(null, path.join(__dirname, "..", "uploads", "Admin", "ProfileImage"));
    } else {
      cb(new Error("Unsupported file type"), null);
    }
  },
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});


const upload = multer({ storage });


const uploadProfileImage = upload.single("profile_image");

// Middleware to remove the old profile image
const removeOldProfileImage = async (req, res, next) => {
  try {
    const adminId = req.admin; // Ensure `adminId` is set in a previous middleware
    const admin = await Admin.findById(adminId);

    if (!admin) {
      return next(new Error("Admin not found"));
    }

    if (admin.profile_image && req.file) {
      const oldImagePath = path.join(__dirname, "..", admin.profile_image);
      await fs.unlink(oldImagePath);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export { uploadProfileImage, removeOldProfileImage };
