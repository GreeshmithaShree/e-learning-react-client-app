import React, { useState } from 'react';
import axios from 'axios';

const CourseDetails = () => {
  const [courseId, setCourseId] = useState('');
  const [course, setCourse] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFetchCourse = async () => {
    if (!courseId) return;

    setLoading(true);
    setError('');
    setCourse(null);

    try {
      // 🔗 Axios GET request to fetch course by ID
      const response = await axios.get(
        `https://psychic-eureka-97xxw4r66wv53v96-5177.app.github.dev/api/courses/${courseId}`,
        {
          headers: {
            'Accept': 'application/json'
          }
        }
      );

      // ✅ If successful, store course data
      setCourse(response.data);
    } catch (err) {
      // ❌ Handle errors (404, network issues, etc.)
      console.error('Axios error:', err);
      setError('Course not found or server error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>🔍 Get Course by ID</h2>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="number"
          placeholder="Enter Course ID"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          style={{ flex: 1, padding: '8px' }}
        />
        <button onClick={handleFetchCourse} style={{ padding: '8px 12px' }}>
          Fetch
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {course && (
        <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', background: '#f9f9f9' }}>
          <h3>{course.title}</h3>
          <p>{course.description}</p>
          <a href={course.contentURl} target="_blank" rel="noopener noreferrer">🔗 View Content</a>
          <div style={{ marginTop: '10px', fontSize: '0.9em', color: '#555' }}>
            <strong>Instructor:</strong> {course.instructor?.name || 'N/A'}<br />
            <em>{course.instructor?.email}</em>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
