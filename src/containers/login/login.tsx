import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from '@/hooks/use-toast';
import { useErrorHandler } from '@/hooks/use-error-handler';
import { useTheme } from '@/components/providers/theme-provider';
import { useAuthStore } from '@/store/auth.store';
import { LoginView } from '@/components/views/login-view';

const loginSchema = z.object({
  login: z.string().nonempty({
    message: 'Имя пользователя обязательно для заполнения',
  }),
  password: z.string().nonempty({
    message: 'Пароль обязателен для заполнения',
  }),
  rememberMe: z.boolean().optional(),
});

export const LoginContainer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const errorHandler = useErrorHandler();
  const { theme } = useTheme();
  const { login } = useAuthStore();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: '',
      password: '',
      rememberMe: false,
    },
  });

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    try {
      await login(data.login, data.password);
      toast({
        title: 'Вы вошли в систему',
      });
      navigate(location.state?.from?.pathname ?? '/', {
        replace: true,
      });
    } catch (error) {
      errorHandler(error);
    }
  }

  return <LoginView form={form} theme={theme} onSubmit={onSubmit} />;
};
