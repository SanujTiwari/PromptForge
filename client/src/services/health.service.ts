import api from './api';
import type { ApiResponse } from '@/types';

export const healthService = {
  check: async (): Promise<ApiResponse> => {
    const response = await api.get<ApiResponse>('/health');
    return response.data;
  },
};
