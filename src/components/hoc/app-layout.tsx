import { Outlet, NavLink } from 'react-router';
import { ThemeToggle } from '../ui/theme-toggle';
import { Button } from '../ui/button';
import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarInset,
  SidebarHeader,
  SidebarFooter,
} from '../ui/sidebar';
import {
  AddGoodIcon,
  BanknoteIcon,
  EmployeesReportIcon,
  FireEmployeeIcon,
  GoodsReportIcon,
  NewEmployeeIcon,
  PurchaseIcon,
} from '@/assets/icons';
import { Separator } from '../ui/separator';
import { LogoutIcon } from '@/assets/icons/logout-icon';
import { useAuthStore } from '@/store/auth.store';

const menuItems = {
  main: [
    {
      url: '/sale',
      icon: <BanknoteIcon />,
      title: 'Продажа',
    },
    {
      url: '/good',
      icon: <AddGoodIcon />,
      title: 'Добавить товар',
    },
    {
      url: '/purchase',
      icon: <PurchaseIcon />,
      title: 'Закупка',
    },
    {
      url: '/new-employee',
      icon: <NewEmployeeIcon />,
      title: 'Новый сотрудник',
    },
    {
      url: '/fire-employee',
      icon: <FireEmployeeIcon />,
      title: 'Уволить сотрудника',
    },
  ],
  report: [
    {
      url: '/employees-reports',
      icon: <EmployeesReportIcon />,
      title: 'По сотрудникам',
    },
    {
      url: '/goods-reports',
      icon: <GoodsReportIcon />,
      title: 'По товарам',
    },
  ],
};

export const AppLayout = () => {
  const { logout } = useAuthStore();
  return (
    <SidebarProvider className="bg-secondary">
      <Sidebar className="bg-background">
        <SidebarHeader className="ml-10 mt-5">
          <NavLink to={'/'} className="text-lg font-bold w-fit">
            <span className="text-primary">x</span>Shop
          </NavLink>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="p-5">
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.main.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className="flex items-center gap-2"
                      >
                        {item.icon}
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <Separator />
          <SidebarGroup className="p-5">
            <SidebarGroupLabel>Отчёты</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.report.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className="flex items-center gap-2"
                      >
                        {item.icon}
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <Separator />
        <SidebarFooter className="flex flex-row justify-between items-center">
          <Button variant="ghost" onClick={() => logout()}>
            <LogoutIcon />
            Logout
          </Button>
          <ThemeToggle />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex-1 bg-secondary">
        <main className="bg-secondary">
          <header className="flex h-16 shrink-0 items-center bg-background">
            <div className="flex items-center justify-between w-full pl-5 pr-10">
              <SidebarTrigger />
              <div>
                <p className="text-sm font-medium">Иван Иванов</p>
                <p className="text-xs">Менеджер</p>
              </div>
            </div>
          </header>
          <div className="flex-1 container mx-auto px-8 py-8">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};
