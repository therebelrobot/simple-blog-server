import multer from "multer";
import path from "path";

// NOTE: Uncomment the inactive lines if you want to use AWS S3 for file storage

// import aws from 'aws-sdk';
// import multerS3 from 'multer-s3';

// // Set up AWS S3 client
// const s3 = new aws.S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
// });

// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("destination");
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: function (req, file, cb) {
    console.log("filename", file);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      `${file.fieldname}-${uniqueSuffix}.${file.mimetype.split("/")[1]}`
    );
  },
});

// const s3Storage = multerS3({
//   s3: s3,
//   bucket: process.env.AWS_S3_BUCKET_NAME,
//   contentType: multerS3.AUTO_CONTENT_TYPE,
//   key: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     cb(null, 'uploads/' + file.fieldname + '-' + uniqueSuffix);
//   }
// });

// Set up multer middleware to handle file uploads
export const upload = multer({
  storage: storage,
  // storage: s3Storage
});
