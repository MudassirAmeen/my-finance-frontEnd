import React, { useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import loginImage from "../login.svg";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://192.168.1.25:8000/api/login", formData);
      localStorage.setItem('loginToken', response.data.token);
      localStorage.setItem('userId', response.data.user.hashed_id);
      localStorage.setItem('name', response.data.user.name);
      setMessage("Logged in successfully!");
      setErrors({});
      // Redirect to home page after successful login
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      if (error.response) {
        // Validation errors or other errors
        setErrors(error.response.data.errors || { general: error.response.data.message });
      } else {
        // Network errors or other unexpected errors
        setMessage("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="mainContent">
      <Helmet>
        <title>My Finance - Login</title>
      </Helmet>
      <div className="content">
        <h1>Login Into Your Account</h1>
        <div className="firstImage">
          <img src={loginImage} alt="Login" width="390px" height="329" />
        </div>
        {message && <p className="successMessage">{message}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="errorMessage">{errors.email}</p>}
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="errorMessage">{errors.password}</p>}
          {errors.general && <p className="errorMessage">{errors.general}</p>}
          <button type="submit" className="defaultButton">Login</button>
        </form>
        <p className="pageDescription">Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
}
