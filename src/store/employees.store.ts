import { create } from 'zustand';
import { api } from '@/infrastructure/axios';
import type { Employee, Position } from '@/types/models';

interface EmployeesState {
  employees: Employee[];
  loading: boolean;
  error: Error | null;
  getEmployee: (id: number) => Promise<Employee>;
  createEmployee: (
    employee: Omit<Employee, 'id' | 'position'> & {
      position: Pick<Position, 'id'>;
    }
  ) => void;
  fireEmployee: (id: number) => Promise<void>;
  getSalary: (id: number) => Promise<Pick<Position, 'salaryInKopeks'>>;
  updateSalary: (id: number, salaryInKopeks: number) => Promise<void>;
}

export const useEmployeesStore = create<EmployeesState>((set, get) => ({
  employees: [],
  loading: false,
  error: null,

  getEmployee: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await api.get(`/crm/employees/${id}`);
      return response.data.employee;
    } catch (e) {
      set({ error: new Error('Ошибка при получении сотрудника') });
      console.error(e);
      throw e;
    } finally {
      set({ loading: false });
    }
  },

  createEmployee: async (employee) => {
    set({ loading: true, error: null });
    try {
      await api.post('/crm/employees', { employee });
    } catch (e) {
      set({ error: new Error('Ошибка при создании сотрудника') });
      console.error(e);
      throw e;
    } finally {
      set({ loading: false });
    }
  },

  fireEmployee: async (id) => {
    set({ loading: true, error: null });
    try {
      await api.delete(`/crm/employees/${id}`);
    } catch (e) {
      set({ error: new Error('Ошибка при увольнении сотрудника') });
      console.error(e);
      throw e;
    } finally {
      set({ loading: false });
    }
  },

  getSalary: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await api.get<Pick<Position, 'salaryInKopeks'>>(
        `/crm/employees/${id}/salary`
      );
      return response.data;
    } catch (e) {
      set({ error: new Error('Ошибка при обновлении зарплаты') });
      console.error(e);
      throw e;
    } finally {
      set({ loading: false });
    }
  },

  updateSalary: async (id, salaryInKopeks) => {
    set({ loading: true, error: null });
    try {
      await api.patch(`/crm/employees/${id}/salary`, {
        salary: salaryInKopeks,
      });
    } catch (e) {
      set({ error: new Error('Ошибка при обновлении зарплаты') });
      console.error(e);
      throw e;
    } finally {
      set({ loading: false });
    }
  },
}));
