/**
 * User domain model representing the core user entity
 */
export class User {
  constructor(id, username, email, displayName, profilePicture = null, isAuthenticated = false) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.displayName = displayName;
    this.profilePicture = profilePicture;
    this.isAuthenticated = isAuthenticated;
  }

  /**
   * Creates an anonymous user instance
   * @returns {User} An anonymous user
   */
  static createAnonymous() {
    return new User(null, 'anonymous', null, 'Guest User', null, false);
  }

  /**
   * Checks if the user is authenticated
   * @returns {boolean} True if the user is authenticated
   */
  isLoggedIn() {
    return this.isAuthenticated;
  }
}