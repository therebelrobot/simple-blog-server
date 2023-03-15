import { Request } from "express";
import { deletePost } from "./deletePost";
import Post from "../../models/post.model";
import sinon, { SinonSpy } from "sinon";
import { MockResponse } from "../../../test/utils/testHelper";

describe("deletePost", () => {
  let next: SinonSpy;

  beforeEach(() => {
    next = sinon.spy();
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should delete a post and return a 204 status", async () => {
    // Arrange
    const req = {
      params: {
        id: "somePostId",
      },
    } as unknown as Request;

    const res = {
      status: sinon.spy((code: number) => res),
      json: sinon.spy((data: any) => res),
      send: sinon.spy(() => res),
    } as unknown as MockResponse;

    const post = new Post({
      title: "Test Post",
      content: "Test content",
      category: "test",
    });
    sinon.stub(Post, "findByIdAndDelete").resolves(post);

    // Act
    await deletePost(req, res, next);

    // Assert
    expect(res.status.calledWith(204)).toBe(true);
    expect(res.send.calledOnce).toBe(true);
    expect(next.called).toBe(false);
  });

  it("should return a 404 status if the post is not found", async () => {
    // Arrange
    const req = {
      params: {
        id: "nonexistentPostId",
      },
    } as unknown as Request;

    const res = {
      status: sinon.spy((code: number) => res),
      json: sinon.spy((data: any) => res),
      send: sinon.spy(() => res),
    } as unknown as MockResponse;

    sinon.stub(Post, "findByIdAndDelete").resolves(null);

    // Act
    await deletePost(req, res, next);

    // Assert
    expect(res.status.calledWith(404)).toBe(true);
    expect(res.json.calledWith({ message: "Post not found" })).toBe(true);
    expect(next.called).toBe(false);
  });

  it("should call the next function with error if post deletion fails", async () => {
    // Arrange
    const req = {
      params: {
        id: "somePostId",
      },
    } as unknown as Request;

    const res = {
      status: sinon.spy((code: number) => res),
      json: sinon.spy((data: any) => res),
      send: sinon.spy(() => res),
    } as unknown as MockResponse;

    const error = new Error("Post deletion failed");
    sinon.stub(Post, "findByIdAndDelete").rejects(error);

    // Act
    await deletePost(req, res, next);

    // Assert
    expect(next.calledWith(error)).toBe(true);
    expect(res.status.called).toBe(false);
    expect(res.json.called).toBe(false);
  });
});
