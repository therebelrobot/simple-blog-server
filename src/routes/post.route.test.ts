import request from "supertest";
import app from "../app";
import {
  connectToTestDatabase,
  clearDatabase,
  disconnectFromTestDatabase,
} from "../../test/utils/testHelper";

beforeAll(async () => {
  await connectToTestDatabase();
});

afterAll(async () => {
  await disconnectFromTestDatabase();
});

beforeEach(async () => {
  await clearDatabase();
});

describe("Post routes", () => {
  // TODO: Add tests for the post routes similar to the asset routes
  it("should create a new post", async () => {
    expect(true).toBe(true);
  });
});
