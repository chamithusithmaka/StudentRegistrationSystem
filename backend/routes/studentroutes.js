import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Student from '../models/student.js';
import dotenv from 'dotenv';


dotenv.config();
const router = express.Router();

// Setup nodemailer for sending emails


// Student Signup (http://localhost:5000/students/signup)
router.post('/signup', async (req, res) => {
    const { firstName, lastName, email, address, age, grade, mobileNumber, password } = req.body;

    try {
        // Validate Age (must be numeric and greater than 18)
        if (age < 18 || isNaN(age)) {
            return res.status(400).json({ message: 'Age must be numeric and greater than 18' });
        }

        // Check if student already exists by email
        const studentExists = await Student.findOne({ email });
        if (studentExists) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Create a new student instance
        const student = new Student({ firstName, lastName, email, address, age, grade, mobileNumber, password });

        // Save the student (bcrypt password hashing is handled in the model)
        await student.save();

        // Skip the email sending part (Nodemailer removed)
        // Send success response to the client
        res.status(201).json({ message: 'Student registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


// Student Login (http://localhost:5000/students/login)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find student by email
        const student = await Student.findOne({ email });
        if (!student) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare password with hashed password in DB
        const isMatch = await student.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT Token
        const token = student.generateAuthToken();
        res.json({ token, message: 'Login successful' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Route to get a specific student by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params; // Extract the student ID from the request parameters

    try {
        // Find student by ID
        const student = await Student.findById(id);

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Return student data
        res.status(200).json(student);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update Student Profile (http://localhost:5000/students/updateStudent/)
router.put('/updateStudent/:id', async (req, res) => {
    const { firstName, lastName, email, address, age, grade, mobileNumber, profilePicture } = req.body;
    const { id } = req.params;

    try {
        const student = await Student.findById(id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        if (email && email !== student.email) {
            const emailExists = await Student.findOne({ email });
            if (emailExists) {
                return res.status(400).json({ message: 'Email is already in use' });
            }
        }

        student.firstName = firstName || student.firstName;
        student.lastName = lastName || student.lastName;
        student.email = email || student.email;
        student.address = address || student.address;
        student.age = age || student.age;
        student.grade = grade || student.grade;
        student.mobileNumber = mobileNumber || student.mobileNumber;
        student.profilePicture = profilePicture || student.profilePicture;

        await student.save();
        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete Student Profile (http://localhost:5000/students/deteStudent/)
router.delete('/deteStudent/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const student = await Student.findById(id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        await Student.deleteOne({ _id: id });
        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
