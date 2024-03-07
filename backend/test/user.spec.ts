import * as db from "./db";
import app from "../src/app";
import supertest from 'supertest';


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

  describe('registration', () => {
    it('should return 201 and a success message when registering a new user', async () => {
      const { statusCode, body } = await supertest(app)
          .post("/user/register")
          .send({username: 'testuser', password: 'password'});
      
      expect(statusCode).toBe(201);
      expect(body).toHaveProperty("message", 'User created successfully');
      expect(body.result).toHaveProperty("username", 'testuser');
    });
   
    it('should return 403, username must contain at least 8 chars', async () => {
      const { statusCode, body } = await supertest(app)
          .post("/user/register")
          .send({username: 'user', password: 'password'});
      
      expect(statusCode).toBe(403);
      expect(body).toHaveProperty("message", 'Username must contain at least 8 characters');
    });
    
    it('should return 409, username already exists', async () => {
      await supertest(app)
          .post("/user/register")
          .send({username: 'testuser', password: 'password1'});
      const { statusCode: statusCode2, body: body2 } = await supertest(app)
          .post("/user/register")
          .send({username: 'testuser', password: 'password2'});
      
      expect(statusCode2).toBe(409);
      expect(body2).toHaveProperty("message", 'Username already exists');
    });
    
    it('should return 422, req.params missing', async () => {
      const { statusCode, body, error } = await supertest(app)
          .post("/user/register")
          .send({username: 'testuser'});

      expect(statusCode).toBe(422);
      expect(body.message).toBe('Unprocessable entity: missing params');
    });
  })
  
  describe('login', () => {
    it('should return 200 and a success message', async () => {
      await supertest(app)
          .post("/user/register")
          .send({username: 'testuser', password: 'password'});

      const {statusCode, body} = await supertest(app)
          .post("/user/login")
          .send({username: 'testuser', password: 'password'})
      
      
      expect(statusCode).toBe(200);
      expect(body.message).toBe('Login successful');
      expect(body.token).toContain("Bearer ");
      expect(body.username).toBe('testuser');
    });
   
    it('should return 401, authentication failed (wrong credentials)', async () => {
      await supertest(app)
          .post("/user/register")
          .send({username: 'testuser', password: 'password'});

      const {statusCode, body} = await supertest(app)
          .post("/user/login")
          .send({username: 'testuser', password: 'wrong-password'})
      
      
      expect(statusCode).toBe(401);
      expect(body.message).toBe("Authentication failed");
    });
    
    it('should return 401, authentication failed (user not found)', async () => {
      await supertest(app)
          .post("/user/register")
          .send({username: 'testuser', password: 'password'});

      const {statusCode, body} = await supertest(app)
          .post("/user/login")
          .send({username: 'differentuser', password: 'wrong-password'})
       
      expect(statusCode).toBe(401);
      expect(body.message).toBe("Authentication failed");
    });
  })

  describe("Get user", () => {
    it('should return 200 and a success message', async () => {
      await supertest(app)
          .post("/user/register")
          .send({username: 'testuser', password: 'password'});

      const response = await supertest(app)
          .post("/user/login")
          .send({username: 'testuser', password: 'password'})
      
      const authHeaders = { Authorization: response.body.token }
      const { statusCode, body } = await supertest(app)
          .get("/user/testuser")
          .set(authHeaders);
         
      expect(statusCode).toBe(200);
      expect(body.username).toBe('testuser');
      expect(body.favorites).toStrictEqual([]);
    });
   
    it('should return 401, unauthorized', async () => {
      await supertest(app)
          .post("/user/register")
          .send({username: 'testuser', password: 'password'});

      const { statusCode, body } = await supertest(app)
          .get("/user/testuser")
         
      expect(statusCode).toBe(401);
      expect(body.message).toBe('Unauthorized');
    });
    
    it('should return 401, auth failed (user not found)', async () => {
      await supertest(app)
          .post("/user/register")
          .send({username: 'testuser', password: 'password'});

        const response = await supertest(app)
          .post("/user/login")
          .send({username: 'testuser', password: 'password'})
      
      const authHeaders = { Authorization: response.body.token }
      const { statusCode, body } = await supertest(app)
          .get("/user/testuser2")
          .set(authHeaders)
          
      expect(statusCode).toBe(401);
      expect(body.message).toBe('Authentication failed');
    });
  })

})
