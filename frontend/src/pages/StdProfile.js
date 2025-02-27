import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/profile.css';

const StudentProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);
    const [error, setError] = useState('');
    const studentId = localStorage.getItem('studentId');
    const token = localStorage.getItem('token');

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        age: '',
        grade: '',
        mobileNumber: '',
        profilePicture: ''
    });

    const [isEditing, setIsEditing] = useState(false);

    // Fetch student profile and profile picture
    useEffect(() => {
        if (!studentId) {
            setError('No student ID found. Please log in again.');
            return;
        }

        const fetchStudentProfile = async () => {
            try {
                const response = await fetch(`http://localhost:5000/students/${studentId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                const data = await response.json();
                if (response.ok) {
                    setStudent(data);
                    setFormData({
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                        address: data.address,
                        age: data.age,
                        grade: data.grade,
                        mobileNumber: data.mobileNumber,
                        profilePicture: data.profilePicture || ''
                    });
                } else {
                    setError(data.message || 'Failed to load profile');
                }
            } catch (error) {
                console.error(error);
                setError('An error occurred. Please try again later.');
            }
        };

        fetchStudentProfile();
    }, [studentId, token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Update student profile with confirmation
    const handleUpdate = async () => {
        const confirmUpdate = window.confirm('Are you sure you want to update your profile?');
        if (!confirmUpdate) return;

        try {
            const response = await fetch(`http://localhost:5000/students/updateStudent/${studentId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (response.ok) {
                setStudent(data);
                setIsEditing(false);
            } else {
                setError(data.message || 'Failed to update profile');
            }
        } catch (error) {
            console.error(error);
            setError('An error occurred while updating the profile.');
        }
    };

    // Delete student profile with confirmation
    const handleDelete = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this profile?');
        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://localhost:5000/students/deteStudent/${studentId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            if (response.ok) {
                alert('Profile deleted successfully');
                localStorage.removeItem('studentId');
                // Redirect or perform further actions after deletion
            } else {
                setError(data.message || 'Failed to delete profile');
            }
        } catch (error) {
            console.error(error);
            setError('An error occurred while deleting the profile.');
        }
    };

    // Upload profile picture
    const handleProfilePictureUpload = async (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = async () => {
            const base64Image = reader.result.split(',')[1]; // Extract base64 string without data:image/png;base64,

            try {
                const response = await fetch(`http://localhost:5000/profilpic/uploadProfilePicture/${studentId}`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ profilePicture: base64Image })
                });

                const data = await response.json();
                if (response.ok) {
                    setStudent(data.student);
                    setFormData(prev => ({
                        ...prev,
                        profilePicture: data.student.profilePicture
                    }));
                } else {
                    setError(data.message || 'Failed to upload profile picture');
                }
            } catch (error) {
                console.error(error);
                setError('An error occurred while uploading the profile picture.');
            }
        };

        if (file) {
            reader.readAsDataURL(file); // Start the base64 conversion
        }
    };

    // Delete profile picture
    const handleDeleteProfilePicture = async () => {
        const confirmDeletePicture = window.confirm('Are you sure you want to delete your profile picture?');
        if (!confirmDeletePicture) return;

        try {
            const response = await fetch(`http://localhost:5000/profilpic/deleteProfilePicture/${studentId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            if (response.ok) {
                setStudent(data.student);
                setFormData(prev => ({
                    ...prev,
                    profilePicture: ''
                }));
            } else {
                setError(data.message || 'Failed to delete profile picture');
            }
        } catch (error) {
            console.error(error);
            setError('An error occurred while deleting the profile picture.');
        }
    };

    if (error) return <p>{error}</p>;
    if (!student) return <p>Loading...</p>;

    return (
        <div className="profile-container">
            <h2 className="profile-title">Student Profile</h2>
            <p className="profile-detail"><strong>Name:</strong> 
                {isEditing ? 
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="input-field" /> 
                    : student.firstName} 
                {isEditing ? 
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="input-field" /> 
                    : student.lastName}
            </p>
            <p className="profile-detail"><strong>Email:</strong> 
                {isEditing ? 
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="input-field" /> 
                    : student.email}
            </p>
            <p className="profile-detail"><strong>Age:</strong> 
                {isEditing ? 
                    <input type="number" name="age" value={formData.age} onChange={handleChange} className="input-field" /> 
                    : student.age}
            </p>
            <p className="profile-detail"><strong>Address:</strong> 
                {isEditing ? 
                    <input type="text" name="address" value={formData.address} onChange={handleChange} className="input-field" /> 
                    : student.address}
            </p>
            <p className="profile-detail"><strong>Grade:</strong> 
                {isEditing ? 
                    <input type="text" name="grade" value={formData.grade} onChange={handleChange} className="input-field" /> 
                    : student.grade}
            </p>
            <p className="profile-detail"><strong>Mobile Number:</strong> 
                {isEditing ? 
                    <input type="text" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} className="input-field" /> 
                    : student.mobileNumber}
            </p>

            <p className="profile-detail"><strong>Profile Picture:</strong></p>
            {student.profilePicture ? (
                <img src={`data:image/jpeg;base64,${student.profilePicture}`} alt="Profile" className="profile-image" />
            ) : (
                <p className="no-picture">No profile picture uploaded.</p>
            )}
            <input type="file" onChange={handleProfilePictureUpload} className="file-upload" />
            <button onClick={handleDeleteProfilePicture} className="delete-button">Delete Profile Picture</button>

            {isEditing ? (
                <div className="action-buttons">
                    <button onClick={handleUpdate} className="update-button">Update Profile</button>
                    <button onClick={() => setIsEditing(false)} className="cancel-button">Cancel</button>
                </div>
            ) : (
                <div className="action-buttons">
                    <button onClick={() => setIsEditing(true)} className="edit-button">Edit Profile</button>
                    <button onClick={handleDelete} className="delete-button">Delete Profile</button>
                </div>

                
            )}
            <button 
                    className="bg-blue-500 text-white px-3 py-1 rounded ml-2 hover:bg-blue-700"
                    onClick={() => navigate(`/academicInfo/${id}`)}
                >
                    View Academic Information
                </button>
        </div>
    );
};

export default StudentProfile;
