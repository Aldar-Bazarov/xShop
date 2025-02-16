import { useEmployeesStore } from '@/store/employees.store';
import { useErrorHandler } from '@/hooks/use-error-handler';
import { toast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormView } from '@/components/views';
import { createEmployeeFields, createEmployeeSchema } from './properties';

export const CreateEmployeeContainer = () => {
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
      fields={createEmployeeFields}
      onSubmit={onSubmit}
    />
  );
};
