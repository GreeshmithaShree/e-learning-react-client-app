import React, { useState } from 'react';
import axios from 'axios';

const GetUserById = () => {
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');

  const handleFetchUser = async (e) => {
    e.preventDefault();
    setMessage('');
    setUser(null);

    try {
      const response = await axios.get(`https://psychic-eureka-97xxw4r66wv53v96-5177.app.github.dev/api/users/${userId}`);
      setUser(response.data);
      setMessage('✅ User fetched successfully.');
    } catch (error) {
      setMessage('❌ User not found or server error.');
    }
  };

  return (
    <div className="form-container">
      <h2>Get User by ID</h2>
      <form onSubmit={handleFetchUser}>
        <input
          type="number"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <button type="submit">Fetch User</button>
      </form>

      {message && (
        <p style={{ marginTop: '10px', color: message.includes('✅') ? 'green' : 'red' }}>
          {message}
        </p>
      )}

      {user && (
        <div style={{ marginTop: '20px' }}>
          <p><strong>ID:</strong> {user.userId}</p>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      )}
    </div>
  );
};

export default GetUserById;
