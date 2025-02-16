import { DownArrowIcon } from '@/assets/icons/down-arrow-icon';
import { GoodSalesInfo } from '@/store/reports.store';
import { ColumnDef } from '@tanstack/react-table';
import { IReportFilter } from '../../components/report-view';
import { PopoverContent } from '../../components/ui/popover';
import { Calendar } from '../../components/ui/calendar';
import { Button } from '../../components/ui/button';

export const goodsReportColumns: ColumnDef<GoodSalesInfo>[] = [
  {
    accessorKey: 'goodID',
    header: 'ID',
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => <div>{row.getValue('goodID')}</div>,
  },
  {
    accessorKey: 'goodName',
    enableSorting: true,
    header: ({ column }) => {
      return (
        <div
          className="flex items-center gap-x-2 cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Название
          <DownArrowIcon />
        </div>
      );
    },
    cell: ({ row }) => <div>{row.getValue('goodName')}</div>,
  },
  {
    accessorKey: 'sumSales',
    enableSorting: true,
    header: ({ column }) => {
      return (
        <div
          className="flex items-center gap-x-2 cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Сумма продаж
          <DownArrowIcon />
        </div>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('sumSales')) / 100;
      const formatted = new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
      }).format(amount);
      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: 'salesCount',
    enableSorting: true,
    header: ({ column }) => {
      return (
        <div
          className="flex items-center gap-x-2 cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Количество продаж
          <DownArrowIcon />
        </div>
      );
    },
    cell: ({ row }) => <div>{parseFloat(row.getValue('salesCount'))}</div>,
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
    accessorKey: 'stockCount',
    enableSorting: true,
    header: ({ column }) => {
      return (
        <div
          className="flex items-center gap-x-2 cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Остаток
          <DownArrowIcon />
        </div>
      );
    },
    cell: ({ row }) => <div>{parseFloat(row.getValue('stockCount'))}</div>,
  },
];

export const goodsReportFilters: IReportFilter[] = [
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
];
