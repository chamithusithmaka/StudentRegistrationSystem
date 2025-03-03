import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const AddMarks = () => {
  const { id } = useParams(); // Extract the student ID from the URL params
  const navigate = useNavigate();
  
  const [marks, setMarks] = useState({
    mathematics: '',
    science: '',
    history: '',
    Buddhism: '',
    Sinhala: '',
    english: '',
    firstCategorySubject: { subjectName: '', marks: '' },
    secondCategorySubject: { subjectName: '', marks: '' },
    thirdCategorySubject: { subjectName: '', marks: '' },
  });

  const [year, setYear] = useState('');
  const [term, setTerm] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('firstCategorySubject') || name.includes('secondCategorySubject') || name.includes('thirdCategorySubject')) {
      const [category, field] = name.split('.');
      setMarks((prevMarks) => ({
        ...prevMarks,
        [category]: {
          ...prevMarks[category],
          [field]: value,
        },
      }));
    } else {
      setMarks({ ...marks, [name]: value });
    }
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    if (name === 'year') {
      setYear(value);
    } else if (name === 'term') {
      setTerm(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Pass year and term in the request body along with the marks
      const response = await axios.post(
        `http://localhost:5000/marks/add/${id}`,
        { marks, year, term } // Include year and term in the body
      );
      alert(response.data.message);  // Display success message
      navigate(`/myMarks/${id}`);  // Redirect back to the student page (or any other page you want)
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Server error');
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Add Marks for Student {id}</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        
        {/* Year Select */}
        <div className="form-group">
          <label htmlFor="year">Year</label>
          <select
            name="year"
            value={year}
            onChange={handleSelectChange}
            className="form-control"
            required
          >
            <option value="">Select Year</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            {/* Add more years as needed */}
          </select>
        </div>

        {/* Term Select */}
        <div className="form-group">
          <label htmlFor="term">Term</label>
          <select
            name="term"
            value={term}
            onChange={handleSelectChange}
            className="form-control"
            required
          >
            <option value="">Select Term</option>
            <option value="Term 1">Term 1</option>
            <option value="Term 2">Term 2</option>
            <option value="Term 3">Term 3</option>
          </select>
        </div>

        {/* Marks Inputs */}
        <div className="form-group">
          <label>Mathematics</label>
          <input
            type="number"
            name="mathematics"
            value={marks.mathematics}
            onChange={handleChange}
            min="0"
            max="100"
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label>Science</label>
          <input
            type="number"
            name="science"
            value={marks.science}
            onChange={handleChange}
            min="0"
            max="100"
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label>History</label>
          <input
            type="number"
            name="history"
            value={marks.history}
            onChange={handleChange}
            min="0"
            max="100"
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label>Buddhism</label>
          <input
            type="number"
            name="Buddhism"
            value={marks.Buddhism}
            onChange={handleChange}
            min="0"
            max="100"
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label>Sinhala</label>
          <input
            type="number"
            name="Sinhala"
            value={marks.Sinhala}
            onChange={handleChange}
            min="0"
            max="100"
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label>English</label>
          <input
            type="number"
            name="english"
            value={marks.english}
            onChange={handleChange}
            min="0"
            max="100"
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label>First Category Subject</label>
          <input
            type="text"
            name="firstCategorySubject.subjectName"
            value={marks.firstCategorySubject.subjectName}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter subject name"
            required
          />
          <input
            type="number"
            name="firstCategorySubject.marks"
            value={marks.firstCategorySubject.marks}
            onChange={handleChange}
            min="0"
            max="100"
            className="form-control"
            placeholder="Enter marks"
            required
          />
        </div>

        <div className="form-group">
          <label>Second Category Subject</label>
          <input
            type="text"
            name="secondCategorySubject.subjectName"
            value={marks.secondCategorySubject.subjectName}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter subject name"
            required
          />
          <input
            type="number"
            name="secondCategorySubject.marks"
            value={marks.secondCategorySubject.marks}
            onChange={handleChange}
            min="0"
            max="100"
            className="form-control"
            placeholder="Enter marks"
            required
          />
        </div>

        <div className="form-group">
          <label>Third Category Subject</label>
          <input
            type="text"
            name="thirdCategorySubject.subjectName"
            value={marks.thirdCategorySubject.subjectName}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter subject name"
            required
          />
          <input
            type="number"
            name="thirdCategorySubject.marks"
            value={marks.thirdCategorySubject.marks}
            onChange={handleChange}
            min="0"
            max="100"
            className="form-control"
            placeholder="Enter marks"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Marks'}
        </button>
      </form>
    </div>
  );
};

export default AddMarks;
