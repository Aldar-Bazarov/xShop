import { create } from 'zustand';
import { api } from '@/infrastructure/axios';
import mockData from './data.json';

export interface EmployeeSalesInfo {
  employeeID: number;
  employeeName: string;
  averageSale: number;
  percentOfAllSales: number;
  sumOfSales: number;
}

export interface GoodSalesInfo {
  goodID: number;
  goodName: string;
  salesCount: number;
  sumSales: number;
  stockCount: number;
  percentOfAllSales: number;
}

interface EmployeeSalesReportRequest {
  dt_from: string;
  dt_to: string;
  employee_ids?: number[];
  min_good_price?: number;
  max_good_price?: number;
}

interface GoodSalesReportRequest {
  dt_from: string;
  dt_to: string;
}

interface ReportsState {
  loading: boolean;
  error: string | null;
  getEmployeeSalesReport: (
    // TODO
    // request: EmployeeSalesReportRequest
    request: any
  ) => Promise<EmployeeSalesInfo[]>;
  getGoodSalesReport: (
    // TODO
    // request: GoodSalesReportRequest
    request: any
  ) => Promise<GoodSalesInfo[]>;
}

const response = {
  data: {
    report: mockData,
  },
};

export const useReportsStore = create<ReportsState>((set) => ({
  loading: false,
  error: null,

  getEmployeeSalesReport: async (request) => {
    set({ loading: true, error: null });
    try {
      // const response = await api.post('/reports/employees/sales', { request });
      return response.data.report.employeeSalesInfos;
    } catch (error) {
      set({ error: 'Ошибка при получении отчета по продажам сотрудников' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  getGoodSalesReport: async (request) => {
    set({ loading: true, error: null });
    try {
      // const response = await api.post('/reports/sales/goods', { dts: request });
      return response.data.report.goodSalesInfos;
    } catch (error) {
      set({ error: 'Ошибка при получении отчета по продажам товаров' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },
}));
