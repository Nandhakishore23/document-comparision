// import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom';

// function Layout({ active, children }) {
//   const [collapsed, setCollapsed] = useState(false);
//   const navbarHeight = 60;

//   return (
//     <div className="layout-container">
//       <div className={`sidebar ${collapsed ? 'collapsed' : ''}`} style={{ top: `${navbarHeight}px` }}>
//         <button className="toggle-btn" onClick={() => setCollapsed(!collapsed)}>
//           ☰
//         </button>
//         <nav>
//           <NavLink
//             to="/dashboard"
//             className={active === 'dashboard' ? 'active' : ''}
//             title="Home"
//           >
//             🏠 <span className="link-text">Home</span>
//           </NavLink>
//           <NavLink
//             to="/profile"
//             className={active === 'profile' ? 'active' : ''}
//             title="Compared Profiles"
//           >
//             👨🏻‍💼 <span className="link-text">Profile</span>
//           </NavLink>
//           <NavLink
//             to="/status"
//             className={active === 'status' ? 'active' : ''}
//             title="Notification Status"
//           >
//             📬 <span className="link-text">Application Status</span>
//           </NavLink>
//         </nav>
//       </div>

//       <div className={`main-content ${collapsed ? 'collapsed' : ''}`} style={{ marginTop: `${navbarHeight}px` }}>
//         {children}
//       </div>

//       <style jsx>{`
//         .layout-container {
//           display: flex;
//         }
//         .sidebar {
//           width: 180px;
//           background: #fff;
//           box-shadow: 2px 0 8px rgba(60,72,88,0.06);
//           padding: 20px 10px;
//           transition: width 0.3s;
//           position: fixed;
//           left: 0;
//           bottom: 0;
//           z-index: 10;
//           height: 100vh;
//           font-family: 'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//         }
//         .sidebar.collapsed {
//           width: 60px;
//         }
//         .toggle-btn {
//           position: absolute;
//           top: 10px;
//           right: 10px;
//           background: none;
//           border: none;
//           font-size: 18px;
//           cursor: pointer;
//           color: #3a5a97;
//         }
//         nav a {
//           display: flex;
//           align-items: center;
//           margin: 16px 0;
//           text-decoration: none;
//           color: #3a5a97;
//           font-weight: 500;
//           transition: 0.2s ease;
//           padding: 8px;
//           border-radius: 6px;
//           font-family: 'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//           border-bottom: 3px solid transparent;
//         }
//         nav a:hover {
//           background: #f6f7fb;
//           color: #23272f;
//         }
//         nav a.active {
//           color: #3a5a97;
//           background: #fdf2f8;
//           border-bottom: 3px solid #f9a8d4;
//         }
//         .link-text {
//           margin-left: 10px;
//           white-space: nowrap;
//         }
//         .sidebar.collapsed .link-text {
//           display: none;
//         }
//         .main-content {
//           flex-grow: 1;
//           padding: 20px;
//           margin-left: 200px;
//           transition: margin-left 0.3s;
//           font-family: 'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//         }
//         .main-content.collapsed {
//           margin-left: 60px;
//         }
//         @media (max-width: 768px) {
//           .sidebar {
//             position: absolute;
//             z-index: 10;
//           }
//           .main-content {
//             margin-left: 60px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

// export default Layout;


import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Layout.css';

function Layout({ active, children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        setCollapsed(true);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleToggle = () => {
    if (isMobile && window.innerWidth <= 480) {
      setMobileOpen(!mobileOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

  const handleLinkClick = () => {
    if (isMobile && window.innerWidth <= 480) {
      setMobileOpen(false);
    }
  };

  return (
    <div className="layout-container">
      <div className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        {/* Logo section */}
        {/* <div className="sidebar-logo">
          <span role="img" aria-label="Logo" className="logo-icon">🌐</span>
        </div> */}
        {/* Toggle button (only on desktop) */}
        {/* {isMobile && ( */}
          <div className="toggle-btn-container">
            <button className="toggle-btn" onClick={handleToggle} aria-label="Toggle sidebar">
              ☰
            </button>
          </div>
          { /* )} */}
        {/* Nav links: hide when collapsed on desktop, show on mobile or expanded */}
        {/* {(!collapsed || isMobile || mobileOpen) && ( */}
        <div className="nav-links">
          <nav>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => isActive || active === 'dashboard' ? 'active' : ''}
              title="Home"
              onClick={handleLinkClick}
            >
              <span className="link-span">🏠</span>
              <span className="link-text">Home</span>
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) => isActive || active === 'profile' ? 'active' : ''}
              title="Profile"
              onClick={handleLinkClick}
            >
              <span className="link-span">👨🏻‍💼</span>
              <span className="link-text">Profile</span>
            </NavLink>
            <NavLink
              to="/status"
              className={({ isActive }) => isActive || active === 'status' ? 'active' : ''}
              title="Application Status"
              onClick={handleLinkClick}
            >
              <span className="link-span">📬</span>
              <span className="link-text">Application Status</span>
            </NavLink>
          </nav>
        </div>
      </div>

      <div className={`main-content ${collapsed ? 'collapsed' : ''}`}>
        {children}
      </div>

      {/* Mobile menu button - only visible on very small screens */}
      {isMobile && window.innerWidth <= 480 && (
        <button 
          className="mobile-menu-btn"
          onClick={handleToggle}
          aria-label="Open menu"
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            color: 'white',
            fontSize: '20px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease'
          }}
        >
          ☰
        </button>
      )}
    </div>
  );
}

export default Layout;