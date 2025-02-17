import { useAuthStore } from '@/store/auth.store';
import { Navigate, useLocation } from 'react-router';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { getToken } = useAuthStore();
  const token = getToken();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
