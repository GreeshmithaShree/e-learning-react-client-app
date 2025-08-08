import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://psychic-eureka-97xxw4r66wv53v96-5177.app.github.dev/api/users');
        setUsers(response.data);
        setMessage('✅ Users loaded successfully.');
      } catch (error) {
        setMessage('❌ Failed to fetch users.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="user-list-container">
      <h2>All Users</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {message && (
            <p style={{ color: message.includes('✅') ? 'green' : 'red' }}>{message}</p>
          )}
          <table>
            <thead>
              <tr>
                <th>ID</th><th>Name</th><th>Email</th><th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.userId}>
                <td>{user.userId}</td><td>{user.name}</td><td>{user.email}</td><td>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default UserList;
