import express from 'express';
import Marks from '../models/subjects.js'; // Make sure the path is correct
import { verifyToken } from '../middleware/authMiddleware.js'; // Assuming you have auth middleware to verify JWT

const router = express.Router();

// Route to add marks for a student(http://localhost:5000/marks/add/:studentid/:year/:term)
router.post('/add/:studentId/:year/:term', verifyToken, async (req, res) => {
    const { studentId, year, term } = req.params;
    const { marks } = req.body; // Marks are coming from the body (mathematics, science, etc.)
  
    try {
      // Check if marks already exist for this student, year, and term
      const existingMarks = await Marks.findOne({ studentId, year, term });
  
      if (existingMarks) {
        return res.status(400).json({ message: 'Marks for this student and term already exist' });
      }
  
      // Create new marks entry
      const newMarks = new Marks({
        studentId,
        year,
        term,
        marks,
      });
  
      await newMarks.save();
      
      res.status(201).json({ message: 'Marks added successfully', marks: newMarks });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

// Route to get marks by student ID (http://localhost:5000/marks/:studentID)
router.get('/:studentId', verifyToken, async (req, res) => {
  try {
    const marks = await Marks.find({ studentId: req.params.studentId });
    
    if (!marks) {
      return res.status(404).json({ message: 'Marks not found for this student' });
    }

    res.status(200).json(marks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to update marks for a particular student(http://localhost:5000/marks/update/:studentid/:year/:term)
router.put('/update/:studentId/:year/:term', verifyToken, async (req, res) => {
  const { year, term } = req.params;
  const { marks } = req.body;

  try {
    const studentMarks = await Marks.findOne({ studentId: req.params.studentId, year, term });

    if (!studentMarks) {
      return res.status(404).json({ message: 'Marks not found for this student in the specified term' });
    }

    // Update marks
    studentMarks.marks = { ...studentMarks.marks, ...marks };

    await studentMarks.save();

    res.status(200).json({ message: 'Marks updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to delete marks for a particular student(http://localhost:5000/marks/delete/:studentid/:year/:term)
router.delete('/delete/:studentId/:year/:term', verifyToken, async (req, res) => {
  const { year, term } = req.params;

  try {
    const studentMarks = await Marks.findOneAndDelete({ studentId: req.params.studentId, year, term });

    if (!studentMarks) {
      return res.status(404).json({ message: 'Marks not found for this student in the specified term' });
    }

    res.status(200).json({ message: 'Marks deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
