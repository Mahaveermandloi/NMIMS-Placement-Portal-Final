import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

export const excelupload = multer({ storage: storage });

const storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "tenth_marksheet") {
      cb(null, "./public/temp/student/marksheet/tenth");
    } else if (file.fieldname === "twelfth_marksheet") {
      cb(null, "./public/temp/student/marksheet/twelfth");
    } else if (file.fieldname === "student_profile_image") {
      cb(null, "./public/temp/student/profileimage");
    } else if (file.fieldname === "diploma_marksheet") {
      cb(null, "./public/temp/student/marksheet/diploma");
    } else {
      cb(new Error("Invalid field name"), false);
    }
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

// Export the multer instance
export const fileupload = multer({ storage: storage2 });
//
//
//

const storage3 = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define the folder paths for student CV and all marksheets
    if (file.fieldname === "student_cv") {
      cb(null, "./public/temp/student/cv");
    } else if (file.fieldname === "student_marksheet") {
      cb(null, "./public/temp/student/marksheet/college");
    } else {
      cb(new Error("Invalid field name"));
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const uploadMultipleFiles = multer({
  storage: storage3,
}).fields([
  { name: "student_cv", maxCount: 1 },
  { name: "student_marksheet", maxCount: 6 }, // Allow multiple marksheets
]);
