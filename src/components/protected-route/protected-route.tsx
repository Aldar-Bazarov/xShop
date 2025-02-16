import { Navigate, useLocation } from 'react-router';

import { AuthService } from '@/services/auth.service';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = AuthService.getToken();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
