import { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../../domain/models/User';

// Create the authentication context
const AuthContext = createContext(null);

/**
 * Provider component for authentication context
 * @param {Object} props - Component props
 * @param {import('../../application/services/AuthService').AuthService} props.authService - The auth service
 * @param {React.ReactNode} props.children - Child components
 */
export function AuthProvider({ authService, children }) {
  const [user, setUser] = useState(User.createAnonymous());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user on mount and check for token existence
  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        // First check if token exists
        const token = localStorage.getItem('auth_token');
        
        if (!token) {
          // No token found, set as anonymous user
          setUser(User.createAnonymous());
          return;
        }
        
        // Token exists, try to get current user
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        console.error('Failed to load user:', err);
        setError('Failed to authenticate user');
        // Reset to anonymous user on error
        setUser(User.createAnonymous());
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [authService]);

  /**
   * Login with username and password
   * @param {string} username - The username or email
   * @param {string} password - The user's password
   * @param {Function} [onSuccess] - Optional callback for successful login
   */
  const login = async (username, password, onSuccess) => {
    try {
      setLoading(true);
      setError(null);
      const authenticatedUser = await authService.login(username, password);
      setUser(authenticatedUser);
      
      // If a success callback is provided, call it
      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess(authenticatedUser);
      }
      
      return authenticatedUser;
    } catch (err) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logout the current user
   */
  const logout = async () => {
    try {
      setLoading(true);
      await authService.logout();
      setUser(User.createAnonymous());
    } catch (err) {
      setError(err.message || 'Logout failed');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Register a new user
   * @param {string} username - The username
   * @param {string} email - The user's email
   * @param {string} password - The user's password
   * @param {Function} [onSuccess] - Optional callback for successful registration
   */
  const register = async (username, email, password, onSuccess) => {
    try {
      setLoading(true);
      setError(null);
      const registeredUser = await authService.register(username, email, password);
      setUser(registeredUser);
      
      // If a success callback is provided, call it
      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess(registeredUser);
      }
      
      return registeredUser;
    } catch (err) {
      setError(err.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Context value
  const value = {
    user,
    isAuthenticated: user?.isLoggedIn() || false,
    loading,
    error,
    login,
    logout,
    register,
    // Add a method to check if token exists
    hasToken: () => !!localStorage.getItem('auth_token')
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook to use the authentication context
 * @returns {Object} The auth context value
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}