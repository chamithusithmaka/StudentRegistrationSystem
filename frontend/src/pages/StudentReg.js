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
    <div className="reg-container">
        <div className="reg-form-container">
          <form onSubmit={handleRegister} className="reg-form">
            <h2 className="reg-title">Student Registration</h2>
            {error && <p className="reg-error">{error}</p>}
            {success && <p className="reg-success">{success}</p>}

            <div className="reg-input-group">
              <label className="reg-label">First Name</label>
              <input type="text" className="reg-input" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </div>

            <div className="reg-input-group">
              <label className="reg-label">Last Name</label>
              <input type="text" className="reg-input" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </div>

            <div className="reg-input-group">
              <label className="reg-label">Email</label>
              <input type="email" className="reg-input" name="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="reg-input-group">
              <label className="reg-label">Address</label>
              <input type="text" className="reg-input" name="address" value={formData.address} onChange={handleChange} required />
            </div>

            <div className="reg-input-group">
              <label className="reg-label">Age</label>
              <input type="number" className="reg-input" name="age" value={formData.age} onChange={handleChange} required />
            </div>

            <div className="reg-input-group">
              <label className="reg-label">Grade</label>
              <input type="text" className="reg-input" name="grade" value={formData.grade} onChange={handleChange} required />
            </div>

            <div className="reg-input-group">
              <label className="reg-label">Mobile Number</label>
              <input type="text" className="reg-input" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} required />
            </div>

            <div className="reg-input-group">
              <label className="reg-label">Password</label>
              <input type="password" className="reg-input" name="password" value={formData.password} onChange={handleChange} required />
            </div>

            <button type="submit" className="reg-btn">Register</button>
            <p className="reg-link">Already have an account? 
              <span onClick={() => navigate('/')} className="reg-link-text">Login here</span>
            </p>
          </form>
        </div>
    </div>




  );
};

export default Register;
