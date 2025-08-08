import React, { useState } from 'react';
import axios from 'axios';

const DeleteCourse = () => {
  const [courseId, setCourseId] = useState('');
  const [message, setMessage] = useState('');

  const handleDelete = async () => {
    if (!courseId) return;

    setMessage('');

    try {
      const response = await axios.delete(
        `https://psychic-eureka-97xxw4r66wv53v96-5177.app.github.dev/api/courses/${courseId}`
      );

      if (response.status === 204) {
        setMessage('🗑️ Course deleted successfully!');
      } else {
        setMessage('⚠️ Unexpected response from server.');
      }
    } catch (error) {
      console.error('Delete error:', error);
      setMessage('❌ Failed to delete course. It may not exist.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>🗑️ Delete Course</h2>

      <input
        type="number"
        placeholder="Enter Course ID"
        value={courseId}
        onChange={(e) => setCourseId(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        required
      />

      <button onClick={handleDelete} style={{ padding: '8px 12px' }}>
        Delete Course
      </button>

      {message && (
        <p style={{ marginTop: '10px', color: message.includes('🗑️') ? 'green' : 'red' }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default DeleteCourse;
