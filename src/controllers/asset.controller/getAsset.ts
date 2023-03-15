import { Request, Response, NextFunction } from "express";
import Asset from "../../models/asset.model";

export async function getAsset(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const asset = await Asset.findById(req.params.id);
    if (!asset) {
      res.status(404).json({ message: "Asset not found" });
      return;
    }
    res.status(200).json(asset);
  } catch (err) {
    next(err);
  }
}
