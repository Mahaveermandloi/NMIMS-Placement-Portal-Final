import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Utility to get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the file storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = "";

    // Determine destination based on file type
    if (file.fieldname === "company_logo" && file.mimetype.includes("image")) {
      // Path for company logo
      uploadPath = path.join(__dirname, "..", "uploads", "Company", "Logo");
    } else if (file.fieldname === "company_files") {
      // Path for company files, accept any file type
      uploadPath = path.join(__dirname, "..", "uploads", "Company", "Files");
    } else {
      return cb(new Error("Unsupported file type"), null);
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Generate unique filename using timestamp and original name
    const uniqueSuffix = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueSuffix);
  },
});

// Define the file filter function
const fileFilter = (req, file, cb) => {
  // Allow only images for company logos and any type for company files
  if (
    (file.fieldname === "company_logo" && file.mimetype.includes("image")) ||
    file.fieldname === "company_files"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};



// Initialize multer with the storage configuration and file filter
const uploadCompanyFiles = multer({ storage, fileFilter }).fields([
  { name: "company_logo", maxCount: 1 }, // Only allow one company logo
  { name: "company_files", maxCount: 10 }, // Allow up to 10 company files
]);



export { uploadCompanyFiles };
