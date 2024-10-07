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
    } else if (
      file.fieldname === "excel_file" &&
      (file.mimetype ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.mimetype === "application/vnd.ms-excel")
    ) {
      cb(null, path.join(__dirname, "..", "uploads", "ShortlistedStudent"));
    } else if (
      file.fieldname === "student_excel_file" &&
      (file.mimetype ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.mimetype === "application/vnd.ms-excel")
    ) {
      cb(null, path.join(__dirname, "..", "uploads", "Student", "Excel"));
    } else {
      cb(new Error("Unsupported file type"), null);
    }
  },
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});




const marksheetStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "tenth_marksheet" && file.mimetype.includes("pdf")) {
      cb(null, path.join(__dirname, "..", "uploads", "Student", "Marksheets"));
    } else if (
      file.fieldname === "twelfth_marksheet" &&
      file.mimetype.includes("pdf")
    ) {
      cb(null, path.join(__dirname, "..", "uploads", "Student", "Marksheets"));
    } else if (
      file.fieldname === "diploma_marksheet" &&
      file.mimetype.includes("pdf")
    ) {
      cb(null, path.join(__dirname, "..", "uploads", "Student", "Marksheets"));
    } else {
      cb(new Error("Unsupported file type"), null);
    }
  },
  filename: (req, file, cb) => {
    // Create a unique filename using Date.now() and original filename
    const uniqueFilename = `${Date.now()}-${Math.floor(Math.random() * 10000)}-${file.originalname}`;
    
    // Return the unique filename
    cb(null, uniqueFilename);
  },
});



const upload = multer({ storage });
const uploadmarksheet = multer({ marksheetStorage });

const uploadAdminProfileImage = upload.single("profile_image");

const uploadShortlistedStudent = upload.single("excel_file");

const uploadStudentFile = upload.single("student_excel_file");

const tenthMarksheets = uploadmarksheet.single("tenth_marksheet");

const twelfthMarksheets = uploadmarksheet.single("twelfth_marksheet");

const diplomaMarksheets = uploadmarksheet.single("diploma_marksheet");

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

export {
  uploadAdminProfileImage,
  removeOldProfileImage,
  uploadShortlistedStudent,
  uploadStudentFile,
  tenthMarksheets,
  twelfthMarksheets,
  diplomaMarksheets,
};
