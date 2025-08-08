import React, { useState } from "react";
import axios from "axios";
import "./auth.css"; // ✅ Import your CSS file

function Register() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://opulent-parakeet-v655w7pjpjx929vp-5177.app.github.dev/api/users/register",
        {
          name,
          role,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data) {
        console.log(response.data);
        setMessage("Registration successful");
      } else {
        setMessage(response.data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Backend response:", error.response?.data || error.message);
      setMessage("An error occurred during registration");
    }
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
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">Select Role</option>
            <option value="instructor">Instructor</option>
            <option value="student">Student</option>
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
