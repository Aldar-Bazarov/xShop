import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useState } from 'react';
import { Button } from './../ui/button';
import { Popover, PopoverTrigger } from './../ui/popover';
import { DownArrowIcon } from '@/assets/icons/down-arrow-icon';
import { ResetIcon } from '@/assets/icons/reset-icon';
import { FilterIcon } from '@/assets/icons/filter-icon';
import { Separator } from './../ui/separator';
import { Title } from './../ui/title';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './../ui/dialog';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './../ui/select';
import { ChartConfig } from './../ui/chart';

export interface IReportFilter {
  title: string;
  content: (data?: any) => React.ReactNode; // eslint-disable-line
}

export interface IReportChart {
  buttonTitle: string;
  chartTitle: string;
  chartName: string;
  chartConfig: Record<string, any>; // eslint-disable-line
  chartContent: (chartConfig: ChartConfig, chartData: any) => React.ReactNode; // eslint-disable-line
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[] | undefined;
  title: string;
  filters?: IReportFilter[];
  charts?: IReportChart[];
  chartsData?: any; // eslint-disable-line
}

export function ReportView<TData, TValue>({
  columns,
  data,
  title,
  filters,
  charts,
  chartsData,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: data ?? [],
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div>
      <div className="flex items-center gap-x-5">
        <Title className="m-0 mr-12">{title}</Title>
        {charts &&
          charts.map((chart) => (
            <Dialog>
              <DialogTrigger className="bg-primary text-primary-foreground px-4 py-1 rounded-md h-fit">
                {chart.buttonTitle}
              </DialogTrigger>
              <DialogContent className="w-full">
                <DialogHeader>
                  <DialogTitle>{chart.chartTitle}</DialogTitle>
                  {chartsData &&
                    chart.chartContent(
                      chart.chartConfig,
                      chartsData[chart.chartName]
                    )}
                </DialogHeader>
              </DialogContent>
            </Dialog>
          ))}
      </div>
      {filters && (
        <div className="flex items-center rounded-lg border bg-background w-fit my-6">
          <FilterIcon className="m-6" />
          <Separator orientation="vertical" className="h-20" />
          <span className="p-6">Фильтр</span>
          <Separator orientation="vertical" className="h-20" />
          {filters.map((filter) => (
            <Popover key={filter.title}>
              <PopoverTrigger asChild>
                <p className="flex w-fit items-center p-6 gap-4 cursor-pointer">
                  {filter.title}
                  <DownArrowIcon className="h-2 w-2" />
                </p>
              </PopoverTrigger>
              {filter.content(filter)}
              <Separator orientation="vertical" className="h-20" />
            </Popover>
          ))}
          <div className="flex w-fit items-center p-6 gap-2 cursor-pointer text-destructive">
            <ResetIcon />
            Reset Filter
          </div>
        </div>
      )}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="px-8 py-4" key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="px-8 py-4" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Нет данных
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end py-4 space-x-2 lg:space-x-4">
        <p className="text-sm font-medium">Количество строк</p>
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="flex w-fit items-center justify-center text-sm font-medium">
          Страница {table.getState().pagination.pageIndex + 1} из{' '}
          {table.getPageCount()}
        </p>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
