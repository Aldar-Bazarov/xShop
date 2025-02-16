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
import { AuthService } from '@/services/auth.service';
import { useErrorHandler } from '@/hooks/use-error-handler';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const formSchema = z.object({
  login: z.string().nonempty({
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
      login: '',
      password: '',
      rememberMe: false,
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await AuthService.login(data.login, data.password);
      toast({
        title: 'Вы вошли в систему',
      });
      navigate(location.state.from.pathname ?? 'employees', { replace: true });
    } catch (error) {
      errorHandler(error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      <Card className="w-[630px] h-[735px] py-10 px-[33px]">
        <CardHeader className="text-center mb-8">
          <CardTitle className="text-3xl font-semibold mb-2">Войти</CardTitle>
          <CardDescription>Введите свой идентификатор и пароль</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full flex flex-col justify-center items-center"
            >
              <FormField
                control={form.control}
                name="login"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Идентификатор сотрудника</FormLabel>
                    <FormControl>
                      <Input placeholder="1234567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full mt-10">
                    <FormLabel>Пароль</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-[418px] h-14 text-xl mt-28">
                Войти
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="absolute top-2 right-2">
        <ModeToggle />
      </div>
    </div>
  );
};
