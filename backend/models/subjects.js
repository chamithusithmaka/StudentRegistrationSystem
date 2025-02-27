import mongoose from 'mongoose';

// Define the schema for storing student marks for three terms
const marksSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    year: {
      type: Number,
      required: true,
      min: [1900, 'Year must be a valid year'],
      max: [new Date().getFullYear(), 'Year cannot be in the future'],
    },
    term: {
      type: String,
      required: true,
      enum: ['Term 1', 'Term 2', 'Term 3'], // Restrict terms to only 3
    },
    marks: {
      mathematics: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
      },
      science: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
      },
      history: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
      },
      Buddhism: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
      },
      Sinhala: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
      },
      english: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
      },
      // Category subjects where student can add custom subjects as text
      firstCategorySubject: {
        subjectName: {
          type: String,
          required: true, // Allow students to enter any subject name in this category
          trim: true,
        },
        marks: {
          type: Number,
          required: true,
          min: 0,
          max: 100,
        },
      },
      secondCategorySubject: {
        subjectName: {
          type: String,
          required: true,
          trim: true,
        },
        marks: {
          type: Number,
          required: true,
          min: 0,
          max: 100,
        },
      },
      thirdCategorySubject: {
        subjectName: {
          type: String,
          required: true,
          trim: true,
        },
        marks: {
          type: Number,
          required: true,
          min: 0,
          max: 100,
        },
      },
    },
  },
  { timestamps: true }
);

// Create the model
const Marks = mongoose.model('Marks', marksSchema);

export default Marks;
