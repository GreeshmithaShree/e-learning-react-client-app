import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.post('https://psychic-eureka-97xxw4r66wv53v96-5177.app.github.dev/api/users/login', {
        email,
        password
      });

      const token = response.data?.token;
      if (token) {
        localStorage.setItem('jwtToken', token);
        console.log('Login response:', response.data);
        setMessage('✅ Login successful!');
        navigate('/dashboard');
        // Optionally redirect or update UI here
      } else {
        setMessage('⚠️ Token not received from server.');
      }
    } catch (err) {
      setMessage('❌ Invalid credentials or server error.');
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {message && (
        <p style={{ marginTop: '10px', color: message.includes('successful') ? 'green' : 'red' }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default Login;
