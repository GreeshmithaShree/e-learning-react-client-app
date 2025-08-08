// Dashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Welcome to the Dashboard</h2>
      <p>Select a section to manage:</p>

      <ul>
        <li><Link to="/courses">📚 Courses</Link></li>
        <li><Link to="/assessments">📝 Assessments</Link></li>
        <li><Link to="/users">👥 Users</Link></li>
        <li><Link to="/submissions">📄 Submissions</Link></li>
        <li><Link to="/enrollments">🎓 Enrollments</Link></li>
      </ul>
    </div>
  );
};

export default Dashboard;
