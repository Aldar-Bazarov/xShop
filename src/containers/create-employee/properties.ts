import { POSITIONS } from '@/types/models';
import { z } from 'zod';

export const createEmployeeSchema = z.object({
  surname: z.string().min(1, 'Введите фамилию'),
  name: z.string().min(1, 'Введите имя'),
  patronymic: z.string().min(1, 'Введите отчество'),
  inn: z.string().regex(/^\d{10}$|^\d{12}$/, {
    message: 'ИНН состоит из 10 или 12 цифр',
  }),
  snils: z.string().regex(/^\d{3}-\d{3}-\d{3}-\d{2}$/, {
    message: 'Снилс должен быть формата: 111-111-111-11',
  }),
  phone: z
    .string()
    .regex(/^(\+7|7|8)?[489][0-9]{2}[0-9]{3}?[0-9]{2}?[0-9]{2}$/, {
      message: 'Введите номер телефона формата +79999999999',
    }),
  positionID: z.coerce.number({ message: 'Выберите должность' }),
});

export const createEmployeeFields = [
  {
    name: 'positionID',
    label: 'Должность',
    placeholder: 'Выберите должность',
    isSelect: true,
    options: POSITIONS.map((pos) => ({
      value: pos.value,
      label: pos.name,
    })),
  },
  { name: 'surname', label: 'Фамилия', placeholder: 'Введите фамилию' },
  { name: 'name', label: 'Имя', placeholder: 'Введите имя' },
  { name: 'patronymic', label: 'Отчество', placeholder: 'Введите отчество' },
  { name: 'inn', label: 'ИНН', placeholder: 'Введите ИНН' },
  { name: 'snils', label: 'СНИЛС', placeholder: 'Введите СНИЛС' },
  { name: 'phone', label: 'Телефон', placeholder: 'Введите номер телефона' },
];
