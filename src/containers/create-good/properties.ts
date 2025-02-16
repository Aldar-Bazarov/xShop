import { SIZES } from '@/types/models';
import { z } from 'zod';

export const createGoodSchema = z.object({
  count: z.number().min(1, 'Количество должно быть больше 0'),
  size: z.string().min(1, 'Выберите размер'),
});

export const createGoodFields = [
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
];
