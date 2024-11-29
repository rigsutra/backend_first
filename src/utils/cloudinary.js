import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadCloudinary = async (filelocalpath) => {
  try {
    if (!filelocalpath) return null;
    const result = await cloudinary.uploader.upload(filelocalpath, {
      resource_type: "auto",
    });
    console.log("File uploaded successfully");
    return result;
  } catch (error) {
    fs.unlinkSync(filelocalpath);
    console.log("File upload failed");
    return null;
  }
};

export { uploadCloudinary };
