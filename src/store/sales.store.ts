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
  createSale: (sale: NewSaleRequest) => void;
}

export const useSalesStore = create<SalesState>((set) => ({
  sales: [],
  loading: false,
  error: null,

  createSale: async (sale) => {
    set({ loading: true, error: null });
    try {
      await api.post<Sale>(
        '/crm/sales',
        { sale },
        {
          headers: {
            Authorization: 1,
          },
        }
      );
    } catch (error) {
      set({
        error: `Ошибка при создании продажи`,
      });
      throw error;
    } finally {
      set({ loading: false });
    }
  },
}));
