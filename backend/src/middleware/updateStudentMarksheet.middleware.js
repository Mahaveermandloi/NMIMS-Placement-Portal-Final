import fs from "fs";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const marksheetStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(
      __dirname,
      "..",
      "uploads",
      "Student",
      "Marksheets"
    );

    if (
      [
        "tenth_marksheet",
        "twelfth_marksheet",
        "diploma_marksheet",
        "student_marksheet",
      ].includes(file.fieldname) &&
      file.mimetype.includes("pdf")
    ) {
      fs.mkdir(uploadPath, { recursive: true }, (err) => {
        if (err) {
          return cb(err);
        }
        cb(null, uploadPath);
      });
    } else {
      return cb(new Error("Unsupported file type"), null);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueSuffix);
  },
});

const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath2 = path.join(
      __dirname,
      "..",
      "uploads",
      "Student",
      "ProfileImage"
    );

    if (
      ["student_profile_image"].includes(file.fieldname) &&
      file.mimetype.includes("pdf")
    ) {
      fs.mkdir(uploadPath2, { recursive: true }, (err) => {
        if (err) {
          return cb(err);
        }
        cb(null, uploadPath2);
      });
    } else {
      return cb(new Error("Unsupported file type"), null);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueSuffix);
  },
});

const uploadSingleMarksheet = multer({ storage: marksheetStorage });

const uploadSingleProfile = multer({ storage: profileStorage });

export { uploadSingleMarksheet, uploadSingleProfile };
