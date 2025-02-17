import { create } from 'zustand';
import { api } from '@/infrastructure/axios';
import type { Good } from '@/types/models';

interface GoodsState {
  goods: Good[];
  loading: boolean;
  error: string | null;
  getGood: (id: number) => Promise<Good>;
  createGood: (good: Omit<Good, 'id'>) => void;
  updateGood: (id: number, good: Omit<Good, 'id'>) => Promise<void>;
}

export const useGoodsStore = create<GoodsState>((set) => ({
  goods: [],
  loading: false,
  error: null,

  getGood: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await api.get(`/crm/goods/${id}`);
      return response.data.good;
    } catch (error) {
      set({ error: 'Ошибка при получении товара' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  createGood: async (good) => {
    set({ loading: true, error: null });
    try {
      await api.post('/crm/goods', { good });
    } catch (error) {
      set({ error: 'Ошибка при создании товара' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  updateGood: async (id, good) => {
    set({ loading: true, error: null });
    try {
      await api.put(`/crm/goods/${id}`, { good });
    } catch (error) {
      set({ error: 'Ошибка при обновлении товара' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },
}));
