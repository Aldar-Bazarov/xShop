import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { UseFormReturn } from 'react-hook-form';
import { LoadingSpinner } from '../ui/loading-overlay';
import { Title } from '../ui/title';

interface FormField {
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  type?: string;
  isSelect?: boolean;
  options?: Array<{ value: string | number; label: string }>;
}

interface FormViewProps {
  title: string;
  loading?: boolean;
  form: UseFormReturn<any>;
  fields: FormField[];
  onSubmit: (data: any) => Promise<void>;
  submitText?: string;
}

export const FormView = ({
  title,
  loading = false,
  form,
  fields,
  onSubmit,
  submitText = 'Создать',
}: FormViewProps) => {
  const renderFormField = (field: FormField) => (
    <FormField
      key={field.name}
      control={form.control}
      name={field.name}
      render={({ field: fieldProps }) => (
        <FormItem className="w-[470px]">
          <FormLabel>{field.label}</FormLabel>
          {field.description && (
            <FormDescription>{field.description}</FormDescription>
          )}
          <FormControl>
            {field.isSelect ? (
              <Select
                onValueChange={fieldProps.onChange}
                defaultValue={fieldProps.value?.toString()}
              >
                <SelectTrigger>
                  <SelectValue placeholder={field.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {field.options?.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value.toString()}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                type={field.type || 'text'}
                placeholder={field.placeholder}
                {...fieldProps}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  return (
    <LoadingSpinner loading={loading} className="space-y-8">
      <Title>{title}</Title>
      <Card className="p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-wrap justify-center gap-4">
              {fields.map((field, index) => (
                <div
                  key={field.name}
                  className={`${
                    index === 0 && fields.length % 2 !== 0
                      ? 'w-full flex justify-center'
                      : ''
                  }`}
                >
                  {renderFormField(field)}
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <Button type="submit" className="w-fit py-6 px-28 mt-4">
                {submitText}
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </LoadingSpinner>
  );
};
