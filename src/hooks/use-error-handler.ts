import { toast } from '@/hooks/use-toast';

export const useErrorHandler = () => {
  return (error: unknown, fallbackMessage = 'Произошла ошибка') => {
    const message = error instanceof Error ? error.message : fallbackMessage;

    toast({
      title: 'Ошибка',
      description: message,
      variant: 'destructive',
    });

    console.error(error);
  };
};
