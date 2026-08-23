// PromptForge - Shared Frontend Types
// Will grow as modules are added

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T | null;
  error?: unknown;
}

export interface HealthCheckResponse {
  success: boolean;
  message: string;
}
