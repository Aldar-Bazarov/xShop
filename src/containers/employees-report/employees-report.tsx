import { EmployeeSalesInfo, useReportsStore } from '@/store/reports.store';
import { useEffect, useState } from 'react';
import {
  employeesReportCharts,
  employeesReportColumns,
  employeesReportFilters,
} from './properties';
import { ReportView } from '@/components/views/report-view';
import { EmployeeReportChartsData, EmployeeReportFilterData } from './types';

export const EmployeesReportContainer = () => {
  const { getEmployeeSalesReport } = useReportsStore();
  const [chartsData, setChartsData] = useState<EmployeeReportChartsData>();
  const [filterData, setFilterData] = useState<EmployeeReportFilterData>();
  const [data, setData] = useState<EmployeeSalesInfo[]>();

  useEffect(() => {
    getEmployeeSalesReport(1).then((data) => {
      setData(data);
      setFilterData({ employees: data.map((el) => el.employeeName) });
      setChartsData((_) => ({
        sumOfSalesData: data.map((el) => ({
          employeeName: el.employeeName,
          sumOfSales: el.sumOfSales,
        })),
        percentOfAllSalesData: data.map((el) => ({
          employeeName: el.employeeName,
          percentOfAllSales: el.percentOfAllSales,
        })),
      }));
    });
  }, []);

  return (
    <ReportView
      title="Отчёт по сотрудникам"
      data={data}
      chartsData={chartsData}
      charts={employeesReportCharts}
      filters={employeesReportFilters(filterData)}
      columns={employeesReportColumns}
    />
  );
};
