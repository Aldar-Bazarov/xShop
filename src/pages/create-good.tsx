import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useGoodsStore } from '@/store/goods.store';
import { useErrorHandler } from '@/hooks/use-error-handler';
import { toast } from '@/hooks/use-toast';
import { FormView } from '@/components/form-view/form-view';

const createGoodSchema = z.object({
  count: z.number().min(1, 'Количество должно быть больше 0'),
  size: z.string().min(1, 'Выберите размер'),
});

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const formFields = [
  {
    name: 'count',
    label: 'Количество',
    type: 'number',
    placeholder: 'Введите количество',
  },
  {
    name: 'size',
    label: 'Размер',
    isSelect: true,
    placeholder: 'Выберите размер',
    options: SIZES.map((size) => ({
      value: size,
      label: size,
    })),
  },
];

export const CreateGoodPage = () => {
  const { loading, createGood } = useGoodsStore();
  const errorHandler = useErrorHandler();

  const form = useForm<z.infer<typeof createGoodSchema>>({
    resolver: zodResolver(createGoodSchema),
    defaultValues: {
      count: 0,
      size: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof createGoodSchema>) => {
    try {
      // await createGood(data);
      toast({
        title: 'Успешно',
        description: 'Товар создан',
      });
      form.reset();
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <FormView
      title="Добавить товар"
      loading={loading}
      form={form}
      fields={formFields}
      onSubmit={onSubmit}
    />
  );
};
