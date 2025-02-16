import { columns } from '@/components/employees-table/columns';
import { EmployeesTable } from '@/components/employees-table/employees-table';
import { EmployeeSalesInfo, useReportsStore } from '@/store/reports.store';
import { useEffect, useState } from 'react';

export const EmployeesReportPage = () => {
  const { getEmployeeSalesReport } = useReportsStore();
  const [data, setData] = useState<EmployeeSalesInfo[]>();

  useEffect(() => {
    getEmployeeSalesReport(1).then((data) => setData(data));
  }, []);
  return (
    <div className="container mx-auto py-10">
      {data && <EmployeesTable columns={columns} data={data} />}
    </div>
  );
};
