import { AuthRepositoryImpl } from '../infrastructure/repositories/AuthRepositoryImpl';
import { AuthService } from '../application/services/AuthService';
import { UserController } from '../presentation/controllers/UserController';
import { MockAuthApiService } from '../infrastructure/api/MockAuthApiService';

/**
 * Configure and create authentication service with all dependencies
 * @returns {Object} The configured auth services and repositories
 */
export function configureAuth() {
  // Use mock auth API service with hardcoded credentials
  const authApiService = new MockAuthApiService();
  
  // Create repository implementation
  const authRepository = new AuthRepositoryImpl(authApiService);
  
  // Create application service
  const authService = new AuthService(authRepository);
  
  // Create user controller
  const userController = new UserController(authService);
  
  return {
    authService,
    authRepository,
    authApiService,
    userController
  };
}