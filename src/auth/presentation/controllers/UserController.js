/**
 * Controller for user management operations
 * Follows clean architecture principles by connecting presentation layer with application services
 */
export class UserController {
  /**
   * @param {import('../../application/services/AuthService').AuthService} authService - The auth service
   */
  constructor(authService) {
    this.authService = authService;
  }

  /**
   * Handle user login
   * @param {string} username - The username or email
   * @param {string} password - The user's password
   * @returns {Promise<import('../../domain/models/User').User>} - The authenticated user
   */
  async login(username, password) {
    try {
      return await this.authService.login(username, password);
    } catch (error) {
      console.error('Login controller error:', error);
      throw error;
    }
  }

  /**
   * Handle user logout
   * @returns {Promise<void>}
   */
  async logout() {
    try {
      return await this.authService.logout();
    } catch (error) {
      console.error('Logout controller error:', error);
      throw error;
    }
  }

  /**
   * Check if user is authenticated
   * @returns {Promise<boolean>} - True if the user is authenticated
   */
  async isAuthenticated() {
    try {
      return await this.authService.isAuthenticated();
    } catch (error) {
      console.error('Authentication check error:', error);
      return false;
    }
  }

  /**
   * Get current user profile
   * @returns {Promise<import('../../domain/models/User').User|null>} - The current user or null
   */
  async getCurrentUser() {
    try {
      return await this.authService.getCurrentUser();
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  }
  
  /**
   * Register a new user
   * @param {string} username - The username
   * @param {string} email - The user's email
   * @param {string} password - The user's password
   * @returns {Promise<import('../../domain/models/User').User>} - The registered user
   */
  async register(username, email, password) {
    try {
      // This would call the authService.register method when implemented
      // For now, we'll just throw an error indicating it's not implemented
      throw new Error('Registration not yet implemented');
    } catch (error) {
      console.error('Registration controller error:', error);
      throw error;
    }
  }
}