import React, { useState } from 'react';
import axios from 'axios';

const UpdateUser = () => {
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const updatedUser = {
        userId: parseInt(userId),
        name,
        email,
        role,
        password
      };

      const response = await axios.put(`https://psychic-eureka-97xxw4r66wv53v96-5177.app.github.dev/api/users/${userId}`, updatedUser);

      if (response.status === 200) {
        setMessage('✅ User updated successfully!');
      } else {
        setMessage('⚠️ Unexpected response from server.');
      }
    } catch (error) {
      console.error(error);
      setMessage('❌ Failed to update user.');
    }
  };

  return (
    <div className="form-container">
      <h2>Update User</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="number"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Update User</button>
      </form>

      {message && (
        <p style={{ marginTop: '10px', color: message.includes('✅') ? 'green' : 'red' }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default UpdateUser;
