import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const DeleteAssessment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirm = window.confirm('Are you sure you want to delete this assessment?');
    if (!confirm) return;

    setIsDeleting(true);
    try {
      await axios.delete(
        `https://psychic-eureka-97xxw4r66wv53v96-5177.app.github.dev/api/assessments/${id}`
      );
      setMessage('Assessment deleted successfully!');
      setTimeout(() => navigate('/assessments'), 2000);
    } catch (error) {
      console.error('Delete failed:', error);
      setMessage('Failed to delete assessment.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="delete-assessment">
      <h2>Delete Assessment</h2>
      <p>Assessment ID: {id}</p>
      <button onClick={handleDelete} disabled={isDeleting}>
        {isDeleting ? 'Deleting...' : 'Delete'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DeleteAssessment;
