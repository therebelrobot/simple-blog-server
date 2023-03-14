// test/controllers/post.controller.test.ts

import request from "supertest";
import app from "../../src/app";
import {
  connectToTestDatabase,
  disconnectFromTestDatabase,
  clearDatabase,
} from "../../test/utils/testHelper";
import Post from "../../src/models/post.model";

describe("Post Controller", () => {
  beforeAll(async () => {
    await connectToTestDatabase();
  });

  afterAll(async () => {
    await disconnectFromTestDatabase();
  });

  afterEach(async () => {
    await clearDatabase();
  });

  test("should create a new post", async () => {
    const response = await request(app)
      .post("/posts")
      .send({
        title: "Test Post",
        content: "This is a test post",
        category: "test",
      })
      .expect(201);

    expect(response.body.title).toBe("Test Post");
  });

  test("should get all posts", async () => {
    const post1 = new Post({
      title: "Test Post 1",
      content: "This is test post 1",
      category: "test",
    });
    const post2 = new Post({
      title: "Test Post 2",
      content: "This is test post 2",
      category: "test",
    });
    await post1.save();
    await post2.save();

    const response = await request(app).get("/posts").expect(200);

    expect(response.body).toHaveLength(2);
    expect(response.body[0].title).toBe("Test Post 1");
    expect(response.body[1].title).toBe("Test Post 2");
  });

  test("should get posts by category", async () => {
    const post1 = new Post({
      title: "Test Post 1",
      content: "This is test post 1",
      category: "test1",
    });
    const post2 = new Post({
      title: "Test Post 2",
      content: "This is test post 2",
      category: "test2",
    });
    const post3 = new Post({
      title: "Test Post 3",
      content: "This is test post 3",
      category: "test1",
    });
    await post1.save();
    await post2.save();
    await post3.save();

    const response1 = await request(app)
      .get("/posts?category=test1")
      .expect(200);
    expect(response1.body).toHaveLength(2);
    expect(response1.body[0].title).toBe("Test Post 1");
    expect(response1.body[1].title).toBe("Test Post 3");

    const response2 = await request(app)
      .get("/posts?category=test2")
      .expect(200);
    expect(response2.body).toHaveLength(1);
    expect(response2.body[0].title).toBe("Test Post 2");
  });

  test("should get posts sorted by date created in ascending order", async () => {
    const post1 = new Post({
      title: "Test Post 1",
      content: "This is test post 1",
      category: "test",
    });
    const post2 = new Post({
      title: "Test Post 2",
      content: "This is test post 2",
      category: "test",
    });
    post1.createdAt = new Date("2022-01-01");
    post2.createdAt = new Date("2022-01-02");
    await post1.save();
    await post2.save();

    const response = await request(app).get("/posts?sort=asc").expect(200);

    expect(response.body).toHaveLength(2);
    expect(response.body[0].title).toBe("Test Post 1");
    expect(response.body[1].title).toBe("Test Post 2");
  });

  test("should get posts sorted by date created in descending order", async () => {
    const post1 = new Post({
      title: "Test Post 1",
      content: "This is test post 1",
      category: "test",
    });
    const post2 = new Post({
      title: "Test Post 2",
      content: "This is test post 2",
      category: "test",
    });
    post1.createdAt = new Date("2022-01-01");
    post2.createdAt = new Date("2022-01-02");
    await post1.save();
    await post2.save();

    const response = await request(app).get("/posts?sort=desc").expect(200);
    expect(response.body).toHaveLength(2);
    expect(response.body[0].title).toBe("Test Post 2");
    expect(response.body[1].title).toBe("Test Post 1");
  });

  test("should get all posts with default options if no query params are provided", async () => {
    const post1 = new Post({
      title: "Test Post 1",
      content: "This is test post 1",
      category: "test1",
    });
    const post2 = new Post({
      title: "Test Post 2",
      content: "This is test post 2",
      category: "test2",
    });
    const post3 = new Post({
      title: "Test Post 3",
      content: "This is test post 3",
      category: "test1",
    });
    await post1.save();
    await post2.save();
    await post3.save();

    const response = await request(app).get("/posts").expect(200);
    expect(response.body).toHaveLength(3);
    expect(response.body[0].title).toBe("Test Post 1");
    expect(response.body[1].title).toBe("Test Post 2");
    expect(response.body[2].title).toBe("Test Post 3");
  });

  test("should get empty array if no posts match filter", async () => {
    const response = await request(app)
      .get("/posts?category=invalid")
      .expect(200);

    expect(response.body).toHaveLength(0);
  });
});
