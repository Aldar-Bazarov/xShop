import { useEmployeesStore } from '@/store/employees.store';
import { useErrorHandler } from '@/hooks/use-error-handler';
import { toast } from '@/hooks/use-toast';
import { POSITIONS } from '@/types/models';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormView } from '@/components/form-view/form-view';

const createEmployeeSchema = z.object({
  name: z.string().min(1, 'Введите имя'),
  inn: z.string().regex(/^\d{10}$|^\d{12}$/, {
    message: 'ИНН состоит из 10 или 12 цифр',
  }),
  snils: z.string().regex(/^\d{3}-\d{3}-\d{3}-\d{2}$/, {
    message: 'Снилс должен быть формата: 111-111-111-11',
  }),
  phone: z
    .string()
    .regex(
      /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/,
      {
        message: 'Введите номер телефона формата +7 999 999 99 99',
      }
    ),
  position: z.number().min(1, 'Выберите должность'),
});

const formFields = [
  {
    name: 'position',
    label: 'Должность',
    placeholder: 'Выберите должность',
    isSelect: true,
    options: POSITIONS.map((pos) => ({
      value: pos.value,
      label: pos.name,
    })),
  },
  { name: 'name', label: 'ФИО', placeholder: 'Иванов Иван Иванович' },
  { name: 'inn', label: 'ИНН', placeholder: '123456789012' },
  { name: 'snils', label: 'СНИЛС', placeholder: '123-456-789-01' },
  { name: 'phone', label: 'Телефон', placeholder: '+7(999)999-99-99' },
];

export const CreateEmployeePage = () => {
  const { loading, createEmployee } = useEmployeesStore();
  const errorHandler = useErrorHandler();

  const form = useForm<z.infer<typeof createEmployeeSchema>>({
    resolver: zodResolver(createEmployeeSchema),
    defaultValues: {
      name: '',
      inn: '',
      snils: '',
      phone: '',
      position: undefined,
    },
  });

  const onSubmit = async (data: z.infer<typeof createEmployeeSchema>) => {
    try {
      // await createEmployee(data);
      toast({
        title: 'Успешно',
        description: 'Сотрудник создан',
      });
      form.reset();
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <FormView
      title="Добавить сотрудника"
      loading={loading}
      form={form}
      fields={formFields}
      onSubmit={onSubmit}
    />
  );
};
