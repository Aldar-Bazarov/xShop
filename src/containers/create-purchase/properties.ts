import { z } from 'zod';

export const createPurchaseSchema = z.object({
  price_in_kopeks: z.coerce.number().min(1, 'Цена должна быть больше 0'),
  count: z.coerce.number().min(1, 'Количество должно быть больше 0'),
  good_id: z.coerce.number().min(1, 'Выберите товар'),
});

export const craetePurchaseFields = [
  {
    name: 'good_id',
    label: 'ID товара',
    type: 'number',
    placeholder: 'Введите ID товара',
  },
  {
    name: 'price_in_kopeks',
    label: 'Цена',
    type: 'number',
    placeholder: 'Введите цену',
    description: 'Цена должна быть в копейках',
  },
  {
    name: 'count',
    label: 'Количество',
    type: 'number',
    placeholder: 'Введите количество',
  },
];
