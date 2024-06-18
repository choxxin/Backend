//we willa sume that file has came from server which is localpath then we will proceed
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //upload file on clodinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto", //automatically find the typr of the file
    });
    console.log("File has uploaded on cloudinary ", response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); //remove the locally temporary file path
    return null;
  }
};

export { uploadOnCloudinary };
