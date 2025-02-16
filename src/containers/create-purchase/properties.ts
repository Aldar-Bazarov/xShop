import { z } from 'zod';

export const createPurchaseSchema = z.object({
  priceInKopeks: z.number().min(1, 'Цена должна быть больше 0'),
  count: z.number().min(1, 'Количество должно быть больше 0'),
  goodId: z.number().min(1, 'Выберите товар'),
});

export const craetePurchaseFields = [
  {
    name: 'goodId',
    label: 'ID товара',
    type: 'number',
    placeholder: 'Введите ID товара',
  },
  {
    name: 'priceInKopeks',
    label: 'Цена',
    type: 'number',
    placeholder: 'Введите цену в копейках',
    description: 'Цена должна быть в копейках',
  },
  {
    name: 'count',
    label: 'Количество',
    type: 'number',
    placeholder: 'Введите количество',
  },
];
