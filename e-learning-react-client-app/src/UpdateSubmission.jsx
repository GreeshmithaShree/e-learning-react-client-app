import React, { useState } from 'react';
import axios from 'axios';

const UpdateSubmission = () => {
  const [formData, setFormData] = useState({
    submissionId: '',
    score: '',
    assessment: {
        courseId:'',
      maxScore: '',
      course: {
        title: '',
        description: '',
        contentURl: '',
        instructorId: '',
        instructor: {
          name: '',
          role: '',
          email: '',
          password: ''
        }
      }
    },
    student: {
      name: '',
      role: '',
      email: '',
      password: ''
    }
  });

  const [message, setMessage] = useState('');

  const handleChange = (path, value) => {
    const keys = path.split('.');
    setFormData(prev => {
      const updated = { ...prev };
      let current = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://psychic-eureka-97xxw4r66wv53v96-5177.app.github.dev/api/Submissions/${formData.submissionId}`,
        {
          ...formData,
          submissionId: parseInt(formData.submissionId),
          score: parseInt(formData.score),
          assessment: {
            ...formData.assessment,
            courseId: parseInt(formData.assessment.courseId),
            maxScore: parseInt(formData.assessment.maxScore),
            course: {
              ...formData.assessment.course,
              instructorId: parseInt(formData.assessment.course.instructorId)
            }
          }
        }
      );
      setMessage('✅ Submission updated successfully!');
    } catch (error) {
      console.error('❌ Update failed:', error.response?.data || error.message);
      setMessage('❌ Failed to update submission.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Submission</h2>
      <label>Submission ID: <input type="number" value={formData.submissionId} onChange={e => handleChange('submissionId', e.target.value)} /></label><br />
      <label>Score: <input type="number" value={formData.score} onChange={e => handleChange('score', e.target.value)} /></label><br />

      <h3>Assessment</h3>
      <label>Course ID: <input type="number" value={formData.assessment.courseId} onChange={e => handleChange('assessment.courseId', e.target.value)} /></label><br />
      <label>Max Score: <input type="number" value={formData.assessment.maxScore} onChange={e => handleChange('assessment.maxScore', e.target.value)} /></label><br />

      <h3>Course</h3>
      <label>Title: <input type="text" value={formData.assessment.course.title} onChange={e => handleChange('assessment.course.title', e.target.value)} /></label><br />
      <label>Description: <input type="text" value={formData.assessment.course.description} onChange={e => handleChange('assessment.course.description', e.target.value)} /></label><br />
      <label>Content URL: <input type="text" value={formData.assessment.course.contentURl} onChange={e => handleChange('assessment.course.contentURl', e.target.value)} /></label><br />
      <label>Instructor ID: <input type="number" value={formData.assessment.course.instructorId} onChange={e => handleChange('assessment.course.instructorId', e.target.value)} /></label><br />

      <h3>Instructor</h3>
      <label>Name: <input type="text" value={formData.assessment.course.instructor.name} onChange={e => handleChange('assessment.course.instructor.name', e.target.value)} /></label><br />
      <label>Role: <input type="text" value={formData.assessment.course.instructor.role} onChange={e => handleChange('assessment.course.instructor.role', e.target.value)} /></label><br />
      <label>Email: <input type="email" value={formData.assessment.course.instructor.email} onChange={e => handleChange('assessment.course.instructor.email', e.target.value)} /></label><br />
      <label>Password: <input type="password" value={formData.assessment.course.instructor.password} onChange={e => handleChange('assessment.course.instructor.password', e.target.value)} /></label><br />

      <h3>Student</h3>
      <label>Name: <input type="text" value={formData.student.name} onChange={e => handleChange('student.name', e.target.value)} /></label><br />
      <label>Role: <input type="text" value={formData.student.role} onChange={e => handleChange('student.role', e.target.value)} /></label><br />
      <label>Email: <input type="email" value={formData.student.email} onChange={e => handleChange('student.email', e.target.value)} /></label><br />
      <label>Password: <input type="password" value={formData.student.password} onChange={e => handleChange('student.password', e.target.value)} /></label><br />

      <button type="submit">Update Submission</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default UpdateSubmission;
