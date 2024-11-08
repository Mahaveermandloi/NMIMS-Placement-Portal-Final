import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dlsl6hruh",
  api_key: "217943112966755",
  api_secret: "fc7NcOReVkScUObX2EA0u-5icaY",
});

// Configure Cloudinary Storage for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: (req, file) => {
    

    let folder = "";
    let format;

    // Determine the folder based on the field name
    switch (file.fieldname) {
      case "student_profile_image":
        folder = "Student/ProfileImage";
        break;
      case "student_resume":
        folder = "Student/Resume";
        break;
      case "student_marksheet":
        folder = "Student/Marksheets";
        break;
      case "tenth_marksheet":
        folder = "Student/Marksheets/Tenth";
        break;
      case "twelfth_marksheet":
        folder = "Student/Marksheets/Twelfth";
        break;
      case "diploma_marksheet":
        folder = "Student/Marksheets/Diploma";
        break;
      case "company_logo":
        folder = "Company/Logo";
        break;
      case "company_files":
        folder = "Company/Files";
        break;
      case "admin_profile_image":
        folder = "Admin/ProfileImage";
        break;
      case "excel_file":
        folder = "Admin/Excel_file";
        break;
      default:
        folder = "General";
        break;
    }

  

    // Set the format based on the MIME type
    if (file.mimetype.startsWith("image/")) {
      format = "png";
    } else if (file.mimetype === "application/pdf") {
      format = "pdf";
    } else if (
      file.mimetype === "application/vnd.ms-excel" || // for .xls files
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" // for .xlsx files
    ) {
      format = "xlsx"; // Set the format for Excel files
    } else if (file.mimetype.startsWith("application/")) {
      format = "xlsx"; // Fallback for other application types
    }

    return {
      folder: folder,
      format: format,
      public_id: `${Date.now()}-${file.originalname}`, // Create a unique public_id for Cloudinary
      type: "upload", // Set as public so anyone can access
      access_mode: "public",
    };
  },
});

const upload = multer({ storage });

export { upload };





// Configure Cloudinary Storage for multer
const storage2 = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: (req, file) => {
    let folder = "General";
    let format = "pdf"; // Default format

    // Determine folder based on field name
    const fieldToFolder = {
      student_profile_image: "Student/ProfileImage",
      student_resume: "Student/Resume",
      student_marksheet: "Student/Marksheets",
      tenth_marksheet: "Student/Marksheets/Tenth",
      twelfth_marksheet: "Student/Marksheets/Twelfth",
      diploma_marksheet: "Student/Marksheets/Diploma",
      company_logo: "Company/Logo",
      company_files: "Company/Files",
      admin_profile_image: "Admin/ProfileImage",
      excel_file: "Admin/Excel_file",
    };

    folder = fieldToFolder[file.fieldname] || folder;

    if (file.mimetype.startsWith("image/")) {
      format = "png";
    } else if (file.mimetype === "application/pdf") {
      format = "pdf";
    }

    return {
      folder,
      format,
      public_id: `${Date.now()}-${file.originalname.replace(/\..+$/, "")}`, // Use only the filename
    };
  },
});

const upload2 = multer({ storage2 });
export { upload2 };
