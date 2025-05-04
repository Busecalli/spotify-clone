import { AuthApiService } from '../infrastructure/api/AuthApiService';
import { AuthRepositoryImpl } from '../infrastructure/repositories/AuthRepositoryImpl';
import { AuthService } from '../application/services/AuthService';
import { createAxiosAuthHttpClient } from '../infrastructure/http/AxiosHttpAdapter';
import { UserController } from '../presentation/controllers/UserController';

/**
 * Configure and create authentication service with all dependencies
 * @returns {Object} The configured auth services and repositories
 */
export function configureAuth() {
  // Create HTTP client with auth interceptors using Axios
  const httpClient = createAxiosAuthHttpClient(import.meta.env.VITE_API_BASE_URL || '');
  
  // Create API service
  const authApiService = new AuthApiService(httpClient);
  
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
    httpClient,
    userController
  };
}