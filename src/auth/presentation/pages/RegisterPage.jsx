import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../../styles/LoginPage.css';

/**
 * Registration page component
 */
const RegisterPage = ({ onNavigate }) => {
  const { register, error: authError, loading } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
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
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
      // Pass a callback to redirect to home page after successful registration
      await register(formData.username, formData.email, formData.password, () => {
        // Redirect to home page
        window.location.href = '/';
      });
    } catch (error) {
      console.error('Registration submission error:', error);
      // Auth context will handle the error state
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-logo">Spotify</div>
        
        <h2>Sign up for Spotify</h2>
        
        {authError && <div className="auth-error">{authError}</div>}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
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
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              disabled={loading}
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
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
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? 'error' : ''}
              disabled={loading}
            />
            {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
          </div>
          
          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'SIGN UP'}
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
          <p>Already have an account? <a href="#" onClick={(e) => {
            e.preventDefault();
            onNavigate('/login');
          }}>Log in</a></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;