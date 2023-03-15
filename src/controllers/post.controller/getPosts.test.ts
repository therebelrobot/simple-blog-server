import { Request } from "express";
import { getPosts } from "./getPosts";
import Post from "../../models/post.model";
import sinon, { SinonSpy } from "sinon";
import { Query } from "mongoose";

import { MockResponse } from "../../../test/utils/testHelper";

describe("getPosts", () => {
  let next: SinonSpy;

  beforeEach(() => {
    next = sinon.spy();
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should get all posts and return a 200 status", async () => {
    // Arrange
    const req = {
      query: {},
    } as unknown as Request;

    const res = {
      status: sinon.spy((code: number) => res),
      json: sinon.spy((data: any) => res),
    } as unknown as MockResponse;

    const posts = [
      new Post({
        title: "Test Post 1",
        content: "Test content 1",
        category: "test",
      }),
      new Post({
        title: "Test Post 2",
        content: "Test content 2",
        category: "test",
      }),
    ];

    const stubQuery = sinon.createStubInstance(Query);
    stubQuery.exec.resolves(posts);
    sinon
      .stub(Post, "find")
      .returns(stubQuery as unknown as Query<typeof Post[], typeof Post>);

    // Act
    await getPosts(req, res, next);

    // Assert
    expect(res.status.calledWith(200)).toBe(true);
    expect(res.json.calledWith(posts)).toBe(true);
    expect(next.called).toBe(false);
  });

  // Add more test cases for different combinations of query parameters
  // such as category, sort asc, and sort desc.

  it("should call the next function with error if getting posts fails", async () => {
    // Arrange
    const req = {
      query: {},
    } as unknown as Request;

    const res = {
      status: sinon.spy((code: number) => res),
      json: sinon.spy((data: any) => res),
    } as unknown as MockResponse;

    const error = new Error("Posts retrieval failed");
    const stubQuery = sinon.createStubInstance(Query);
    stubQuery.exec.rejects(error);
    sinon
      .stub(Post, "find")
      .returns(stubQuery as unknown as Query<typeof Post[], typeof Post>);

    // Act
    await getPosts(req, res, next);

    // Assert
    expect(next.calledWith(error)).toBe(true);
    expect(res.status.called).toBe(false);
    expect(res.json.called).toBe(false);
  });
});
