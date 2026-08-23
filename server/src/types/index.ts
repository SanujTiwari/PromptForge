import { Request } from 'express';
import { Role } from '@prisma/client';

export interface ApiSuccessResponse<T = unknown> {
  success: true;
  message: string;
  data: T | null;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  error: unknown | null;
}

export type ApiResponseType<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

export interface AuthenticatedRequest extends Request {
  authUser: {
    sub: string;
    role: Role;
    exp: number;
  };
}
