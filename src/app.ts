import express, { json, ErrorRequestHandler } from "express";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes";
import config from "./config";
import getPort, { portNumbers } from "get-port-cjs";

const app = express();

// Middleware
app.use(cors());
app.use(json());

// Routes
app.use(router);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    message: "Not Found",
  });
});

// Error handler
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: config.NODE_ENV === "development" ? err : "Internal server error",
  });
};
app.use(errorHandler);

// Connect to database and start server
mongoose
  .connect(config.MONGODB_URI, {
    bufferCommands: true,
    dbName: config.MONGODB_DB_NAME,
    user: config.MONGODB_USER,
    pass: config.MONGODB_PASS,
    autoIndex: false,
    autoCreate: true,
  })
  .then(async () => {
    // If testing, get a random port between 3000 and 3100
    const port =
      config.NODE_ENV === "testing"
        ? await getPort({ port: portNumbers(3000, 3100) })
        : config.PORT;
    return port;
  })
  .then((port) => {
    console.log("Connected to database");
    app.listen(port, () => {
      if (config.NODE_ENV === "testing") {
        console.log(`[TESTING SERVER]`);
      }
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });

export default app;
