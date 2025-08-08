import React, { useState } from 'react';
import axios from 'axios';

const DeleteUser = () => {
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');

  const handleDelete = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.delete(`https://psychic-eureka-97xxw4r66wv53v96-5177.app.github.dev/api/users/${userId}`);

      if (response.status === 200) {
        setMessage(`✅ ${response.data}`);
      } else {
        setMessage('⚠️ Unexpected response from server.');
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setMessage(`❌ User with ID ${userId} not found.`);
      } else {
        setMessage('❌ Failed to delete user.');
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Delete User</h2>
      <form onSubmit={handleDelete}>
        <input
          type="number"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <button type="submit">Delete User</button>
      </form>

      {message && (
        <p style={{ marginTop: '10px', color: message.includes('✅') ? 'green' : 'red' }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default DeleteUser;
