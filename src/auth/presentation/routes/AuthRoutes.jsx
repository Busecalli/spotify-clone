import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

/**
 * Simple router for authentication pages
 * Handles navigation between login and register pages
 */
const AuthRoutes = () => {
  const { isAuthenticated } = useAuth();
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  
  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = '/dashboard';
    }
  }, [isAuthenticated]);

  // Listen for path changes
  useEffect(() => {
    const handlePathChange = () => {
      setCurrentPath(window.location.pathname);
    };

    // Listen for popstate events (browser back/forward)
    window.addEventListener('popstate', handlePathChange);

    return () => {
      window.removeEventListener('popstate', handlePathChange);
    };
  }, []);

  // Handle navigation
  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  // Render the appropriate page based on the path
  const renderAuthPage = () => {
    if (currentPath === '/register') {
      return <RegisterPage onNavigate={navigateTo} />;
    }
    
    // Handle login path explicitly
    if (currentPath === '/login' || currentPath === '/') {
      return <LoginPage onNavigate={navigateTo} />;
    }
    
    // Default to login page for any other paths
    return <LoginPage onNavigate={navigateTo} />;
  };

  return (
    <div className="auth-routes">
      {renderAuthPage()}
    </div>
  );
};

export default AuthRoutes;