// src/CoursesHome.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const CourseHome = () => (
  <div>
    <h2>Courses Section</h2>
    <ul>
      <li><Link to="/courses/create">Create Course</Link></li>
      <li><Link to="/courses">View All Courses</Link></li>
      <li><Link to="/courses/:id">Get Course by Id</Link></li>
      <li><Link to="/courses/update/:id">Update Course by Id</Link></li>
      <li><Link to="/courses/delete/:id">Delete Course by Id</Link></li>
    </ul>
  </div>
);

export default CourseHome;
