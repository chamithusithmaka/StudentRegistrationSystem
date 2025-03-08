import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/marks.css';

const StudentMarks = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the student marks
  useEffect(() => {
    const fetchMarks = async () => {
      try {
        console.log(id);
        const response = await axios.get(`http://localhost:5000/teacher/studentmMarks/${id}`);
        setMarks(response.data);
        setLoading(false);
      } catch (err) {
        setError('Unable to fetch academic information');
        setLoading(false);
      }
    };

    fetchMarks();
  }, [id]);

  const handleAddMarks = () => {
    navigate(`/add-marks/${id}`);
  };

  const handleDelete = async (markId) => {
    try {
      await axios.delete(`http://localhost:5000/marks/delete/${markId}`);
      setMarks(marks.filter(mark => mark._id !== markId));
    } catch (err) {
      setError('Unable to delete mark');
    }
  };

  const handleUpdate = (markId) => {
    navigate(`/update-mark/${markId}`);
  };

  const handleBack = () => {
    navigate('/profile');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="marks-main-container">
      <button className="marks-back-btn" onClick={handleBack}>Back</button>
    <div className="marks-container">
      <h1 className="marks-title">Student Academic Information</h1>
      
      

      {marks.length === 0 ? (
        <p className="marks-no-info">No academic information available.</p>
      ) : (
        <div>
          {marks.map((mark, index) => (
            <div key={index} className="marks-card">
              <h2 className="marks-year-term">Year: {mark.year} - {mark.term}</h2>
              <div className="marks-grid">
                <div>
                  <p><strong>Mathematics:</strong> {mark.marks.mathematics}</p>
                  <p><strong>Science:</strong> {mark.marks.science}</p>
                  <p><strong>History:</strong> {mark.marks.history}</p>
                  <p><strong>Buddhism:</strong> {mark.marks.Buddhism}</p>
                  <p><strong>Sinhala:</strong> {mark.marks.Sinhala}</p>
                  <p><strong>English:</strong> {mark.marks.english}</p>
                </div>
                <div>
                  <p><strong>First Category Subject:</strong> {mark.marks.firstCategorySubject.subjectName} - {mark.marks.firstCategorySubject.marks}</p>
                  <p><strong>Second Category Subject:</strong> {mark.marks.secondCategorySubject.subjectName} - {mark.marks.secondCategorySubject.marks}</p>
                  <p><strong>Third Category Subject:</strong> {mark.marks.thirdCategorySubject.subjectName} - {mark.marks.thirdCategorySubject.marks}</p>
                </div>
              </div>
              <div className="marks-actions">
                <button onClick={() => handleUpdate(mark._id)} className="marks-update-btn">Update</button>
                <button onClick={() => handleDelete(mark._id)} className="marks-delete-btn">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <button className="marks-add-btn" onClick={handleAddMarks}>Add Marks</button>
    </div>
    </div>
  );
};

export default StudentMarks;
