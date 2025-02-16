import { ReportView } from '@/components/protected-route/report-view';
import { GoodSalesInfo, useReportsStore } from '@/store/reports.store';
import { useEffect, useState } from 'react';
import { goodsReportColumns, goodsReportFilters } from './properties';

export const GoodsReportPage = () => {
  const { getGoodSalesReport } = useReportsStore();
  const [data, setData] = useState<GoodSalesInfo[]>();

  useEffect(() => {
    getGoodSalesReport(1).then((data) => setData(data));
  }, []);
  return (
    <div className="container mx-auto py-10">
      <ReportView
        title="Отчёт по товарам"
        data={data}
        filters={goodsReportFilters}
        columns={goodsReportColumns}
      />
    </div>
  );
};
