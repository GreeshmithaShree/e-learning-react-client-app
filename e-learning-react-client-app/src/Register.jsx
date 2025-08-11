import React, { useState } from "react";
import axios from "axios"; // ✅ Import your CSS file
import './auth.css';
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://psychic-eureka-97xxw4r66wv53v96-5177.app.github.dev/api/users/register",
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
        navigate('/login');
      } else {
        setMessage(response.data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Backend response:", error.response?.data || error.message);
      setMessage("An error occurred during registration");
    }
  };
  return (
    <div className="form-container">
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
        <p>
        Already have an account?{" "}
        <button className="link-button" onClick={() => navigate("/login")}>
          Login
        </button>
      </p>
      </div>
    </div>
  );
}

export default Register;
