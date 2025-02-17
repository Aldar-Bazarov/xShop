import { GoodSalesInfo, useReportsStore } from '@/store/reports.store';
import { useEffect, useState } from 'react';
import { goodsReportColumns, goodsReportFilters } from './properties';
import { ReportView } from '@/components/views/report-view';

export const GoodsReportContainer = () => {
  const { getGoodSalesReport } = useReportsStore();
  const [data, setData] = useState<GoodSalesInfo[]>();

  useEffect(() => {
    getGoodSalesReport(1).then((data) => setData(data));
  }, []);
  return (
    <ReportView
      title="Отчёт по товарам"
      data={data}
      filters={goodsReportFilters}
      columns={goodsReportColumns}
    />
  );
};
