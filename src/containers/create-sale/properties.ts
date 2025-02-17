import { z } from 'zod';

export const createSaleSchema = z.object({
  count: z.coerce.number().min(1, 'Количество должно быть больше 0'),
  goodId: z.coerce.number().min(1, 'Выберите товар'),
});

export const createSaleFields = [
  {
    name: 'goodId',
    label: 'ID товара',
    type: 'number',
    placeholder: 'Введите ID товара',
  },
  {
    name: 'count',
    label: 'Количество',
    type: 'number',
    placeholder: 'Введите количество',
  },
];
