import { ThemeToggle } from '@/components/ui/theme-toggle';
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
import { UseFormReturn } from 'react-hook-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Theme } from '@/components/providers/theme-provider';
import { FC } from 'react';

interface LoginViewProps {
  theme: Theme;
  form: UseFormReturn<
    {
      login: string;
      password: string;
      rememberMe?: boolean | undefined;
    },
    any,
    undefined
  >;
  onSubmit: (data: any) => Promise<void>;
}

export const LoginView: FC<LoginViewProps> = ({ theme, form, onSubmit }) => {
  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        theme !== 'light' ? 'bg-secondary' : 'bg-primary'
      }`}
    >
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
        <ThemeToggle className="bg-background text-primary" />
      </div>
    </div>
  );
};
