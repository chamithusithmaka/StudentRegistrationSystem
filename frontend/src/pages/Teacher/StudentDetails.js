import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../css/stdDetails.css'

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
                navigate('/dashboard');
            } catch (error) {
                alert('Failed to delete student.');
            }
        }
    };

    if (!student) return <p>Loading...</p>;

    return (
        <div className="main">
            <button 
                className="std-back-button"
                onClick={() => navigate('/dashboard')}
            >
                &#8592; Back
            </button>

            <div className="std-container">
                

                <p className="std-profile-detail"><strong>Profile Picture:</strong></p>
                {student.profilePicture ? (
                    <img 
                        src={`data:image/jpeg;base64,${student.profilePicture}`} 
                        alt="Profile" 
                        className="std-profile-image" 
                    />
                ) : (
                    <p className="std-profile-no-picture">No profile picture uploaded.</p>
                )}

                <h2 className="std-title">Student Details</h2>
                <p><strong>Name:</strong> {student.firstName} {student.lastName}</p>
                <p><strong>Email:</strong> {student.email}</p>
                <p><strong>Address:</strong> {student.address}</p>
                <p><strong>Grade:</strong> {student.grade}</p>
                <p><strong>Mobile:</strong> {student.mobileNumber}</p>

                <div className="std-button-container">
                    <button 
                        className="std-update-button"
                        onClick={() => setShowPopup(true)}
                    >
                        Update
                    </button>
                    <button 
                        className="std-delete-button"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                    <button 
                        className="std-view-academic-button"
                        onClick={() => navigate(`/academicInfo/${id}`)}
                    >
                        View Academic Information
                    </button>
                </div>

                {showPopup && (
                    <div className="std-popup-overlay">
                        <div className="std-popup">
                            <h2 className="std-popup-title">Update Student</h2>
                            <input 
                                type="text" 
                                placeholder="First Name" 
                                defaultValue={student.firstName}
                                onChange={(e) => setUpdatedData({ ...updatedData, firstName: e.target.value })}
                                className="std-input"
                            />
                            <input 
                                type="text" 
                                placeholder="Last Name" 
                                defaultValue={student.lastName}
                                onChange={(e) => setUpdatedData({ ...updatedData, lastName: e.target.value })}
                                className="std-input"
                            />
                            <input 
                                type="email" 
                                placeholder="Email" 
                                defaultValue={student.email}
                                onChange={(e) => setUpdatedData({ ...updatedData, email: e.target.value })}
                                className="std-input"
                            />
                            <button 
                                className="std-update-student-button"
                                onClick={handleUpdate}
                            >
                                Update Student
                            </button>
                            <button 
                                className="std-cancel-button"
                                onClick={() => setShowPopup(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
</div>

    );
}
export default StudentDetails;
