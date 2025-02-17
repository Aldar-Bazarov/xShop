import { useState } from 'react';
import { useEmployeesStore } from '@/store/employees.store';
import { useErrorHandler } from '@/hooks/use-error-handler';
import { toast } from '@/hooks/use-toast';
import type { Employee } from '@/types/models';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { searchEmployeeFields, searchEmployeeSchema } from './properties';
import { FormView } from '@/components/views/form-view';
import { toLowerCaseKeys } from '@/lib/utils';

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
    <div className="space-y-8">
      <FormView
        title="Найти сотрудника"
        loading={loading}
        form={form}
        fields={searchEmployeeFields}
        onSubmit={handleGetEmployee}
        submitText="Найти"
      />
      {currentEmployee && (
        <Card>
          <CardHeader>
            <CardTitle>Информация о сотруднике</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <p>
                <span className="font-semibold">ФИО:</span>{' '}
                {currentEmployee.name}
              </p>
              <p>
                <span className="font-semibold">Должность:</span>{' '}
                {currentEmployee.position.name}
              </p>
              <p>
                <span className="font-semibold">ИНН:</span>{' '}
                {currentEmployee.inn}
              </p>
              <p>
                <span className="font-semibold">СНИЛС:</span>{' '}
                {currentEmployee.snils}
              </p>
              <p>
                <span className="font-semibold">Телефон:</span>{' '}
                {currentEmployee.phone}
              </p>
            </div>
            <div className="flex justify-center">
              <Button
                variant="destructive"
                onClick={handleFireEmployee}
                disabled={loading}
              >
                Уволить сотрудника
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
