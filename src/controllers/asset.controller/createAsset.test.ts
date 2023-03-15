import { Request } from "express";
import { createAsset } from "./createAsset";
import Asset from "../../models/asset.model";
import sinon, { SinonSpy } from "sinon";
import { MockResponse } from "../../../test/utils/testHelper";

describe("createAsset", () => {
  let next: SinonSpy;

  beforeEach(() => {
    next = sinon.spy();
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should create an asset and return a 201 status", async () => {
    // Arrange
    const req = {
      file: {
        originalname: "testfile.txt",
        mimetype: "text/plain",
        size: 1024,
        filename: "testfile.txt",
      },
    } as unknown as Request;

    const res = {
      status: sinon.spy((code: number) => res),
      json: sinon.spy((asset: typeof Asset) => res),
    } as unknown as MockResponse;

    const assetData = {
      filename: req?.file?.originalname,
      contentType: req?.file?.mimetype,
      fileSize: req?.file?.size,
      path: `/uploads/${req?.file?.filename}`,
    };
    const asset = new Asset(assetData);

    sinon.stub(Asset.prototype, "save").resolves();

    // Act
    await createAsset(req, res, next);

    // Assert
    expect(res.status.calledWith(201)).toBe(true);
    expect(res.json.firstCall.args[0]).toMatchObject(assetData);
    expect(next.called).toBe(false);
  });

  it("should call the next function with error if asset creation fails", async () => {
    // Arrange
    const req = {
      file: {
        originalname: "testfile.txt",
        mimetype: "text/plain",
        size: 1024,
        filename: "testfile.txt",
      },
    } as unknown as Request;

    const res = {
      status: sinon.spy((code: number) => res),
      json: sinon.spy((asset: typeof Asset) => res),
    } as unknown as MockResponse;

    const error = new Error("Asset creation failed");

    sinon.stub(Asset.prototype, "save").rejects(error);

    // Act
    await createAsset(req, res, next);

    // Assert
    expect(next.calledWith(error)).toBe(true);
    expect(res.status.calledWith(201)).toBe(false);
    expect(res.json.calledWithMatch({})).toBe(false);
  });
});
