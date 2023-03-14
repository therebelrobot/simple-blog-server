import mongoose from "mongoose";
import Asset, { Asset as AssetType } from "./asset.model";
import {
  connectToTestDatabase,
  clearDatabase,
  disconnectFromTestDatabase,
} from "../../test/utils/testHelper";

describe("Asset model", () => {
  beforeAll(async () => {
    await connectToTestDatabase();
  });

  afterEach(async () => {
    await clearDatabase();
  });

  afterAll(async () => {
    await disconnectFromTestDatabase();
  });

  it("can be created correctly", async () => {
    const assetData: Partial<AssetType> = {
      contentType: "image/jpeg",
      fileSize: 100,
      filename: "test.jpg",
      path: "/uploads/test.jpg",
    };

    const createdAsset = await Asset.create(assetData);

    expect(createdAsset.contentType).toBe(assetData.contentType);
    expect(createdAsset.fileSize).toBe(assetData.fileSize);
    expect(createdAsset.filename).toBe(assetData.filename);
    expect(createdAsset.path).toBe(assetData.path);
  });

  it("throws an error when required fields are not provided", async () => {
    const assetData: Partial<AssetType> = {
      fileSize: 100,
      filename: "test.jpg",
      path: "/uploads/test.jpg",
    };

    await expect(Asset.create(assetData)).rejects.toThrow();
  });
});
