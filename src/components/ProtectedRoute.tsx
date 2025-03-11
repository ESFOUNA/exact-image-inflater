
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();

  // Force check localStorage on each route access
  useEffect(() => {
    // This will trigger a re-render if storage changes
    const handleStorageChange = () => {
      window.location.reload();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  if (!isAuthenticated || !user) {
    // Clear any potentially stale user data
    localStorage.removeItem('user');
    
    // Don't remove language settings when logging out
    // This preserves language settings across login/logout
    
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
