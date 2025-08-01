
// import React, { useEffect, useState } from 'react';
// import Layout from './RecruiterLayout';


// const RecruiterConsole = () => {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const res = await fetch('http://localhost:5000/api/jobs');
//         if (res.ok) {
//           const data = await res.json();
//           setJobs(data.jobs || []);
//         } else {
//           setError('Failed to fetch jobs');
//         }
//       } catch (err) {
//         setError('Error fetching jobs');
//       }
//       setLoading(false);
//     };
//     fetchJobs();
//   }, []);

//   return (
//     <Layout>
//       <div className="recruiter-console">
//         <h2>Posted Jobs</h2>
//         {loading ? (
//           <p>Loading...</p>
//         ) : error ? (
//           <p style={{ color: 'red' }}>{error}</p>
//         ) : jobs.length === 0 ? (
//           <p>No jobs posted yet.</p>
//         ) : (
//           <table>
//             <thead>
//               <tr>
//                 <th>Title</th>
//                 <th>Role</th>
//                 <th>Description</th>
//                 <th>Skills</th>
//                 <th>Experience</th>
//                 <th>Posted At</th>
//               </tr>
//             </thead>
//             <tbody>
//               {jobs.map(job => (
//                 <tr key={job._id}>
//                   <td>{job.title}</td>
//                   <td>{job.role}</td>
//                   <td>{job.description}</td>
//                   <td>{job.skills}</td>
//                   <td>{job.experience}</td>
//                   <td>{new Date(job.postedAt).toLocaleString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </Layout>
//   );
// };

// export default RecruiterConsole


import React, { useEffect, useState } from 'react';
import Layout from './RecruiterLayout';
import './RecruiterConsole.css';

const RecruiterConsole = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/jobs');
        const data = await res.json();
        setJobs(data.jobs || []);
      } catch (err) {
        setError('Error fetching jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const updateStatus = async (applicationId, status) => {
  try {
    const res = await fetch(`http://localhost:5000/api/applications/${applicationId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });

    const data = await res.json();
    if (data.success) {
      // Re-fetch applicants to reflect the change
      fetchApplicants(selectedJobId);
    } else {
      console.error('Failed to update status:', data.error);
      alert('Failed to update status.');
    }
  } catch (err) {
    console.error('Error updating status:', err);
    alert('Error updating status.');
  }
};


  const fetchApplicants = async (jobId) => {
    setSelectedJobId(jobId);
    const res = await fetch(`http://localhost:5000/api/applications/${jobId}`);
    const data = await res.json();
    setApplicants(data.applications);
  };

  return (
    <Layout>
      <div className="recruiter-console">
        <h2>Posted Jobs</h2>
        {loading ? <p>Loading...</p> : error ? <p style={{ color: 'red' }}>{error}</p> : (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Role</th>
                <th>Description</th>
                <th>Skills</th>
                <th>Experience</th>
                <th>Posted At</th>
                <th>Applications</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map(job => (
                <tr key={job._id}>
                  <td>{job.title}</td>
                  <td>{job.role}</td>
                  <td>{job.description}</td>
                  <td>{job.skills}</td>
                  <td>{job.experience}</td>
                  {/* <td>{new Date(job.postedAt).toLocaleString()}</td> */}
                  <td>
  {new Date(job.postedAt).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })}
</td>
                  <td>
                    <button onClick={() => fetchApplicants(job._id)}>Applications</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {selectedJobId && (
          <div>
            <h3>Applicants for Job ID: {selectedJobId}</h3>
            <ul>
              {applicants.length === 0 ? (
                <li>No applications found.</li>
              ) : (
                applicants.map((app, i) => (
  <li key={i}>
    <p><strong>Name:</strong> {app.candidateName}</p>
    <p><strong>Email:</strong> {app.email}</p>
    <p><strong>Status:</strong> {app.result?.status || 'Pending'}</p>
    <p><strong>Match:</strong> {app.result?.match}%</p>

    {app.result?.reason && (
      <p><strong>Reason:</strong> {app.result.reason}</p>
    )}

    <div style={{ marginTop: '8px' }}>
      <button
        onClick={() => updateStatus(app._id, 'Approved')}
        disabled={app.result?.status === 'Approved'}
        style={{ marginRight: '10px' }}
      >
        Approve
      </button>
      <button
        onClick={() => updateStatus(app._id, 'Rejected')}
        disabled={app.result?.status === 'Rejected'}
      >
        Reject
      </button>
    </div>

    <hr />
  </li>
))


              )}
            </ul>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default RecruiterConsole;
