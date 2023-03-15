// src/routes/asset.route.ts

import express from "express";
import { getAsset } from "../controllers/asset.controller/getAsset";
import { createAsset } from "../controllers/asset.controller/createAsset";
import { upload } from "../middleware/upload.middleware";

const router = express.Router();

router.post("/", upload.single("file"), createAsset);
router.get("/:id", getAsset);

export default router;
