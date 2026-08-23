import { Request, Response } from 'express';
import { authService } from '../services/auth.service';
import { ApiError, ApiResponse } from '../utils';
import { loginSchema, registerSchema } from '../validators/auth.validator';
import { AuthenticatedRequest } from '../types';

const validate = <T>(schema: { safeParse: (value: unknown) => { success: true; data: T } | { success: false; error: { issues: Array<{ message: string }> } } }, value: unknown): T => {
  const result = schema.safeParse(value);
  if (!result.success) throw ApiError.unprocessable(result.error.issues[0]?.message ?? 'Please check your details and try again.');
  return result.data;
};

export const register = async (req: Request, res: Response): Promise<void> => {
  const result = await authService.register(validate(registerSchema, req.body));
  ApiResponse.success({ res, statusCode: 201, message: 'Your PromptForge account is ready.', data: result });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const result = await authService.login(validate(loginSchema, req.body));
  ApiResponse.success({ res, message: 'Welcome back to PromptForge.', data: result });
};

export const currentUser = async (req: Request, res: Response): Promise<void> => {
  const user = await authService.currentUser((req as AuthenticatedRequest).authUser.sub);
  ApiResponse.success({ res, data: { user } });
};
