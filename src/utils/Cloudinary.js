import fs from "fs";
import pkg from "cloudinary";
const { v2: cloudinary } = pkg;
import path from "path";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localfilePath) => {
  try {
    if (!localfilePath) {
      return null;
    }

    const fileName = path.basename(localfilePath);
    const publicId = `${fileName}`;

    const response = await cloudinary.uploader.upload(localfilePath, {
      resource_type: "auto",
      public_id: publicId,
      access_mode: "public",
      type: "upload",
      folder: "Student",
      
    });

    fs.unlinkSync(localfilePath);

    return response;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    fs.unlinkSync(localfilePath);
    return null;
  }
};

export { uploadOnCloudinary };
