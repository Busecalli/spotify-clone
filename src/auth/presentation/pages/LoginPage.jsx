import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../../styles/LoginPage.css';

/**
 * Login page component
 */
const LoginPage = ({ onNavigate }) => {
  const { login, error: authError, loading } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  /**
   * Handle input change
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear field-specific error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  /**
   * Validate the form
   * @returns {boolean} True if the form is valid
   */
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   * @param {React.FormEvent} e - The form event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      // Pass a callback to redirect to dashboard page after successful login
      await login(formData.username, formData.password, () => {
        // Redirect to dashboard page
        window.location.href = '/dashboard';
      });
    } catch (error) {
      console.error('Login submission error:', error);
      // Auth context will handle the error state
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-logo">Spotify</div>
        
        <h2>Log in to Spotify</h2>
        
        {authError && <div className="auth-error">{authError}</div>}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Email or username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={errors.username ? 'error' : ''}
              disabled={loading}
            />
            {errors.username && <div className="error-message">{errors.username}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
              disabled={loading}
            />
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>
          
          <div className="form-group remember-me">
            <input type="checkbox" id="remember" name="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>
          
          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'LOG IN'}
          </button>
        </form>
        
        <div className="divider">
          <span>OR</span>
        </div>
        
        <div className="social-login">
          <button className="social-button google">Continue with Google</button>
          <button className="social-button facebook">Continue with Facebook</button>
          <button className="social-button apple">Continue with Apple</button>
        </div>
        
        <div className="login-footer">
          <p>Don't have an account? <a href="#" onClick={(e) => {
            e.preventDefault();
            onNavigate('/register');
          }}>Sign up for Spotify</a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;