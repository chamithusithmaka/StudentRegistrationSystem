import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';

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
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Teacher Dashboard - Students</h2>
            {error && <p className="text-red-500">{error}</p>}
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">First Name</th>
                        <th className="border p-2">Last Name</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Grade</th>
                        <th className="border p-2">Mobile Number</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.length > 0 ? (
                        students.map((student) => (
                            <tr key={student._id} className="text-center border">
                                <td className="border p-2">{student.firstName}</td>
                                <td className="border p-2">{student.lastName}</td>
                                <td className="border p-2">{student.email}</td>
                                <td className="border p-2">{student.grade}</td>
                                <td className="border p-2">{student.mobileNumber}</td>
                                <td className="border p-2">
                                    <button
                                        onClick={() => handleViewStudent(student._id)}
                                        className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-700"
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center p-4">No students found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default TeacherDashboard;
