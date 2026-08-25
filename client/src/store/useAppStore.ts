import { create } from 'zustand';
import { authService, AuthUser } from '@/services/auth.service';

interface ToastItem {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface AppState {
  // Mobile menu
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;

  // Auth
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  authError: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, displayName: string) => Promise<boolean>;
  logout: () => void;
  restoreSession: () => Promise<void>;
  clearAuthError: () => void;

  // Toast notifications
  toasts: ToastItem[];
  addToast: (type: ToastItem['type'], message: string) => void;
  removeToast: (id: string) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Mobile menu
  isMobileMenuOpen: false,
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),

  // Auth
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isAuthLoading: false,
  authError: null,

  login: async (email, password) => {
    set({ isAuthLoading: true, authError: null });
    try {
      const result = await authService.login({ email, password });
      localStorage.setItem('token', result.token);
      set({
        user: result.user,
        token: result.token,
        isAuthenticated: true,
        isAuthLoading: false,
      });
      get().addToast('success', `Welcome back, ${result.user.displayName}!`);
      return true;
    } catch (error: unknown) {
      const message = (error && typeof error === 'object' && 'message' in error)
        ? String((error as { message: string }).message)
        : 'Login failed. Please try again.';
      set({ isAuthLoading: false, authError: message });
      get().addToast('error', message);
      return false;
    }
  },

  signup: async (email, password, displayName) => {
    set({ isAuthLoading: true, authError: null });
    try {
      const result = await authService.register({ email, password, displayName });
      localStorage.setItem('token', result.token);
      set({
        user: result.user,
        token: result.token,
        isAuthenticated: true,
        isAuthLoading: false,
      });
      get().addToast('success', `Welcome to PromptForge, ${result.user.displayName}!`);
      return true;
    } catch (error: unknown) {
      const message = (error && typeof error === 'object' && 'message' in error)
        ? String((error as { message: string }).message)
        : 'Registration failed. Please try again.';
      set({ isAuthLoading: false, authError: message });
      get().addToast('error', message);
      return false;
    }
  },

  logout: () => {
    authService.logout();
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      authError: null,
    });
    get().addToast('info', 'You have been signed out.');
  },

  restoreSession: async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    set({ isAuthLoading: true });
    try {
      const user = await authService.getCurrentUser();
      set({ user, token, isAuthenticated: true, isAuthLoading: false });
    } catch {
      localStorage.removeItem('token');
      set({ user: null, token: null, isAuthenticated: false, isAuthLoading: false });
    }
  },

  clearAuthError: () => set({ authError: null }),

  // Toast notifications
  toasts: [],
  addToast: (type, message) => {
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    set((state) => ({ toasts: [...state.toasts, { id, type, message }] }));
    setTimeout(() => get().removeToast(id), 4500);
  },
  removeToast: (id) => {
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
  },
}));
