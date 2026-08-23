import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { ApiError } from '../utils/apiError';
import { env } from '../config/env';

/**
 * Centralized error handling middleware.
 * - Catches ApiError instances and returns structured responses.
 * - Catches unexpected errors and returns a safe generic message.
 * - Never exposes stack traces, internal paths, or DB errors to clients.
 */
export const errorHandler: ErrorRequestHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  // Log the error in development
  if (env.isDevelopment) {
    console.error('❌ Error:', err.message);
    if (err.stack) {
      console.error(err.stack);
    }
  }

  // Handle known operational errors
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      error: null,
    });
    return;
  }

  // Handle unexpected errors — never expose internals
  res.status(500).json({
    success: false,
    message: 'Something went wrong. Please try again later.',
    error: null,
  });
};
