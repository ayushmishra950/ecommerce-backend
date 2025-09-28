import React, { useState } from "react";
import "../Css/Authentication/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`https://ecommerce-backend-qotf.onrender.com/login/?form=${JSON.stringify(formData)}`);
      if (res.status === 200) {
        localStorage.setItem('token', res.data.token);
        alert(res.data.success);
        navigate('/');
      }
    } catch (err) {
      if (err.response && err.response.status === 409) {
        alert(err.response.data);
      } else {
        alert('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          pattern="^[^@\s]+@[^@\s]+\.[^@\s]+$"
          title="Please include '@' and '.' in a valid format"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          minLength={8}
          pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@]).{8,}$"
          title="Password must be at least 8 characters long and include letters, digits, and the @ symbol."
        />
        
        {/* Forgot Password Option */}
        <p
          className="forgot-password"
          onClick={() => navigate('/forgot-password')}
          style={{ cursor: 'pointer', color: 'blue', marginTop: '10px' }}
        >
          Forgot Password?
        </p>

        <button type="submit" style={{ marginTop: '20px' }}>Login</button>
        <h2>OR</h2>
        <button type="button" onClick={() => navigate('/register')}>Register</button>
      </form>
    </div>
  );
};

export default Login;
