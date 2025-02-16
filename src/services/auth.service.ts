import { api } from '@/infrastructure/axios';

export const AuthService = {
  async login(username: string, password: string) {
    const response = await api.post('/login', { login: username, password });
    const { access_token } = response.data;
    localStorage.setItem('token', access_token);
  },

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  },

  getToken() {
    return localStorage.getItem('token');
  },
};
