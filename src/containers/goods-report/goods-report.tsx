import { useReportsStore } from '@/store/reports.store';
import { useEffect, useState } from 'react';
import { goodsReportColumns, goodsReportFilters } from './properties';
import { ReportView } from '@/components/views/report-view';
import { GoodSalesInfo } from '@/types/models';
import { useErrorHandler } from '@/hooks/use-error-handler';
import { ISelectedFilters } from './types';

export const GoodsReportContainer = () => {
  const { getGoodSalesReport } = useReportsStore();
  const errorHandler = useErrorHandler();
  const [data, setData] = useState<GoodSalesInfo[]>();
  const [selectedFilters, setSelectedFilters] = useState<ISelectedFilters>({
    dt_from: new Date(-8640000000000000),
    dt_to: new Date(8640000000000000),
  });

  useEffect(() => {
    getGoodSalesReport({
      dt_from: '2025-01-01',
      dt_to: '2025-03-01',
    })
      .then((data) => setData(data))
      .catch((error) => errorHandler(error));
  }, []);

  return (
    <ReportView
      title="Отчёт по товарам"
      data={data}
      filters={goodsReportFilters(selectedFilters, setSelectedFilters)}
      columns={goodsReportColumns}
    />
  );
};
