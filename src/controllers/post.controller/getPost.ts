import { Request, Response, NextFunction } from "express";
import Post from "../../models/post.model";

export async function getPost(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
}
