import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

 function TeacherSignup() {
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/teacher/signup', formData);
            alert(res.data.message);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed');
        }
    };

    return (
        <div className="reg-container">
            <div className="reg-form-container">
            {error && <p className="reg-error">{error}</p>}
            <form onSubmit={handleSubmit} className="reg-form">
            <h2 className="reg-title">Teacher Signup</h2>
            <div className="reg-form-container">
                <input type="text" name="firstName" placeholder="First Name" className="reg-input" onChange={handleChange} required />
                </div>
                <div className="reg-form-container">
                <input type="text" name="lastName" placeholder="Last Name" className="reg-input" onChange={handleChange} required />
                </div>
                <div className="reg-form-container">
                <input type="email" name="email" placeholder="Email" className="reg-input" onChange={handleChange} required />
                </div><div className="reg-form-container">
                <input type="password" name="password" placeholder="Password" className="reg-input" onChange={handleChange} required />
                </div>
                <button type="submit" className="reg-btn">Sign Up</button>
            </form>
            </div>
            <p className="reg-link">Already have an account? 
              <span onClick={() => navigate('/login')} className="reg-link-text">Login here</span>
            </p>
        </div>
    );
}

export default TeacherSignup;