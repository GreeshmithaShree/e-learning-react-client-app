// src/CoursesHome.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const EnrollmentHome = () => (
  <div>
    <h2>Enrollments Section</h2>
    <ul>
      <li><Link to="/enrollment/create">Create Enrollment</Link></li>
      <li><Link to="/enrollment/:id">Get Enrollment by Id</Link></li>
      <li><Link to="/enrollment/update/:id">Update Enrollment by Id</Link></li>
      <li><Link to="/enrollment/delete/:id">Delete Enrollment by Id</Link></li>
    </ul>
  </div>
);

export default EnrollmentHome;
