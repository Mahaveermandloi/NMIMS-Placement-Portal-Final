
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the file storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = "";
    console.log(file);
    if (
      file.fieldname === "student_profile_image" &&
      file.mimetype.includes("image")
    ) {
      uploadPath = path.join(
        __dirname,
        "..",
        "uploads",
        "Student",
        "ProfileImage"
      );
    } else if (
      file.fieldname === "student_cv" &&
      file.mimetype.includes("pdf")
    ) {
      uploadPath = path.join(__dirname, "..", "uploads", "Student", "Resume");
    } else if (
      file.fieldname === "student_marksheet" &&
      file.mimetype.includes("pdf")
    ) {
      uploadPath = path.join(
        __dirname,
        "..",
        "uploads",
        "Student",
        "Marksheets"
      );
    } else {
      return cb(new Error("Unsupported file type"), null);
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueSuffix);
  },
});

// Define the file filter function
const fileFilter = (req, file, cb) => {
  if (
    (file.fieldname === "student_profile_image" &&
      file.mimetype.includes("image")) ||
    (file.fieldname === "student_cv" && file.mimetype === "application/pdf") ||
    (file.fieldname === "student_marksheet" &&
      file.mimetype === "application/pdf")
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// Initialize multer with the storage configuration
const uploadStudentFiles = multer({ storage, fileFilter });

export { uploadStudentFiles };
