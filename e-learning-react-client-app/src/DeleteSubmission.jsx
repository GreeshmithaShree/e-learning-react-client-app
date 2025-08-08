import React, { useState } from 'react';
import axios from 'axios';

const DeleteSubmission = () => {
  const [submissionId, setSubmissionId] = useState('');
  const [message, setMessage] = useState('');

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      await axios.delete(
        `https://psychic-eureka-97xxw4r66wv53v96-5177.app.github.dev/api/Submissions/${submissionId}`
      );
      setMessage(`✅ Submission ${submissionId} deleted successfully.`);
    } catch (error) {
      console.error('❌ Delete failed:', error.response?.data || error.message);
      setMessage(`❌ Failed to delete submission ${submissionId}.`);
    }
  };

  return (
    <form onSubmit={handleDelete}>
      <h2>Delete Submission</h2>
      <label>Submission ID: <input type="number" value={submissionId} onChange={e => setSubmissionId(e.target.value)} required /></label><br />
      <button type="submit">Delete</button>
      {message && <p style={{ marginTop: '10px' }}>{message}</p>}
    </form>
  );
};

export default DeleteSubmission;
