import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

/**
 * Protected route component that redirects to login if user is not authenticated
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render when authenticated
 * @param {Function} props.onRedirect - Optional callback when redirecting to login
 */
const ProtectedRoute = ({ children, onRedirect }) => {
  const { isAuthenticated, loading, refreshAuthStatus, hasToken } = useAuth();

  useEffect(() => {
    // Check if there's a token in localStorage but user is not authenticated yet
    if (!isAuthenticated && hasToken()) {
      // Force refresh authentication status
      refreshAuthStatus();
    }
    // If not loading and not authenticated and no token, trigger redirect callback
    else if (!loading && !isAuthenticated && !hasToken() && onRedirect) {
      onRedirect();
    }
  }, [isAuthenticated, loading, onRedirect, refreshAuthStatus, hasToken]);

  // Show loading state
  if (loading) {
    return <div className="auth-loading">Loading...</div>;
  }

  // If there's a token but not authenticated yet, show loading
  if (!isAuthenticated && hasToken()) {
    return <div className="auth-loading">Verifying authentication...</div>;
  }

  // Show children only when authenticated
  return isAuthenticated ? children : null;
};

export default ProtectedRoute;