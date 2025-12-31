import React, { useState } from 'react';
import './LoginRegister.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import BASE_URL from '../apiConfig';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const payload = {
      email: email,
      password: password
    };

    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/api/User/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': '*/*'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const result = await response.json();

        // ✅ Store the complete user object in localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', JSON.stringify({
          _id: result.id,
          name: result.name,
          email: result.email,
          role: result.role
        }));

        // ✅ Navigate based on role
        if (result.role === 'AR Requestor') {
          navigate('/home');
        } else if (result.role === 'Recruiter') {
          navigate('/recruiter');
        } else {
          navigate('/home');
        }

      } else {
        const errorText = await response.text();
        setError(`Login failed: ${errorText} `);
      }
    } catch (error) {
      setError(`Error: ${error.message} `);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container fade-in">

      <div className="auth-wrapper">
        <div className="auth-left">
          <h1>Welcome to GenHire</h1>
          <p>
            Automate Everything, Cloudify Everything, Transform Customer Experiences
          </p>
        </div>
        <form className="auth-form" onSubmit={handleLogin} autoComplete="on">
          <h2>Login</h2>
          {error && <div className="auth-error">{error}</div>}
          <div className="input-group">
            <span className="input-icon"><FaEnvelope /></span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
            />
          </div>
          <div className="input-group">
            <span className="input-icon"><FaLock /></span>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            <span
              className="input-icon input-eye"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={0}
              role="button"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          <button type="submit" disabled={loading} className="auth-btn">
            {loading ? <span className="spinner"></span> : 'Login'}
          </button>
          <p className="register-prompt">
            If Not Registered, <Link to="/register">Register Here</Link>.
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
