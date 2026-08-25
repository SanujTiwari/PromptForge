import api from './api';

export interface AuthUser {
  id: string;
  email: string;
  displayName: string;
  role: 'USER' | 'SELLER' | 'ADMIN';
  avatarUrl: string | null;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  displayName: string;
}

export const authService = {
  async login(input: LoginInput): Promise<AuthResponse> {
    const { data } = await api.post<{ success: boolean; data: AuthResponse }>('/auth/login', input);
    return data.data;
  },

  async register(input: RegisterInput): Promise<AuthResponse> {
    const { data } = await api.post<{ success: boolean; data: AuthResponse }>('/auth/register', input);
    return data.data;
  },

  async getCurrentUser(): Promise<AuthUser> {
    const { data } = await api.get<{ success: boolean; data: { user: AuthUser } }>('/auth/me');
    return data.data.user;
  },

  logout() {
    localStorage.removeItem('token');
  },
};
