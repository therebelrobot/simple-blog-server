import { Request, Response, NextFunction } from "express";
import Post from "../models/post.model";

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

export async function createPost(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    console.log(req.body);
    const { title, content, category, assetId } = req.body;
    const post = new Post({ title, content, category, assetId });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
}

export async function updatePost(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );
    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
}

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
