import express, { json, ErrorRequestHandler } from "express";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes";
import config from "./config";

const app = express();

// Middleware
app.use(cors());
app.use(json());

// Routes
app.use(router);

// Error handler
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
};
app.use(errorHandler);

// Connect to database and start server
mongoose
  .connect(config.MONGODB_URI, {
    bufferCommands: false,
    dbName: config.MONGODB_DB_NAME,
    user: config.MONGODB_USER,
    pass: config.MONGODB_PASS,
    autoIndex: false,
    autoCreate: true,
  })
  .then(() => {
    console.log("Connected to database");
    app.listen(config.PORT, () => {
      console.log(`Server listening on port ${config.PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });

export default app;
