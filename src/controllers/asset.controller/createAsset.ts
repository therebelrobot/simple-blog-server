import { Request, Response, NextFunction } from "express";
import Asset from "../../models/asset.model";

export async function createAsset(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const {
      originalname: filename,
      mimetype: contentType,
      size: fileSize,
      filename: path,
    } = req.file || {};

    const asset = new Asset({
      filename,
      contentType,
      fileSize,
      path: `/uploads/${path}`,
    });
    await asset.save();
    res.status(201).json(asset);
  } catch (err) {
    next(err);
  }
}
