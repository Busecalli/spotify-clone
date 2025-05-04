import { useState, useEffect } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import Player from './components/Player'
import AuthRoutes from './auth/presentation/routes/AuthRoutes'
import { AuthProvider, useAuth } from './auth/presentation/context/AuthContext'
import { configureAuth } from './auth/config/AuthConfig'

// Configure auth services and controllers
const { authService, userController } = configureAuth();

// Protected layout component
function AppLayout() {
  const { isAuthenticated, loading, hasToken } = useAuth();
  const [redirecting, setRedirecting] = useState(false);
  
  // Effect to handle URL redirection based on authentication state
  useEffect(() => {
    // Only handle redirection when not loading
    if (!loading) {
      // If we're at the root path and not authenticated, redirect to login
      if (window.location.pathname === '/' && !isAuthenticated && !hasToken()) {
        setRedirecting(true);
        // Small timeout to avoid immediate redirect which can cause UI flicker
        setTimeout(() => {
          window.location.href = '/login';
        }, 100);
      }
    }
  }, [isAuthenticated, loading, hasToken]);
  
  // Show loading state while checking authentication or redirecting
  if (loading || redirecting) {
    return <div className="loading-screen">Loading...</div>;
  }
  
  // Redirect to auth routes if not authenticated
  if (!isAuthenticated) {
    return <AuthRoutes />;
  }
  
  // Show main app if authenticated
  return (
    <div className="app">
      <div className="main-container">
        <Sidebar />
        <MainContent />
      </div>
      <Player />
    </div>
  );

}

function App() {
  return (
    <AuthProvider authService={authService} userController={userController}>
      <AppLayout />
    </AuthProvider>
  );
}

export default App
