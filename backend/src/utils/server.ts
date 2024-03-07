import express from "express";
import userRouter from "../routes/user";
import cookieParser from "cookie-parser";
import characterRouter from "../routes/characterApi";
import cors from "cors";


export const createServer = () => {
  const app: express.Application = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(cors({
    origin: [
      "http://localhost:3000", 
      "http://localhost:8080", 
      "https://rickandmortyapi.com/api", 
      "https://localhost:8080"
    ],
    credentials: true
  }));

  app.use('/user', userRouter);
  app.use('/character', characterRouter);

  return app;
}