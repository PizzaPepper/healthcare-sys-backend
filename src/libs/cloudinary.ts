import { v2 as cloudinary } from "cloudinary";
import { API_KEY, API_SECRET, CLOUD_NAME } from "../config";

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

export const upload = async (filePath: string) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: "files",
    resource_type: "auto",
  });
};
