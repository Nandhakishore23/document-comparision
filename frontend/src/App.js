import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import RecruiterConsole from './components/RecruiterConsole';
import ARDashboard from './components/ARDashboard';
import PrivateRoute from './components/PrivateRoute';


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
