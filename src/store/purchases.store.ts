import { create } from 'zustand';
import { api } from '@/infrastructure/axios';
import type { Purchase } from '@/types/models';

interface NewPurchaseRequest {
  count: number;
  good_id: number;
  price_in_kopeks: number;
}

interface PurchasesState {
  purchases: Purchase[];
  loading: boolean;
  error: string | null;
  createPurchase: (purchase: NewPurchaseRequest) => void;
}

export const usePurchasesStore = create<PurchasesState>((set) => ({
  purchases: [],
  loading: false,
  error: null,

  createPurchase: async (purchase) => {
    set({ loading: true, error: null });
    try {
      await api.post('/crm/purchases', { purchase });
    } catch (error) {
      set({ error: 'Ошибка при создании закупки' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },
}));
