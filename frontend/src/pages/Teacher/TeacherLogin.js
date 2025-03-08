import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../css/StudentLogin.css'

 function TeacherLogin() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/teacher/login', formData);
            localStorage.setItem('token', res.data.token);
            alert('Login successful');
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Teacher Login</h2>
            {error && <p className="login-error">{error}</p>}
            <form onSubmit={handleSubmit} className="login-form">
            <div className="login-input-group">
                <input type="email" name="email" placeholder="Email" className="login-input" onChange={handleChange} required />
                </div>
                <div className="login-input-group">
                <input type="password" name="password" placeholder="Password" className="login-input" onChange={handleChange} required />
                </div>
                <div className="login-input-group">
                <button type="submit" className="login-btn">Login</button>
                </div>
                
            </form>
            <p className="login-link">Don't have an account? <a href="/signup">Sign up</a></p>
        </div>
    );
}

export default TeacherLogin;