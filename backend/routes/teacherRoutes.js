import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Teacher from '../models/teacher.js';

dotenv.config();
const router = express.Router();

// Teacher Signup (http://localhost:5000/teacher/signup)
router.post('/signup', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const teacherExists = await Teacher.findOne({ email });
        if (teacherExists) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const teacher = new Teacher({ firstName, lastName, email, password });
        await teacher.save();

        res.status(201).json({ message: 'Teacher registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Teacher Login (http://localhost:5000/teacher/login)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const teacher = await Teacher.findOne({ email });
        if (!teacher) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, teacher.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: teacher._id, email: teacher.email, role: 'teacher' },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({ token, teacher: { id: teacher._id, firstName: teacher.firstName, lastName: teacher.lastName, email: teacher.email } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get Teacher Details by ID (http://localhost:5000/teacher/)
router.get('/:id', async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.id).select('-password'); // Exclude password field
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        res.status(200).json(teacher);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update Teacher Details (http://localhost:5000/teacher/update)
router.put('/:id', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const teacher = await Teacher.findById(req.params.id);
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        if (email !== teacher.email) {
            const emailExists = await Teacher.findOne({ email });
            if (emailExists) {
                return res.status(400).json({ message: 'Email is already in use' });
            }
        }

        teacher.firstName = firstName || teacher.firstName;
        teacher.lastName = lastName || teacher.lastName;
        teacher.email = email || teacher.email;
        if (password) {
            teacher.password = await bcrypt.hash(password, 10);
        }

        await teacher.save();
        res.status(200).json({ message: 'Teacher updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete Teacher
router.delete('/:id', async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.id);
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        await teacher.deleteOne();
        res.status(200).json({ message: 'Teacher deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
