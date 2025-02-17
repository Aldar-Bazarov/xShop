import { useReportsStore } from '@/store/reports.store';
import { useEffect, useState } from 'react';
import {
  employeesReportCharts,
  employeesReportColumns,
  employeesReportFilters,
} from './properties';
import { ReportView } from '@/components/views/report-view';
import {
  EmployeeReportChartsData,
  EmployeeReportFilterData,
  ISelectedFilters,
} from './types';
import { EmployeeSalesInfo } from '@/types/models';

export const EmployeesReportContainer = () => {
  const { getEmployeeSalesReport } = useReportsStore();
  const [chartsData, setChartsData] = useState<EmployeeReportChartsData>();
  const [filterData, setFilterData] = useState<EmployeeReportFilterData>();
  const [selectedFilters, setSelectedFilters] = useState<ISelectedFilters>({
    dt_from: new Date(-8640000000000000),
    dt_to: new Date(8640000000000000),
    employee_ids: [1],
    min_good_price: 0,
    max_good_price: Number.MAX_VALUE,
  });
  const [data, setData] = useState<EmployeeSalesInfo[]>();

  useEffect(() => {
    getEmployeeSalesReport({
      employee_ids: selectedFilters.employee_ids,
      min_good_price: selectedFilters.min_good_price,
      max_good_price: selectedFilters.max_good_price,
      dt_from: selectedFilters.dt_from.toISOString(),
      dt_to: selectedFilters.dt_to.toISOString(),
    }).then((data) => {
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
      filters={employeesReportFilters(
        selectedFilters,
        setSelectedFilters,
        filterData
      )}
      columns={employeesReportColumns}
    />
  );
};
