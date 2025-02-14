import { Routes, Route } from 'react-router';
import { AppLayout } from './components/app-layout/app-layout';
import { Login } from './pages/login/login';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Login />} />

        <Route element={<AppLayout />}>
          <Route path="employees" element={<>employees</>} />
          <Route path="goods" element={<>goods</>} />
          <Route path="reports" element={<>reports</>} />
          <Route path="sales" element={<>sales</>} />
          <Route path="purchases" element={<>purchases</>} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
