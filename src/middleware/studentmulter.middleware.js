import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the file storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = "";
  
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


// const marksheetStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     let uploadPath = "";
    
//     if (file.fieldname === "tenth_marksheet" && file.mimetype.includes("pdf")) {
//       uploadPath = path.join(
//         __dirname,
//         "..",
//         "uploads",
//         "Student",
//         "Marksheets"
//       );
//     } else if (
//       file.fieldname === "twelfth_marksheet" &&
//       file.mimetype.includes("pdf")
//     ) {
//       uploadPath = path.join(
//         __dirname,
//         "..",
//         "uploads",
//         "Student",
//         "Marksheets"
//       );
//     } else if (
//       file.fieldname === "diploma_marksheet" &&
//       file.mimetype.includes("pdf")
//     ) {
//       uploadPath = path.join(
//         __dirname,
//         "..",
//         "uploads",
//         "Student",
//         "Marksheets"
//       );
//     } else {
//       return cb(new Error("Unsupported file type"), null);
//     }

//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = `${Date.now()}-${file.originalname}`;

//     cb(null, uniqueSuffix);
//   },
// });

// // Define the file filter function

// const marksheetFilter = (req, file, cb) => {
//   if (
//     (file.fieldname === "tenth_marksheet" && file.mimetype.includes("pdf")) ||
//     (file.fieldname === "twelfth_marksheet" &&
//       file.mimetype === "application/pdf") ||
//     (file.fieldname === "diploma_marksheet" &&
//       file.mimetype === "application/pdf")
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// Initialize multer with the storage configuration
const uploadStudentFiles = multer({ storage, fileFilter });


const marksheetStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set upload path for all marksheets
    const uploadPath = path.join(__dirname, "..", "uploads", "Student", "Marksheets");

    // Check file type and field name
    if (["tenth_marksheet", "twelfth_marksheet", "diploma_marksheet"].includes(file.fieldname) && file.mimetype.includes("pdf")) {
      // Check if the directory exists, create if it doesn't
      fs.mkdir(uploadPath, { recursive: true }, (err) => {
        if (err) {
          return cb(err);
        }
        cb(null, uploadPath); // Proceed with the upload path
      });
    } else {
      return cb(new Error("Unsupported file type"), null);
    }
  },
  filename: (req, file, cb) => {
    // Create a unique filename for each upload
    const uniqueSuffix = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueSuffix); // Save the file with the unique filename
  },
});

// Initialize multer with the storage configuration for student marksheets
const uploadStudentMarksheets = multer({ storage: marksheetStorage }).fields([
  { name: 'tenth_marksheet', maxCount: 1 },
  { name: 'twelfth_marksheet', maxCount: 1 },
  { name: 'diploma_marksheet', maxCount: 1 }
]);

// const uploadStudentMarksheets = multer({ marksheetStorage, marksheetFilter });

export { uploadStudentFiles, uploadStudentMarksheets };
