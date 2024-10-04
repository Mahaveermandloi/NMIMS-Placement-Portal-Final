// // import { v2 as cloudinary } from "cloudinary";
// // import dotenv from "dotenv";

// // // Load environment variables from .env file
// // dotenv.config();

// // export const uploadImage = async () => {
// //   // Configuration using environment variables
// //   cloudinary.config({
// //     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
// //     api_key: process.env.CLOUDINARY_API_KEY,
// //     api_secret: process.env.CLOUDINARY_API_SECRET,
// //   });

// //   try {
// //     // Upload an image
// //     const uploadResult = await cloudinary.uploader.upload(
// //       "https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg",
// //       { public_id: "shoes" }
// //     );
// //     console.log(uploadResult);

// //     // Optimize delivery by resizing and applying auto-format and auto-quality
// //     const optimizeUrl = cloudinary.url("shoes", {
// //       fetch_format: "auto",
// //       quality: "auto",
// //     });
// //     console.log(optimizeUrl);

// //     // Transform the image: auto-crop to square aspect ratio
// //     const autoCropUrl = cloudinary.url("shoes", {
// //       crop: "auto",
// //       gravity: "auto",
// //       width: 500,
// //       height: 500,
// //     });
// //     console.log(autoCropUrl);
// //   } catch (error) {
// //     console.log("Error:", error);
// //   }
// // };

// // uploadImage();


// import { v2 as cloudinary } from "cloudinary";
// import dotenv from "dotenv";
// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";

// dotenv.config();

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Configure Multer Storage for Cloudinary
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'student_uploads', // Specify a folder for student files
//     resource_type: (req, file) => {
//       // Determine the type of file to allow uploads for images, pdf, excel
//       const ext = file.mimetype.split("/")[1];
//       if (['jpg', 'jpeg', 'png', 'pdf', 'xlsx'].includes(ext)) {
//         return 'raw'; // 'raw' allows various file types including images, PDFs, and Excel
//       } else {
//         return 'image'; // Default to 'image' if it's an image
//       }
//     },
//   },
// });

// // Multer Middleware for handling single file upload (image, PDF, Excel)
// export const uploadStudentFile = multer({ storage });

// // Middleware for multiple files (image and documents like marksheets)
// export const uploadMultipleFiles = multer({
//   storage,
// }).fields([
//   { name: "student_profile_image", maxCount: 1 },
//   { name: "student_cv", maxCount: 1 },
//   { name: "student_marksheet", maxCount: 6 },
// ]);
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });


cloudinary.config({
    cloud_name: 'dlsl6hruh',
    api_key: '217943112966755',
    api_secret: 'fc7NcOReVkScUObX2EA0u-5icaY',
  });

// Set up the storage for Cloudinary
const storage = new CloudinaryStorage({  // Use 'new' keyword here
  cloudinary: cloudinary,
  folder: 'Student/ProfileImage',
  allowedFormats: ['jpg', 'png', 'jpeg'],
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// Create the upload middleware
const uploadProfileImage = multer({ storage: storage });

export { uploadProfileImage };
