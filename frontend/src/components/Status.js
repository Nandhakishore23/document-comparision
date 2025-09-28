// import React, { useEffect, useState } from 'react';
// import Layout from './Layout';

// const Status = () => {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     // 🧠 Get user info from localStorage/sessionStorage
//     const user = JSON.parse(localStorage.getItem('user')); // Example
//     const userId = user?.id || user?._id;

//     if (!userId) {
//       setError('User not logged in.');
//       setLoading(false);
//       return;
//     }

//     const fetchApplications = async () => {
//       try {
//         const res = await fetch(`http://localhost:5000/api/applications/user/${userId}`);
//         const data = await res.json();

//         if (data.success) {
//           setApplications(data.applications);
//         } else {
//           setError('Failed to fetch applications');
//         }
//       } catch (err) {
//         setError('Error fetching applications');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchApplications();
//   }, []);

//   return (
//     <Layout>
//     <div className="candidate-status">
//       <h2>My Application Status</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p style={{ color: 'red' }}>{error}</p>
//       ) : applications.length === 0 ? (
//         <p>No applications found.</p>
//       ) : (
//         <table>
//           <thead>
//             <tr>
//               <th>Job Title</th>
//               <th>Match %</th>
//               <th>Status</th>
//               <th>Applied At</th>
//             </tr>
//           </thead>
//           <tbody>
//             {applications.map((app, i) => (
//               <tr key={i}>
//                 <td>{app.jobId?.title || 'N/A'}</td>
//                 <td>{app.result?.match || 'N/A'}</td>
//                 <td>{app.result?.status || 'Pending'}</td>
//                 <td>{new Date(app.createdAt).toLocaleDateString('en-GB')}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//     </Layout>
//   );
// };

// export default Status;


import React, { useEffect, useState } from 'react';
import Bot from './Chatbot';
import Layout from './Layout';
import './Status.css';

const Status = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?.id || user?._id;

    if (!userId) {
      setError('User not logged in.');
      setLoading(false);
      return;
    }

    const fetchApplications = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/applications/user/${userId}`);
        const data = await res.json();

        if (data.success) {
          setApplications(data.applications);
          calculateStats(data.applications);
        } else {
          setError('Failed to fetch applications');
        }
      } catch (err) {
        setError('Error fetching applications');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const calculateStats = (apps) => {
    const total = apps.length;
    let pending = 0;
    let approved = 0;
    let rejected = 0;

    apps.forEach(app => {
      const status = app.result?.status?.toLowerCase() || 'pending';
      
      if (!status || status === 'pending') {
        pending++;
      } else if (status === 'approved') {
        approved++;
      } else if (status === 'rejected') {
        rejected++;
      } else {
        // Default any unknown status to pending
        pending++;
      }
    });

    setStats({ total, pending, approved, rejected });
  };

  const getStatusClass = (status) => {
    if (!status) return 'status-pending';
    
    const statusLower = status.toLowerCase();
    
    switch (statusLower) {
      case 'approved':
        return 'status-approved';
      case 'rejected':
        return 'status-rejected';
      case 'pending':
      default:
        return 'status-pending';
    }
  };

  const formatStatus = (status) => {
    if (!status) return 'Pending';
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  if (loading) {
    return (
      <Layout>
        <div className="candidate-status">
          <h2>My Application Status</h2>
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <div className="loading-text">Loading your applications...</div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="candidate-status">
          <h2>My Application Status</h2>
          <div className="error-container">
            <h3>Oops! Something went wrong</h3>
            <p>{error}</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (applications.length === 0) {
    return (
      <Layout>
        <div className="candidate-status">
          <h2>My Application Status</h2>
          <div className="no-applications">
            <span className="no-applications-icon">📝</span>
            <h3>No Applications Yet</h3>
            <p>You haven't applied to any jobs yet. Start exploring opportunities!</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="candidate-status">
        <h2>My Application Status</h2>
        
        {/* Statistics Overview */}
        <div className="status-overview">
          <div className="stat-card total">
            <div className="stat-number">{stats.total}</div>
            <div className="stat-label">Total Applications</div>
          </div>
          <div className="stat-card pending">
            <div className="stat-number">{stats.pending}</div>
            <div className="stat-label">Pending Review</div>
          </div>
          <div className="stat-card approved">
            <div className="stat-number">{stats.approved}</div>
            <div className="stat-label">Approved</div>
          </div>
          <div className="stat-card rejected">
            <div className="stat-number">{stats.rejected}</div>
            <div className="stat-label">Rejected</div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="applications-container">
          <h3>Application Details</h3>
          <table className="status-table">
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Status</th>
                <th>Applied Date</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, i) => (
                <tr key={i}>
                  <td className="job-title">
                    {app.jobId?.title || 'Job Title Not Available'}
                  </td>
                  <td>
                    <span className={`status-badge ${getStatusClass(app.result?.status)}`}>
                      {formatStatus(app.result?.status)}
                    </span>
                  </td>
                  <td className="application-date">
                    {new Date(app.createdAt).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="application-date">
                    {new Date(app.updatedAt || app.createdAt).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Bot />
    </Layout>
  );
};

export default Status;