// test/server.test.ts

import request from "supertest";
import app from "../src/app";
import {
  connectToTestDatabase,
  disconnectFromTestDatabase,
  clearDatabase,
} from "../test/utils/testHelper";

describe("Server", () => {
  beforeAll(async () => {
    await connectToTestDatabase();
  });

  afterAll(async () => {
    await disconnectFromTestDatabase();
  });

  afterEach(async () => {
    await clearDatabase();
  });

  test("should respond with 404 for invalid route", async () => {
    const response = await request(app).get("/invalid-route").expect(404);

    expect(response.body.message).toBe("Not Found");
  });

  test("should respond with 500 for internal server error", async () => {
    const mockError = jest.spyOn(console, "error").mockImplementation(() => {});

    const errorHandler = jest.fn((err, req, res, next) => {
      res.status(500).json({ message: "Internal server error" });
    });

    app.use(errorHandler);

    const response = await request(app).get("/posts").expect(500);

    expect(response.body.message).toBe("Internal server error");
    expect(errorHandler).toHaveBeenCalled();

    mockError.mockRestore();
  });
});
