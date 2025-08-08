import React, { useState } from 'react';
import axios from 'axios';

const EnrollmentDetails = () => {
  const [enrollmentId, setEnrollmentId] = useState('');
  const [enrollment, setEnrollment] = useState(null);
  const [error, setError] = useState('');

  const fetchEnrollment = async () => {
    try {
      const response = await axios.get(
        `https://psychic-eureka-97xxw4r66wv53v96-5177.app.github.dev/api/enrollment/${enrollmentId}`
      );
      setEnrollment(response.data);
      setError('');
    } catch (err) {
      console.error(err);
      setEnrollment(null);
      setError(err.response?.status === 404 ? 'Enrollment not found.' : 'Error fetching enrollment.');
    }
  };

  return (
    <div className="basic-enrollment-view">
      <h2>Lookup Enrollment</h2>
      <input
        type="number"
        placeholder="Enter Enrollment ID"
        value={enrollmentId}
        onChange={e => setEnrollmentId(e.target.value)}
      />
      <button onClick={fetchEnrollment}>Get Details</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {enrollment && (
        <div className="enrollment-summary">
          <h3>Enrollment #{enrollment.enrollmentId}</h3>
          <p><strong>Student ID:</strong> {enrollment.studentId}</p>
          <p><strong>Course ID:</strong> {enrollment.courseId}</p>
          <p><strong>Progress:</strong> {enrollment.progress}</p>
        </div>
      )}
    </div>
  );
};

export default EnrollmentDetails;
