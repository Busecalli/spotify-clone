/**
 * Interface for authentication repository
 * Defines the contract for authentication operations
 */
export class AuthRepository {
  /**
   * Authenticates a user with credentials
   * @param {string} username - The username or email
   * @param {string} password - The user's password
   * @returns {Promise<import('../models/User').User>} - The authenticated user
   */
  async login(username, password) {
    throw new Error('Method not implemented');
  }

  /**
   * Logs out the current user
   * @returns {Promise<void>}
   */
  async logout() {
    throw new Error('Method not implemented');
  }

  /**
   * Checks if the user is currently authenticated
   * @returns {Promise<boolean>} - True if the user is authenticated
   */
  async isAuthenticated() {
    throw new Error('Method not implemented');
  }

  /**
   * Gets the current user information
   * @returns {Promise<import('../models/User').User|null>} - The current user or null
   */
  async getCurrentUser() {
    throw new Error('Method not implemented');
  }

  /**
   * Refreshes the authentication token
   * @returns {Promise<string>} - The new token
   */
  async refreshToken() {
    throw new Error('Method not implemented');
  }
}