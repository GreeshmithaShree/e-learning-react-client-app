import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateEnrollment = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const [enrollment, setEnrollment] = useState({
    courseId: '',
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
      const response = await axios.post(
        'https://psychic-eureka-97xxw4r66wv53v96-5177.app.github.dev/api/enrollment',
        enrollment
      );
      setMessage('Enrollment successful!');
      console.log(response.data);
      setTimeout(() => navigate('/enrollments'), 2000);
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      setMessage(error.response?.data || 'Enrollment failed.');
    }
  };

  return (
    <div className="create-enrollment-page">
      <form onSubmit={handleSubmit}>
        <h2>Enroll Student</h2>

        <label>Course ID:</label>
        <input type="number" name="courseId" value={enrollment.courseId} onChange={e => handleChange(e)} required />

        <label>Progress:</label>
        <input type="text" name="progress" value={enrollment.progress} onChange={e => handleChange(e)} required />

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

        <button type="submit">Enroll</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default CreateEnrollment;
