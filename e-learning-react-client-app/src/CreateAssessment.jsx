import React, { useState } from 'react';
import axios from 'axios';

const CreateAssessment = () => {
  const [assessment, setAssessment] = useState({
    maxScore: '',
    course: {
      title: '',
      description: '',
      contentURl: '',
      instructorId: '',
      instructor: {
        name: '',
        role: 'instructor',
        email: '',
        password: ''
      }
    }
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('course.instructor.')) {
      const key = name.split('.')[2];
      setAssessment((prev) => ({
        ...prev,
        course: {
          ...prev.course,
          instructor: {
            ...prev.course.instructor,
            [key]: value
          }
        }
      }));
    } else if (name.startsWith('course.')) {
      const key = name.split('.')[1];
      setAssessment((prev) => ({
        ...prev,
        course: {
          ...prev.course,
          [key]: value
        }
      }));
    } else {
      setAssessment((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const payload = {
      maxScore: parseInt(assessment.maxScore),
      course: {
        title: assessment.course.title,
        description: assessment.course.description,
        contentURl: assessment.course.contentURl,
        instructorId: parseInt(assessment.course.instructorId),
        instructor: {
          name: assessment.course.instructor.name,
          role: assessment.course.instructor.role,
          email: assessment.course.instructor.email,
          password: assessment.course.instructor.password
        }
      }
    };

    try {
      const response = await axios.post(
        'https://psychic-eureka-97xxw4r66wv53v96-5177.app.github.dev/api/assessments',
        payload,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 201) {
        setMessage('✅ Assessment created successfully!');
      } else {
        setMessage('⚠️ Unexpected response from server.');
      }
    } catch (error) {
      console.error('Error creating assessment:', error);
      setMessage('❌ Failed to create assessment.');
    }
  };

  return (
    <div className="form-container">
      <h2>Create Assessment</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="maxScore"
          type="number"
          placeholder="Max Score"
          value={assessment.maxScore}
          onChange={handleChange}
          required
        />

        <h3>Course Details</h3>
        <input name="course.title" placeholder="Title" value={assessment.course.title} onChange={handleChange} required />
        <input name="course.description" placeholder="Description" value={assessment.course.description} onChange={handleChange} required />
        <input name="course.contentURl" placeholder="Content URL" value={assessment.course.contentURl} onChange={handleChange} required />
        <input name="course.instructorId" type="number" placeholder="Instructor ID" value={assessment.course.instructorId} onChange={handleChange} required />

        <h3>Instructor Details</h3>
        <input name="course.instructor.name" placeholder="Name" value={assessment.course.instructor.name} onChange={handleChange} required />
        <input name="course.instructor.role" placeholder="Role" value={assessment.course.instructor.role} onChange={handleChange} required />
        <input name="course.instructor.email" type="email" placeholder="Email" value={assessment.course.instructor.email} onChange={handleChange} required />
        <input name="course.instructor.password" type="password" placeholder="Password" value={assessment.course.instructor.password} onChange={handleChange} required />

        <button type="submit">Create Assessment</button>
      </form>

      {message && (
        <p style={{ marginTop: '10px', color: message.includes('✅') ? 'green' : 'red' }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default CreateAssessment;
