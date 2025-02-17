import { Routes, Route } from 'react-router';
import { Toaster } from '@/components/ui/toaster';
import { LoginContainer } from './containers/login/login';
import { CreateEmployeeContainer } from './containers/create-employee/create-employee';
import { CreateGoodContainer } from './containers/create-good/create-good';
import { CreatePurchaseContainer } from './containers/create-purchase/create-purchase';
import { CreateSaleContainer } from './containers/create-sale/create-sale';
import { EmployeesReportContainer } from './containers/employees-report/employees-report';
import { FireEmployeeContainer } from './containers/fire-employee/fire-employee';
import { GoodsReportContainer } from './containers/goods-report/goods-report';
import { Home } from './components/views/home';
import { NotFound } from './components/views/not-found';
import { AppLayout } from './components/hoc/app-layout';
import { ProtectedRoute } from './components/hoc/protected-route';

function App() {
  return (
    <>
      <Routes>
        <Route path="login" element={<LoginContainer />} />
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="sale" element={<CreateSaleContainer />} />
          <Route path="good" element={<CreateGoodContainer />} />
          <Route path="purchase" element={<CreatePurchaseContainer />} />
          <Route path="new-employee" element={<CreateEmployeeContainer />} />
          <Route path="fire-employee" element={<FireEmployeeContainer />} />
          <Route
            path="employees-reports"
            element={<EmployeesReportContainer />}
          />
          <Route path="goods-reports" element={<GoodsReportContainer />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
