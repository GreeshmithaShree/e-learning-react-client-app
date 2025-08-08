import React, { useState } from 'react';
import axios from 'axios';

const UpdateCourse = () => {
  const [courseId, setCourseId] = useState('');
  const [course, setCourse] = useState({
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
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('instructor.')) {
      const key = name.split('.')[1];
      setCourse((prev) => ({
        ...prev,
        instructor: {
          ...prev.instructor,
          [key]: value
        }
      }));
    } else {
      setCourse((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage('');

    const payload = {
      courseId: parseInt(courseId),
      title: course.title,
      description: course.description,
      contentURl: course.contentURl,
      instructorId: parseInt(course.instructorId),
      instructor: {
        name: course.instructor.name,
        role: course.instructor.role,
        email: course.instructor.email,
        password: course.instructor.password
      }
    };

    try {
      const response = await axios.put(
        `https://psychic-eureka-97xxw4r66wv53v96-5177.app.github.dev/api/courses/${courseId}`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 200) {
        setMessage('✅ Course updated successfully!');
      } else {
        setMessage('⚠️ Unexpected response from server.');
      }
    } catch (error) {
      console.error('Update error:', error);
      setMessage('❌ Failed to update course.');
    }
  };

  return (
    <div className="form-container">
      <h2>✏️ Update Course</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="number"
          placeholder="Course ID to Update"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          required
        />

        <input name="title" placeholder="Title" value={course.title} onChange={handleChange} required />
        <input name="description" placeholder="Description" value={course.description} onChange={handleChange} required />
        <input name="contentURl" placeholder="Content URL" value={course.contentURl} onChange={handleChange} required />
        <input name="instructorId" type="number" placeholder="Instructor ID" value={course.instructorId} onChange={handleChange} required />

        <h3>Instructor Details</h3>
        <input name="instructor.name" placeholder="Name" value={course.instructor.name} onChange={handleChange} required />
        <input name="instructor.role" placeholder="Role" value={course.instructor.role} onChange={handleChange} required />
        <input name="instructor.email" type="email" placeholder="Email" value={course.instructor.email} onChange={handleChange} required />
        <input name="instructor.password" type="password" placeholder="Password" value={course.instructor.password} onChange={handleChange} required />

        <button type="submit">Update Course</button>
      </form>

      {message && (
        <p style={{ marginTop: '10px', color: message.includes('✅') ? 'green' : 'red' }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default UpdateCourse;
