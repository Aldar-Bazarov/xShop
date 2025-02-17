import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useGoodsStore } from '@/store/goods.store';
import { useErrorHandler } from '@/hooks/use-error-handler';
import { toast } from '@/hooks/use-toast';
import { FormView } from '@/components/views';
import { createGoodFields, createGoodSchema } from './properties';

export const CreateGoodContainer = () => {
  const { loading, createGood } = useGoodsStore();
  const errorHandler = useErrorHandler();

  const form = useForm<z.infer<typeof createGoodSchema>>({
    resolver: zodResolver(createGoodSchema),
    defaultValues: {
      name: '',
      count: 0,
      priceInKopeks: 0,
    },
  });

  const onSubmit = async (data: z.infer<typeof createGoodSchema>) => {
    try {
      await createGood(data);
      toast({
        title: 'Успешно',
        description: 'Товар создан',
      });
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <FormView
      title="Добавить товар"
      loading={loading}
      form={form}
      fields={createGoodFields}
      onSubmit={onSubmit}
    />
  );
};
