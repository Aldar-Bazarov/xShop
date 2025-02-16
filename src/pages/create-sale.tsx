import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSalesStore } from '@/store/sales.store';
import { useErrorHandler } from '@/hooks/use-error-handler';
import { toast } from '@/hooks/use-toast';
import { FormView } from '@/components/form-view/form-view';

const createSaleSchema = z.object({
  count: z.number().min(1, 'Количество должно быть больше 0'),
  goodId: z.number().min(1, 'Выберите товар'),
});

const formFields = [
  {
    name: 'goodId',
    label: 'ID товара',
    type: 'number',
    placeholder: 'Введите ID товара',
  },
  {
    name: 'count',
    label: 'Количество',
    type: 'number',
    placeholder: 'Введите количество',
  },
];

export const CreateSalePage = () => {
  const { loading, createSale } = useSalesStore();
  const errorHandler = useErrorHandler();

  const form = useForm<z.infer<typeof createSaleSchema>>({
    resolver: zodResolver(createSaleSchema),
    defaultValues: {
      count: 0,
      goodId: 0,
    },
  });

  const onSubmit = async (data: z.infer<typeof createSaleSchema>) => {
    try {
      // await createSale(data);
      toast({
        title: 'Успешно',
        description: 'Продажа создана',
      });
      form.reset();
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <FormView
      title="Создать продажу"
      loading={loading}
      form={form}
      fields={formFields}
      onSubmit={onSubmit}
    />
  );
};
