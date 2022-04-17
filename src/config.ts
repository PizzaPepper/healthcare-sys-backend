import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/healthcareTest";
export const SECRET_TOKEN = process.env.SECRET_TOKEN || "whateveryouwant";
export const CLOUD_NAME = process.env.CLOUD_NAME;
export const API_KEY = process.env.API_KEY;
export const API_SECRET = process.env.API_SECRET;
