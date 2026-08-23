import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().trim().email('Enter a valid email address.').max(254),
  password: z.string().min(8, 'Password must have at least 8 characters.').max(128),
  displayName: z.string().trim().min(2, 'Display name must have at least 2 characters.').max(80),
});

export const loginSchema = z.object({
  email: z.string().trim().email('Enter a valid email address.').max(254),
  password: z.string().min(1, 'Password is required.').max(128),
});
