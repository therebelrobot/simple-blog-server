import { Request, Response, NextFunction } from "express";
import Post from "../../models/post.model";

export async function createPost(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { title, content, category, assetId } = req.body;
    const post = new Post({ title, content, category, assetId });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
}
