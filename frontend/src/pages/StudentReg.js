import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/studentreg.css'; // Using the same theme as the login page
import studentImage from '../images/student.jpg'; // Importing the image

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    age: '',
    grade: '',
    mobileNumber: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (isNaN(formData.age) || formData.age < 18) {
      setError('Age must be numeric and greater than 18');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/students/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        setSuccess('Student registered successfully!');
        setTimeout(() => navigate('/'), 2000); // Redirect after success
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="register-container">
  <div className="register-form-container">
    <form onSubmit={handleRegister} className="register-form">
      <h2 className="register-title">Student Registration</h2>
      {error && <p className="register-error-message">{error}</p>}
      {success && <p className="register-success-message">{success}</p>}

      <div className="input-group first-name-input-group">
        <label className="register-input-label">First Name</label>
        <input type="text" className="input-field first-name-input-field" name="firstName" value={formData.firstName} onChange={handleChange} required />
      </div>

      <div className="input-group last-name-input-group">
        <label className="register-input-label">Last Name</label>
        <input type="text" className="input-field last-name-input-field" name="lastName" value={formData.lastName} onChange={handleChange} required />
      </div>

      <div className="input-group email-input-group">
        <label className="register-input-label">Email</label>
        <input type="email" className="input-field email-input-field" name="email" value={formData.email} onChange={handleChange} required />
      </div>

      <div className="input-group address-input-group">
        <label className="register-input-label">Address</label>
        <input type="text" className="input-field address-input-field" name="address" value={formData.address} onChange={handleChange} required />
      </div>

      <div className="input-group age-input-group">
        <label className="register-input-label">Age</label>
        <input type="number" className="input-field age-input-field" name="age" value={formData.age} onChange={handleChange} required />
      </div>

      <div className="input-group grade-input-group">
        <label className="register-input-label">Grade</label>
        <input type="text" className="input-field grade-input-field" name="grade" value={formData.grade} onChange={handleChange} required />
      </div>

      <div className="input-group mobile-number-input-group">
        <label className="register-input-label">Mobile Number</label>
        <input type="text" className="input-field mobile-number-input-field" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} required />
      </div>

      <div className="input-group password-input-group">
        <label className="register-input-label">Password</label>
        <input type="password" className="input-field password-input-field" name="password" value={formData.password} onChange={handleChange} required />
      </div>

      <button type="submit" className="register-btn">Register</button>
      <p className="register-link">Already have an account? 
        <span onClick={() => navigate('/')} className="register-link-text">Login here</span>
      </p>
    </form>
  </div>

  <div className="image-container">
    <div className="image-card">
      <img src={studentImage} alt="Student" className="image-card-img" />
    </div>
  </div>
</div>


  );
};

export default Register;
