export type Size =
  | 'XXXS'
  | 'XXS'
  | 'XS'
  | 'S'
  | 'M'
  | 'L'
  | 'XL'
  | 'XXL'
  | 'XXXL';

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
