import { toast } from '@/hooks/use-toast';
import { AxiosError } from 'axios';

export const useErrorHandler = () => {
  return (error: unknown, fallbackMessage = 'Произошла ошибка') => {
    let message = error instanceof Error ? error.message : fallbackMessage;
    if (error instanceof AxiosError) {
      message = error.response?.data.error;
    } else if (error instanceof Error) {
      message = error.message;
    } else {
      message = fallbackMessage;
    }
    toast({
      title: 'Ошибка',
      description: message,
      variant: 'destructive',
    });

    console.error(error);
  };
};
