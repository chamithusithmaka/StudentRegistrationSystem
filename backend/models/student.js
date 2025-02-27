import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Load .env file

// Define the student schema
const studentSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, 'First name is required'],
            trim: true,
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            trim: true,
            lowercase: true,
        },
        address: {
            type: String,
            required: [true, 'Address is required'],
            trim: true,
        },
        age: {
            type: Number,
            required: [true, 'Age is required'],
            min: [0, 'Age cannot be negative'],
        },
        grade: {
            type: String,
            required: [true, 'Grade is required'],
            trim: true,
        },
        mobileNumber: {
            type: String,
            required: [true, 'Mobile number is required'],
            trim: true,
            unique: true,
        },
        profilePicture: {
            type: String,
            required: false,
        },
        password: {  // Added password field
            type: String,
            required: [true, 'Password is required'],
            minlength: [6, 'Password should be at least 6 characters long'],
        },
    },
    { timestamps: true }
);

// Hash password before saving (if password is being added)
studentSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare password
studentSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Method to generate JWT token
studentSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { studentId: this._id }, // Store studentId in the payload
        process.env.JWT_SECRET,   // JWT secret key from .env file
        { expiresIn: process.env.JWT_EXPIRE } // Token expiry from .env file
    );
    return token;
};

// Create the model
const Student = mongoose.model('Student', studentSchema);

export default Student;
