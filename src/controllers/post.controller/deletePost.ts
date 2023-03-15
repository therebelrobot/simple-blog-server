import { Request, Response, NextFunction } from "express";
import Post from "../../models/post.model";

export async function deletePost(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
