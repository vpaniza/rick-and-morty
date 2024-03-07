import app from "../src/app";
import * as db from "./db";
import supertest from "supertest";

const request = supertest(app)
describe('Test request with mongoose', () => {
   beforeAll(async () => {
      await db.connect()
   });
   afterEach(async () => {
      await db.clearDatabase()
   });
   afterAll(async () => {
      await db.closeDatabase()
   });

   it('GET undefined routes should return 404', async () => {
    const res = await request.get('/');
    expect(res.status).toBe(404);
  });

   it('GET unknown route should return 404', async () => {
    const res = await request.get('/whats-this-route');
    expect(res.status).toBe(404);
  });
})