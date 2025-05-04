/**
 * Service for handling authentication use cases
 */
export class AuthService {
  /**
   * @param {import('../../domain/repositories/AuthRepository').AuthRepository} authRepository - The auth repository
   */
  constructor(authRepository) {
    this.authRepository = authRepository;
  }

  /**
   * Authenticates a user with credentials
   * @param {string} username - The username or email
   * @param {string} password - The user's password
   * @returns {Promise<import('../../domain/models/User').User>} - The authenticated user
   */
  async login(username, password) {
    if (!username || !password) {
      throw new Error('Username and password are required');
    }
    
    return this.authRepository.login(username, password);
  }

  /**
   * Logs out the current user
   * @returns {Promise<void>}
   */
  async logout() {
    return this.authRepository.logout();
  }

  /**
   * Checks if the user is currently authenticated
   * @returns {Promise<boolean>} - True if the user is authenticated
   */
  async isAuthenticated() {
    return this.authRepository.isAuthenticated();
  }

  /**
   * Gets the current user information
   * @returns {Promise<import('../../domain/models/User').User|null>} - The current user or null
   */
  async getCurrentUser() {
    return this.authRepository.getCurrentUser();
  }

  /**
   * Refreshes the authentication token
   * @returns {Promise<string>} - The new token
   */
  async refreshToken() {
    return this.authRepository.refreshToken();
  }

  /**
   * Registers a new user
   * @param {string} username - The username
   * @param {string} email - The user's email
   * @param {string} password - The user's password
   * @returns {Promise<import('../../domain/models/User').User>} - The registered user
   */
  async register(username, email, password) {
    if (!username || !email || !password) {
      throw new Error('Username, email, and password are required');
    }
    
    return this.authRepository.register(username, email, password);
  }
}