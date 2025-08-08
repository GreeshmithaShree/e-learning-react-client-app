import React, { useState } from 'react';
import axios from 'axios';

const UpdateEnrollment = () => {
  const [enrollment, setEnrollment] = useState({
    enrollmentId: '',
    progress: '',
    student: {
      name: '',
      role: '',
      email: '',
      password: ''
    },
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
  });

  const [message, setMessage] = useState('');

  const handleChange = (e, path) => {
    const { name, value } = e.target;

    if (path === 'student') {
      setEnrollment(prev => ({
        ...prev,
        student: {
          ...prev.student,
          [name]: value
        }
      }));
    } else if (path === 'course') {
      setEnrollment(prev => ({
        ...prev,
        course: {
          ...prev.course,
          [name]: value
        }
      }));
    } else if (path === 'course.instructor') {
      setEnrollment(prev => ({
        ...prev,
        course: {
          ...prev.course,
          instructor: {
            ...prev.course.instructor,
            [name]: value
          }
        }
      }));
    } else {
      setEnrollment(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await axios.put(
        `https://opulent-parakeet-v655w7pjpjx929vp-5177.app.github.dev/api/enrollment/${enrollment.enrollmentId}`,
        enrollment
      );
      setMessage('✅ Enrollment updated successfully!');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      const errData = error.response?.data;
      if (typeof errData === 'string') {
        setMessage(errData);
      } else if (errData?.title) {
        setMessage(errData.title);
      } else {
        setMessage('❌ Update failed. Please check your input.');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <form onSubmit={handleSubmit}>
        <h2>Update Enrollment</h2>

        <label>Enrollment ID:</label>
        <input
          type="text"
          name="enrollmentId"
          value={enrollment.enrollmentId}
          onChange={e => handleChange(e)}
          required
        />

        <label>Progress:</label>
        <input
          type="text"
          name="progress"
          value={enrollment.progress}
          onChange={e => handleChange(e)}
          required
        />

        <h3>Student Details</h3>
        <input type="text" name="name" placeholder="Name" value={enrollment.student.name} onChange={e => handleChange(e, 'student')} required />
        <input type="text" name="role" placeholder="Role" value={enrollment.student.role} onChange={e => handleChange(e, 'student')} required />
        <input type="email" name="email" placeholder="Email" value={enrollment.student.email} onChange={e => handleChange(e, 'student')} required />
        <input type="password" name="password" placeholder="Password" value={enrollment.student.password} onChange={e => handleChange(e, 'student')} required />

        <h3>Course Details</h3>
        <input type="text" name="title" placeholder="Title" value={enrollment.course.title} onChange={e => handleChange(e, 'course')} required />
        <input type="text" name="description" placeholder="Description" value={enrollment.course.description} onChange={e => handleChange(e, 'course')} required />
        <input type="url" name="contentURl" placeholder="Content URL" value={enrollment.course.contentURl} onChange={e => handleChange(e, 'course')} required />
        <input type="number" name="instructorId" placeholder="Instructor ID" value={enrollment.course.instructorId} onChange={e => handleChange(e, 'course')} required />

        <h3>Instructor Details</h3>
        <input type="text" name="name" placeholder="Name" value={enrollment.course.instructor.name} onChange={e => handleChange(e, 'course.instructor')} required />
        <input type="text" name="role" placeholder="Role" value={enrollment.course.instructor.role} onChange={e => handleChange(e, 'course.instructor')} required />
        <input type="email" name="email" placeholder="Email" value={enrollment.course.instructor.email} onChange={e => handleChange(e, 'course.instructor')} required />
        <input type="password" name="password" placeholder="Password" value={enrollment.course.instructor.password} onChange={e => handleChange(e, 'course.instructor')} required />

        <button type="submit" style={{ marginTop: '1rem' }}>Update Enrollment</button>

        {message && (
          <p style={{ color: message.startsWith('✅') ? 'green' : 'red', marginTop: '1rem' }}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default UpdateEnrollment;
