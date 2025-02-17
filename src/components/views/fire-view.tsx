import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FormView } from '@/components/views/form-view';
import { FC } from 'react';
import { searchEmployeeSchema } from '@/containers/fire-employee/properties';
import { z } from 'zod';
import { Employee } from '@/types/models';
import { ISearchEmployeeField } from '@/containers/fire-employee/type';
import { UseFormReturn } from 'react-hook-form';

interface FireEmployeeViewProps {
  loading: boolean;
  form: UseFormReturn<
    {
      id: number;
    },
    any,
    undefined
  >;
  searchEmployeeFields: ISearchEmployeeField[];
  handleGetEmployee: (
    data: z.infer<typeof searchEmployeeSchema>
  ) => Promise<void>;
  handleFireEmployee: () => Promise<void>;
  currentEmployee: Employee | null;
}

export const FireEmployeeView: FC<FireEmployeeViewProps> = ({
  loading,
  form,
  searchEmployeeFields,
  handleGetEmployee,
  handleFireEmployee,
  currentEmployee,
}) => {
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
