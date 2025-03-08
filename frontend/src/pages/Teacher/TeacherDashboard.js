import { useEffect, useState } from 'react';
import { useNavigate  } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import '../../css/dashboard.css'

function TeacherDashboard() {
    const [students, setStudents] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize navigate function

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const res = await axios.get('http://localhost:5000/students');
                setStudents(res.data);
            } catch (err) {
                setError('Failed to fetch students');
            }
        };
        fetchStudents();
    }, []);

    // Function to navigate to student details page
    const handleViewStudent = (id) => {
        navigate(`/student/${id}`); // Redirects to the student details page
    };

    return (
        <div className="dash-main">
            <button className="logout" onClick={() => navigate('/login')}>
                Logout
            </button>
        <div className="teacher-dashboard">
            <h2 className="teacher-dashboard-title">Teacher Dashboard - Students</h2>
            {error && <p className="error-text">{error}</p>}
            <table className="students-table">
                <thead>
                    <tr className="students-table-header">
                        <th className="students-table-cell">First Name</th>
                        <th className="students-table-cell">Last Name</th>
                        <th className="students-table-cell">Email</th>
                        <th className="students-table-cell">Grade</th>
                        <th className="students-table-cell">Mobile Number</th>
                        <th className="students-table-cell">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.length > 0 ? (
                        students.map((student) => (
                            <tr key={student._id} className="students-table-row">
                                <td className="students-table-cell">{student.firstName}</td>
                                <td className="students-table-cell">{student.lastName}</td>
                                <td className="students-table-cell">{student.email}</td>
                                <td className="students-table-cell">{student.grade}</td>
                                <td className="students-table-cell">{student.mobileNumber}</td>
                                <td className="students-table-cell">
                                    <button
                                        onClick={() => handleViewStudent(student._id)}
                                        className="view-button"
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="no-students-text">No students found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        </div>

    );
}

export default TeacherDashboard;
