import express from 'express';
import Student from '../models/student.js';

const router = express.Router(); // Initialize router

// Route to delete profile picture for a student
router.delete('/deleteProfilePicture/:studentId', async (req, res) => {
    const studentId = req.params.studentId;

    try {
        const student = await Student.findById(studentId);

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Delete the profile picture
        student.profilePicture = null;

        // Save the updated student document
        await student.save();

        res.status(200).json({ message: 'Profile picture deleted successfully', student });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while deleting the profile picture' });
    }
});

// Route to update profile picture for a student
router.put('/updateProfilePicture/:studentId', async (req, res) => {
    const studentId = req.params.studentId;
    const { profilePicture } = req.body; // The base64 image string sent in the request

    try {
        const student = await Student.findById(studentId);

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Update the profile picture
        student.profilePicture = profilePicture;

        // Save the updated student document
        await student.save();

        res.status(200).json({ message: 'Profile picture updated successfully', student });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while updating the profile picture' });
    }
});

// Route to fetch profile picture by student ID
router.get('/getProfilePicture/:studentId', async (req, res) => {
    const studentId = req.params.studentId;

    try {
        const student = await Student.findById(studentId);

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        if (!student.profilePicture) {
            return res.status(404).json({ message: 'Profile picture not found' });
        }

        // Return the profile picture as a base64 string
        res.status(200).json({ profilePicture: student.profilePicture });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching the profile picture' });
    }
});

// Route to upload profile picture for a student
router.post('/uploadProfilePicture/:studentId', async (req, res) => {
    const studentId = req.params.studentId;
    const { profilePicture } = req.body; // Assuming profile picture is sent in base64

    try {
        // Find student by ID
        const student = await Student.findById(studentId);

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Update student's profile picture
        student.profilePicture = profilePicture;

        // Save the updated student document
        await student.save();

        res.status(200).json({ message: 'Profile picture uploaded successfully', student });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while uploading the profile picture' });
    }
});

export default router;
