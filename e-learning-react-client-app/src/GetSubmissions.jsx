import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GetSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get('https://psychic-eureka-97xxw4r66wv53v96-5177.app.github.dev/api/Submissions'); // 🔁 Replace with your actual endpoint
        setSubmissions(response.data);
      } catch (err) {
        console.error('❌ Failed to fetch submissions:', err.message);
        setError('Failed to load submissions.');
      }
    };

    fetchSubmissions();
  }, []);

  return (
    <div>
      <h2>All Submissions</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {submissions.length === 0 ? (
        <p>No submissions found.</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Submission ID</th>
              <th>Assessment ID</th>
              <th>Student ID</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <tr key={submission.submissionId}>
                <td>{submission.submissionId}</td>
                <td>{submission.assessmentId}</td>
                <td>{submission.studentId}</td>
                <td>{submission.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GetSubmissions;
