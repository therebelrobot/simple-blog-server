import mongoose from "mongoose";
import Post, { Post as PostType } from ".//post.model";
import {
  connectToTestDatabase,
  clearDatabase,
  disconnectFromTestDatabase,
} from "../../test/utils/testHelper";

describe("Post Model Test", () => {
  let post: mongoose.Document<unknown, {}, PostType> &
    Omit<PostType & { _id: mongoose.ObjectId }, never>;
  beforeAll(async () => {
    await connectToTestDatabase();
    post = new Post({
      title: "Test Post",
      content: "This is a test post",
      category: "Test",
    });
  });

  afterEach(async () => {
    await clearDatabase();
  });

  afterAll(async () => {
    await disconnectFromTestDatabase();
  });

  it("can be saved", async () => {
    const savedPost = await post.save();
    expect(savedPost._id).toBeDefined();
    expect(savedPost.title).toBe(post.title);
    expect(savedPost.content).toBe(post.content);
    expect(savedPost.category).toBe(post.category);
    expect(savedPost.createdAt).toBeTruthy();
    expect(savedPost.updatedAt).toBeTruthy();
  });

  it("can be searched by title", async () => {
    const savedPost = await post.save();
    const foundPost = await Post.findOne({ title: post.title });
    expect(foundPost).toBeTruthy();
    expect(foundPost?._id.toString()).toEqual(savedPost._id.toString());
  });

  it("can be updated", async () => {
    await post.save();
    const newTitle = "Updated Post Title";
    post.title = newTitle;
    const updatedPost = await post.save();
    expect(updatedPost.title).toBe(newTitle);
  });

  it("can be deleted", async () => {
    await post.save();
    const deletedPost = await post.deleteOne();
    expect(deletedPost._id).toBeDefined();
  });
});
