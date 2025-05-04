import { AuthRepository } from '../../domain/repositories/AuthRepository';
import { User } from '../../domain/models/User';

/**
 * Implementation of the AuthRepository interface
 * Connects the domain layer with the infrastructure layer
 */
export class AuthRepositoryImpl extends AuthRepository {
  /**
   * @param {import('../api/AuthApiService').AuthApiService} authApiService - The auth API service
   */
  constructor(authApiService) {
    super();
    this.authApiService = authApiService;
  }

  /**
   * Authenticates a user with credentials
   * @param {string} username - The username or email
   * @param {string} password - The user's password
   * @returns {Promise<User>} - The authenticated user
   */
  async login(username, password) {
    try {
      const authData = await this.authApiService.login(username, password);
      return await this.getCurrentUser();
    } catch (error) {
      console.error('Login failed in repository:', error);
      throw error;
    }
  }

  /**
   * Logs out the current user
   * @returns {Promise<void>}
   */
  async logout() {
    return this.authApiService.logout();
  }

  /**
   * Checks if the user is currently authenticated
   * @returns {Promise<boolean>} - True if the user is authenticated
   */
  async isAuthenticated() {
    const token = localStorage.getItem('auth_token');
    if (!token) return false;
    
    try {
      const user = await this.getCurrentUser();
      return user && user.isLoggedIn();
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets the current user information
   * @returns {Promise<User|null>} - The current user or null
   */
  async getCurrentUser() {
    return this.authApiService.getCurrentUser();
  }

  /**
   * Refreshes the authentication token
   * @returns {Promise<string>} - The new token
   */
  async refreshToken() {
    return this.authApiService.refreshToken();
  }
}