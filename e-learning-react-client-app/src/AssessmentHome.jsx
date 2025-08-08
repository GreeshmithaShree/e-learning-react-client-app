// src/CoursesHome.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const AssessmentHome = () => (
  <div>
    <h2>Assessment Section</h2>
    <ul>
      <li><Link to="/assessments/create">Create Assessment</Link></li>
      <li><Link to="/assessment">View All Assessments</Link></li>
      <li><Link to="/assessments/:id">Get Assessment by Id</Link></li>
      <li><Link to="/assessments/update/:id">Update Assessment by Id</Link></li>
      <li><Link to="/assessments/delete/:id">Delete Assessment by Id</Link></li>
    </ul>
  </div>
);

export default AssessmentHome;
