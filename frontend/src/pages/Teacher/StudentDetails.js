import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function StudentDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [updatedData, setUpdatedData] = useState({});
    
    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/students/${id}`);
                setStudent(res.data);
            } catch (err) {
                console.error('Failed to fetch student');
            }
        };
        fetchStudent();
    }, [id]);

    const handleUpdate = async () => {
        if (window.confirm('Are you sure you want to update this student?')) {
            try {
                await axios.put(`http://localhost:5000/students/updateStudent/${id}`, updatedData);
                alert('Student updated successfully!');
                setShowPopup(false);
            } catch (error) {
                alert('Failed to update student.');
            }
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            try {
                await axios.delete(`http://localhost:5000/students/deteStudent/${id}`);
                alert('Student deleted successfully!');
                navigate('/teacher-dashboard');
            } catch (error) {
                alert('Failed to delete student.');
            }
        }
    };

    if (!student) return <p>Loading...</p>;

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Student Details</h2>
            <p><strong>Name:</strong> {student.firstName} {student.lastName}</p>
            <p><strong>Email:</strong> {student.email}</p>
            <p><strong>Address:</strong> {student.address}</p>
            <p><strong>Grade:</strong> {student.grade}</p>
            <p><strong>Mobile:</strong> {student.mobileNumber}</p>

            <div className="mt-4">
                <button 
                    className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-700"
                    onClick={() => setShowPopup(true)}
                >
                    Update
                </button>
                <button 
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                    onClick={handleDelete}
                >
                    Delete
                </button>
                <button 
                    className="bg-blue-500 text-white px-3 py-1 rounded ml-2 hover:bg-blue-700"
                    onClick={() => navigate(`/academicInfo/${id}`)}
                >
                    View Academic Information
                </button>
            </div>

            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Update Student</h2>
                        <input 
                            type="text" 
                            placeholder="First Name" 
                            defaultValue={student.firstName}
                            onChange={(e) => setUpdatedData({ ...updatedData, firstName: e.target.value })}
                            className="border p-2 mb-2 w-full"
                        />
                        <input 
                            type="text" 
                            placeholder="Last Name" 
                            defaultValue={student.lastName}
                            onChange={(e) => setUpdatedData({ ...updatedData, lastName: e.target.value })}
                            className="border p-2 mb-2 w-full"
                        />
                        <input 
                            type="email" 
                            placeholder="Email" 
                            defaultValue={student.email}
                            onChange={(e) => setUpdatedData({ ...updatedData, email: e.target.value })}
                            className="border p-2 mb-2 w-full"
                        />
                        <button 
                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700 mr-2"
                            onClick={handleUpdate}
                        >
                            Update Student
                        </button>
                        <button 
                            className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-700"
                            onClick={() => setShowPopup(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
export default StudentDetails;
