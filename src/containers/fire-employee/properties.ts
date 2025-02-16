import { z } from 'zod';

export const searchEmployeeSchema = z.object({
  id: z.coerce.number().min(1, 'ID должен быть положительным числом'),
});

export const searchEmployeeFields = [
  {
    name: 'id',
    label: 'ID сотрудника',
    type: 'number',
    placeholder: 'Введите ID сотрудника',
  },
];
