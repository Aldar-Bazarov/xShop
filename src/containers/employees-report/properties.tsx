import { DownArrowIcon } from '@/assets/icons/down-arrow-icon';
import { ColumnDef } from '@tanstack/react-table';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '../../components/ui/chart';
import { Bar, BarChart, Cell, Pie, PieChart, XAxis } from 'recharts';
import { PopoverContent } from '../../components/ui/popover';
import { Calendar } from '../../components/ui/calendar';
import { Button } from '../../components/ui/button';
import { IReportChart, IReportFilter } from '@/components/views';
import { Title } from '@/components/ui/title';
import { EmployeeReportFilterData, ISelectedFilters } from './types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { EmployeeSalesInfo } from '@/types/models';

const PIE_CHART_COLORS = [
  '#172554',
  '#0ea5e9',
  '#1e3a8a',
  '#0284c7',
  '#1e40af',
  '#0369a1',
  '#1d4ed8',
  '#075985',
  '#2563eb',
  '#0c4a6e',
  '#3b82f6',
  '#082f49',
];

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

export const employeesReportFilters = (
  selectedFilters: ISelectedFilters,
  setSelectedFilters: React.Dispatch<React.SetStateAction<ISelectedFilters>>,
  filterData?: EmployeeReportFilterData
): IReportFilter[] => [
  {
    title: 'Дата с',
    content: () => (
      <>
        <PopoverContent className="flex flex-col items-center">
          <Calendar
            selected={selectedFilters?.dt_from ?? new Date()}
            onSelect={(_: any, date: Date) => {
              setSelectedFilters((prev) => ({
                ...prev,
                dt_from: date,
              }));
            }}
          />
          <Button>Применить</Button>
        </PopoverContent>
      </>
    ),
  },
  {
    title: 'Дата по',
    content: () => (
      <PopoverContent className="flex flex-col items-center">
        <Calendar
          selected={selectedFilters?.dt_to ?? new Date()}
          onSelect={(_: any, date: Date) => {
            setSelectedFilters((prev) => ({
              ...prev,
              dt_to: date,
            }));
          }}
        />
        <Button>Применить</Button>
      </PopoverContent>
    ),
  },
  {
    title: 'Сотрудники',
    content: () => (
      <PopoverContent className="flex flex-col items-center overflow-auto max-h-[500px]">
        <Title size={6}>Сотрудники</Title>
        {filterData?.employees.map((employee, index) => (
          <p className="w-full mb-2 py-2 px-4 bg-background rounded-lg border hover:bg-primary">
            {++index}
            {'. '}
            {employee}
          </p>
        ))}
      </PopoverContent>
    ),
  },
  {
    title: 'Цена товара',
    content: () => (
      <PopoverContent className="flex flex-col p-0">
        <Title size={6} className="p-4 mb-0">
          Цена
        </Title>
        <div className="flex gap-x-4 p-4">
          <div>
            <Label>От</Label>
            <Input type="number" placeholder="0 ₽"></Input>
          </div>
          <div>
            <Label>До</Label>
            <Input type="number" placeholder="X ₽"></Input>
          </div>
        </div>
        <Separator className="w-full my-4 self-center" />
        <Button className="w-fit self-center py-4 px-8 mb-4">Применить</Button>
      </PopoverContent>
    ),
  },
];

export const employeesReportCharts: IReportChart[] = [
  {
    buttonTitle: 'Диаграмма по сумме продаж',
    chartTitle: 'Диаграмма по сумме продаж',
    chartName: 'sumOfSalesData',
    chartConfig: {
      sumOfSales: {
        label: 'Сумма продаж ',
        color: 'hsl(var(--primary))',
      },
    },
    chartContent: (chartConfig: ChartConfig, chartData: any) => (
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <XAxis
            dataKey="employeeName"
            tickLine={false}
            tickMargin={0}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar
            dataKey="sumOfSales"
            radius={4}
            fill={chartConfig.sumOfSales.color} // Применение цвета из config
          />
        </BarChart>
      </ChartContainer>
    ),
  },
  {
    buttonTitle: 'Диаграмма по проценту продаж',
    chartTitle: 'Диаграмма по проценту продаж',
    chartName: 'percentOfAllSalesData',
    chartConfig: {},
    chartContent: (chartConfig: ChartConfig, chartData: any) => (
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <PieChart width={400} height={300}>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="percentOfAllSales"
            nameKey="employeeName"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
          >
            {chartData.map((_: any, index: number) => (
              <Cell
                key={`cell-${index}`}
                fill={`hsl(var(--chart-${index % 6.1}))`}
              />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
    ),
  },
];
