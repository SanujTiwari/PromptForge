// PromptForge - Custom Express types
// Extended types will be added as modules grow (e.g., AuthenticatedRequest)

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
