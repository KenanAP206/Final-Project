import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminLogin.css'; 

function AdminLogin() {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    
    try {
      const response = await axios.post('http://localhost:3000/users/login', {
        email,
        password
      });

      if (response.data.success) {
        setIsConfirmed(true);
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Giriş başarısız');
      console.error('Login error:', error);
    }
  };



  return (
    <div className="admin-login-container">
      <h2>Admin Girişi</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email:</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label>Şifre:</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="login-button">Giriş Yap</button>
        </form>
    </div>
  );
}

export default AdminLogin;
