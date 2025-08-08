import React, { useState } from 'react';
import axios from 'axios';

const DeleteEnrollment = () => {
  const [enrollmentId, setEnrollmentId] = useState('');
  const [message, setMessage] = useState('');

  const handleDelete = async e => {
    e.preventDefault();

    if (!enrollmentId) {
      setMessage('❌ Please enter a valid Enrollment ID.');
      return;
    }

    try {
      const response = await axios.delete(
        `https://psychic-eureka-97xxw4r66wv53v96-5177.app.github.dev/api/enrollment/${enrollmentId}`
      );

      if (response.status === 204) {
        setMessage('✅ Enrollment deleted successfully!');
      } else {
        setMessage('⚠️ Unexpected response from server.');
      }
    } catch (error) {
      console.error('Delete failed:', error);

      if (error.response?.status === 404) {
        setMessage('❌ Enrollment not found.');
      } else {
        setMessage('🚨 Server error. Please try again later.');
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="delete-enrollment-form" style={{ maxWidth: '400px', margin: 'auto' }}>
      <form onSubmit={handleDelete}>
        <h2>Delete Enrollment</h2>

        <label>Enrollment ID:</label>
        <input
          type="text"
          value={enrollmentId}
          onChange={e => setEnrollmentId(e.target.value)}
          required
        />

        <button type="submit" style={{ marginTop: '1rem' }}>Delete</button>

        {message && (
          <p style={{ color: message.startsWith('✅') ? 'green' : 'red', marginTop: '1rem' }}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default DeleteEnrollment;
