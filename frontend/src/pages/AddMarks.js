import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/AddMarks.css';

const AddMarks = () => {
  const { id } = useParams();
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
      const response = await axios.post(
        `http://localhost:5000/marks/add/${id}`,
        { marks, year, term }
      );
      alert(response.data.message);
      navigate(`/myMarks/${id}`);
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Server error');
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="addMarks-main">
      <button className="addMarks-back-btn" onClick={handleBack}>Back</button>
    <div className="addMarks-container">
      
      <div className="addMarks-form-container">
        <h2>Add Marks</h2>
        <form onSubmit={handleSubmit} className="addMarks-form">
          {error && <div className="addMarks-error">{error}</div>}

          <div className="addMarks-select-group">
            <div className="addMarks-select">
              <label htmlFor="year">Year</label>
              <select name="year" value={year} onChange={handleSelectChange} required>
                <option value="">Select Year</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
              </select>
            </div>

            <div className="addMarks-select">
              <label htmlFor="term">Term</label>
              <select name="term" value={term} onChange={handleSelectChange} required>
                <option value="">Select Term</option>
                <option value="Term 1">Term 1</option>
                <option value="Term 2">Term 2</option>
                <option value="Term 3">Term 3</option>
              </select>
            </div>
          </div>

          <div className="addMarks-grid">
            {Object.keys(marks).slice(0, 6).map((subject) => (
              <div key={subject} className="addMarks-field">
                <label>{subject.charAt(0).toUpperCase() + subject.slice(1)}</label>
                <input
                  type="number"
                  name={subject}
                  value={marks[subject]}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  required
                />
              </div>
            ))}
          </div>

          {["firstCategorySubject", "secondCategorySubject", "thirdCategorySubject"].map((category) => (
            <div key={category} className="addMarks-category">
              <label>{category.replace(/([A-Z])/g, ' $1')}</label>
              <input
                type="text"
                name={`${category}.subjectName`}
                value={marks[category].subjectName}
                onChange={handleChange}
                placeholder="Enter subject name"
                required
              />
              <input
                type="number"
                name={`${category}.marks`}
                value={marks[category].marks}
                onChange={handleChange}
                min="0"
                max="100"
                placeholder="Enter marks"
                required
              />
            </div>
          ))}

          <button type="submit" className="addMarks-submit-btn" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Marks'}
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default AddMarks;
