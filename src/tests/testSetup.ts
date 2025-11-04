import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import supertest from 'supertest';
import express, { Express } from 'express';
import bodyParser from 'body-parser';
import path from "path";
import fs from "fs";

export class TestServer {
  public app: Express;
  public request: ReturnType<typeof supertest>;
  private mongoServer?: MongoMemoryServer;

  constructor() {
    this.app = express();
    this.app.use(bodyParser.json());
    this.request = supertest(this.app);
  }

  async start() {
    const tmpDir = path.resolve("C:/Users/akwst/Favorites/FOLDER/CodingFactory8/JavaScript/JS-PROJECTS/node/cf8-backend/src/tests/tmpDB"); // Custom path bc default appdata directory is read-only.
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

    this.mongoServer = await MongoMemoryServer.create({
      instance: {
        dbPath: tmpDir,
      },
    });
    const uri = this.mongoServer.getUri();
    await mongoose.connect(uri);
  }

  async stop() {
    await mongoose.disconnect();
    if (this.mongoServer) await this.mongoServer.stop();
  }

  async cleanup() {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      if (collection) {
        await collection.deleteMany({});
      }
    }
  }
}
