import { User } from '../../domain/models/User';

/**
 * Mock implementation of the AuthApiService for development/testing
 * Accepts hardcoded credentials: username="username", password="password123"
 */
export class MockAuthApiService {
  constructor() {
    // Hardcoded user for testing
    this.mockUser = new User(
      '1',
      'username',
      'user@example.com',
      'Test User',
      null,
      true
    );
  }

  /**
   * Mock login that accepts hardcoded credentials
   * @param {string} username - The username
   * @param {string} password - The password
   * @returns {Promise<Object>} - Auth data with token
   */
  async login(username, password) {
    // Check for hardcoded credentials
    if (username === 'username' && password === 'password123') {
      // Store token in localStorage
      const mockToken = 'mock-auth-token-' + Date.now();
      localStorage.setItem('auth_token', mockToken);
      
      return {
        token: mockToken,
        user: this.mockUser
      };
    }
    
    // Throw error for invalid credentials
    throw new Error('Invalid credentials');
  }

  /**
   * Mock logout
   * @returns {Promise<void>}
   */
  async logout() {
    localStorage.removeItem('auth_token');
    return Promise.resolve();
  }

  /**
   * Mock get current user
   * @returns {Promise<User>} - The current user
   */
  async getCurrentUser() {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      return User.createAnonymous();
    }
    
    return this.mockUser;
  }

  /**
   * Mock refresh token
   * @returns {Promise<string>} - The new token
   */
  async refreshToken() {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      throw new Error('No token to refresh');
    }
    
    // Generate new mock token
    const newToken = 'mock-auth-token-' + Date.now();
    localStorage.setItem('auth_token', newToken);
    
    return newToken;
  }
}