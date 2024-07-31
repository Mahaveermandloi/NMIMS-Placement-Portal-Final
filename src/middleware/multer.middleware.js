import multer from "multer";

// Create an instance of multer with memory storage (you can change this to disk storage if needed)
const storage = multer.memoryStorage(); // or use multer.diskStorage()

// Create multer instance with storage and limits (optional)
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB file size limit
  },
});

// Middleware to handle form data
const handleFormData = upload.any();

export default handleFormData;
