import supertest from 'supertest';
import app from '../src/app';
import * as db from './db';

describe('User ', () => {
  beforeAll(async () => {
    await db.connect()
 });
 afterEach(async () => {
    await db.clearDatabase()
 });
 afterAll(async () => {
    await db.closeDatabase()
 });

  describe('GET all characters', () => {
    it('Should return 200 and an array of characters', async () => {
      const authHeaders = {Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWUzMmJlYjIxZGM3MGFhZmY0MzE2YjciLCJpYXQiOjE3MDk1NDk0MzR9.ooOFo6wkdYO7RWzue-tjEzrLQDw0TaKkMYT1QzNN4F0"} 
      const { statusCode, body } = await supertest(app)
          .get("/character")
          .set(authHeaders);
      
      expect(statusCode).toBe(200);
      expect(body).toHaveLength(20);
    });
   
    it('Should return 401 as user is not authenticated', async () => {
      const { statusCode, body } = await supertest(app)
          .get("/character")
      
      expect(statusCode).toBe(401);
      expect(body.message).toBe('Unauthorized');
    });
  });

  describe('GET character by id', () => {
    it('Should return 200 and an object of the character', async () => {
      const authHeaders = {Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWUzMmJlYjIxZGM3MGFhZmY0MzE2YjciLCJpYXQiOjE3MDk1NDk0MzR9.ooOFo6wkdYO7RWzue-tjEzrLQDw0TaKkMYT1QzNN4F0"} 
      const { statusCode, body } = await supertest(app)
          .get("/character/1")
          .set(authHeaders);
      
      expect(statusCode).toBe(200);
      expect(body).toEqual({
        gender: "Male", 
        id: 1, 
        image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
        name: "Rick Sanchez", 
        origin: {name: "Earth (C-137)", url: "https://rickandmortyapi.com/api/location/1"}, 
        species: "Human", 
        status: "Alive"
      });
    });
   
    it('Should return 401 as user is not authenticated', async () => {
      const { statusCode, body } = await supertest(app)
          .get("/character/1")
      
      expect(statusCode).toBe(401);
      expect(body.message).toBe('Unauthorized');
    });
    
    it('Should return 500 as wrong param is sent', async () => {
      const authHeaders = {Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWUzMmJlYjIxZGM3MGFhZmY0MzE2YjciLCJpYXQiOjE3MDk1NDk0MzR9.ooOFo6wkdYO7RWzue-tjEzrLQDw0TaKkMYT1QzNN4F0"} 
      const { statusCode, body } = await supertest(app)
          .get("/character/rick")
          .set(authHeaders);

      expect(statusCode).toBe(500);
      expect(body.error).toBe('Internal server error');
    });
  })

})
