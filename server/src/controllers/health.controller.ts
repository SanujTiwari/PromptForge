import { Request, Response } from 'express';
import { ApiResponse } from '../utils';

export const healthCheck = (_req: Request, res: Response): void => {
  ApiResponse.success({
    res,
    message: 'PromptForge API is running',
  });
};
