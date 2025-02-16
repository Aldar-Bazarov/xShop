import { create } from 'zustand';
import { api } from '@/infrastructure/axios';
import type { Sale } from '@/types/models';

interface NewSaleRequest {
  count: number;
  good_id: number;
}

interface SalesState {
  sales: Sale[];
  loading: boolean;
  error: string | null;
  createSale: (sale: NewSaleRequest) => Promise<Sale>;
}

export const useSalesStore = create<SalesState>((set) => ({
  sales: [],
  loading: false,
  error: null,

  createSale: async (sale) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post('/crm/sales', { sale });
      return response.data.sale;
    } catch (error) {
      set({ error: 'Ошибка при создании продажи' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },
}));
