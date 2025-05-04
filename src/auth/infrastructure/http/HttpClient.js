/**
 * HTTP Client with interceptors for API requests
 */
export class HttpClient {
  constructor(baseURL = '') {
    this.baseURL = baseURL;
    this.interceptors = {
      request: [],
      response: []
    };
  }

  /**
   * Add a request interceptor
   * @param {Function} interceptor - Function that receives and modifies the request config
   */
  addRequestInterceptor(interceptor) {
    this.interceptors.request.push(interceptor);
  }

  /**
   * Add a response interceptor
   * @param {Function} interceptor - Function that receives and processes the response
   */
  addResponseInterceptor(interceptor) {
    this.interceptors.response.push(interceptor);
  }

  /**
   * Apply request interceptors to the config
   * @param {Object} config - The request configuration
   * @returns {Object} - The modified config
   */
  applyRequestInterceptors(config) {
    return this.interceptors.request.reduce(
      (currentConfig, interceptor) => interceptor(currentConfig),
      config
    );
  }

  /**
   * Apply response interceptors to the response
   * @param {Object} response - The response object
   * @returns {Object} - The processed response
   */
  applyResponseInterceptors(response) {
    return this.interceptors.response.reduce(
      (currentResponse, interceptor) => interceptor(currentResponse),
      response
    );
  }

  /**
   * Handle errors from the fetch operation
   * @param {Error} error - The error object
   * @throws {Error} - Rethrows the error after processing
   */
  handleError(error) {
    // Log the error or perform other operations
    console.error('HTTP Client Error:', error);
    throw error;
  }

  /**
   * Make an HTTP request
   * @param {string} url - The URL to request
   * @param {Object} options - The fetch options
   * @returns {Promise<Object>} - The response data
   */
  async request(url, options = {}) {
    try {
      const fullUrl = this.baseURL ? `${this.baseURL}${url}` : url;
      
      // Apply request interceptors
      const config = this.applyRequestInterceptors({
        url: fullUrl,
        ...options
      });
      
      const response = await fetch(config.url, {
        ...config,
        headers: {
          'Content-Type': 'application/json',
          ...config.headers
        }
      });
      
      // Parse the response
      const data = response.headers.get('content-type')?.includes('application/json')
        ? await response.json()
        : await response.text();
      
      const processedResponse = {
        data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        config
      };
      
      // Apply response interceptors
      return this.applyResponseInterceptors(processedResponse);
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Make a GET request
   * @param {string} url - The URL to request
   * @param {Object} options - Additional options
   * @returns {Promise<Object>} - The response data
   */
  async get(url, options = {}) {
    return this.request(url, {
      method: 'GET',
      ...options
    });
  }

  /**
   * Make a POST request
   * @param {string} url - The URL to request
   * @param {Object} data - The data to send
   * @param {Object} options - Additional options
   * @returns {Promise<Object>} - The response data
   */
  async post(url, data, options = {}) {
    return this.request(url, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options
    });
  }

  /**
   * Make a PUT request
   * @param {string} url - The URL to request
   * @param {Object} data - The data to send
   * @param {Object} options - Additional options
   * @returns {Promise<Object>} - The response data
   */
  async put(url, data, options = {}) {
    return this.request(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options
    });
  }

  /**
   * Make a DELETE request
   * @param {string} url - The URL to request
   * @param {Object} options - Additional options
   * @returns {Promise<Object>} - The response data
   */
  async delete(url, options = {}) {
    return this.request(url, {
      method: 'DELETE',
      ...options
    });
  }
}

/**
 * Create an HTTP client with auth token interceptor
 * @returns {HttpClient} - Configured HTTP client
 */
export function createAuthHttpClient() {
  const client = new HttpClient();
  
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