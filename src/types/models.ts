export const SIZES = [
  'XXXS',
  'XXS',
  'XS',
  'S',
  'M',
  'L',
  'XL',
  'XXL',
  'XXXL',
] as const;

export const POSITIONS = [
  {
    value: 1,
    name: 'Менеджер',
  },
  {
    value: 2,
    name: 'Продавец',
  },
];

export type Size = (typeof SIZES)[number];
export interface Position {
  id: number;
  name: string;
  percent: number;
  salaryInKopeks: number;
}

export interface Employee {
  id: number;
  name: string;
  inn: string;
  snils: string;
  phone: string;
  position: Position;
}

export interface Good {
  id: number;
  name: string;
  count: number;
  priceInKopeks: number;
  size: Size;
}

export interface Sale {
  id: number;
  goodID: number;
  employeeID: number;
  count: number;
  sumInKopeks: number;
  dateTime: string;
}

export interface Purchase {
  id: number;
  goodID: number;
  count: number;
  priceInKopeks: number;
  dateTime: string;
}

export interface EmployeeSalesInfo {
  averageSale: number;
  employeeID: number;
  employeeName: string;
  percentOfAllSales: number;
  sumOfSales: number;
}

export interface GoodSalesInfo {
  goodID: number;
  goodName: string;
  percentOfAllSales: number;
  salesCount: number;
  stockCount: number;
  sumSales: number;
}
