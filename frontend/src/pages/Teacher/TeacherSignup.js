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
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Teacher Signup</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="firstName" placeholder="First Name" className="w-full p-2 border rounded" onChange={handleChange} required />
                <input type="text" name="lastName" placeholder="Last Name" className="w-full p-2 border rounded" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" className="w-full p-2 border rounded" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" className="w-full p-2 border rounded" onChange={handleChange} required />
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Sign Up</button>
            </form>
            <p className="register-link">Already have an account? 
        <span onClick={() => navigate('/login')} className="register-link-text">Login here</span>
      </p>
        </div>
    );
}

export default TeacherSignup;