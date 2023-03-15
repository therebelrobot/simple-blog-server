import { Request } from "express";
import { getAsset } from "./getAsset";
import Asset from "../../models/asset.model";
import sinon, { SinonSpy } from "sinon";
import { MockResponse } from "../../../test/utils/testHelper";

describe("getAsset", () => {
  let next: SinonSpy;

  beforeEach(() => {
    next = sinon.spy();
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should return an asset with status 200", async () => {
    // Arrange
    const assetId = "someAssetId";
    const req = {
      params: {
        id: assetId,
      },
    } as unknown as Request;

    const res = {
      status: sinon.spy((code: number) => res),
      json: sinon.spy((asset: typeof Asset) => res),
    } as unknown as MockResponse;

    const assetData = {
      _id: assetId,
      filename: "testfile.txt",
      contentType: "text/plain",
      fileSize: 1024,
      path: "/uploads/testfile.txt",
    };
    const asset = new Asset(assetData);

    sinon.stub(Asset, "findById").resolves(asset);

    // Act
    await getAsset(req, res, next);

    // Assert
    expect(res.status.calledWith(200)).toBe(true);
    expect(res.json.calledOnceWith(asset)).toBe(true);
    expect(next.called).toBe(false);
  });

  it("should return a 404 status when asset not found", async () => {
    // Arrange
    const req = {
      params: {
        id: "nonExistentAssetId",
      },
    } as unknown as Request;

    const res = {
      status: sinon.spy((code: number) => res),
      json: sinon.spy((message: { message: string }) => res),
    } as unknown as MockResponse;

    sinon.stub(Asset, "findById").resolves(null);

    // Act
    await getAsset(req, res, next);

    // Assert
    expect(res.status.calledWith(404)).toBe(true);
    expect(res.json.calledOnceWith({ message: "Asset not found" })).toBe(true);
    expect(next.called).toBe(false);
  });

  it("should call the next function with error if retrieving asset fails", async () => {
    // Arrange
    const req = {
      params: {
        id: "someAssetId",
      },
    } as unknown as Request;

    const res = {
      status: sinon.spy((code: number) => res),
      json: sinon.spy((asset: typeof Asset) => res),
    } as unknown as MockResponse;

    const error = new Error("Retrieving asset failed");

    sinon.stub(Asset, "findById").rejects(error);

    // Act
    await getAsset(req, res, next);

    // Assert
    expect(next.calledWith(error)).toBe(true);
    expect(res.status.calledWith(200)).toBe(false);
    expect(res.json.called).toBe(false);
  });
});
