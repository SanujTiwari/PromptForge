import { type ClassValue, clsx } from 'clsx';

/**
 * Utility to merge class names. 
 * Uses clsx for conditional class merging.
 * tailwind-merge can be added later for deduplication.
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
