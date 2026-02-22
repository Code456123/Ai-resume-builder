import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`https://ai-resume-builder-kbai.onrender.com/api/auth/reset-password/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password: formData.password })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Password reset successful! Redirecting to login...');
        
        // Store the token and redirect to dashboard
        localStorage.setItem('token', data.data.token);
        
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        setError(data.message || 'Failed to reset password');
      }
    } catch (error) {
      console.error('Reset password error:', error);
      setError('Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Reset Password</h2>
        <p className="auth-subtitle">Enter your new password</p>
        
        {message && (
          <div style={{ 
            padding: '10px', 
            marginBottom: '15px', 
            backgroundColor: '#d4edda', 
            color: '#155724', 
            borderRadius: '4px',
            fontSize: '14px'
          }}>
            {message}
          </div>
        )}
        
        {error && (
          <div style={{ 
            padding: '10px', 
            marginBottom: '15px', 
            backgroundColor: '#f8d7da', 
            color: '#721c24', 
            borderRadius: '4px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="🔒  New Password"
              required
              disabled={loading}
              minLength={6}
            />
          </div>
          
          <div className="form-group">
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="🔒  Confirm New Password"
              required
              disabled={loading}
              minLength={6}
            />
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
        
        <p className="auth-switch">
          Remember your password? 
          <span onClick={() => navigate('/login')} className="link-text">
            {' '}Login here
          </span>
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;
