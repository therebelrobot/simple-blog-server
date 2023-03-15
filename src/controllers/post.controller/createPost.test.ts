import { Request } from "express";
import { createPost } from "./createPost";
import Post from "../../models/post.model";
import sinon, { SinonSpy } from "sinon";
import { MockResponse } from "../../../test/utils/testHelper";

describe("createPost", () => {
  let next: SinonSpy;

  beforeEach(() => {
    next = sinon.spy();
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should create a post and return a 201 status", async () => {
    // Arrange
    const req = {
      body: {
        title: "Test Post",
        content: "This is a test post",
        category: "test",
        assetId: "someAssetId",
      },
    } as unknown as Request;

    const res = {
      status: sinon.spy((code: number) => res),
      json: sinon.spy((post: typeof Post) => res),
    } as unknown as MockResponse;

    const postData = {
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
    };
    const post = new Post(postData);

    sinon.stub(Post.prototype, "save").resolves();

    // Act
    await createPost(req, res, next);

    // Assert
    expect(res.status.calledWith(201)).toBe(true);

    expect(res.json.firstCall.args[0]).toMatchObject(postData);

    expect(next.called).toBe(false);
  });

  it("should call the next function with error if post creation fails", async () => {
    // Arrange
    const req = {
      body: {
        title: "Test Post",
        content: "This is a test post",
        category: "test",
        assetId: "someAssetId",
      },
    } as unknown as Request;

    const res = {
      status: sinon.spy((code: number) => res),
      json: sinon.spy((post: typeof Post) => res),
    } as unknown as MockResponse;

    const error = new Error("Post creation failed");

    sinon.stub(Post.prototype, "save").rejects(error);

    // Act
    await createPost(req, res, next);

    // Assert
    expect(next.calledWith(error)).toBe(true);
    expect(res.status.calledWith(201)).toBe(false);
    expect(res.json.calledWithMatch({})).toBe(false);
  });
});
