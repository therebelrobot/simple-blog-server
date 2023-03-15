import { Request, Response, NextFunction } from "express";
import Post from "../../models/post.model";

export async function getPosts(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { category, sort } = req.query;
    let query = Post.find();
    if (category) {
      query = query.where({ category: category as string });
    }
    if (sort === "asc") {
      query = query.sort({ createdAt: 1 });
    } else if (sort === "desc") {
      query = query.sort({ createdAt: -1 });
    }
    const posts = await query.exec();
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
}
