import express from 'express';
import dotenv from 'dotenv';
import createError from 'http-errors';
import { notFoundMiddleware, errorHandlerMiddleware } from './middlewares/helpers';
import { createConnection, initializeConnection } from './utils/connection';
import { createServer } from './utils/server';

dotenv.config();

const app = createServer();

app.use("*", notFoundMiddleware);
app.use(errorHandlerMiddleware);

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
  createConnection();
}

export default app;