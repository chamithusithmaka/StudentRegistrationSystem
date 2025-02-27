import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Teacher Login</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="email" name="email" placeholder="Email" className="w-full p-2 border rounded" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" className="w-full p-2 border rounded" onChange={handleChange} required />
                <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">Login</button>
            </form>
            <p>Don't have an account? <a href="/signup">Sign up</a></p>
        </div>
    );
}

export default TeacherLogin;