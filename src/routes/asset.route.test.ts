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

describe("Asset routes", () => {
  test("POST / - should create a new asset and return a 201 status code", async () => {
    const response = await request(app)
      .post("/assets")
      .attach("file", "test/assets/test-image.jpg");

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id");
  });

  test("GET /:id - should return a specific asset with a 200 status code", async () => {
    const response = await request(app)
      .post("/assets")
      .attach("file", "test/assets/test-image.jpg");

    const assetId = response.body._id;
    const assetResponse = await request(app).get(`/assets/${assetId}`);

    expect(assetResponse.status).toBe(200);
    expect(assetResponse.body._id).toEqual(assetId);
  });
});
