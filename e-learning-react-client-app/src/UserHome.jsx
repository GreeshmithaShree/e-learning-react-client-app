// src/CoursesHome.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const UserHome = () => (
  <div>
    <h2>Users Section</h2>
    <ul>
      <li><Link to="/user">View All Users</Link></li>
      <li><Link to="/uerse/:id">Get User by Id</Link></li>
      <li><Link to="/users/update/:id">Update User by Id</Link></li>
      <li><Link to="/users/delete/:id">Delete User by Id</Link></li>
    </ul>
  </div>
);

export default UserHome;
