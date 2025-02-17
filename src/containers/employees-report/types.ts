import { EmployeeSalesInfo } from '@/store/reports.store';

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
