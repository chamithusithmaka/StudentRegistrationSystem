import express from 'express';
import Marks from '../models/subjects.js'; // Make sure the path is correct
import { verifyToken } from '../middleware/authMiddleware.js'; // Assuming you have auth middleware to verify JWT

const router = express.Router();

// Route to add marks for a student (http://localhost:5000/marks/add/:studentId)
router.post('/add/:studentId', async (req, res) => {
  const { studentId } = req.params;  // Extract studentId from the URL params
  const { year, term, marks } = req.body;  // Get year, term, and marks from the body

  try {
    // Check if marks already exist for this student, year, and term
    const existingMarks = await Marks.findOne({ studentId, year, term });

    if (existingMarks) {
      return res.status(400).json({ message: 'Marks for this student and term already exist' });
    }

    // Create a new marks entry
    const newMarks = new Marks({
      studentId,    // Student ID
      year,         // Year of study (from the body)
      term,         // Term of study (from the body)
      marks,        // Marks data (from the body)
    });

    // Save the new marks entry to the database
    await newMarks.save();

    // Return a success response
    res.status(201).json({
      message: 'Marks added successfully',
      marks: newMarks,  // Return the newly created marks data
    });
  } catch (error) {
    console.error(error);  // Log the error
    res.status(500).json({ message: 'Server error' });  // Return server error message
  }
});

  

// Route to get marks by student ID (http://localhost:5000/marks/:studentID)
router.get('/:studentId', async (req, res) => {
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
router.put('/update/:studentId/:year/:term', async (req, res) => {
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
router.delete('/delete/:studentId/:year/:term', async (req, res) => {
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

// Route to update marks for a particular student by marksId (http://localhost:5000/marks/update/:marksId)
router.put('/update/:marksId', async (req, res) => {
  const { marksId } = req.params;
  const { marks } = req.body;

  try {
    // Find the marks entry by marksId
    const studentMarks = await Marks.findById(marksId);

    if (!studentMarks) {
      return res.status(404).json({ message: 'Marks not found for this ID' });
    }

    // Update marks
    studentMarks.marks = { ...studentMarks.marks, ...marks };

    // Save the updated marks
    await studentMarks.save();

    res.status(200).json({ message: 'Marks updated successfully', updatedMarks: studentMarks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to delete marks for a particular student by marksId (http://localhost:5000/marks/delete/:marksId)
router.delete('/delete/:marksId', async (req, res) => {
  const { marksId } = req.params;

  try {
    // Find and delete the marks entry by marksId
    const studentMarks = await Marks.findByIdAndDelete(marksId);

    if (!studentMarks) {
      return res.status(404).json({ message: 'Marks not found for this ID' });
    }

    res.status(200).json({ message: 'Marks deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to get marks by marksId
router.get('/marks/:marksId', async (req, res) => {
  const { marksId } = req.params;

  try {
    // Find the marks entry by marksId
    const studentMarks = await Marks.findById(marksId);

    if (!studentMarks) {
      return res.status(404).json({ message: 'Marks not found for this ID' });
    }

    res.status(200).json(studentMarks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});



export default router;
