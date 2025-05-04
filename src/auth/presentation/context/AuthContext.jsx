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
        
        // Check if the user is authenticated with the token
        const isUserAuthenticated = await authService.isAuthenticated();
        
        if (!isUserAuthenticated) {
          // Token exists but is invalid
          localStorage.removeItem('auth_token');
          setUser(User.createAnonymous());
          return;
        }
        
        // Token exists and is valid, get current user
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        console.error('Failed to load user:', err);
        setError('Failed to authenticate user');
        // Reset to anonymous user on error
        setUser(User.createAnonymous());
        // Clear invalid token
        localStorage.removeItem('auth_token');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
    
    // Add event listener for storage changes to handle token updates in other tabs
    const handleStorageChange = (e) => {
      if (e.key === 'auth_token') {
        loadUser();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [authService]);
  
  // Force refresh auth status when component mounts
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token && !user.isLoggedIn()) {
      const refreshAuth = async () => {
        await authService.isAuthenticated();
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      };
      refreshAuth();
    }
  }, []);

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
      
      // Attempt to login with the auth service
      const authData = await authService.login(username, password);
      
      // Verify authentication status after login
      const isUserAuthenticated = await authService.isAuthenticated();
      
      if (!isUserAuthenticated) {
        throw new Error('Authentication failed - could not verify user');
      }
      
      // Get the authenticated user details
      const authenticatedUser = await authService.getCurrentUser();
      setUser(authenticatedUser);
      
      // If a success callback is provided, call it
      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess(authenticatedUser);
      }
      
      return authenticatedUser;
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed');
      // Clear any invalid token
      localStorage.removeItem('auth_token');
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
    // Method to check if token exists
    hasToken: () => !!localStorage.getItem('auth_token'),
    // Method to refresh authentication status
    refreshAuthStatus: async () => {
      try {
        setLoading(true);
        const isUserAuthenticated = await authService.isAuthenticated();
        if (isUserAuthenticated) {
          const currentUser = await authService.getCurrentUser();
          setUser(currentUser);
        } else {
          setUser(User.createAnonymous());
        }
      } catch (err) {
        console.error('Failed to refresh auth status:', err);
        setUser(User.createAnonymous());
      } finally {
        setLoading(false);
      }
    }
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