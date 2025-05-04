import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import Player from './components/Player'
import AuthRoutes from './auth/presentation/routes/AuthRoutes'
import { AuthProvider, useAuth } from './auth/presentation/context/AuthContext'
import { configureAuth } from './auth/config/AuthConfig'

// Configure auth services and controllers
const { authService, userController } = configureAuth();

// Dashboard layout component that includes sidebar, main content and player
function DashboardLayout() {
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

// Protected route component that checks authentication
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading, hasToken, refreshAuthStatus } = useAuth();
  
  useEffect(() => {
    // If there's a token but user is not authenticated, try to refresh auth status
    if (!isAuthenticated && hasToken()) {
      refreshAuthStatus();
    }
  }, [isAuthenticated, hasToken, refreshAuthStatus]);
  
  if (loading) {
    return <div className="loading-screen">Loading...</div>;
  }
  
  // If there's a token but not authenticated yet, show loading
  if (!isAuthenticated && hasToken()) {
    return <div className="loading-screen">Verifying authentication...</div>;
  }
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

// Main app layout with routing
function AppLayout() {
  const { isAuthenticated, loading } = useAuth();
  
  // Show loading state while checking authentication
  if (loading) {
    return <div className="loading-screen">Loading...</div>;
  }
  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <AuthRoutes />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <AuthRoutes />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        } />
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} />
      </Routes>
    </Router>
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
