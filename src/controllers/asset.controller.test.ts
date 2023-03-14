import request from "supertest";
import app from "../../src/app";
import {
  connectToTestDatabase,
  disconnectFromTestDatabase,
  clearDatabase,
} from "../utils/testHelper";

describe("Asset Controller", () => {
  beforeAll(async () => {
    await connectToTestDatabase();
  });

  afterAll(async () => {
    await disconnectFromTestDatabase();
  });

  afterEach(async () => {
    await clearDatabase();
  });

  test("should create a new asset", async () => {
    const response = await request(app)
      .post("/assets")
      .attach("file", `${__dirname}/../fixtures/test.txt`)
      .expect(201);

    expect(response.body.filename).toBe("test.txt");
  });

  test("should get an asset by ID", async () => {
    const response1 = await request(app)
      .post("/assets")
      .attach("file", `${__dirname}/../fixtures/test.txt`)
      .expect(201);

    const response2 = await request(app)
      .get(`/assets/${response1.body._id}`)
      .expect(200);

    expect(response2.body.filename).toBe("test.txt");
  });

  test("should return an error for invalid asset ID", async () => {
    const response = await request(app).get(`/assets/invalid-id`).expect(400);

    expect(response.body.message).toBe("Invalid asset ID");
  });
});
