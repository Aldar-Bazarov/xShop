import { Routes, Route } from 'react-router';
import { AppLayout } from './components/app-layout/app-layout';
import { Login } from './pages/login';
import { Toaster } from '@/components/ui/toaster';
import { CreateEmployeePage } from './pages/create-employee';
import { CreateGoodPage } from './pages/create-good';
import { CreatePurchasePage } from './pages/create-purchase';
import { CreateSalePage } from './pages/create-sale';
import { FireEmployeePage } from './pages/fire-employee';
import { EmployeesReportPage } from './pages/employees-report/employees-report';
import { GoodsReportPage } from './pages/goods-report/goods-report';
import NotFound from './pages/NotFound';
import HomePage from './pages/home';
import { ProtectedRoute } from './components/protected-route/protected-route';

function App() {
  return (
    <>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route
          element={
            // <ProtectedRoute>
            <AppLayout />
            // </ProtectedRoute>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="sale" element={<CreateSalePage />} />
          <Route path="good" element={<CreateGoodPage />} />
          <Route path="purchase" element={<CreatePurchasePage />} />
          <Route path="new-employee" element={<CreateEmployeePage />} />
          <Route path="fire-employee" element={<FireEmployeePage />} />
          <Route path="employees-reports" element={<EmployeesReportPage />} />
          <Route path="goods-reports" element={<GoodsReportPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
