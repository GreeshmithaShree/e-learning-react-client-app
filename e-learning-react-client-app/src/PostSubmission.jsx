import React, { useState } from 'react';
import axios from 'axios';

const PostSubmission = () => {
  const [formData, setFormData] = useState({
    score: '',
    assessment: {
    //   courseId: '',
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
      const response = await axios.post(
        'https://psychic-eureka-97xxw4r66wv53v96-5177.app.github.dev/api/Submissions',
        formData
      );
      console.log('✅ Submission successful:', response.data);
    } catch (error) {
      console.error('❌ Submission failed:', error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Submit Assessment</h2>
      <label>Score:
        <input type="number" onChange={e => handleChange('score', +e.target.value)} />
      </label><br />

      <h3>Assessment Details</h3>
      <label>Max Score:
        <input type="number" onChange={e => handleChange('assessment.maxScore', +e.target.value)} />
      </label><br />
      {/* <label>Course ID:
        <input type="number" onChange={e => handleChange('assessment.course.courseId', +e.target.value)} />
      </label><br /> */}
      <label>Course Title:
        <input type="text" onChange={e => handleChange('assessment.course.title', e.target.value)} />
      </label><br />
      <label>Course Description:
        <input type="text" onChange={e => handleChange('assessment.course.description', e.target.value)} />
      </label><br />
      <label>Content URL:
        <input type="text" onChange={e => handleChange('assessment.course.contentURl', e.target.value)} />
      </label><br />

      <h3>Instructor Info</h3>
      <label>Instructor ID:
        <input type="number" onChange={e => handleChange('assessment.course.instructorId', +e.target.value)} />
      </label><br />
      <label>Instructor Name:
        <input type="text" onChange={e => handleChange('assessment.course.instructor.name', e.target.value)} />
      </label><br />
      <label>Instructor Role:
        <select onChange={e => handleChange('assessment.course.instructor.role', e.target.value)}>
          <option value="">Select Role</option>
          <option value="instructor">instructor</option>
          <option value="student">student</option>
        </select>
      </label><br />
      <label>Instructor Email:
        <input type="email" onChange={e => handleChange('assessment.course.instructor.email', e.target.value)} />
      </label><br />
      <label>Instructor Password:
        <input type="password" onChange={e => handleChange('assessment.course.instructor.password', e.target.value)} />
      </label><br />

      <h3>Student Info</h3>
      <label>Student Name:
        <input type="text" onChange={e => handleChange('student.name', e.target.value)} />
      </label><br />
      <label>Student Role:
        <select onChange={e => handleChange('student.role', e.target.value)}>
          <option value="">Select Role</option>
          <option value="student">student</option>
          <option value="instructor">instructor</option>
        </select>
      </label><br />
      <label>Student Email:
        <input type="email" onChange={e => handleChange('student.email', e.target.value)} />
      </label><br />
      <label>Student Password:
        <input type="password" onChange={e => handleChange('student.password', e.target.value)} />
      </label><br />

      <button type="submit">Submit</button>
    </form>
  );
};

export default PostSubmission;
