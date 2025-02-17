import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { usePurchasesStore } from '@/store/purchases.store';
import { useErrorHandler } from '@/hooks/use-error-handler';
import { toast } from '@/hooks/use-toast';
import { FormView } from '@/components/views';
import { craetePurchaseFields, createPurchaseSchema } from './properties';

export const CreatePurchaseContainer = () => {
  const { loading, createPurchase } = usePurchasesStore();
  const errorHandler = useErrorHandler();

  const form = useForm<z.infer<typeof createPurchaseSchema>>({
    resolver: zodResolver(createPurchaseSchema),
    defaultValues: {
      price_in_kopeks: 0,
      count: 0,
      good_id: 0,
    },
  });

  const onSubmit = async (data: z.infer<typeof createPurchaseSchema>) => {
    try {
      await createPurchase(data);
      toast({
        title: 'Успешно',
        description: 'Закупка создана',
      });
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <FormView
      title="Создать закупку"
      loading={loading}
      form={form}
      fields={craetePurchaseFields}
      onSubmit={onSubmit}
    />
  );
};
