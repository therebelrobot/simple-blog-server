import mongoose from "mongoose";
import config from "../../src/config";

export async function connectToTestDatabase(): Promise<void> {
  await mongoose.connect(config.MONGODB_URI_TEST, {
    bufferCommands: true,
    dbName: config.MONGODB_DB_NAME,
    user: config.MONGODB_USER,
    pass: config.MONGODB_PASS,
    autoIndex: false,
    autoCreate: true,
  });
}

export async function disconnectFromTestDatabase(): Promise<void> {
  await mongoose?.connection?.db?.dropDatabase();
  await mongoose.connection.close();
}

export async function clearDatabase(): Promise<void> {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
}

export function wait(time: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, time));
}
