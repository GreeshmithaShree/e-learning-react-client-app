// src/CoursesHome.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const SubmissionHome = () => (
  <div>
    <h2>Submissions Section</h2>
    <ul>
      <li><Link to="/submissions/create">Create Submission</Link></li>
      <li><Link to="/submissions/:id">Get Submission by Id</Link></li>
      <li><Link to="/submissions/update/:id">Update Submission by Id</Link></li>
      <li><Link to="/submissions/delete/:id">Delete Submission by Id</Link></li>
    </ul>
  </div>
);

export default SubmissionHome;
