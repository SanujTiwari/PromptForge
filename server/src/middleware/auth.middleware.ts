import { NextFunction, Request, Response } from 'express';
import { Role } from '@prisma/client';
import { AuthenticatedRequest } from '../types';
import { readAccessToken } from '../services/auth.service';
import { ApiError } from '../utils/apiError';

export const requireAuth = (req: Request, _res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.slice(7) : undefined;
  if (!token) return next(ApiError.unauthorized('Please sign in to continue.'));
  try { (req as AuthenticatedRequest).authUser = readAccessToken(token); next(); } catch (error) { next(error); }
};

export const requireRole = (...roles: Role[]) => (req: Request, _res: Response, next: NextFunction): void => {
  const authenticated = req as AuthenticatedRequest;
  if (!authenticated.authUser || !roles.includes(authenticated.authUser.role)) return next(ApiError.forbidden('You do not have permission to perform this action.'));
  next();
};
