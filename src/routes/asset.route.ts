// src/routes/asset.route.ts

import express from "express";
import { createAsset, getAsset } from "../controllers/asset.controller";
import { upload } from "../middleware/upload.middleware";

const router = express.Router();

router.post("/", upload.single("file"), createAsset);
router.get("/:id", getAsset);

export default router;
