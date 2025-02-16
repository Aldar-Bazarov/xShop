import {
  employeesReportColumns,
  employeesReportCharts,
  employeesReportFilters,
} from '@/pages/employees-report/properties';
import { ReportView } from '@/components/protected-route/report-view';
import { EmployeeSalesInfo, useReportsStore } from '@/store/reports.store';
import { useEffect, useState } from 'react';

const chartsData: Record<string, any> = {
  sumOfSales: [
    { month: 'January', desktop: 186, mobile: 80 },
    { month: 'February', desktop: 305, mobile: 200 },
    { month: 'March', desktop: 237, mobile: 120 },
    { month: 'April', desktop: 73, mobile: 190 },
    { month: 'May', desktop: 209, mobile: 130 },
    { month: 'June', desktop: 214, mobile: 140 },
  ],
  percentOfAllSales: [
    { browser: 'chrome', visitors: 275, fill: 'var(--color-chrome)' },
    { browser: 'safari', visitors: 200, fill: 'var(--color-safari)' },
    { browser: 'firefox', visitors: 187, fill: 'var(--color-firefox)' },
    { browser: 'edge', visitors: 173, fill: 'var(--color-edge)' },
    { browser: 'other', visitors: 90, fill: 'var(--color-other)' },
  ],
};

export const EmployeesReportPage = () => {
  const { getEmployeeSalesReport } = useReportsStore();
  const [data, setData] = useState<EmployeeSalesInfo[]>();

  useEffect(() => {
    getEmployeeSalesReport(1).then((data) => setData(data));
  }, []);
  return (
    <div className="container mx-auto py-10">
      <ReportView
        title="Отчёт по сотрудникам"
        data={data}
        chartsData={chartsData}
        charts={employeesReportCharts}
        filters={employeesReportFilters}
        columns={employeesReportColumns}
      />
    </div>
  );
};
