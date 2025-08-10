// // import React, { useState } from 'react';
// // import { NavLink } from 'react-router-dom';

// // function Layout({ active, children }) {
// //   const [collapsed, setCollapsed] = useState(false);
// //   const navbarHeight = 60;

// //   return (
// //     <div className="layout-container">
// //       <div className={`sidebar ${collapsed ? 'collapsed' : ''}`} style={{ top: `${navbarHeight}px` }}>
// //         <button className="toggle-btn" onClick={() => setCollapsed(!collapsed)}>
// //           ☰
// //         </button>
// //         <nav>
// //           <NavLink
// //             to="/recruiter"
// //             className={active === 'recruiter' ? 'active' : ''}
// //             title="Home"
// //           >
// //             🏠 <span className="link-text">Home</span>
// //           </NavLink>
// //           <NavLink
// //             to="/recuirter-profile"
// //             className={active === 'recuirter-profile' ? 'active' : ''}
// //             title="Reports"
// //           >
// //             👨🏻‍💻 <span className="link-text">Profile</span>
// //           </NavLink>
// //           <NavLink
// //             to="/postjob"
// //             className={active === 'postjob' ? 'active' : ''}
// //             title="Reports"
// //           >
// //             💼 <span className="link-text">Post Jobs</span>
// //           </NavLink>


// //         </nav>
// //       </div>

// //       <div className={`main-content ${collapsed ? 'collapsed' : ''}`} style={{ marginTop: `${navbarHeight}px` }}>
// //         {children}
// //       </div>

// //       <style jsx>{`
// //         .layout-container {
// //           display: flex;
// //         }
// //         .sidebar {
// //           width: 180px;
// //           background: #fff;
// //           box-shadow: 2px 0 8px rgba(60,72,88,0.06);
// //           padding: 20px 10px;
// //           transition: width 0.3s;
// //           position: fixed;
// //           left: 0;
// //           bottom: 0;
// //           z-index: 10;
// //           height: 100vh;
// //           font-family: 'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
// //         }
// //         .sidebar.collapsed {
// //           width: 60px;
// //         }
// //         .toggle-btn {
// //           position: absolute;
// //           top: 10px;
// //           right: 10px;
// //           background: none;
// //           border: none;
// //           font-size: 18px;
// //           cursor: pointer;
// //           color: #3a5a97;
// //         }
// //         nav a {
// //           display: flex;
// //           align-items: center;
// //           margin: 16px 0;
// //           text-decoration: none;
// //           color: #3a5a97;
// //           font-weight: 500;
// //           transition: 0.2s ease;
// //           padding: 8px;
// //           border-radius: 6px;
// //           font-family: 'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
// //           border-bottom: 3px solid transparent;
// //         }
// //         nav a:hover {
// //           background: #f6f7fb;
// //           color: #23272f;
// //         }
// //         nav a.active {
// //           color: #3a5a97;
// //           background: #fdf2f8;
// //           border-bottom: 3px solid #f9a8d4;
// //         }
// //         .link-text {
// //           margin-left: 10px;
// //           white-space: nowrap;
// //         }
// //         .sidebar.collapsed .link-text {
// //           display: none;
// //         }
// //         .main-content {
// //           flex-grow: 1;
// //           padding: 20px;
// //           margin-left: 200px;
// //           transition: margin-left 0.3s;
// //           font-family: 'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
// //         }
// //         .main-content.collapsed {
// //           margin-left: 60px;
// //         }
// //         @media (max-width: 768px) {
// //           .sidebar {
// //             position: absolute;
// //             z-index: 10;
// //           }
// //           .main-content {
// //             margin-left: 60px;
// //           }
// //         }
// //       `}</style>
// //     </div>
// //   );
// // }

// // export default Layout;

// import React, { useState, useEffect } from 'react';
// import { NavLink } from 'react-router-dom';
// import './RecruiterLayout.css';

// function RecruiterLayout({ active, children }) {
//   const [collapsed, setCollapsed] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);

//   useEffect(() => {
//     const checkScreenSize = () => {
//       const mobile = window.innerWidth <= 768;
//       setIsMobile(mobile);
//       if (mobile) {
//         setCollapsed(true);
//       }
//     };

//     checkScreenSize();
//     window.addEventListener('resize', checkScreenSize);
//     return () => window.removeEventListener('resize', checkScreenSize);
//   }, []);

//   const handleToggle = () => {
//     if (isMobile && window.innerWidth <= 480) {
//       setMobileOpen(!mobileOpen);
//     } else {
//       setCollapsed(!collapsed);
//     }
//   };

//   const handleLinkClick = () => {
//     if (isMobile && window.innerWidth <= 480) {
//       setMobileOpen(false);
//     }
//   };

//   return (
//     <div className="layout-container">
//       <div className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
//         {!isMobile && (
//           <button className="toggle-btn" onClick={handleToggle} aria-label="Toggle sidebar">
//             ☰
//           </button>
//         )}
//         <nav>
//           <NavLink
//             to="/recruiter"
//             className={({ isActive }) => isActive || active === 'recruiter' ? 'active' : ''}
//             title="Home"
//             onClick={handleLinkClick}
//           >
//             <span>🏠</span>
//             <span className="link-text">Home</span>
//           </NavLink>
//           <NavLink
//             to="/recuirter-profile"
//             className={({ isActive }) => isActive || active === 'recuirter-profile' ? 'active' : ''}
//             title="Profile"
//             onClick={handleLinkClick}
//           >
//             <span>👨🏻‍💻</span>
//             <span className="link-text">Profile</span>
//           </NavLink>
//           <NavLink
//             to="/postjob"
//             className={({ isActive }) => isActive || active === 'postjob' ? 'active' : ''}
//             title="Post Jobs"
//             onClick={handleLinkClick}
//           >
//             <span>💼</span>
//             <span className="link-text">Post Jobs</span>
//           </NavLink>
//         </nav>
//       </div>

//       <div className={`main-content ${collapsed ? 'collapsed' : ''}`}>
//         {children}
//       </div>

//       {/* Mobile menu button - only visible on very small screens */}
//       {isMobile && window.innerWidth <= 480 && (
//         <button 
//           className="mobile-menu-btn"
//           onClick={handleToggle}
//           aria-label="Open menu"
//           style={{
//             position: 'fixed',
//             bottom: '20px',
//             right: '20px',
//             background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
//             border: 'none',
//             width: '56px',
//             height: '56px',
//             borderRadius: '50%',
//             color: 'white',
//             fontSize: '20px',
//             cursor: 'pointer',
//             boxShadow: '0 4px 12px rgba(255, 107, 107, 0.4)',
//             zIndex: 1000,
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             transition: 'all 0.3s ease'
//           }}
//         >
//           ☰
//         </button>
//       )}
//     </div>
//   );
// }

// export default RecruiterLayout;

import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './RecruiterLayout.css';

function RecruiterLayout({ active, children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const handleToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    navigate('/'); // Redirect to login page
  };

  return (
    <div className="layout-container">
      {/* Top Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <div className="logo">GenHire Recruiter</div>
        </div>
        
        {/* Desktop Navigation Links */}
        <div className="navbar-center">
          {/* <NavLink
            to="/home"
            className={({ isActive }) => isActive || active === 'recruiter' ? 'nav-link active' : 'nav-link'}
            onClick={handleLinkClick}
          >
            Home
          </NavLink> */}
          <NavLink
            to="/recruiter"
            className={({ isActive }) => isActive || active === 'recruiter' ? 'nav-link active' : 'nav-link'}
            onClick={handleLinkClick}
          >
            Jobs
          </NavLink>
          <NavLink
            to="/recuirter-profile"
            className={({ isActive }) => isActive || active === 'recuirter-profile' ? 'nav-link active' : 'nav-link'}
            onClick={handleLinkClick}
          >
            Profile
          </NavLink>
          <NavLink
            to="/postjob"
            className={({ isActive }) => isActive || active === 'postjob' ? 'nav-link active' : 'nav-link'}
            onClick={handleLinkClick}
          >
            Post Jobs
          </NavLink>
        </div>

        <div className="navbar-right">
          <button className="mobile-toggle" onClick={handleToggle} aria-label="Toggle menu">
            ☰
          </button>
          {isLoggedIn ? (
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <NavLink to="/" className="login-button">Login</NavLink>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        {/* <NavLink
          to="/home"
          className={({ isActive }) => isActive || active === 'recruiter' ? 'mobile-nav-link active' : 'mobile-nav-link'}
          onClick={handleLinkClick}
        >
          <span className="mobile-link-icon">🏠</span>
          Home
        </NavLink> */}
        <NavLink
          to="/recruiter"
          className={({ isActive }) => isActive || active === 'recruiter' ? 'mobile-nav-link active' : 'mobile-nav-link'}
          onClick={handleLinkClick}
        >
          Jobs
          <span className="mobile-link-icon">🏠</span>
          
        </NavLink>
        <NavLink
          to="/recuirter-profile"
          className={({ isActive }) => isActive || active === 'recuirter-profile' ? 'mobile-nav-link active' : 'mobile-nav-link'}
          onClick={handleLinkClick}
        >
          <span className="mobile-link-icon">👨🏻‍💻</span>
          Profile
        </NavLink>
        <NavLink
          to="/postjob"
          className={({ isActive }) => isActive || active === 'postjob' ? 'mobile-nav-link active' : 'mobile-nav-link'}
          onClick={handleLinkClick}
        >
          <span className="mobile-link-icon">💼</span>
          Post Jobs
        </NavLink>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {children}
      </div>

      {/* Mobile overlay */}
      {mobileOpen && <div className="mobile-overlay" onClick={() => setMobileOpen(false)}></div>}
    </div>
  );
}

export default RecruiterLayout;