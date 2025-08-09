// Dashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Welcome to the Dashboard</h2>
      <p>Select a section to manage:</p>

      <ul>
        <li><Link to="/user">👥 Users</Link></li>
        <li><Link to="/course">📚 Courses</Link></li>
        <li><Link to="/assessment">📝 Assessments</Link></li>
        <li><Link to="/enrollment">🎓 Enrollments</Link></li>
        <li><Link to="/submission">📄 Submissions</Link></li>
      </ul>
    </div>
  );
};

export default Dashboard;
