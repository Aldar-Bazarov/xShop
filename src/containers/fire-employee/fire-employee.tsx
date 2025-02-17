import { useState } from 'react';
import { useEmployeesStore } from '@/store/employees.store';
import { useErrorHandler } from '@/hooks/use-error-handler';
import { toast } from '@/hooks/use-toast';
import type { Employee } from '@/types/models';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { searchEmployeeFields, searchEmployeeSchema } from './properties';
import { toLowerCaseKeys } from '@/lib/utils';
import { FireEmployeeView } from '@/components/views/fire-view';

export const FireEmployeeContainer = () => {
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);
  const { loading, getEmployee, fireEmployee } = useEmployeesStore();
  const errorHandler = useErrorHandler();

  const form = useForm<z.infer<typeof searchEmployeeSchema>>({
    resolver: zodResolver(searchEmployeeSchema),
  });

  const handleGetEmployee = async (
    data: z.infer<typeof searchEmployeeSchema>
  ) => {
    try {
      const employee = await getEmployee(data.id);
      setCurrentEmployee(toLowerCaseKeys(employee) as Employee);
      toast({
        title: 'Успешно',
        description: 'Данные сотрудника получены',
      });
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleFireEmployee = async () => {
    if (!currentEmployee) return;

    try {
      await fireEmployee(currentEmployee.id);
      setCurrentEmployee(null);
      toast({
        title: 'Успешно',
        description: 'Сотрудник уволен',
      });
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <FireEmployeeView
      loading={loading}
      form={form}
      handleGetEmployee={handleGetEmployee}
      handleFireEmployee={handleFireEmployee}
      searchEmployeeFields={searchEmployeeFields}
      currentEmployee={currentEmployee}
    />
  );
};
