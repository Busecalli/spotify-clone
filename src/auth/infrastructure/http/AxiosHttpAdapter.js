import axios from 'axios';
import { HttpClient } from './HttpClient';

/**
 * Axios implementation of the HTTP client
 * Provides a more robust implementation using axios
 */
export class AxiosHttpAdapter extends HttpClient {
  /**
   * @param {string} baseURL - Base URL for API requests
   */
  constructor(baseURL = '') {
    super(baseURL);
    this.axiosInstance = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    // Set up axios interceptors
    this.setupInterceptors();
  }

  /**
   * Set up axios request and response interceptors
   */
  setupInterceptors() {
    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // Apply our custom request interceptors
        const processedConfig = this.applyRequestInterceptors(config);
        return processedConfig;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response) => {
        // Format response to match our HttpClient format
        const formattedResponse = {
          data: response.data,
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
          config: response.config
        };
        
        // Apply our custom response interceptors
        return this.applyResponseInterceptors(formattedResponse);
      },
      (error) => {
        // Format error response
        if (error.response) {
          const errorResponse = {
            data: error.response.data,
            status: error.response.status,
            statusText: error.response.statusText,
            headers: error.response.headers,
            config: error.response.config
          };
          
          // Apply response interceptors to error responses too
          return Promise.reject(this.applyResponseInterceptors(errorResponse));
        }
        
        return Promise.reject(error);
      }
    );
  }

  /**
   * Make a GET request
   * @param {string} url - The URL to request
   * @param {Object} options - Additional options
   * @returns {Promise<Object>} - The response data
   */
  async get(url, options = {}) {
    try {
      const response = await this.axiosInstance.get(url, options);
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Make a POST request
   * @param {string} url - The URL to request
   * @param {Object} data - The data to send
   * @param {Object} options - Additional options
   * @returns {Promise<Object>} - The response data
   */
  async post(url, data, options = {}) {
    try {
      const response = await this.axiosInstance.post(url, data, options);
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Make a PUT request
   * @param {string} url - The URL to request
   * @param {Object} data - The data to send
   * @param {Object} options - Additional options
   * @returns {Promise<Object>} - The response data
   */
  async put(url, data, options = {}) {
    try {
      const response = await this.axiosInstance.put(url, data, options);
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Make a DELETE request
   * @param {string} url - The URL to request
   * @param {Object} options - Additional options
   * @returns {Promise<Object>} - The response data
   */
  async delete(url, options = {}) {
    try {
      const response = await this.axiosInstance.delete(url, options);
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }
}

/**
 * Create an Axios HTTP client with auth token interceptor
 * @param {string} baseURL - Base URL for API requests
 * @returns {AxiosHttpAdapter} - Configured HTTP client
 */
export function createAxiosAuthHttpClient(baseURL = '') {
  const client = new AxiosHttpAdapter(baseURL);
  
  // Add auth token to requests
  client.addRequestInterceptor((config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      return {
        ...config,
        headers: {
          ...config.headers,
          'Authorization': `Bearer ${token}`
        }
      };
    }
    return config;
  });
  
  // Handle unauthorized responses
  client.addResponseInterceptor((response) => {
    if (response.status === 401) {
      // Clear token on unauthorized response
      localStorage.removeItem('auth_token');
      // Redirect to login page
      window.location.href = '/login';
    }
    return response;
  });
  
  return client;
}