import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentMarks = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Replacing useHistory with useNavigate
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

  // Handle delete operation
  const handleDelete = async (markId) => {
    try {
      await axios.delete(`http://localhost:5000/marks/delete/${markId}`);
      setMarks(marks.filter(mark => mark._id !== markId)); // Remove the deleted mark from the state
    } catch (err) {
      setError('Unable to delete mark');
    }
  };

  // Handle update operation
  const handleUpdate = (markId) => {
    navigate(`/update-mark/${markId}`); // Use navigate to redirect to the update page
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Student Academic Information</h1>
      {marks.length === 0 ? (
        <p>No academic information available.</p>
      ) : (
        <div>
          {marks.map((mark, index) => (
            <div key={index} className="mb-4 p-4 border border-gray-300 rounded-md">
              <h2 className="text-xl font-semibold">Year: {mark.year} - {mark.term}</h2>
              <div className="grid grid-cols-2 gap-4 mt-2">
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
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleUpdate(mark._id)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(mark._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
                
              </div>
            </div>
          ))}
        </div>
      )}
      <button className="btn btn-primary" onClick={handleAddMarks}>Add Marks</button>
    </div>
  );
};

export default StudentMarks;
