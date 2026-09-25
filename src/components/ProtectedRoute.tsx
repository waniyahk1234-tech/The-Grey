import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LoginModal } from '../components/LoginModal';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginModal isOpen={true} />;
  }

  return <>{children}</>;
};
