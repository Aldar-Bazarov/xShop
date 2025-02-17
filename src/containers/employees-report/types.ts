import { EmployeeSalesInfo } from '@/types/models';

export interface EmployeeReportChartsData {
  sumOfSalesData: Pick<EmployeeSalesInfo, 'employeeName' | 'sumOfSales'>[];
  percentOfAllSalesData: Pick<
    EmployeeSalesInfo,
    'employeeName' | 'percentOfAllSales'
  >[];
}

export interface EmployeeReportFilterData {
  employees: string[];
}
export interface ISelectedFilters {
  dt_from: Date;
  dt_to: Date;
  employee_ids: number[];
  max_good_price: number;
  min_good_price: number;
}
