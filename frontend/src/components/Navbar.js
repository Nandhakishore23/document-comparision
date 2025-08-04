import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import img from './images/genhire.jpg';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();

  // Check if user is logged in
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');

    navigate('/'); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="logo">GenHire</div>
      {/* <div className="logo">
        <img src="./images/genhire.jpg" alt="GenHire Logo" />
        <img src={img} width={250} height={50} alt="GenHire Logo" />
      </div> */}
      <div className="nav-links">
        {isLoggedIn ? (
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to="/" className="login-button">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
