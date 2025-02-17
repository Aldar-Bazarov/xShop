import { SIZES } from '@/types/models';
import { z } from 'zod';

export const createGoodSchema = z.object({
  name: z.string().min(1, { message: 'Введите название товара' }),
  count: z.coerce.number().min(1, 'Количество должно быть больше 0'),
  size: z.enum(SIZES, { message: 'Выберите корректный размер' }),
  priceInKopeks: z.coerce.number().min(1, { message: 'Введите цену' }),
});

export const createGoodFields = [
  {
    name: 'name',
    label: 'Название',
    type: 'string',
    placeholder: 'Введите название',
  },
  {
    name: 'count',
    label: 'Количество',
    type: 'number',
    placeholder: 'Введите количество',
  },
  {
    name: 'size',
    label: 'Размер',
    isSelect: true,
    placeholder: 'Выберите размер',
    options: SIZES.map((size) => ({
      value: size,
      label: size,
    })),
  },
  {
    name: 'priceInKopeks',
    label: 'Цена',
    type: 'number',
    placeholder: 'Введите цену',
    description: 'Цена должна быть в копейках',
  },
];
