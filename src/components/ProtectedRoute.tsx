
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();

  // Add console logs for debugging
  useEffect(() => {
    console.log('ProtectedRoute: isAuthenticated =', isAuthenticated);
    console.log('ProtectedRoute: user =', user);
  }, [isAuthenticated, user]);

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
    console.log('ProtectedRoute: Redirecting to home page');
    // Clear any potentially stale user data
    localStorage.removeItem('user');
    
    // Don't remove language settings when logging out
    // This preserves language settings across login/logout
    
    return <Navigate to="/" replace />;
  }

  console.log('ProtectedRoute: Rendering protected content');
  return <>{children}</>;
};

export default ProtectedRoute;
