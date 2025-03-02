import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StudentLogin from './pages/StudentLogin';
import StudentReg from './pages/StudentReg';
import StdProfile from './pages/StdProfile';
import TeacherLogin from './pages/Teacher/TeacherLogin';
import TeacherSignUp from './pages/Teacher/TeacherSignup';
import TeacherDashboard from './pages/Teacher/TeacherDashboard';
import StudentDetails from './pages/Teacher/StudentDetails';
import AcademicInformation from './pages/Teacher/AcademicInfo';
import StudentMarks from './pages/StudentMarks';
import AddMarks from './pages/AddMarks';
import UpdateMarks from './pages/UpdateMarks';


function App() {
  return (
    <Router>
      <div>
      
        
        
        
        <Routes>
          <Route path="/" element={<StudentLogin />} />
          <Route path="/register" element={<StudentReg />} />
          <Route path="/profile" element={<StdProfile />} />
          <Route path="/login" element={<TeacherLogin />} />
          <Route path="/signup" element={<TeacherSignUp />} />
          <Route path="/dashboard" element={<TeacherDashboard />} />
          <Route path="/student/:id" element={<StudentDetails />} />
          <Route path="/academicInfo/:id" element={<AcademicInformation />} />
          <Route path="/myMarks/:id" element={<StudentMarks />} />
          <Route path="/add-marks/:id" element={<AddMarks />} />
          <Route path="/update-mark/:id" element={<UpdateMarks />} />
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
