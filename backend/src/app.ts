import express from 'express';
import dotenv from 'dotenv';
import createError from 'http-errors';
import { handleError } from './helpers/errorHandler';
import { createConnection, initializeConnection } from './utils/connection';
import { createServer } from './utils/server';

dotenv.config();

const app = createServer();

app.use((_req, _res, next) => {
  next(createError(404));
});

const errorHandler: express.ErrorRequestHandler = (err, _req, res) => {
  handleError(err, res);
};
app.use(errorHandler);

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
  createConnection();
}

export default app;