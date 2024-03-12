/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response, Request } from "express";

// It takes a message parameter in its constructor and passes it to 
// the superclass constructor using super(message).
class CustomAPIError extends Error {
  constructor(message: string) {
    super(message);
  }
}

const notFoundMiddleware = (req: Request, res: Response) => {
  return res.status(404).json({ message: "Page not found", success: false });
};

const errorHandlerMiddleware = (err: any, req: Request, res: Response ) => {
  console.error({ err })

  const defaultError = {
    statusCode: err.statusCode || 500,
    msg: err.message || "Something went wrong, try again later",
  };

  if (err instanceof CustomAPIError) {
    return res
      .status(defaultError.statusCode)
      .json({ message: defaultError.msg, success: false });
  }

  // Handles Mongoose validation errors
  if (err.name === "ValidationError") {
    defaultError.statusCode = 500;
    defaultError.msg = Object.values(err.errors)
    .map((item: any) => (item as { message: string }).message)
      .join(",");
  }

  // Handles Mongoose CastErrors
  if (err.name === 'CastError') {
    defaultError.statusCode = 400; //Bad request
    defaultError.msg = `Resource not found. Invalid :${err.path}`;
  }

  // Handles duplicate key errors
  if (err.code && err.code === 11000) {
    defaultError.statusCode = 400; 
    defaultError.msg = `${Object.keys(err.keyValue)} field has to be unique`;
  }

  res
    .status(defaultError.statusCode)
    .json({ message: defaultError.msg, success: false });
};

export {
  notFoundMiddleware, 
  errorHandlerMiddleware
}