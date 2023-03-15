import { Request } from "express";
import { getPost } from "./getPost";
import Post from "../../models/post.model";
import sinon, { SinonSpy } from "sinon";
import { MockResponse } from "../../../test/utils/testHelper";

describe("getPost", () => {
  let next: SinonSpy;

  beforeEach(() => {
    next = sinon.spy();
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should get a post and return a 200 status", async () => {
    // Arrange
    const req = {
      params: {
        id: "somePostId",
      },
    } as unknown as Request;

    const res = {
      status: sinon.spy((code: number) => res),
      json: sinon.spy((data: any) => res),
    } as unknown as MockResponse;

    const post = new Post({
      title: "Test Post",
      content: "Test content",
      category: "test",
    });
    sinon.stub(Post, "findById").resolves(post);

    // Act
    await getPost(req, res, next);

    // Assert
    expect(res.status.calledWith(200)).toBe(true);
    expect(res.json.calledWith(post)).toBe(true);
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
    } as unknown as MockResponse;

    sinon.stub(Post, "findById").resolves(null);

    // Act
    await getPost(req, res, next);

    // Assert
    expect(res.status.calledWith(404)).toBe(true);
    expect(res.json.calledWith({ message: "Post not found" })).toBe(true);
    expect(next.called).toBe(false);
  });

  it("should call the next function with error if getting the post fails", async () => {
    // Arrange
    const req = {
      params: {
        id: "somePostId",
      },
    } as unknown as Request;

    const res = {
      status: sinon.spy((code: number) => res),
      json: sinon.spy((data: any) => res),
    } as unknown as MockResponse;

    const error = new Error("Post retrieval failed");
    sinon.stub(Post, "findById").rejects(error);

    // Act
    await getPost(req, res, next);

    // Assert
    expect(next.calledWith(error)).toBe(true);
    expect(res.status.called).toBe(false);
    expect(res.json.called).toBe(false);
  });
});
