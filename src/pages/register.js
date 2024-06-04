import React, { useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import registerImage from "../register.svg";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
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
      const response = await axios.post("http://192.168.1.25:8000/api/register", formData);
      setMessage(response.data.message);
      setErrors({});
      // Redirect to login page after successful registration
      setTimeout(() => navigate("/login"), 2000);
      // Reset form fields
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
      
    } catch (error) {
      if (error.response) {
        // Validation errors
        setErrors(error.response.data.errors);
      } else {
        // Other errors
        setMessage("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="mainContent">
      <Helmet>
        <title>My Finance - Register</title>
      </Helmet>
      <div className="content">
        <h1>Register In My Finance</h1>
        <div className="firstImage">
          <img src={registerImage} alt="Register" width="390px" height="329" />
        </div>
        {message && <p className="successMessage">{message}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="errorMessage">{errors.name}</p>}
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
          <input
            type="password"
            placeholder="Enter Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <p className="errorMessage">{errors.confirmPassword}</p>}
          <button type="submit" className="defaultButton">Register</button>
        </form>
        <p className="pageDescription">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
