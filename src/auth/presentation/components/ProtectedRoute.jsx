import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

/**
 * Protected route component that redirects to login if user is not authenticated
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render when authenticated
 * @param {Function} props.onRedirect - Optional callback when redirecting to login
 */
const ProtectedRoute = ({ children, onRedirect }) => {
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    // If not loading and not authenticated, trigger redirect callback
    if (!loading && !isAuthenticated && onRedirect) {
      onRedirect();
    }
  }, [isAuthenticated, loading, onRedirect]);

  // Show loading state
  if (loading) {
    return <div className="auth-loading">Loading...</div>;
  }

  // Show children only when authenticated
  return isAuthenticated ? children : null;
};

export default ProtectedRoute;