import request from "supertest";
import express from "express";
import { upload } from "./upload.middleware";
import {
  connectToTestDatabase,
  clearDatabase,
  disconnectFromTestDatabase,
} from "../../test/utils/testHelper";

const app = express();

describe("Upload Middleware", () => {
  beforeAll(async () => {
    await connectToTestDatabase();
  });

  afterEach(async () => {
    await clearDatabase();
  });

  afterAll(async () => {
    await disconnectFromTestDatabase();
  });
  it("should upload a file", (done) => {
    app.post("/upload", upload.single("image"), (req, res) => {
      res.status(200).json({
        success: true,
        message: "File uploaded successfully",
      });
    });

    request(app)
      .post("/upload")
      .attach("image", "test.jpg")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe("File uploaded successfully");
        done();
      });
  });
});
