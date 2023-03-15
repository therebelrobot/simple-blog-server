import dotenv from "dotenv";

dotenv.config();

export default {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 3000,
  MONGODB_URI:
    process.env.MONGODB_URI || "mongodb://localhost:27017/simple-blog-platform",
  MONGODB_URI_TEST:
    process.env.MONGODB_URI_TEST ||
    "mongodb://localhost:27017/simple-blog-platform-test",
  MONGODB_DB_NAME: process.env.MONGODB_DB_NAME || "myapp",
  MONGODB_USER: process.env.MONGODB_USER || "",
  MONGODB_PASS: process.env.MONGODB_PASS || "",
  // AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY || '',
  // AWS_SECRET_KEY: process.env.AWS_SECRET_KEY || '',
  // AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME || '',
};
