import React, { useEffect, useState } from 'react';
import Layout from './Layout';

const Status = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // 🧠 Get user info from localStorage/sessionStorage
    const user = JSON.parse(localStorage.getItem('user')); // Example
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
        } else {
          setError('Failed to fetch applications');
        }
      } catch (err) {
        setError('Error fetching applications');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <Layout>
    <div className="candidate-status">
      <h2>My Application Status</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Match %</th>
              <th>Status</th>
              <th>Applied At</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, i) => (
              <tr key={i}>
                <td>{app.jobId?.title || 'N/A'}</td>
                <td>{app.result?.match || 'N/A'}</td>
                <td>{app.result?.status || 'Pending'}</td>
                <td>{new Date(app.createdAt).toLocaleDateString('en-GB')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </Layout>
  );
};

export default Status;
