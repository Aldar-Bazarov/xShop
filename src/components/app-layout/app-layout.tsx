import { Outlet, NavLink } from 'react-router';
import { cn } from '@/lib/utils';
import { ModeToggle } from '../mode-toggle/mode-toggle';

export const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-secondary border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 mr-10">
            <h3 className="text-xl font-bold">xShop</h3>
            <nav>
              <ul className="flex items-center gap-4">
                <li>
                  <NavLink
                    to="/employees"
                    className={({ isActive }) =>
                      cn(
                        'px-3 py-2 rounded-md hover:bg-accent',
                        isActive && 'bg-accent text-accent-foreground font-bold'
                      )
                    }
                  >
                    Сотрудники
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/goods"
                    className={({ isActive }) =>
                      cn(
                        'px-3 py-2 rounded-md hover:bg-accent',
                        isActive && 'bg-accent text-accent-foreground font-bold'
                      )
                    }
                  >
                    Товары
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/reports"
                    className={({ isActive }) =>
                      cn(
                        'px-3 py-2 rounded-md hover:bg-accent',
                        isActive && 'bg-accent text-accent-foreground font-bold'
                      )
                    }
                  >
                    Отчеты
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/sales"
                    className={({ isActive }) =>
                      cn(
                        'px-3 py-2 rounded-md hover:bg-accent',
                        isActive && 'bg-accent text-accent-foreground font-bold'
                      )
                    }
                  >
                    Продажи
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/purchases"
                    className={({ isActive }) =>
                      cn(
                        'px-3 py-2 rounded-md hover:bg-accent',
                        isActive && 'bg-accent text-accent-foreground font-bold'
                      )
                    }
                  >
                    Закупки
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>

          <ModeToggle />
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
};
