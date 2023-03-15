import express from "express";
import { deletePost } from "../controllers/post.controller/deletePost";
import { updatePost } from "../controllers/post.controller/updatePost";
import { createPost } from "../controllers/post.controller/createPost";
import { getPost } from "../controllers/post.controller/getPost";
import { getPosts } from "../controllers/post.controller/getPosts";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
