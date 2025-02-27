import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/StudentLogin.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:5000/students/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            
            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('studentId', data.studentId);
                navigate('/profile');
            } else {
                setError(data.message || 'Invalid credentials');
            }
        } catch (error) {
            setError('An error occurred. Please try again later.');
            console.error(error);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleLogin}>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <a href="/register">Sign up</a></p>
        </div>
    );
};

export default Login;
