import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AssessmentList = () => {
  const [assessments, setAssessments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const response = await axios.get(
          'https://psychic-eureka-97xxw4r66wv53v96-5177.app.github.dev/api/assessments'
        );
        setAssessments(response.data);
      } catch (err) {
        console.error('Error fetching assessments:', err);
        setError('❌ Failed to fetch assessments.');
      }
    };

    fetchAssessments();
  }, []);

  return (
    <div className="assessment-list">
      <h2>📋 All Assessments</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {assessments.length === 0 && !error ? (
        <p>Loading assessments...</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ borderBottom: '1px solid #ccc' }}>Assessment ID</th>
              <th style={{ borderBottom: '1px solid #ccc' }}>Course ID</th>
              <th style={{ borderBottom: '1px solid #ccc' }}>Max Score</th>
            </tr>
          </thead>
          <tbody>
            {assessments.map((a) => (
              <tr key={a.assessmentId}>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{a.assessmentId}</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{a.courseId}</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{a.maxScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AssessmentList;
