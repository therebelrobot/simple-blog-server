import { Request, Response, NextFunction } from "express";
import { updatePost } from "./updatePost";
import Post from "../../models/post.model";
import sinon, { SinonSpy, SinonStub } from "sinon";

interface MockResponse extends Response {
  status: SinonSpy;
  json: SinonSpy;
}

describe("updatePost", () => {
  let next: SinonSpy;

  beforeEach(() => {
    next = sinon.spy();
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should update a post and return a 200 status", async () => {
    // Arrange
    const postId = "somePostId";
    const req = {
      params: { id: postId },
      body: {
        title: "Updated Post",
        content: "This is an updated test post",
        category: "updated",
      },
    } as unknown as Request;

    const updatedPost = new Post({
      ...req.body,
      _id: postId,
      updatedAt: new Date(),
    });

    sinon.stub(Post, "findByIdAndUpdate").resolves(updatedPost);

    const res = {
      status: sinon.spy((code: number) => res),
      json: sinon.spy((data: any) => res),
    } as unknown as MockResponse;

    // Act
    await updatePost(req, res, next);

    // Assert
    expect(res.status.calledWith(200)).toBe(true);
    expect(res.json.firstCall.args[0]).toEqual(updatedPost);
    expect(next.called).toBe(false);
  });

  it("should call the next function with error if post update fails", async () => {
    // Arrange
    const postId = "somePostId";
    const req = {
      params: { id: postId },
      body: {
        title: "Updated Post",
        content: "This is an updated test post",
        category: "updated",
      },
    } as unknown as Request;

    const error = new Error("Post update failed");

    sinon.stub(Post, "findByIdAndUpdate").rejects(error);

    const res = {
      status: sinon.spy((code: number) => res),
      json: sinon.spy((data: any) => res),
    } as unknown as MockResponse;

    // Act
    await updatePost(req, res, next);

    // Assert
    expect(next.calledWith(error)).toBe(true);
    expect(res.status.calledWith(200)).toBe(false);
    expect(res.json.calledWithMatch({})).toBe(false);
  });

  it("should return a 404 status if post is not found", async () => {
    // Arrange
    const postId = "somePostId";
    const req = {
      params: { id: postId },
      body: {
        title: "Updated Post",
        content: "This is an updated test post",
        category: "updated",
      },
    } as unknown as Request;

    sinon.stub(Post, "findByIdAndUpdate").resolves(null);

    const res = {
      status: sinon.spy((code: number) => res),
      json: sinon.spy((data: any) => res),
    } as unknown as MockResponse;

    // Act
    await updatePost(req, res, next);

    // Assert
    expect(res.status.calledWith(404)).toBe(true);
    expect(res.json.calledWith({ message: "Post not found" })).toBe(true);
    expect(next.called).toBe(false);
  });
});
