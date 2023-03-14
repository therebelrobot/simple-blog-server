import express, { Router } from "express";
import postRouter from "./post.route";
import assetRouter from "./asset.route";
import path from "path";

const router = Router();

// Mount post router
router.use("/posts", postRouter);

// Mount asset router
router.use("/assets", assetRouter);

// Serve static assets from the 'upload' folder
router.use(
  "/uploads",
  express.static(path.join(__dirname, "../middleware/uploads"))
);

export default router;
