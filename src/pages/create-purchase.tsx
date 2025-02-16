import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { usePurchasesStore } from '@/store/purchases.store';
import { useErrorHandler } from '@/hooks/use-error-handler';
import { toast } from '@/hooks/use-toast';
import { FormView } from '@/components/form-view/form-view';

const createPurchaseSchema = z.object({
  priceInKopeks: z.number().min(1, 'Цена должна быть больше 0'),
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
    name: 'priceInKopeks',
    label: 'Цена',
    type: 'number',
    placeholder: 'Введите цену в копейках',
    description: 'Цена должна быть в копейках',
  },
  {
    name: 'count',
    label: 'Количество',
    type: 'number',
    placeholder: 'Введите количество',
  },
];

export const CreatePurchasePage = () => {
  const { loading, createPurchase } = usePurchasesStore();
  const errorHandler = useErrorHandler();

  const form = useForm<z.infer<typeof createPurchaseSchema>>({
    resolver: zodResolver(createPurchaseSchema),
    defaultValues: {
      priceInKopeks: 0,
      count: 0,
      goodId: 0,
    },
  });

  const onSubmit = async (data: z.infer<typeof createPurchaseSchema>) => {
    try {
      // await createPurchase(data);
      toast({
        title: 'Успешно',
        description: 'Закупка создана',
      });
      form.reset();
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <FormView
      title="Создать закупку"
      loading={loading}
      form={form}
      fields={formFields}
      onSubmit={onSubmit}
    />
  );
};
