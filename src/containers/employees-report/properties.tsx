import { DownArrowIcon } from '@/assets/icons/down-arrow-icon';
import { EmployeeSalesInfo } from '@/store/reports.store';
import { ColumnDef } from '@tanstack/react-table';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '../../components/ui/chart';
import { Bar, BarChart, Pie, PieChart, XAxis } from 'recharts';
import { PopoverContent } from '../../components/ui/popover';
import { Calendar } from '../../components/ui/calendar';
import { Button } from '../../components/ui/button';
import { IReportChart, IReportFilter } from '@/components/views';

export const employeesReportColumns: ColumnDef<EmployeeSalesInfo>[] = [
  {
    accessorKey: 'employeeID',
    header: 'ID',
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => <div>{row.getValue('employeeID')}</div>,
  },
  {
    accessorKey: 'employeeName',
    enableSorting: true,
    header: ({ column }) => {
      return (
        <div
          className="flex items-center gap-x-2 cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Имя
          <DownArrowIcon />
        </div>
      );
    },
    cell: ({ row }) => <div>{row.getValue('employeeName')}</div>,
  },
  {
    accessorKey: 'averageSale',
    enableSorting: true,
    header: ({ column }) => {
      return (
        <div
          className="flex items-center gap-x-2 cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Средняя стоимость продажи
          <DownArrowIcon />
        </div>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('averageSale')) / 100;
      const formatted = new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
      }).format(amount);
      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: 'percentOfAllSales',
    enableSorting: true,
    header: ({ column }) => {
      return (
        <div
          className="flex items-center gap-x-2 cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Процент от всех продаж
          <DownArrowIcon />
        </div>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('percentOfAllSales')) / 100 / 100;
      const formatted = new Intl.NumberFormat('ru-RU', {
        style: 'percent',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount);
      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: 'sumOfSales',
    enableSorting: true,
    header: ({ column }) => {
      return (
        <div
          className="flex items-center gap-x-2 cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Сумма всех продаж
          <DownArrowIcon />
        </div>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('sumOfSales')) / 100;
      const formatted = new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
      }).format(amount);
      return <div>{formatted}</div>;
    },
  },
];

export const employeesReportCharts: IReportChart[] = [
  {
    buttonTitle: 'Диаграмма по сумме продаж',
    chartTitle: 'Диаграмма по сумме продаж',
    chartName: 'sumOfSales',
    chartConfig: {
      desktop: {
        label: 'Desktop',
        color: '#2563eb',
      },
      mobile: {
        label: 'Mobile',
        color: '#60a5fa',
      },
    },
    chartContent: (chartConfig: ChartConfig, chartData: any) => (
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
          <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
        </BarChart>
      </ChartContainer>
    ),
  },
  {
    buttonTitle: 'Диаграмма по проценту продаж',
    chartTitle: 'Диаграмма по проценту продаж',
    chartName: 'percentOfAllSales',
    chartConfig: {
      visitors: {
        label: 'Visitors',
      },
      chrome: {
        label: 'Chrome',
        color: 'hsl(var(--chart-1))',
      },
      safari: {
        label: 'Safari',
        color: 'hsl(var(--chart-2))',
      },
      firefox: {
        label: 'Firefox',
        color: 'hsl(var(--chart-3))',
      },
      edge: {
        label: 'Edge',
        color: 'hsl(var(--chart-4))',
      },
      other: {
        label: 'Other',
        color: 'hsl(var(--chart-5))',
      },
    },
    chartContent: (chartConfig: ChartConfig, chartData: any) => (
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie data={chartData} dataKey="visitors" nameKey="browser" />
          <ChartLegend
            content={<ChartLegendContent nameKey="browser" />}
            className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
          />
        </PieChart>
      </ChartContainer>
    ),
  },
];

export const employeesReportFilters: IReportFilter[] = [
  {
    title: 'Дата с',
    content: () => (
      <PopoverContent>
        <Calendar />
        <Button>Применить</Button>
      </PopoverContent>
    ),
  },
  {
    title: 'Дата по',
    content: () => (
      <PopoverContent>
        <Calendar />
        <Button>Применить</Button>
      </PopoverContent>
    ),
  },
  {
    title: 'Сотрудники',
    content: () => (
      <PopoverContent>Place content for the popover here.</PopoverContent>
    ),
  },
  {
    title: 'Цена товара',
    content: () => (
      <PopoverContent>Place content for the popover here.</PopoverContent>
    ),
  },
];
