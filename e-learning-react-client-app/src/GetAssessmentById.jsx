import React, { useState } from 'react';
import axios from 'axios';

const GetAssessmentById = () => {
  const [id, setId] = useState('');
  const [assessment, setAssessment] = useState(null);
  const [error, setError] = useState('');

  const fetchAssessment = async () => {
    setError('');
    setAssessment(null);

    if (!id.trim()) {
      setError('⚠️ Please enter a valid ID.');
      return;
    }

    try {
      const response = await axios.get(
        `https://psychic-eureka-97xxw4r66wv53v96-5177.app.github.dev/api/assessments/${id}`
      );
      setAssessment(response.data);
    } catch (err) {
      console.error('Axios error:', err);
      setError('❌ Could not fetch assessment. Check ID or server.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>🔍 Find Assessment by ID</h2>

      <input
        type="number"
        placeholder="Assessment ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <button onClick={fetchAssessment}>Fetch</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {assessment && (
        <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px' }}>
          <h3>📄 Assessment Details</h3>
          <p><strong>Assessment ID:</strong> {assessment.assessmentId}</p>
          <p><strong>Course ID:</strong> {assessment.courseId}</p>
          <p><strong>Max Score:</strong> {assessment.maxScore}</p>
        </div>
      )}
    </div>
  );
};

export default GetAssessmentById;
