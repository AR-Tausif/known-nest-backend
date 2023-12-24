/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = 500;
  let message = 'Something went wrong!';
  let errorMessage = err.message;

  if (err instanceof ZodError) {
    message = 'Validation Error';
    errorMessage =
      `${err.issues[0].path[err.issues[0].path.length - 1]} ${
        err.issues[0].message
      }` || err.message;
  } else if (err.name === 'CastError') {
    message = 'Invalid ID';
  } else if (err.code === 11000) {
    message = 'Duplicate field you are entered';
  }

  return res.status(statusCode).json({
    success: false,
    message: message,
    errorMessage,
    errorDetails: err,
    stack: err?.stack,
  });
};

export default globalErrorHandler;
