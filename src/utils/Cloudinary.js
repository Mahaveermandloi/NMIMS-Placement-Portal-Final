import fs from "fs";
import pkg from "cloudinary";
const { v2: cloudinary } = pkg;
import path from "path";

cloudinary.config({
  cloud_name: "dlsl6hruh",
  api_key: "217943112966755",
  api_secret: "fc7NcOReVkScUObX2EA0u-5icaY",
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
