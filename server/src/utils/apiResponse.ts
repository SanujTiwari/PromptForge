import { Response } from 'express';

interface SuccessOptions<T> {
  res: Response;
  message?: string;
  data?: T;
  statusCode?: number;
}

interface ErrorOptions {
  res: Response;
  message?: string;
  error?: unknown;
  statusCode?: number;
}

export class ApiResponse {
  static success<T>({
    res,
    message = 'Operation successful',
    data,
    statusCode = 200,
  }: SuccessOptions<T>): Response {
    return res.status(statusCode).json({
      success: true,
      message,
      data: data ?? null,
    });
  }

  static error({
    res,
    message = 'Something went wrong',
    error = null,
    statusCode = 500,
  }: ErrorOptions): Response {
    return res.status(statusCode).json({
      success: false,
      message,
      error: error ?? null,
    });
  }
}
