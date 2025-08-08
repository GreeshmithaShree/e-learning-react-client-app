import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('https://psychic-eureka-97xxw4r66wv53v96-5177.app.github.dev/api/courses');
        setCourses(response.data);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('❌ Failed to load courses.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="course-list-container">
      <h2>📚 All Courses</h2>

      {loading && <p>Loading courses...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && courses.length === 0 && <p>No courses found.</p>}

      <div className="course-grid">
        {courses.map((course) => (
          <div key={course.courseId} className="course-card">
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <a href={course.contentURl} target="_blank" rel="noopener noreferrer">🔗 View Content</a>
            <div className="instructor-info">
              <strong>Instructor:</strong> {course.instructor?.name || 'N/A'}
              <br />
              <em>{course.instructor?.email}</em>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCourses;
