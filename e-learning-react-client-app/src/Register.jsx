// import React, { useEffect, useState } from 'react';

// const CorsGreeting = () => {
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetch('https://opulent-parakeet-v655w7pjpjx929vp-5177.app.github.dev/test/greeting', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(`Server responded with ${response.status}`);
//         }
//         return response.text(); // Since your controller returns a plain string
//       })
//       .then(data => setMessage(data))
//       .catch(err => setError(err.message));
//   }, []);

//   return (
//     <div>
//       <h2>CORS Test</h2>
//       {error ? (
//         <p style={{ color: 'red' }}>Error: {error}</p>
//       ) : (
//         <p>Server says: {message}</p>
//       )}
//     </div>
//   );
// };

// export default CorsGreeting;

import React, { useState } from "react";
import "./AuthForm.css"; // ✅ Import shared CSS

function Register() {
  // const [id, setId]= useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit =  (e) => {
  e.preventDefault();
  try {
    const response =  fetch("https://opulent-parakeet-v655w7pjpjx929vp-5177.app.github.dev/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({

  "name": "pav",
  "role": "student",
  "email": "pav1@gmail.com",
  "password": "pav@123"
})
    });

    const data =  response.json();
    if (data.success) {
      setMessage("Registration successful");
    } else {
      setMessage(data.message || "Registration failed");
    }
  } catch(error) {
  console.error("Backend response:", error.response?.data || error.message);
};

};


  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Select Role</option>
            <option value="instructor">instructor</option>
            <option value="student">student</option>
          </select>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Register</button>
        </form>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Register;
