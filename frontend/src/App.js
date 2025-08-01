import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import RecruiterConsole from './components/RecruiterConsole';
import ARDashboard from './components/ARDashboard';
import PrivateRoute from './components/PrivateRoute';
import Postjob from './components/Postjob';
import RecruiterProfile from './components/RecuirterProfile';
import Profile from './components/Profile';
import Status from './components/Status';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route 
          path="/dashboard" 
          element={
            // eslint-disable-next-line react/jsx-no-undef
            <PrivateRoute>
              <ARDashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/postjob" 
          element={
            <Postjob />
          } 
        />

        
        <Route
        path="/status"
        element={<Status />}
        
        />

        <Route 
          path="/profile" 
          element={
            <Profile />
          } 
        />

        <Route 
          path="/recuirter-profile" 
          element={
            <RecruiterProfile />
          } 
        />
       
        <Route 
          path="/recruiter" 
          element={
            // eslint-disable-next-line react/jsx-no-undef
            <PrivateRoute>
              <RecruiterConsole />
            </PrivateRoute>
          } 
        />
        
      </Routes> 
    </Router>
  );
}

export default App;
