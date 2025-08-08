import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateAssessment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [assessment, setAssessment] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const response = await axios.get(
          `https://psychic-eureka-97xxw4r66wv53v96-5177.app.github.dev/api/assessments/${id}`
        );
        setAssessment(response.data);
      } catch (error) {
        console.error('Error fetching assessment:', error);
        setMessage('Assessment not found.');
      }
    };

    fetchAssessment();
  }, [id]);

  const handleChange = (e, path) => {
    const { name, value } = e.target;

    if (path === 'course.instructor') {
      setAssessment(prev => ({
        ...prev,
        course: {
          ...prev.course,
          instructor: {
            ...prev.course.instructor,
            [name]: value
          }
        }
      }));
    } else if (path === 'course') {
      setAssessment(prev => ({
        ...prev,
        course: {
          ...prev.course,
          [name]: value
        }
      }));
    } else {
      setAssessment(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://psychic-eureka-97xxw4r66wv53v96-5177.app.github.dev/api/assessments/${id}`,
        assessment
      );
      setMessage('Assessment updated successfully!');
      setTimeout(() => navigate('/assessments'), 2000);
    } catch (error) {
      console.error('Update failed:', error);
      setMessage('Failed to update assessment.');
    }
  };

  if (!assessment) return <p>Loading assessment...</p>;

  return (
    <div className="update-full-assessment">
      <h2>Update Full Assessment</h2>
      <form onSubmit={handleSubmit}>
        <label>Max Score:</label>
        <input type="number" name="maxScore" value={assessment.maxScore} onChange={e => handleChange(e)} required />

        <h3>Course Details</h3>
        <label>Title:</label>
        <input type="text" name="title" value={assessment.course?.title || ''} onChange={e => handleChange(e, 'course')} required />

        <label>Description:</label>
        <input type="text" name="description" value={assessment.course?.description || ''} onChange={e => handleChange(e, 'course')} required />

        <label>Content URL:</label>
        <input type="url" name="contentURl" value={assessment.course?.contentURl || ''} onChange={e => handleChange(e, 'course')} required />

        <label>Instructor ID:</label>
        <input type="number" name="instructorId" value={assessment.course?.instructorId || 0} onChange={e => handleChange(e, 'course')} required />

        <h3>Instructor Details</h3>
        <label>Name:</label>
        <input type="text" name="name" value={assessment.course?.instructor?.name || ''} onChange={e => handleChange(e, 'course.instructor')} required />

        <label>Role:</label>
        <input type="text" name="role" value={assessment.course?.instructor?.role || ''} onChange={e => handleChange(e, 'course.instructor')} required />

        <label>Email:</label>
        <input type="email" name="email" value={assessment.course?.instructor?.email || ''} onChange={e => handleChange(e, 'course.instructor')} required />

        <label>Password:</label>
        <input type="password" name="password" value={assessment.course?.instructor?.password || ''} onChange={e => handleChange(e, 'course.instructor')} required />

        <button type="submit">Update Assessment</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default UpdateAssessment;
