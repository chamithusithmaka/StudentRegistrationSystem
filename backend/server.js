import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; // Import express using ES modules
import dotenv from 'dotenv'; // Import dotenv using ES modules
import connectDB from './config/db.js'; // Import the connectDB function
import studentRoute from './routes/studentroutes.js'; // Import student route
import teacherRoutes from './routes/teacherRoutes.js';
import subjectRoutes from './routes/subjectsRoute.js';
import ProfilePicRoutes from './routes/profilePictureRoutes.js'

dotenv.config(); // Load environment variables


(bodyParser.urlencoded({ limit: '10mb', extended: true }));



const app = express();
app.use(cors());
// Increase the limit for request bodies (e.g., 10MB)
app.use(bodyParser.json({ limit: '10mb' }));
app.use

// Middleware for parsing JSON
app.use(express.json());

// Connect to MongoDB
connectDB();

// Use student routes (this assumes you have set up the routes in the 'studentroutes' file)
app.use('/students', studentRoute);
app.use('/teacher',teacherRoutes);
app.use('/marks',subjectRoutes);
app.use('/profilpic', ProfilePicRoutes);

// Server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
