import { ModeToggle } from '@/components/mode-toggle/mode-toggle';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { AuthService } from '@/services/auth.service';
import { useErrorHandler } from '@/hooks/use-error-handler';

const formSchema = z.object({
  username: z.string().nonempty({
    message: 'Имя пользователя обязательно для заполнения',
  }),
  password: z.string().nonempty({
    message: 'Пароль обязателен для заполнения',
  }),
  rememberMe: z.boolean().optional(),
});

export const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const errorHandler = useErrorHandler();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
      rememberMe: false,
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await AuthService.login(data.username, data.password);
      toast({
        title: 'Вы вошли в систему',
      });
      navigate(location.state.from.pathname ?? 'employees', { replace: true });
    } catch (error) {
      errorHandler(error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 p-8 bg-card rounded-lg shadow-lg">
        <div className="text-center">
          <h3 className="text-2xl font-bold">xShop</h3>
          <p className="text-muted-foreground mt-2">Войдите в свой аккаунт</p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className='className="space-y-2'>
                  <FormLabel className="text-sm font-medium text-foreground">
                    Имя пользователя
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="username"
                      {...field}
                      className="w-full px-3 py-2 border rounded-md bg-background text-foreground"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className='className="space-y-2'>
                  <FormLabel className="text-sm font-medium text-foreground">
                    Пароль
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="password"
                      {...field}
                      className="w-full px-3 py-2 border rounded-md bg-background text-foreground"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Запомнить меня</FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Войти
            </Button>
          </form>
        </Form>
      </div>
      <div className="absolute top-2 right-2">
        <ModeToggle />
      </div>
    </div>
  );
};
