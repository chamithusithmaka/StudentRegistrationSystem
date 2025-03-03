import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateMarks = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [marks, setMarks] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the student marks
  useEffect(() => {
    const fetchMarks = async () => {
      try {
        console.log(id);
        const response = await axios.get(`http://localhost:5000/marks/marks/${id}`);
        setMarks(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (err) {
        setError('Unable to fetch academic information');
        setLoading(false);
      }
    };

    fetchMarks();
  }, [id]);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMarks((prevMarks) => ({
      ...prevMarks,
      marks: {
        ...prevMarks.marks,
        [name]: value,
      },
    }));
  };

  // Handle the form submission to update marks
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/marks/update/${id}`, {
        marks: marks.marks,
      });
      navigate(`/myMarks/${marks.studentId}`);
    } catch (err) {
      setError('Unable to update marks');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Update Marks</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg font-medium mb-2">Mathematics:</label>
          <input
            type="number"
            name="mathematics"
            value={marks.marks.mathematics || ''}
            onChange={handleChange}
            min="0"
            max="100"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-lg font-medium mb-2">Science:</label>
          <input
            type="number"
            name="science"
            value={marks.marks.science || ''}
            onChange={handleChange}
            min="0"
            max="100"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-lg font-medium mb-2">History:</label>
          <input
            type="number"
            name="history"
            value={marks.marks.history || ''}
            onChange={handleChange}
            min="0"
            max="100"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-lg font-medium mb-2">Buddhism:</label>
          <input
            type="number"
            name="Buddhism"
            value={marks.marks.Buddhism || ''}
            onChange={handleChange}
            min="0"
            max="100"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-lg font-medium mb-2">Sinhala:</label>
          <input
            type="number"
            name="Sinhala"
            value={marks.marks.Sinhala || ''}
            onChange={handleChange}
            min="0"
            max="100"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-lg font-medium mb-2">English:</label>
          <input
            type="number"
            name="english"
            value={marks.marks.english || ''}
            onChange={handleChange}
            min="0"
            max="100"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-lg font-medium mb-2">First Category Subject:</label>
          <input
            type="text"
            name="firstCategorySubject.subjectName"
            value={marks.marks.firstCategorySubject.subjectName || ''}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="number"
            name="firstCategorySubject.marks"
            value={marks.marks.firstCategorySubject.marks || ''}
            onChange={handleChange}
            min="0"
            max="100"
            className="w-full p-2 border border-gray-300 rounded-md mt-2"
          />
        </div>

        <div>
          <label className="block text-lg font-medium mb-2">Second Category Subject:</label>
          <input
            type="text"
            name="secondCategorySubject.subjectName"
            value={marks.marks.secondCategorySubject.subjectName || ''}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="number"
            name="secondCategorySubject.marks"
            value={marks.marks.secondCategorySubject.marks || ''}
            onChange={handleChange}
            min="0"
            max="100"
            className="w-full p-2 border border-gray-300 rounded-md mt-2"
          />
        </div>

        <div>
          <label className="block text-lg font-medium mb-2">Third Category Subject:</label>
          <input
            type="text"
            name="thirdCategorySubject.subjectName"
            value={marks.marks.thirdCategorySubject.subjectName || ''}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="number"
            name="thirdCategorySubject.marks"
            value={marks.marks.thirdCategorySubject.marks || ''}
            onChange={handleChange}
            min="0"
            max="100"
            className="w-full p-2 border border-gray-300 rounded-md mt-2"
          />
        </div>

        <div className="mt-4 flex justify-between">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Update Marks
          </button>
          <button
            type="button"
            onClick={() => navigate(`/myMarks/${marks.studentId}`)}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateMarks;
