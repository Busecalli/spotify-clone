import { User } from '../../domain/models/User';

/**
 * Service for handling authentication API requests
 */
export class AuthApiService {
  constructor(httpClient) {
    this.httpClient = httpClient;
    this.baseUrl = '/api/auth'; // Base URL for auth endpoints
  }

  /**
   * Authenticates a user with the API
   * @param {string} username - The username or email
   * @param {string} password - The user's password
   * @returns {Promise<Object>} - The authentication response with tokens
   */
  async login(username, password) {
    try {
      const response = await this.httpClient.post(`${this.baseUrl}/login`, {
        username,
        password
      });
      
      // Store the token in localStorage or secure storage
      if (response.data.token) {
        localStorage.setItem('auth_token', response.data.token);
      }
      
      return response.data;
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error(error.response?.data?.message || 'Authentication failed');
    }
  }

  /**
   * Logs out the current user
   * @returns {Promise<void>}
   */
  async logout() {
    try {
      await this.httpClient.post(`${this.baseUrl}/logout`);
      localStorage.removeItem('auth_token');
    } catch (error) {
      console.error('Logout failed:', error);
      // Still remove the token even if the API call fails
      localStorage.removeItem('auth_token');
      throw error;
    }
  }

  /**
   * Gets the current user profile from the API
   * @returns {Promise<User>} - The user profile
   */
  async getCurrentUser() {
    try {
      const response = await this.httpClient.get(`${this.baseUrl}/me`);
      const userData = response.data;
      
      return new User(
        userData.id,
        userData.username,
        userData.email,
        userData.displayName,
        userData.profilePicture,
        true
      );
    } catch (error) {
      console.error('Failed to get user profile:', error);
      return User.createAnonymous();
    }
  }

  /**
   * Refreshes the authentication token
   * @returns {Promise<string>} - The new token
   */
  async refreshToken() {
    try {
      const response = await this.httpClient.post(`${this.baseUrl}/refresh-token`);
      const newToken = response.data.token;
      
      if (newToken) {
        localStorage.setItem('auth_token', newToken);
      }
      
      return newToken;
    } catch (error) {
      console.error('Token refresh failed:', error);
      throw error;
    }
  }
}