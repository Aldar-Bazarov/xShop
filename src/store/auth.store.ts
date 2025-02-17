import { create } from 'zustand';
import { api } from '@/infrastructure/axios';

interface AuthState {
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  getToken: () => string | null;
}

export const useAuthStore = create<AuthState>((set) => ({
  getToken: () => localStorage.getItem('token'),
  login: async (username, password) => {
    try {
      const {
        data: { access_token },
      } = await api.post<{ access_token: string }>('/login', {
        login: username,
        password,
      });
      // TODO
      localStorage.setItem('token', '1');
    } catch (error) {
      console.error('Ошибка авторизации:', error);
      throw error;
    }
  },
  logout: () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  },
}));
