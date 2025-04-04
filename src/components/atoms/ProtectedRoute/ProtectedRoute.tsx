import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@hooks';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/auth" replace />;
};
