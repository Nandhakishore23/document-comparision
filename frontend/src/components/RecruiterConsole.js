
// // // // // // import React, { useEffect, useState } from 'react';
// // // // // // import Layout from './RecruiterLayout';


// // // // // // const RecruiterConsole = () => {
// // // // // //   const [jobs, setJobs] = useState([]);
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [error, setError] = useState('');

// // // // // //   useEffect(() => {
// // // // // //     const fetchJobs = async () => {
// // // // // //       try {
// // // // // //         const res = await fetch('http://localhost:5000/api/jobs');
// // // // // //         if (res.ok) {
// // // // // //           const data = await res.json();
// // // // // //           setJobs(data.jobs || []);
// // // // // //         } else {
// // // // // //           setError('Failed to fetch jobs');
// // // // // //         }
// // // // // //       } catch (err) {
// // // // // //         setError('Error fetching jobs');
// // // // // //       }
// // // // // //       setLoading(false);
// // // // // //     };
// // // // // //     fetchJobs();
// // // // // //   }, []);

// // // // // //   return (
// // // // // //     <Layout>
// // // // // //       <div className="recruiter-console">
// // // // // //         <h2>Posted Jobs</h2>
// // // // // //         {loading ? (
// // // // // //           <p>Loading...</p>
// // // // // //         ) : error ? (
// // // // // //           <p style={{ color: 'red' }}>{error}</p>
// // // // // //         ) : jobs.length === 0 ? (
// // // // // //           <p>No jobs posted yet.</p>
// // // // // //         ) : (
// // // // // //           <table>
// // // // // //             <thead>
// // // // // //               <tr>
// // // // // //                 <th>Title</th>
// // // // // //                 <th>Role</th>
// // // // // //                 <th>Description</th>
// // // // // //                 <th>Skills</th>
// // // // // //                 <th>Experience</th>
// // // // // //                 <th>Posted At</th>
// // // // // //               </tr>
// // // // // //             </thead>
// // // // // //             <tbody>
// // // // // //               {jobs.map(job => (
// // // // // //                 <tr key={job._id}>
// // // // // //                   <td>{job.title}</td>
// // // // // //                   <td>{job.role}</td>
// // // // // //                   <td>{job.description}</td>
// // // // // //                   <td>{job.skills}</td>
// // // // // //                   <td>{job.experience}</td>
// // // // // //                   <td>{new Date(job.postedAt).toLocaleString()}</td>
// // // // // //                 </tr>
// // // // // //               ))}
// // // // // //             </tbody>
// // // // // //           </table>
// // // // // //         )}
// // // // // //       </div>
// // // // // //     </Layout>
// // // // // //   );
// // // // // // };

// // // // // // export default RecruiterConsole


// // // // // // import React, { useEffect, useState } from 'react';
// // // // // // import Layout from './RecruiterLayout';
// // // // // // import './RecruiterConsole.css';

// // // // // // const RecruiterConsole = () => {
// // // // // //   const [jobs, setJobs] = useState([]);
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [error, setError] = useState('');
// // // // // //   const [selectedJobId, setSelectedJobId] = useState(null);
// // // // // //   const [applicants, setApplicants] = useState([]);

// // // // // //   useEffect(() => {
// // // // // //     const fetchJobs = async () => {
// // // // // //       try {
// // // // // //         const res = await fetch('http://localhost:5000/api/jobs');
// // // // // //         const data = await res.json();
// // // // // //         setJobs(data.jobs || []);
// // // // // //       } catch (err) {
// // // // // //         setError('Error fetching jobs');
// // // // // //       } finally {
// // // // // //         setLoading(false);
// // // // // //       }
// // // // // //     };

// // // // // //     fetchJobs();
// // // // // //   }, []);

// // // // // //   const updateStatus = async (applicationId, status) => {
// // // // // //   try {
// // // // // //     const res = await fetch(`http://localhost:5000/api/applications/${applicationId}/status`, {
// // // // // //       method: 'PUT',
// // // // // //       headers: {
// // // // // //         'Content-Type': 'application/json',
// // // // // //       },
// // // // // //       body: JSON.stringify({ status }),
// // // // // //     });

// // // // // //     const data = await res.json();
// // // // // //     if (data.success) {
// // // // // //       // Re-fetch applicants to reflect the change
// // // // // //       fetchApplicants(selectedJobId);
// // // // // //     } else {
// // // // // //       console.error('Failed to update status:', data.error);
// // // // // //       alert('Failed to update status.');
// // // // // //     }
// // // // // //   } catch (err) {
// // // // // //     console.error('Error updating status:', err);
// // // // // //     alert('Error updating status.');
// // // // // //   }
// // // // // // };


// // // // // //   const fetchApplicants = async (jobId) => {
// // // // // //     setSelectedJobId(jobId);
// // // // // //     const res = await fetch(`http://localhost:5000/api/applications/${jobId}`);
// // // // // //     const data = await res.json();
// // // // // //     setApplicants(data.applications);
// // // // // //   };

// // // // // //   return (
// // // // // //     <Layout>
// // // // // //       <div className="recruiter-console">
// // // // // //         <h2>Posted Jobs</h2>
// // // // // //         {loading ? <p>Loading...</p> : error ? <p style={{ color: 'red' }}>{error}</p> : (
// // // // // //           <table>
// // // // // //             <thead>
// // // // // //               <tr>
// // // // // //                 <th>Title</th>
// // // // // //                 <th>Role</th>
// // // // // //                 <th>Description</th>
// // // // // //                 <th>Skills</th>
// // // // // //                 <th>Experience</th>
// // // // // //                 <th>Posted At</th>
// // // // // //                 <th>Applications</th>
// // // // // //               </tr>
// // // // // //             </thead>
// // // // // //             <tbody>
// // // // // //               {jobs.map(job => (
// // // // // //                 <tr key={job._id}>
// // // // // //                   <td>{job.title}</td>
// // // // // //                   <td>{job.role}</td>
// // // // // //                   <td>{job.description}</td>
// // // // // //                   <td>{job.skills}</td>
// // // // // //                   <td>{job.experience}</td>
// // // // // //                   {/* <td>{new Date(job.postedAt).toLocaleString()}</td> */}
// // // // // //                   <td>
// // // // // //   {new Date(job.postedAt).toLocaleDateString('en-GB', {
// // // // // //     day: '2-digit',
// // // // // //     month: 'short',
// // // // // //     year: 'numeric'
// // // // // //   })}
// // // // // // </td>
// // // // // //                   <td>
// // // // // //                     <button onClick={() => fetchApplicants(job._id)}>Applications</button>
// // // // // //                   </td>
// // // // // //                 </tr>
// // // // // //               ))}
// // // // // //             </tbody>
// // // // // //           </table>
// // // // // //         )}

// // // // // //         {selectedJobId && (
// // // // // //           <div>
// // // // // //             <h3>Applicants for Job ID: {selectedJobId}</h3>
// // // // // //             <ul>
// // // // // //               {applicants.length === 0 ? (
// // // // // //                 <li>No applications found.</li>
// // // // // //               ) : (
// // // // // //                 applicants.map((app, i) => (
// // // // // //   <li key={i}>
// // // // // //     <p><strong>Name:</strong> {app.candidateName}</p>
// // // // // //     <p><strong>Email:</strong> {app.email}</p>
// // // // // //     <p><strong>Status:</strong> {app.result?.status || 'Pending'}</p>
// // // // // //     <p><strong>Match:</strong> {app.result?.match}%</p>
    

// // // // // //     {app.result?.reason && (
// // // // // //       <p><strong>Reason:</strong> {app.result.reason}</p>
// // // // // //     )}

// // // // // //     <div style={{ marginTop: '8px' }}>
// // // // // //       <button
// // // // // //         onClick={() => updateStatus(app._id, 'Approved')}
// // // // // //         disabled={app.result?.status === 'Approved'}
// // // // // //         style={{ marginRight: '10px' }}
// // // // // //       >
// // // // // //         Approve
// // // // // //       </button>
// // // // // //       <button
// // // // // //         onClick={() => updateStatus(app._id, 'Rejected')}
// // // // // //         disabled={app.result?.status === 'Rejected'}
// // // // // //       >
// // // // // //         Reject
// // // // // //       </button>
// // // // // //     </div>

// // // // // //     <hr />
// // // // // //   </li>
// // // // // // ))


// // // // // //               )}
// // // // // //             </ul>
// // // // // //           </div>
// // // // // //         )}
// // // // // //       </div>
// // // // // //     </Layout>
// // // // // //   );
// // // // // // };

// // // // // // export default RecruiterConsole;


// // // // // import React, { useEffect, useState } from 'react';
// // // // // import Layout from './RecruiterLayout';
// // // // // import './RecruiterConsole.css';

// // // // // const RecruiterConsole = () => {
// // // // //   const [jobs, setJobs] = useState([]);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [error, setError] = useState('');
// // // // //   const [selectedJobId, setSelectedJobId] = useState(null);
// // // // //   const [selectedJobTitle, setSelectedJobTitle] = useState('');
// // // // //   const [applicants, setApplicants] = useState([]);
// // // // //   const [showModal, setShowModal] = useState(false);
// // // // //   const [loadingApplicants, setLoadingApplicants] = useState(false);

// // // // //   useEffect(() => {
// // // // //     const fetchJobs = async () => {
// // // // //       try {
// // // // //         const res = await fetch('http://localhost:5000/api/jobs');
// // // // //         const data = await res.json();
// // // // //         setJobs(data.jobs || []);
// // // // //       } catch (err) {
// // // // //         setError('Error fetching jobs');
// // // // //       } finally {
// // // // //         setLoading(false);
// // // // //       }
// // // // //     };

// // // // //     fetchJobs();
// // // // //   }, []);

// // // // //   const updateStatus = async (applicationId, status) => {
// // // // //     try {
// // // // //       const res = await fetch(`http://localhost:5000/api/applications/${applicationId}/status`, {
// // // // //         method: 'PUT',
// // // // //         headers: {
// // // // //           'Content-Type': 'application/json',
// // // // //         },
// // // // //         body: JSON.stringify({ status }),
// // // // //       });

// // // // //       const data = await res.json();
// // // // //       if (data.success) {
// // // // //         // Re-fetch applicants to reflect the change
// // // // //         fetchApplicants(selectedJobId);
// // // // //       } else {
// // // // //         console.error('Failed to update status:', data.error);
// // // // //         alert('Failed to update status.');
// // // // //       }
// // // // //     } catch (err) {
// // // // //       console.error('Error updating status:', err);
// // // // //       alert('Error updating status.');
// // // // //     }
// // // // //   };

// // // // //   const fetchApplicants = async (jobId, jobTitle = '') => {
// // // // //     setLoadingApplicants(true);
// // // // //     setSelectedJobId(jobId);
// // // // //     setSelectedJobTitle(jobTitle);
// // // // //     setShowModal(true);
    
// // // // //     try {
// // // // //       const res = await fetch(`http://localhost:5000/api/applications/${jobId}`);
// // // // //       const data = await res.json();
// // // // //       setApplicants(data.applications || []);
// // // // //     } catch (err) {
// // // // //       console.error('Error fetching applicants:', err);
// // // // //       setApplicants([]);
// // // // //     } finally {
// // // // //       setLoadingApplicants(false);
// // // // //     }
// // // // //   };

// // // // //   const downloadApplicantsPDF = async (jobId, jobTitle) => {
// // // // //     try {
// // // // //       const res = await fetch(`http://localhost:5000/api/applications/${jobId}/pdf`, {
// // // // //   method: 'GET',
// // // // // });

      
// // // // //       if (res.ok) {
// // // // //         const blob = await res.blob();
// // // // //         const url = window.URL.createObjectURL(blob);
// // // // //         const a = document.createElement('a');
// // // // //         a.style.display = 'none';
// // // // //         a.href = url;
// // // // //         a.download = `${jobTitle}_applicants.pdf`;
// // // // //         document.body.appendChild(a);
// // // // //         a.click();
// // // // //         window.URL.revokeObjectURL(url);
// // // // //         document.body.removeChild(a);
// // // // //       } else {
// // // // //         alert('Failed to download PDF');
// // // // //       }
// // // // //     } catch (err) {
// // // // //       console.error('Error downloading PDF:', err);
// // // // //       alert('Error downloading PDF');
// // // // //     }
// // // // //   };

// // // // //   const closeModal = () => {
// // // // //     setShowModal(false);
// // // // //     setSelectedJobId(null);
// // // // //     setSelectedJobTitle('');
// // // // //     setApplicants([]);
// // // // //   };

// // // // //   const getStatusClass = (status) => {
// // // // //     switch (status) {
// // // // //       case 'Approved': return 'status-approved';
// // // // //       case 'Rejected': return 'status-rejected';
// // // // //       default: return 'status-pending';
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <Layout>
// // // // //       <div className="recruiter-console">
// // // // //         <div className="console-header">
// // // // //           <h2>Job Management Dashboard</h2>
// // // // //           <p>Manage your posted jobs and review applications</p>
// // // // //         </div>

// // // // //         {loading ? (
// // // // //           <div className="loading-container">
// // // // //             <div className="loading-spinner"></div>
// // // // //             <p>Loading jobs...</p>
// // // // //           </div>
// // // // //         ) : error ? (
// // // // //           <div className="error-container">
// // // // //             <p className="error-message">{error}</p>
// // // // //           </div>
// // // // //         ) : (
// // // // //           <div className="jobs-grid">
// // // // //             {jobs.length === 0 ? (
// // // // //               <div className="no-jobs">
// // // // //                 <h3>No jobs posted yet</h3>
// // // // //                 <p>Start by posting your first job to attract candidates.</p>
// // // // //               </div>
// // // // //             ) : (
// // // // //               jobs.map(job => (
// // // // //                 <div key={job._id} className="job-card">
// // // // //                   <div className="job-header">
// // // // //                     <h3 className="job-title">{job.title}</h3>
// // // // //                     <span className="job-role">{job.role}</span>
// // // // //                   </div>
                  
// // // // //                   <div className="job-content">
// // // // //                     <p className="job-description">{job.description}</p>
                    
// // // // //                     <div className="job-details">
// // // // //                       <div className="detail-item">
// // // // //                         <span className="detail-label">Skills:</span>
// // // // //                         <span className="detail-value">{job.skills}</span>
// // // // //                       </div>
// // // // //                       <div className="detail-item">
// // // // //                         <span className="detail-label">Experience:</span>
// // // // //                         <span className="detail-value">{job.experience}</span>
// // // // //                       </div>
// // // // //                       <div className="detail-item">
// // // // //                         <span className="detail-label">Posted:</span>
// // // // //                         <span className="detail-value">
// // // // //                           {new Date(job.postedAt).toLocaleDateString('en-GB', {
// // // // //                             day: '2-digit',
// // // // //                             month: 'short',
// // // // //                             year: 'numeric'
// // // // //                           })}
// // // // //                         </span>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                   </div>
                  
// // // // //                   <div className="job-actions">
// // // // //                     <button 
// // // // //                       className="btn btn-primary"
// // // // //                       onClick={() => fetchApplicants(job._id, job.title)}
// // // // //                     >
// // // // //                       View Applications
// // // // //                     </button>
// // // // //                     <button 
// // // // //                       className="btn btn-secondary"
// // // // //                       onClick={() => downloadApplicantsPDF(job._id, job.title)}
// // // // //                     >
// // // // //                       Download PDF
// // // // //                     </button>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               ))
// // // // //             )}
// // // // //           </div>
// // // // //         )}

// // // // //         {/* Modal Overlay */}
// // // // //         {showModal && (
// // // // //           <div className="modal-overlay" onClick={closeModal}>
// // // // //             <div className="modal-content" onClick={e => e.stopPropagation()}>
// // // // //               <div className="modal-header">
// // // // //                 <h3>Applications for: {selectedJobTitle}</h3>
// // // // //                 <button className="close-btn" onClick={closeModal}>×</button>
// // // // //               </div>
              
// // // // //               <div className="modal-body">
// // // // //                 {loadingApplicants ? (
// // // // //                   <div className="loading-container">
// // // // //                     <div className="loading-spinner"></div>
// // // // //                     <p>Loading applicants...</p>
// // // // //                   </div>
// // // // //                 ) : applicants.length === 0 ? (
// // // // //                   <div className="no-applicants">
// // // // //                     <h4>No applications yet</h4>
// // // // //                     <p>This job hasn't received any applications.</p>
// // // // //                   </div>
// // // // //                 ) : (
// // // // //                   <div className="applicants-list">
// // // // //                     {applicants.map((app, i) => (
// // // // //                       <div key={i} className="applicant-card">
// // // // //                         <div className="applicant-header">
// // // // //                           <div className="applicant-info">
// // // // //                             <h4>{app.candidateName}</h4>
// // // // //                             <p className="applicant-email">{app.email}</p>
// // // // //                           </div>
// // // // //                           <div className={`status-badge ${getStatusClass(app.result?.status)}`}>
// // // // //                             {app.result?.status || 'Pending'}
// // // // //                           </div>
// // // // //                         </div>
                        
// // // // //                         <div className="applicant-details">
// // // // //                           {app.result?.match && (
// // // // //                             <div className="match-score">
// // // // //                               <span className="match-label">Match Score: {app.result.match}%</span>
// // // // //                               <div className="match-bar">
// // // // //                                 <div 
// // // // //                                   className="match-fill" 
// // // // //                                   style={{ width: `${app.result.match}%` }}
// // // // //                                 ></div>
// // // // //                                 <span className="match-percentage">{app.result.match}%</span>
// // // // //                               </div>
// // // // //                             </div>
// // // // //                           )}

// // // // //                           {app.resumeUrl && (
// // // // //   <div className="resume-download">
// // // // //     <span className="resume-label">Resume:</span>
// // // // //     <a
// // // // //       href={app.resumeUrl}
// // // // //       download
// // // // //       target="_blank"
// // // // //       rel="noopener noreferrer"
// // // // //       className="btn btn-download"
// // // // //     >
// // // // //       Download Resume
// // // // //     </a>
// // // // //   </div>
// // // // // )}

                          
// // // // //                           {app.result?.reason && (
// // // // //                             <div className="reason-section">
// // // // //                               <span className="reason-label">Assessment:</span>
// // // // //                               <p className="reason-text">{app.result.reason}</p>
// // // // //                             </div>
// // // // //                           )}
// // // // //                         </div>
                        
// // // // //                         <div className="applicant-actions">
// // // // //                           <button
// // // // //                             className={`btn ${app.result?.status === 'Approved' ? 'btn-success-disabled' : 'btn-success'}`}
// // // // //                             onClick={() => updateStatus(app._id, 'Approved')}
// // // // //                             disabled={app.result?.status === 'Approved'}
// // // // //                           >
// // // // //                             {app.result?.status === 'Approved' ? '✓ Approved' : 'Approve'}
// // // // //                           </button>
// // // // //                           <button
// // // // //                             className={`btn ${app.result?.status === 'Rejected' ? 'btn-danger-disabled' : 'btn-danger'}`}
// // // // //                             onClick={() => updateStatus(app._id, 'Rejected')}
// // // // //                             disabled={app.result?.status === 'Rejected'}
// // // // //                           >
// // // // //                             {app.result?.status === 'Rejected' ? '✗ Rejected' : 'Reject'}
// // // // //                           </button>
// // // // //                         </div>
// // // // //                       </div>
// // // // //                     ))}
// // // // //                   </div>
// // // // //                 )}
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>
// // // // //         )}
// // // // //       </div>
// // // // //     </Layout>
// // // // //   );
// // // // // };

// // // // // export default RecruiterConsole;


// // // // import React, { useEffect, useState } from 'react';
// // // // import Layout from './RecruiterLayout';
// // // // import './RecruiterConsole.css';

// // // // const RecruiterConsole = () => {
// // // //   const [jobs, setJobs] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState('');
// // // //   const [selectedJobId, setSelectedJobId] = useState(null);
// // // //   const [selectedJobTitle, setSelectedJobTitle] = useState('');
// // // //   const [applicants, setApplicants] = useState([]);
// // // //   const [showModal, setShowModal] = useState(false);
// // // //   const [loadingApplicants, setLoadingApplicants] = useState(false);

// // // //   useEffect(() => {
// // // //     const fetchJobs = async () => {
// // // //       try {
// // // //         const res = await fetch('http://localhost:5000/api/jobs');
// // // //         const data = await res.json();
// // // //         setJobs(data.jobs || []);
// // // //       } catch (err) {
// // // //         setError('Error fetching jobs');
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     };

// // // //     fetchJobs();
// // // //   }, []);

// // // //   const updateStatus = async (applicationId, status) => {
// // // //     try {
// // // //       const res = await fetch(`http://localhost:5000/api/applications/${applicationId}/status`, {
// // // //         method: 'PUT',
// // // //         headers: {
// // // //           'Content-Type': 'application/json',
// // // //         },
// // // //         body: JSON.stringify({ status }),
// // // //       });

// // // //       const data = await res.json();
// // // //       if (data.success) {
// // // //         fetchApplicants(selectedJobId);
// // // //       } else {
// // // //         console.error('Failed to update status:', data.error);
// // // //         alert('Failed to update status.');
// // // //       }
// // // //     } catch (err) {
// // // //       console.error('Error updating status:', err);
// // // //       alert('Error updating status.');
// // // //     }
// // // //   };

// // // //   const fetchApplicants = async (jobId, jobTitle = '') => {
// // // //     setLoadingApplicants(true);
// // // //     setSelectedJobId(jobId);
// // // //     setSelectedJobTitle(jobTitle);
// // // //     setShowModal(true);

// // // //     try {
// // // //       const res = await fetch(`http://localhost:5000/api/applications/${jobId}`);
// // // //       const data = await res.json();
// // // //       setApplicants(data.applications || []);
// // // //     } catch (err) {
// // // //       console.error('Error fetching applicants:', err);
// // // //       setApplicants([]);
// // // //     } finally {
// // // //       setLoadingApplicants(false);
// // // //     }
// // // //   };

// // // //   const handleCloseJob = async (jobId) => {
// // // //   const confirm = window.confirm('Are you sure you want to close this job and reject all pending applicants?');
// // // //   if (!confirm) return;

// // // //   try {
// // // //     const res = await fetch(`http://localhost:5000/api/jobs/${jobId}/close`, {
// // // //       method: 'PUT',
// // // //     });

// // // //     const data = await res.json();

// // // //     if (res.ok && data.success) {
// // // //       alert('Job closed and pending applicants rejected.');
// // // //       // Refresh jobs list
// // // //       const updatedJobs = await fetch('http://localhost:5000/api/jobs');
// // // //       const updatedData = await updatedJobs.json();
// // // //       setJobs(updatedData.jobs || []);
// // // //     } else {
// // // //       alert(data.error || 'Failed to close the job.');
// // // //     }
// // // //   } catch (err) {
// // // //     console.error('Error closing job:', err);
// // // //     alert('An error occurred while closing the job.');
// // // //   }
// // // // };


// // // //   const downloadApplicantsPDF = async (jobId, jobTitle) => {
// // // //     try {
// // // //       const res = await fetch(`http://localhost:5000/api/applications/${jobId}/pdf`, {
// // // //         method: 'GET',
// // // //       });

// // // //       if (res.ok) {
// // // //         const blob = await res.blob();
// // // //         const url = window.URL.createObjectURL(blob);
// // // //         const a = document.createElement('a');
// // // //         a.style.display = 'none';
// // // //         a.href = url;
// // // //         a.download = `${jobTitle}_applicants.pdf`;
// // // //         document.body.appendChild(a);
// // // //         a.click();
// // // //         window.URL.revokeObjectURL(url);
// // // //         document.body.removeChild(a);
// // // //       } else {
// // // //         alert('Failed to download PDF');
// // // //       }
// // // //     } catch (err) {
// // // //       console.error('Error downloading PDF:', err);
// // // //       alert('Error downloading PDF');
// // // //     }
// // // //   };

// // // //   const closeModal = () => {
// // // //     setShowModal(false);
// // // //     setSelectedJobId(null);
// // // //     setSelectedJobTitle('');
// // // //     setApplicants([]);
// // // //   };

// // // //   const getStatusClass = (status) => {
// // // //     switch (status) {
// // // //       case 'Approved': return 'status-approved';
// // // //       case 'Rejected': return 'status-rejected';
// // // //       default: return 'status-pending';
// // // //     }
// // // //   };

// // // //   return (
// // // //     <Layout>
// // // //       <div className="recruiter-console">
// // // //         <div className="console-header">
// // // //           <h2>Job Management Dashboard</h2>
// // // //           <p>Manage your posted jobs and review applications</p>
// // // //         </div>

// // // //         {loading ? (
// // // //           <div className="loading-container">
// // // //             <div className="loading-spinner"></div>
// // // //             <p>Loading jobs...</p>
// // // //           </div>
// // // //         ) : error ? (
// // // //           <div className="error-container">
// // // //             <p className="error-message">{error}</p>
// // // //           </div>
// // // //         ) : (
// // // //           <div className="jobs-grid">
// // // //             {jobs.length === 0 ? (
// // // //               <div className="no-jobs">
// // // //                 <h3>No jobs posted yet</h3>
// // // //                 <p>Start by posting your first job to attract candidates.</p>
// // // //               </div>
// // // //             ) : (
// // // //               jobs.map(job => (
// // // //                 <div key={job._id} className="job-card">
// // // //                   <button 
// // // //   className="btn btn-danger"
// // // //   onClick={() => handleCloseJob(job._id)}
// // // // >
// // // //   Close Job
// // // // </button>

// // // //                   <div className="job-header">
// // // //                     <h3 className="job-title">{job.title}</h3>
// // // //                     <span className="job-role">{job.role}</span>
// // // //                   </div>
// // // //                   <div className="job-content">
// // // //                     <p className="job-description">{job.description}</p>
// // // //                     <div className="job-details">
// // // //                       <div className="detail-item">
// // // //                         <span className="detail-label">Skills:</span>
// // // //                         <span className="detail-value">{job.skills}</span>
// // // //                       </div>
// // // //                       <div className="detail-item">
// // // //                         <span className="detail-label">Experience:</span>
// // // //                         <span className="detail-value">{job.experience}</span>
// // // //                       </div>
// // // //                       <div className="detail-item">
// // // //                         <span className="detail-label">Posted:</span>
// // // //                         <span className="detail-value">{new Date(job.postedAt).toLocaleDateString('en-GB')}</span>
// // // //                       </div>
// // // //                     </div>
// // // //                   </div>
// // // //                   <div className="job-actions">
// // // //                     <button className="btn btn-primary" onClick={() => fetchApplicants(job._id, job.title)}>View Applications</button>
// // // //                     <button className="btn btn-secondary" onClick={() => downloadApplicantsPDF(job._id, job.title)}>Download PDF</button>
// // // //                   </div>
// // // //                 </div>
// // // //               ))
// // // //             )}
// // // //           </div>
// // // //         )}

// // // //         {showModal && (
// // // //           <div className="modal-overlay" onClick={closeModal}>
// // // //             <div className="modal-content" onClick={e => e.stopPropagation()}>
// // // //               <div className="modal-header">
// // // //                 <h3>Applications for: {selectedJobTitle}</h3>
// // // //                 <button className="close-btn" onClick={closeModal}>×</button>
// // // //               </div>
// // // //               <div className="modal-body">
// // // //                 {loadingApplicants ? (
// // // //                   <div className="loading-container">
// // // //                     <div className="loading-spinner"></div>
// // // //                     <p>Loading applicants...</p>
// // // //                   </div>
// // // //                 ) : applicants.length === 0 ? (
// // // //                   <div className="no-applicants">
// // // //                     <h4>No applications yet</h4>
// // // //                     <p>This job hasn't received any applications.</p>
// // // //                   </div>
// // // //                 ) : (
// // // //                   <div className="applicants-list">
// // // //                     {applicants.map((app, i) => (
// // // //                       <div key={i} className="applicant-card">
// // // //                         <div className="applicant-header">
// // // //                           <div className="applicant-info">
// // // //                             <h4>{app.candidateName}</h4>
// // // //                             <p className="applicant-email">{app.email}</p>
// // // //                           </div>
// // // //                           <div className={`status-badge ${getStatusClass(app.result?.status)}`}>
// // // //                             {app.result?.status || 'Pending'}
// // // //                           </div>
// // // //                         </div>
// // // //                         <div className="applicant-details">
// // // //                           {app.result?.match && (
// // // //                             <div className="match-score">
// // // //                               <span className="match-label">Match Score: {app.result.match}%</span>
// // // //                               <div className="match-bar">
// // // //                                 <div className="match-fill" style={{ width: `${app.result.match}%` }}></div>
// // // //                                 <span className="match-percentage">{app.result.match}%</span>
// // // //                               </div>
// // // //                             </div>
// // // //                           )}
// // // //                           {app.result?.reason && (
// // // //                             <div className="reason-section">
// // // //                               <span className="reason-label">Assessment:</span>
// // // //                               <p className="reason-text">{app.result.reason}</p>
// // // //                             </div>
// // // //                           )}
// // // //                           {app.resumeUrl && (
// // // //                             <div className="resume-download">
// // // //                               <span className="resume-label">Resume:</span>
// // // //                               <a
// // // //                                 href={app.resumeUrl}
// // // //                                 download
// // // //                                 target="_blank"
// // // //                                 rel="noopener noreferrer"
// // // //                                 className="btn btn-download"
// // // //                               >
// // // //                                 Download Resume
// // // //                               </a>
// // // //                             </div>
// // // //                           )}
// // // //                         </div>
// // // //                         <div className="applicant-actions">
// // // //                           <button className={`btn ${app.result?.status === 'Approved' ? 'btn-success-disabled' : 'btn-success'}`} onClick={() => updateStatus(app._id, 'Approved')} disabled={app.result?.status === 'Approved'}>
// // // //                             {app.result?.status === 'Approved' ? '✓ Approved' : 'Approve'}
// // // //                           </button>
// // // //                           <button className={`btn ${app.result?.status === 'Rejected' ? 'btn-danger-disabled' : 'btn-danger'}`} onClick={() => updateStatus(app._id, 'Rejected')} disabled={app.result?.status === 'Rejected'}>
// // // //                             {app.result?.status === 'Rejected' ? '✗ Rejected' : 'Reject'}
// // // //                           </button>
// // // //                         </div>
// // // //                       </div>
// // // //                     ))}
// // // //                   </div>
// // // //                 )}
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //     </Layout>
// // // //   );
// // // // };

// // // // export default RecruiterConsole;


// // // import React, { useEffect, useState } from 'react';
// // // import Layout from './RecruiterLayout';
// // // import './RecruiterConsole.css';

// // // const RecruiterConsole = () => {
// // //   const [jobs, setJobs] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState('');
// // //   const [selectedJobId, setSelectedJobId] = useState(null);
// // //   const [selectedJobTitle, setSelectedJobTitle] = useState('');
// // //   const [applicants, setApplicants] = useState([]);
// // //   const [showModal, setShowModal] = useState(false);
// // //   const [loadingApplicants, setLoadingApplicants] = useState(false);

// // //   useEffect(() => {
// // //     const fetchJobs = async () => {
// // //       try {
// // //         const res = await fetch('http://localhost:5000/api/jobs');
// // //         const data = await res.json();
// // //         setJobs(data.jobs || []);
// // //       } catch (err) {
// // //         setError('Error fetching jobs');
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchJobs();
// // //   }, []);

// // //   const updateStatus = async (applicationId, status) => {
// // //     try {
// // //       const res = await fetch(`http://localhost:5000/api/applications/${applicationId}/status`, {
// // //         method: 'PUT',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //         },
// // //         body: JSON.stringify({ status }),
// // //       });

// // //       const data = await res.json();
// // //       if (data.success) {
// // //         fetchApplicants(selectedJobId);
// // //       } else {
// // //         console.error('Failed to update status:', data.error);
// // //         alert('Failed to update status.');
// // //       }
// // //     } catch (err) {
// // //       console.error('Error updating status:', err);
// // //       alert('Error updating status.');
// // //     }
// // //   };

// // //   const handleCloseJob = async (jobId) => {
// // //     const confirmClose = window.confirm('Are you sure you want to close this job and reject all pending applicants?');
// // //     if (!confirmClose) return;

// // //     try {
// // //       const res = await fetch(`http://localhost:5000/api/jobs/${jobId}/close`, {
// // //         method: 'PUT'
// // //       });

// // //       const data = await res.json();

// // //       if (res.ok && data.success) {
// // //         alert('Job closed and pending applicants rejected.');
// // //         // 
// // //         setJobs(prevJobs =>
// // //   prevJobs.map(job =>
// // //     job._id === jobId ? { ...job, isClosed: true } : job
// // //   )
// // // );

// // //       } else {
// // //         alert(data.error || 'Failed to close the job.');
// // //       }
// // //     } catch (err) {
// // //       console.error('Error closing job:', err);
// // //       alert('An error occurred while closing the job.');
// // //     }
// // //   };

// // //   const fetchApplicants = async (jobId, jobTitle = '') => {
// // //     setLoadingApplicants(true);
// // //     setSelectedJobId(jobId);
// // //     setSelectedJobTitle(jobTitle);
// // //     setShowModal(true);

// // //     try {
// // //       const res = await fetch(`http://localhost:5000/api/applications/${jobId}`);
// // //       const data = await res.json();
// // //       setApplicants(data.applications || []);
// // //     } catch (err) {
// // //       console.error('Error fetching applicants:', err);
// // //       setApplicants([]);
// // //     } finally {
// // //       setLoadingApplicants(false);
// // //     }
// // //   };

// // //   const downloadApplicantsPDF = async (jobId, jobTitle) => {
// // //     try {
// // //       const res = await fetch(`http://localhost:5000/api/applications/${jobId}/pdf`, {
// // //         method: 'GET'
// // //       });

// // //       if (res.ok) {
// // //         const blob = await res.blob();
// // //         const url = window.URL.createObjectURL(blob);
// // //         const a = document.createElement('a');
// // //         a.style.display = 'none';
// // //         a.href = url;
// // //         a.download = `${jobTitle}_applicants.pdf`;
// // //         document.body.appendChild(a);
// // //         a.click();
// // //         window.URL.revokeObjectURL(url);
// // //         document.body.removeChild(a);
// // //       } else {
// // //         alert('Failed to download PDF');
// // //       }
// // //     } catch (err) {
// // //       console.error('Error downloading PDF:', err);
// // //       alert('Error downloading PDF');
// // //     }
// // //   };

// // //   const closeModal = () => {
// // //     setShowModal(false);
// // //     setSelectedJobId(null);
// // //     setSelectedJobTitle('');
// // //     setApplicants([]);
// // //   };

// // //   const getStatusClass = (status) => {
// // //     switch (status) {
// // //       case 'Approved': return 'status-approved';
// // //       case 'Rejected': return 'status-rejected';
// // //       default: return 'status-pending';
// // //     }
// // //   };

// // //   return (
// // //     <Layout>
// // //       <div className="recruiter-console">
// // //         <div className="console-header">
// // //           <h2>Job Management Dashboard</h2>
// // //           <p>Manage your posted jobs and review applications</p>
// // //         </div>

// // //         {loading ? (
// // //           <div className="loading-container">
// // //             <div className="loading-spinner"></div>
// // //             <p>Loading jobs...</p>
// // //           </div>
// // //         ) : error ? (
// // //           <div className="error-container">
// // //             <p className="error-message">{error}</p>
// // //           </div>
// // //         ) : (
// // //           <div className="jobs-grid">
// // //             {jobs.length === 0 ? (
// // //               <div className="no-jobs">
// // //                 <h3>No jobs posted yet</h3>
// // //                 <p>Start by posting your first job to attract candidates.</p>
// // //               </div>
// // //             ) : (
// // //               jobs.map(job => (
// // //                 <div key={job._id} className="job-card">
// // //                   <div className="job-header">
// // //                     <h3 className="job-title">{job.title}</h3>
// // //                     <span className="job-role">{job.role}</span>
// // //                   </div>
// // //                   <div className="job-content">
// // //                     <p className="job-description">{job.description}</p>
// // //                     <div className="job-details">
// // //                       <div className="detail-item">
// // //                         <span className="detail-label">Skills:</span>
// // //                         <span className="detail-value">{job.skills}</span>
// // //                       </div>
// // //                       <div className="detail-item">
// // //                         <span className="detail-label">Experience:</span>
// // //                         <span className="detail-value">{job.experience}</span>
// // //                       </div>
// // //                       <div className="detail-item">
// // //                         <span className="detail-label">Posted:</span>
// // //                         <span className="detail-value">{new Date(job.postedAt).toLocaleDateString('en-GB')}</span>
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                   <div className="job-actions">
// // //                     <button className="btn btn-primary" onClick={() => fetchApplicants(job._id, job.title)}>View Applications</button>
// // //                     <button className="btn btn-secondary" onClick={() => downloadApplicantsPDF(job._id, job.title)}>Download PDF</button>
// // //                     {/* <button className="btn btn-danger" onClick={() => handleCloseJob(job._id)}>Close Job</button> */}
// // //                     <button
// // //   className={`btn ${job.isClosed ? 'btn-disabled' : 'btn-danger'}`}
// // //   onClick={() => handleCloseJob(job._id)}
// // //   disabled={job.isClosed}
// // // >
// // //   {job.isClosed ? 'Closed' : 'Close Job'}
// // // </button>

// // //                   </div>
// // //                 </div>
// // //               ))
// // //             )}
// // //           </div>
// // //         )}

// // //         {showModal && (
// // //           <div className="modal-overlay" onClick={closeModal}>
// // //             <div className="modal-content" onClick={e => e.stopPropagation()}>
// // //               <div className="modal-header">
// // //                 <h3>Applications for: {selectedJobTitle}</h3>
// // //                 <button className="close-btn" onClick={closeModal}>×</button>
// // //               </div>
// // //               <div className="modal-body">
// // //                 {loadingApplicants ? (
// // //                   <div className="loading-container">
// // //                     <div className="loading-spinner"></div>
// // //                     <p>Loading applicants...</p>
// // //                   </div>
// // //                 ) : applicants.length === 0 ? (
// // //                   <div className="no-applicants">
// // //                     <h4>No applications yet</h4>
// // //                     <p>This job hasn't received any applications.</p>
// // //                   </div>
// // //                 ) : (
// // //                   <div className="applicants-list">
// // //                     {applicants.map((app, i) => (
// // //                       <div key={i} className="applicant-card">
// // //                         <div className="applicant-header">
// // //                           <div className="applicant-info">
// // //                             <h4>{app.candidateName}</h4>
// // //                             <p className="applicant-email">{app.email}</p>
// // //                           </div>
// // //                           <div className={`status-badge ${getStatusClass(app.result?.status)}`}>
// // //                             {app.result?.status || 'Pending'}
// // //                           </div>
// // //                         </div>
// // //                         <div className="applicant-details">
// // //                           {app.result?.match && (
// // //                             <div className="match-score">
// // //                               <span className="match-label">Match Score: {app.result.match}%</span>
// // //                               <div className="match-bar">
// // //                                 <div className="match-fill" style={{ width: `${app.result.match}%` }}></div>
// // //                                 <span className="match-percentage">{app.result.match}%</span>
// // //                               </div>
// // //                             </div>
// // //                           )}
// // //                           {app.result?.reason && (
// // //                             <div className="reason-section">
// // //                               <span className="reason-label">Assessment:</span>
// // //                               <p className="reason-text">{app.result.reason}</p>
// // //                             </div>
// // //                           )}
// // //                           {app.resumeUrl && (
// // //                             <div className="resume-download">
// // //                               <span className="resume-label">Resume:</span>
// // //                               <a href={app.resumeUrl} download target="_blank" rel="noopener noreferrer" className="btn btn-download">Download Resume</a>
// // //                             </div>
// // //                           )}
// // //                         </div>
// // //                         <div className="applicant-actions">
// // //                           <button className={`btn ${app.result?.status === 'Approved' ? 'btn-success-disabled' : 'btn-success'}`} onClick={() => updateStatus(app._id, 'Approved')} disabled={app.result?.status === 'Approved'}>
// // //                             {app.result?.status === 'Approved' ? '✓ Approved' : 'Approve'}
// // //                           </button>
// // //                           <button className={`btn ${app.result?.status === 'Rejected' ? 'btn-danger-disabled' : 'btn-danger'}`} onClick={() => updateStatus(app._id, 'Rejected')} disabled={app.result?.status === 'Rejected'}>
// // //                             {app.result?.status === 'Rejected' ? '✗ Rejected' : 'Reject'}
// // //                           </button>
// // //                         </div>
// // //                       </div>
// // //                     ))}
// // //                   </div>
// // //                 )}
// // //               </div>
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </Layout>
// // //   );
// // // };

// // // export default RecruiterConsole;


// // import React, { useEffect, useState } from 'react';
// // import Layout from './RecruiterLayout';
// // import './RecruiterConsole.css';

// // const RecruiterConsole = () => {
// //   const [jobs, setJobs] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState('');
// //   const [selectedJobId, setSelectedJobId] = useState(null);
// //   const [selectedJobTitle, setSelectedJobTitle] = useState('');
// //   const [applicants, setApplicants] = useState([]);
// //   const [showModal, setShowModal] = useState(false);
// //   const [loadingApplicants, setLoadingApplicants] = useState(false);
// //   const [jobApplicantCounts, setJobApplicantCounts] = useState({}); // New state for applicant counts

// //   useEffect(() => {
// //     const fetchJobsWithCounts = async () => {
// //       try {
// //         const res = await fetch('http://localhost:5000/api/jobs');
// //         const data = await res.json();
// //         const jobsData = data.jobs || [];
// //         setJobs(jobsData);

// //         // Fetch applicant counts for each job
// //         const counts = {};
// //         await Promise.all(
// //           jobsData.map(async (job) => {
// //             try {
// //               const applicantRes = await fetch(`http://localhost:5000/api/applications/${job._id}`);
// //               const applicantData = await applicantRes.json();
// //               counts[job._id] = applicantData.applications?.length || 0;
// //             } catch (err) {
// //               console.error(`Error fetching count for job ${job._id}:`, err);
// //               counts[job._id] = 0;
// //             }
// //           })
// //         );
// //         setJobApplicantCounts(counts);
// //       } catch (err) {
// //         setError('Error fetching jobs');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchJobsWithCounts();
// //   }, []);

// //   const updateStatus = async (applicationId, status) => {
// //     try {
// //       const res = await fetch(`http://localhost:5000/api/applications/${applicationId}/status`, {
// //         method: 'PUT',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({ status }),
// //       });

// //       const data = await res.json();
// //       if (data.success) {
// //         fetchApplicants(selectedJobId);
// //       } else {
// //         console.error('Failed to update status:', data.error);
// //         alert('Failed to update status.');
// //       }
// //     } catch (err) {
// //       console.error('Error updating status:', err);
// //       alert('Error updating status.');
// //     }
// //   };

// //   const handleCloseJob = async (jobId) => {
// //     const confirmClose = window.confirm('Are you sure you want to close this job and reject all pending applicants?');
// //     if (!confirmClose) return;

// //     try {
// //       const res = await fetch(`http://localhost:5000/api/jobs/${jobId}/close`, {
// //         method: 'PUT'
// //       });

// //       const data = await res.json();

// //       if (res.ok && data.success) {
// //         alert('Job closed and pending applicants rejected.');
// //         setJobs(prevJobs =>
// //           prevJobs.map(job =>
// //             job._id === jobId ? { ...job, isClosed: true } : job
// //           )
// //         );
// //       } else {
// //         alert(data.error || 'Failed to close the job.');
// //       }
// //     } catch (err) {
// //       console.error('Error closing job:', err);
// //       alert('An error occurred while closing the job.');
// //     }
// //   };

// //   const fetchApplicants = async (jobId, jobTitle = '') => {
// //     setLoadingApplicants(true);
// //     setSelectedJobId(jobId);
// //     setSelectedJobTitle(jobTitle);
// //     setShowModal(true);

// //     try {
// //       const res = await fetch(`http://localhost:5000/api/applications/${jobId}`);
// //       const data = await res.json();
// //       setApplicants(data.applications || []);
// //     } catch (err) {
// //       console.error('Error fetching applicants:', err);
// //       setApplicants([]);
// //     } finally {
// //       setLoadingApplicants(false);
// //     }
// //   };

// //   const downloadApplicantsPDF = async (jobId, jobTitle) => {
// //     try {
// //       const res = await fetch(`http://localhost:5000/api/applications/${jobId}/pdf`, {
// //         method: 'GET'
// //       });

// //       if (res.ok) {
// //         const blob = await res.blob();
// //         const url = window.URL.createObjectURL(blob);
// //         const a = document.createElement('a');
// //         a.style.display = 'none';
// //         a.href = url;
// //         a.download = `${jobTitle}_applicants.pdf`;
// //         document.body.appendChild(a);
// //         a.click();
// //         window.URL.revokeObjectURL(url);
// //         document.body.removeChild(a);
// //       } else {
// //         alert('Failed to download PDF');
// //       }
// //     } catch (err) {
// //       console.error('Error downloading PDF:', err);
// //       alert('Error downloading PDF');
// //     }
// //   };

// //   // New function to open/download resume
// //   const handleViewResume = (resumeUrl, candidateName) => {
// //     if (!resumeUrl) {
// //       alert('Resume not available for this applicant.');
// //       return;
// //     }

// //     try {
// //       // Create full URL for the resume
// //       const fullResumeUrl = `http://localhost:5000${resumeUrl}`;
      
// //       // Open resume in new tab
// //       window.open(fullResumeUrl, '_blank');
// //     } catch (err) {
// //       console.error('Error opening resume:', err);
// //       alert('Error opening resume.');
// //     }
// //   };

// //   // Alternative function to download resume
// //   const handleDownloadResume = async (resumeUrl, candidateName) => {
// //     if (!resumeUrl) {
// //       alert('Resume not available for this applicant.');
// //       return;
// //     }

// //     try {
// //       const fullResumeUrl = `http://localhost:5000${resumeUrl}`;
// //       const response = await fetch(fullResumeUrl);
      
// //       if (!response.ok) {
// //         throw new Error('Failed to fetch resume');
// //       }

// //       const blob = await response.blob();
// //       const url = window.URL.createObjectURL(blob);
// //       const a = document.createElement('a');
// //       a.style.display = 'none';
// //       a.href = url;
      
// //       // Extract file extension from resumeUrl or use default
// //       const fileExtension = resumeUrl.split('.').pop() || 'pdf';
// //       a.download = `${candidateName.replace(/\s+/g, '_')}_Resume.${fileExtension}`;
      
// //       document.body.appendChild(a);
// //       a.click();
// //       window.URL.revokeObjectURL(url);
// //       document.body.removeChild(a);
// //     } catch (err) {
// //       console.error('Error downloading resume:', err);
// //       alert('Error downloading resume.');
// //     }
// //   };

// //   const closeModal = () => {
// //     setShowModal(false);
// //     setSelectedJobId(null);
// //     setSelectedJobTitle('');
// //     setApplicants([]);
// //   };

// //   const getStatusClass = (status) => {
// //     switch (status) {
// //       case 'Approved': return 'status-approved';
// //       case 'Rejected': return 'status-rejected';
// //       default: return 'status-pending';
// //     }
// //   };

// //   return (
// //     <Layout>
// //       <div className="recruiter-console">
// //         <div className="console-header">
// //           <h2>Job Management Dashboard</h2>
// //           <p>Manage your posted jobs and review applications</p>
// //         </div>

// //         {loading ? (
// //           <div className="loading-container">
// //             <div className="loading-spinner"></div>
// //             <p>Loading jobs...</p>
// //           </div>
// //         ) : error ? (
// //           <div className="error-container">
// //             <p className="error-message">{error}</p>
// //           </div>
// //         ) : (
// //           <div className="jobs-grid">
// //             {jobs.length === 0 ? (
// //               <div className="no-jobs">
// //                 <h3>No jobs posted yet</h3>
// //                 <p>Start by posting your first job to attract candidates.</p>
// //               </div>
// //             ) : (
// //               jobs.map(job => (
// //                 <div key={job._id} className="job-card">
// //                   <div className="job-header">
// //                     <div className="job-title-section">
// //                       <div className="applicant-count-badge">
// //                         {jobApplicantCounts[job._id] || 0}
// //                       </div>
// //                       <h3 className="job-title">{job.title}</h3>
// //                     </div>
// //                     <span className="job-role">{job.role}</span>
// //                   </div>
// //                   <div className="job-content">
// //                     <p className="job-description">{job.description}</p>
// //                     <div className="job-details">
// //                       <div className="detail-item">
// //                         <span className="detail-label">Skills:</span>
// //                         <span className="detail-value">{job.skills}</span>
// //                       </div>
// //                       <div className="detail-item">
// //                         <span className="detail-label">Experience:</span>
// //                         <span className="detail-value">{job.experience}</span>
// //                       </div>
// //                       <div className="detail-item">
// //                         <span className="detail-label">Posted:</span>
// //                         <span className="detail-value">{new Date(job.postedAt).toLocaleDateString('en-GB')}</span>
// //                       </div>
// //                       <div className="detail-item">
// //                         <span className="detail-label">Applications:</span>
// //                         <span className="detail-value applicant-count-text">
// //                           {jobApplicantCounts[job._id] || 0} applicant{jobApplicantCounts[job._id] !== 1 ? 's' : ''}
// //                         </span>
// //                       </div>
// //                     </div>
// //                   </div>
// //                   <div className="job-actions">
// //                     <button className="btn btn-primary" onClick={() => fetchApplicants(job._id, job.title)}>View Applications</button>
// //                     <button className="btn btn-secondary" onClick={() => downloadApplicantsPDF(job._id, job.title)}>Download PDF</button>
// //                     <button
// //                       className={`btn ${job.isClosed ? 'btn-disabled' : 'btn-danger'}`}
// //                       onClick={() => handleCloseJob(job._id)}
// //                       disabled={job.isClosed}
// //                     >
// //                       {job.isClosed ? 'Closed' : 'Close Job'}
// //                     </button>
// //                   </div>
// //                 </div>
// //               ))
// //             )}
// //           </div>
// //         )}

// //         {showModal && (
// //           <div className="modal-overlay" onClick={closeModal}>
// //             <div className="modal-content" onClick={e => e.stopPropagation()}>
// //               <div className="modal-header">
// //                 <h3>Applications for: {selectedJobTitle}</h3>
// //                 <button className="close-btn" onClick={closeModal}>×</button>
// //               </div>
// //               <div className="modal-body">
// //                 {loadingApplicants ? (
// //                   <div className="loading-container">
// //                     <div className="loading-spinner"></div>
// //                     <p>Loading applicants...</p>
// //                   </div>
// //                 ) : applicants.length === 0 ? (
// //                   <div className="no-applicants">
// //                     <h4>No applications yet</h4>
// //                     <p>This job hasn't received any applications.</p>
// //                   </div>
// //                 ) : (
// //                   <div className="applicants-list">
// //                     {applicants.map((app, i) => (
// //                       <div key={i} className="applicant-card">
// //                         <div className="applicant-header">
// //                           <div className="applicant-info">
// //                             <h4>{app.candidateName}</h4>
// //                             <p className="applicant-email">{app.email}</p>
// //                           </div>
// //                           <div className={`status-badge ${getStatusClass(app.result?.status)}`}>
// //                             {app.result?.status || 'Pending'}
// //                           </div>
// //                         </div>
// //                         <div className="applicant-details">
// //                           {app.result?.match && (
// //                             <div className="match-score">
// //                               <span className="match-label">Match Score: {app.result.match}%</span>
// //                               <div className="match-bar">
// //                                 <div className="match-fill" style={{ width: `${app.result.match}%` }}></div>
// //                                 <span className="match-percentage">{app.result.match}%</span>
// //                               </div>
// //                             </div>
// //                           )}
// //                           {app.result?.reason && (
// //                             <div className="reason-section">
// //                               <span className="reason-label">Assessment:</span>
// //                               <p className="reason-text">{app.result.reason}</p>
// //                             </div>
// //                           )}
// //                           <div className="resume-section">
// //                             <span className="resume-label">Resume:</span>
// //                             <div className="resume-actions">
// //                               {app.resumeUrl ? (
// //                                 <>
// //                                   <button 
// //                                     className="btn btn-view-resume" 
// //                                     onClick={() => handleViewResume(app.resumeUrl, app.candidateName)}
// //                                     title="Open resume in new tab"
// //                                   >
// //                                     📄 View Resume
// //                                   </button>
// //                                   <button 
// //                                     className="btn btn-download-resume" 
// //                                     onClick={() => handleDownloadResume(app.resumeUrl, app.candidateName)}
// //                                     title="Download resume"
// //                                   >
// //                                     ⬇️ Download
// //                                   </button>
// //                                 </>
// //                               ) : (
// //                                 <span className="no-resume-text">Resume not available</span>
// //                               )}
// //                             </div>
// //                           </div>
// //                         </div>
// //                         <div className="applicant-actions">
// //                           <button 
// //                             className={`btn ${app.result?.status === 'Approved' ? 'btn-success-disabled' : 'btn-success'}`} 
// //                             onClick={() => updateStatus(app._id, 'Approved')} 
// //                             disabled={app.result?.status === 'Approved'}
// //                           >
// //                             {app.result?.status === 'Approved' ? '✓ Approved' : 'Approve'}
// //                           </button>
// //                           <button 
// //                             className={`btn ${app.result?.status === 'Rejected' ? 'btn-danger-disabled' : 'btn-danger'}`} 
// //                             onClick={() => updateStatus(app._id, 'Rejected')} 
// //                             disabled={app.result?.status === 'Rejected'}
// //                           >
// //                             {app.result?.status === 'Rejected' ? '✗ Rejected' : 'Reject'}
// //                           </button>
// //                         </div>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </Layout>
// //   );
// // };

// // export default RecruiterConsole;


// import React, { useEffect, useState } from 'react';
// import Layout from './RecruiterLayout';
// import './RecruiterConsole.css';

// const RecruiterConsole = () => {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [selectedJobId, setSelectedJobId] = useState(null);
//   const [selectedJobTitle, setSelectedJobTitle] = useState('');
//   const [applicants, setApplicants] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [loadingApplicants, setLoadingApplicants] = useState(false);
//   const [jobApplicantCounts, setJobApplicantCounts] = useState({});
  
//   // New state for bulk actions
//   const [selectedApplicants, setSelectedApplicants] = useState(new Set());
//   const [bulkActionLoading, setBulkActionLoading] = useState(false);
//   const [selectAll, setSelectAll] = useState(false);
//   const [selectByNumber, setSelectByNumber] = useState('');

//   useEffect(() => {
//     const fetchJobsWithCounts = async () => {
//       try {
//         const res = await fetch('http://localhost:5000/api/jobs');
//         const data = await res.json();
//         const jobsData = data.jobs || [];
//         setJobs(jobsData);

//         const counts = {};
//         await Promise.all(
//           jobsData.map(async (job) => {
//             try {
//               const applicantRes = await fetch(`http://localhost:5000/api/applications/${job._id}`);
//               const applicantData = await applicantRes.json();
//               counts[job._id] = applicantData.applications?.length || 0;
//             } catch (err) {
//               console.error(`Error fetching count for job ${job._id}:`, err);
//               counts[job._id] = 0;
//             }
//           })
//         );
//         setJobApplicantCounts(counts);
//       } catch (err) {
//         setError('Error fetching jobs');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchJobsWithCounts();
//   }, []);

//   const updateStatus = async (applicationId, status) => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/applications/${applicationId}/status`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ status }),
//       });

//       const data = await res.json();
//       if (data.success) {
//         fetchApplicants(selectedJobId);
//       } else {
//         console.error('Failed to update status:', data.error);
//         alert('Failed to update status.');
//       }
//     } catch (err) {
//       console.error('Error updating status:', err);
//       alert('Error updating status.');
//     }
//   };

//   // New bulk status update function
//   const updateBulkStatus = async (applicationIds, status) => {
//     setBulkActionLoading(true);
//     try {
//       const res = await fetch('http://localhost:5000/api/applications/bulk-status', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ applicationIds, status }),
//       });

//       const data = await res.json();
//       if (data.success) {
//         alert(`Successfully ${status.toLowerCase()} ${applicationIds.length} applicant(s)!`);
//         fetchApplicants(selectedJobId);
//         setSelectedApplicants(new Set());
//         setSelectAll(false);
//       } else {
//         console.error('Failed to update bulk status:', data.error);
//         alert('Failed to update applicant statuses.');
//       }
//     } catch (err) {
//       console.error('Error updating bulk status:', err);
//       alert('Error updating applicant statuses.');
//     } finally {
//       setBulkActionLoading(false);
//     }
//   };

//   const handleCloseJob = async (jobId) => {
//     const confirmClose = window.confirm('Are you sure you want to close this job and reject all pending applicants?');
//     if (!confirmClose) return;

//     try {
//       const res = await fetch(`http://localhost:5000/api/jobs/${jobId}/close`, {
//         method: 'PUT'
//       });

//       const data = await res.json();

//       if (res.ok && data.success) {
//         alert('Job closed and pending applicants rejected.');
//         setJobs(prevJobs =>
//           prevJobs.map(job =>
//             job._id === jobId ? { ...job, isClosed: true } : job
//           )
//         );
//       } else {
//         alert(data.error || 'Failed to close the job.');
//       }
//     } catch (err) {
//       console.error('Error closing job:', err);
//       alert('An error occurred while closing the job.');
//     }
//   };

//   const fetchApplicants = async (jobId, jobTitle = '') => {
//     setLoadingApplicants(true);
//     setSelectedJobId(jobId);
//     setSelectedJobTitle(jobTitle);
//     setShowModal(true);
//     setSelectedApplicants(new Set());
//     setSelectAll(false);
//     setSelectByNumber('');

//     try {
//       const res = await fetch(`http://localhost:5000/api/applications/${jobId}`);
//       const data = await res.json();
//       setApplicants(data.applications || []);
//     } catch (err) {
//       console.error('Error fetching applicants:', err);
//       setApplicants([]);
//     } finally {
//       setLoadingApplicants(false);
//     }
//   };

//   const downloadApplicantsPDF = async (jobId, jobTitle) => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/applications/${jobId}/pdf`, {
//         method: 'GET'
//       });

//       if (res.ok) {
//         const blob = await res.blob();
//         const url = window.URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.style.display = 'none';
//         a.href = url;
//         a.download = `${jobTitle}_applicants.pdf`;
//         document.body.appendChild(a);
//         a.click();
//         window.URL.revokeObjectURL(url);
//         document.body.removeChild(a);
//       } else {
//         alert('Failed to download PDF');
//       }
//     } catch (err) {
//       console.error('Error downloading PDF:', err);
//       alert('Error downloading PDF');
//     }
//   };

//   const handleViewResume = (resumeUrl, candidateName) => {
//     if (!resumeUrl) {
//       alert('Resume not available for this applicant.');
//       return;
//     }

//     try {
//       const fullResumeUrl = `http://localhost:5000${resumeUrl}`;
//       window.open(fullResumeUrl, '_blank');
//     } catch (err) {
//       console.error('Error opening resume:', err);
//       alert('Error opening resume.');
//     }
//   };

//   const handleDownloadResume = async (resumeUrl, candidateName) => {
//     if (!resumeUrl) {
//       alert('Resume not available for this applicant.');
//       return;
//     }

//     try {
//       const fullResumeUrl = `http://localhost:5000${resumeUrl}`;
//       const response = await fetch(fullResumeUrl);
      
//       if (!response.ok) {
//         throw new Error('Failed to fetch resume');
//       }

//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.style.display = 'none';
//       a.href = url;
      
//       const fileExtension = resumeUrl.split('.').pop() || 'pdf';
//       a.download = `${candidateName.replace(/\s+/g, '_')}_Resume.${fileExtension}`;
      
//       document.body.appendChild(a);
//       a.click();
//       window.URL.revokeObjectURL(url);
//       document.body.removeChild(a);
//     } catch (err) {
//       console.error('Error downloading resume:', err);
//       alert('Error downloading resume.');
//     }
//   };

//   // New checkbox handling functions
//   const handleSelectApplicant = (applicationId) => {
//     const newSelected = new Set(selectedApplicants);
//     if (newSelected.has(applicationId)) {
//       newSelected.delete(applicationId);
//     } else {
//       newSelected.add(applicationId);
//     }
//     setSelectedApplicants(newSelected);
    
//     // Update select all state
//     setSelectAll(newSelected.size === getSelectableApplicants().length && getSelectableApplicants().length > 0);
    
//     // Clear number input if manual selection is made
//     setSelectByNumber('');
//   };

//   const handleSelectAll = () => {
//     if (selectAll) {
//       setSelectedApplicants(new Set());
//       setSelectAll(false);
//     } else {
//       const allIds = new Set(getSelectableApplicants().map(app => app._id));
//       setSelectedApplicants(allIds);
//       setSelectAll(true);
//     }
//     setSelectByNumber('');
//   };

//   // New function to select top N applicants by match score
//   const handleSelectByNumber = (number) => {
//     const num = parseInt(number);
//     if (isNaN(num) || num <= 0) {
//       setSelectedApplicants(new Set());
//       setSelectAll(false);
//       return;
//     }

//     const selectableApplicants = getSelectableApplicants();
    
//     // Sort by match score descending and take top N
//     const sortedApplicants = [...selectableApplicants].sort((a, b) => {
//       const matchA = parseInt(a.result?.match || '0');
//       const matchB = parseInt(b.result?.match || '0');
//       return matchB - matchA;
//     });
    
//     const topN = sortedApplicants.slice(0, Math.min(num, sortedApplicants.length));
//     const topNIds = new Set(topN.map(app => app._id));
    
//     setSelectedApplicants(topNIds);
//     setSelectAll(topNIds.size === selectableApplicants.length && selectableApplicants.length > 0);
//   };

//   const handleNumberInputChange = (e) => {
//     const value = e.target.value;
//     setSelectByNumber(value);
    
//     if (value === '') {
//       setSelectedApplicants(new Set());
//       setSelectAll(false);
//     } else {
//       handleSelectByNumber(value);
//     }
//   };

//   // Filter applicants by pending status for bulk actions
//   const getSelectableApplicants = () => {
//     return applicants.filter(app => !app.result?.status || app.result.status === 'Pending');
//   };

//   const handleBulkApprove = () => {
//     const selectedArray = Array.from(selectedApplicants);
//     if (selectedArray.length === 0) {
//       alert('Please select at least one applicant to approve.');
//       return;
//     }
    
//     const confirmApprove = window.confirm(`Are you sure you want to approve ${selectedArray.length} applicant(s)?`);
//     if (confirmApprove) {
//       updateBulkStatus(selectedArray, 'Approved');
//     }
//   };

//   const handleBulkReject = () => {
//     const selectedArray = Array.from(selectedApplicants);
//     if (selectedArray.length === 0) {
//       alert('Please select at least one applicant to reject.');
//       return;
//     }
    
//     const confirmReject = window.confirm(`Are you sure you want to reject ${selectedArray.length} applicant(s)?`);
//     if (confirmReject) {
//       updateBulkStatus(selectedArray, 'Rejected');
//     }
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setSelectedJobId(null);
//     setSelectedJobTitle('');
//     setApplicants([]);
//     setSelectedApplicants(new Set());
//     setSelectAll(false);
//     setSelectByNumber('');
//   };

//   const getStatusClass = (status) => {
//     switch (status) {
//       case 'Approved': return 'status-approved';
//       case 'Rejected': return 'status-rejected';
//       default: return 'status-pending';
//     }
//   };

//   return (
//     <Layout>
//       <div className="recruiter-console">
//         <div className="console-header">
//           <h2>Job Management Dashboard</h2>
//           <p>Manage your posted jobs and review applications</p>
//         </div>

//         {loading ? (
//           <div className="loading-container">
//             <div className="loading-spinner"></div>
//             <p>Loading jobs...</p>
//           </div>
//         ) : error ? (
//           <div className="error-container">
//             <p className="error-message">{error}</p>
//           </div>
//         ) : (
//           <div className="jobs-grid">
//             {jobs.length === 0 ? (
//               <div className="no-jobs">
//                 <h3>No jobs posted yet</h3>
//                 <p>Start by posting your first job to attract candidates.</p>
//               </div>
//             ) : (
//               jobs.map(job => (
//                 <div key={job._id} className="job-card">
//                   <div className="job-header">
//                     <div className="job-title-section">
//                       <div className="applicant-count-badge">
//                         {jobApplicantCounts[job._id] || 0}
//                       </div>
//                       <h3 className="job-title">{job.title}</h3>
//                     </div>
//                     <span className="job-role">{job.role}</span>
//                   </div>
//                   <div className="job-content">
//                     <p className="job-description">{job.description}</p>
//                     <div className="job-details">
//                       <div className="detail-item">
//                         <span className="detail-label">Skills:</span>
//                         <span className="detail-value">{job.skills}</span>
//                       </div>
//                       <div className="detail-item">
//                         <span className="detail-label">Experience:</span>
//                         <span className="detail-value">{job.experience}</span>
//                       </div>
//                       <div className="detail-item">
//                         <span className="detail-label">Posted:</span>
//                         <span className="detail-value">{new Date(job.postedAt).toLocaleDateString('en-GB')}</span>
//                       </div>
//                       <div className="detail-item">
//                         <span className="detail-label">Applications:</span>
//                         <span className="detail-value applicant-count-text">
//                           {jobApplicantCounts[job._id] || 0} applicant{jobApplicantCounts[job._id] !== 1 ? 's' : ''}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="job-actions">
//                     <button className="btn btn-primary" onClick={() => fetchApplicants(job._id, job.title)}>View Applications</button>
//                     <button className="btn btn-secondary" onClick={() => downloadApplicantsPDF(job._id, job.title)}>Download PDF</button>
//                     <button
//                       className={`btn ${job.isClosed ? 'btn-disabled' : 'btn-danger'}`}
//                       onClick={() => handleCloseJob(job._id)}
//                       disabled={job.isClosed}
//                     >
//                       {job.isClosed ? 'Closed' : 'Close Job'}
//                     </button>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         )}

//         {showModal && (
//           <div className="modal-overlay" onClick={closeModal}>
//             <div className="modal-content" onClick={e => e.stopPropagation()}>
//               <div className="modal-header">
//                 <h3>Applications for: {selectedJobTitle}</h3>
//                 <button className="close-btn" onClick={closeModal}>×</button>
//               </div>
//               <div className="modal-body">
//                 {loadingApplicants ? (
//                   <div className="loading-container">
//                     <div className="loading-spinner"></div>
//                     <p>Loading applicants...</p>
//                   </div>
//                 ) : applicants.length === 0 ? (
//                   <div className="no-applicants">
//                     <h4>No applications yet</h4>
//                     <p>This job hasn't received any applications.</p>
//                   </div>
//                 ) : (
//                   <div className="applicants-section">
//                     {/* Bulk Actions Header */}
//                     <div className="bulk-actions-header">
//                       <div className="selection-controls">
//                         <label className="select-all-checkbox">
//                           <input
//                             type="checkbox"
//                             checked={selectAll}
//                             onChange={handleSelectAll}
//                           />
//                           <span className="checkmark"></span>
//                           Select All ({getSelectableApplicants().length} pending)
//                         </label>
                        
//                         <div className="number-selector">
//                           <label htmlFor="selectNumber" className="number-label">
//                             Select Top:
//                           </label>
//                           <input
//                             id="selectNumber"
//                             type="number"
//                             min="1"
//                             max={getSelectableApplicants().length}
//                             value={selectByNumber}
//                             onChange={handleNumberInputChange}
//                             placeholder="Enter number"
//                             className="number-input"
//                           />
//                           <span className="number-helper">
//                             (by match score)
//                           </span>
//                         </div>
                        
//                         <span className="selected-count">
//                           {selectedApplicants.size} selected
//                         </span>
//                       </div>
                      
//                       {selectedApplicants.size > 0 && (
//                         <div className="bulk-action-buttons">
//                           <button
//                             className="btn btn-bulk-approve"
//                             onClick={handleBulkApprove}
//                             disabled={bulkActionLoading}
//                           >
//                             {bulkActionLoading ? 'Processing...' : `✓ Approve Selected (${selectedApplicants.size})`}
//                           </button>
//                           <button
//                             className="btn btn-bulk-reject"
//                             onClick={handleBulkReject}
//                             disabled={bulkActionLoading}
//                           >
//                             {bulkActionLoading ? 'Processing...' : `✗ Reject Selected (${selectedApplicants.size})`}
//                           </button>
//                         </div>
//                       )}
//                     </div>

//                     <div className="applicants-list">
//                       {applicants.map((app, i) => (
//                         <div key={i} className={`applicant-card ${selectedApplicants.has(app._id) ? 'selected' : ''}`}>
//                           <div className="applicant-header">
//                             <div className="applicant-selector">
//                               {(!app.result?.status || app.result.status === 'Pending') && (
//                                 <label className="applicant-checkbox">
//                                   <input
//                                     type="checkbox"
//                                     checked={selectedApplicants.has(app._id)}
//                                     onChange={() => handleSelectApplicant(app._id)}
//                                   />
//                                   <span className="checkmark"></span>
//                                 </label>
//                               )}
//                             </div>
//                             <div className="applicant-info">
//                               <h4>{app.candidateName}</h4>
//                               <p className="applicant-email">{app.email}</p>
//                             </div>
//                             <div className={`status-badge ${getStatusClass(app.result?.status)}`}>
//                               {app.result?.status || 'Pending'}
//                             </div>
//                           </div>
//                           <div className="applicant-details">
//                             {app.result?.match && (
//                               <div className="match-score">
//                                 <span className="match-label">Match Score: {app.result.match}%</span>
//                                 <div className="match-bar">
//                                   <div className="match-fill" style={{ width: `${app.result.match}%` }}></div>
//                                   <span className="match-percentage">{app.result.match}%</span>
//                                 </div>
//                               </div>
//                             )}
//                             {app.result?.reason && (
//                               <div className="reason-section">
//                                 <span className="reason-label">Assessment:</span>
//                                 <p className="reason-text">{app.result.reason}</p>
//                               </div>
//                             )}
//                             <div className="resume-section">
//                               <span className="resume-label">Resume:</span>
//                               <div className="resume-actions">
//                                 {app.resumeUrl ? (
//                                   <>
//                                     <button 
//                                       className="btn btn-view-resume" 
//                                       onClick={() => handleViewResume(app.resumeUrl, app.candidateName)}
//                                       title="Open resume in new tab"
//                                     >
//                                       📄 View Resume
//                                     </button>
//                                     <button 
//                                       className="btn btn-download-resume" 
//                                       onClick={() => handleDownloadResume(app.resumeUrl, app.candidateName)}
//                                       title="Download resume"
//                                     >
//                                       ⬇️ Download
//                                     </button>
//                                   </>
//                                 ) : (
//                                   <span className="no-resume-text">Resume not available</span>
//                                 )}
//                               </div>
//                             </div>
//                           </div>
//                           <div className="applicant-actions">
//                             <button 
//                               className={`btn ${app.result?.status === 'Approved' ? 'btn-success-disabled' : 'btn-success'}`} 
//                               onClick={() => updateStatus(app._id, 'Approved')} 
//                               disabled={app.result?.status === 'Approved'}
//                             >
//                               {app.result?.status === 'Approved' ? '✓ Approved' : 'Approve'}
//                             </button>
//                             <button 
//                               className={`btn ${app.result?.status === 'Rejected' ? 'btn-danger-disabled' : 'btn-danger'}`} 
//                               onClick={() => updateStatus(app._id, 'Rejected')} 
//                               disabled={app.result?.status === 'Rejected'}
//                             >
//                               {app.result?.status === 'Rejected' ? '✗ Rejected' : 'Reject'}
//                             </button>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </Layout>
//   );
// };

// export default RecruiterConsole;


import React, { useEffect, useState } from 'react';
import Layout from './RecruiterLayout';
import './RecruiterConsole.css';

const RecruiterConsole = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [selectedJobTitle, setSelectedJobTitle] = useState('');
  const [applicants, setApplicants] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loadingApplicants, setLoadingApplicants] = useState(false);
  const [jobApplicantCounts, setJobApplicantCounts] = useState({});
  
  // Filter states
  const [filters, setFilters] = useState({
    searchTerm: '',
    role: '',
    experience: '',
    status: 'all', // all, active, closed
    sortBy: 'newest', // newest, oldest, mostApplicants, leastApplicants, title
    applicantCount: 'all' // all, hasApplicants, noApplicants
  });
  const [showFilters, setShowFilters] = useState(false);
  
  // New state for bulk actions
  const [selectedApplicants, setSelectedApplicants] = useState(new Set());
  const [bulkActionLoading, setBulkActionLoading] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectByNumber, setSelectByNumber] = useState('');

  useEffect(() => {
    const fetchJobsWithCounts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/jobs');
        const data = await res.json();
        const jobsData = data.jobs || [];
        setJobs(jobsData);

        const counts = {};
        await Promise.all(
          jobsData.map(async (job) => {
            try {
              const applicantRes = await fetch(`http://localhost:5000/api/applications/${job._id}`);
              const applicantData = await applicantRes.json();
              counts[job._id] = applicantData.applications?.length || 0;
            } catch (err) {
              console.error(`Error fetching count for job ${job._id}:`, err);
              counts[job._id] = 0;
            }
          })
        );
        setJobApplicantCounts(counts);
      } catch (err) {
        setError('Error fetching jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJobsWithCounts();
  }, []);

  // Filter and sort jobs whenever jobs, filters, or applicant counts change
  useEffect(() => {
    let filtered = [...jobs];

    // Apply search filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchLower) ||
        job.role.toLowerCase().includes(searchLower) ||
        job.description.toLowerCase().includes(searchLower) ||
        job.skills.toLowerCase().includes(searchLower)
      );
    }

    // Apply role filter
    if (filters.role) {
      filtered = filtered.filter(job => 
        job.role.toLowerCase().includes(filters.role.toLowerCase())
      );
    }

    // Apply experience filter
    if (filters.experience) {
      filtered = filtered.filter(job => 
        job.experience.toLowerCase().includes(filters.experience.toLowerCase())
      );
    }

    // Apply status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(job => {
        if (filters.status === 'active') return !job.isClosed;
        if (filters.status === 'closed') return job.isClosed;
        return true;
      });
    }

    // Apply applicant count filter
    if (filters.applicantCount !== 'all') {
      filtered = filtered.filter(job => {
        const count = jobApplicantCounts[job._id] || 0;
        if (filters.applicantCount === 'hasApplicants') return count > 0;
        if (filters.applicantCount === 'noApplicants') return count === 0;
        return true;
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const countA = jobApplicantCounts[a._id] || 0;
      const countB = jobApplicantCounts[b._id] || 0;
      
      switch (filters.sortBy) {
        case 'oldest':
          return new Date(a.postedAt) - new Date(b.postedAt);
        case 'newest':
          return new Date(b.postedAt) - new Date(a.postedAt);
        case 'mostApplicants':
          return countB - countA;
        case 'leastApplicants':
          return countA - countB;
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return new Date(b.postedAt) - new Date(a.postedAt);
      }
    });

    setFilteredJobs(filtered);
  }, [jobs, filters, jobApplicantCounts]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      searchTerm: '',
      role: '',
      experience: '',
      status: 'all',
      sortBy: 'newest',
      applicantCount: 'all'
    });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.searchTerm) count++;
    if (filters.role) count++;
    if (filters.experience) count++;
    if (filters.status !== 'all') count++;
    if (filters.applicantCount !== 'all') count++;
    return count;
  };

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

  // New bulk status update function
  const updateBulkStatus = async (applicationIds, status) => {
    setBulkActionLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/applications/bulk-status', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ applicationIds, status }),
      });

      const data = await res.json();
      if (data.success) {
        alert(`Successfully ${status.toLowerCase()} ${applicationIds.length} applicant(s)!`);
        fetchApplicants(selectedJobId);
        setSelectedApplicants(new Set());
        setSelectAll(false);
      } else {
        console.error('Failed to update bulk status:', data.error);
        alert('Failed to update applicant statuses.');
      }
    } catch (err) {
      console.error('Error updating bulk status:', err);
      alert('Error updating applicant statuses.');
    } finally {
      setBulkActionLoading(false);
    }
  };

  const handleCloseJob = async (jobId) => {
    const confirmClose = window.confirm('Are you sure you want to close this job and reject all pending applicants?');
    if (!confirmClose) return;

    try {
      const res = await fetch(`http://localhost:5000/api/jobs/${jobId}/close`, {
        method: 'PUT'
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert('Job closed and pending applicants rejected.');
        setJobs(prevJobs =>
          prevJobs.map(job =>
            job._id === jobId ? { ...job, isClosed: true } : job
          )
        );
      } else {
        alert(data.error || 'Failed to close the job.');
      }
    } catch (err) {
      console.error('Error closing job:', err);
      alert('An error occurred while closing the job.');
    }
  };

  const fetchApplicants = async (jobId, jobTitle = '') => {
    setLoadingApplicants(true);
    setSelectedJobId(jobId);
    setSelectedJobTitle(jobTitle);
    setShowModal(true);
    setSelectedApplicants(new Set());
    setSelectAll(false);
    setSelectByNumber('');

    try {
      const res = await fetch(`http://localhost:5000/api/applications/${jobId}`);
      const data = await res.json();
      setApplicants(data.applications || []);
    } catch (err) {
      console.error('Error fetching applicants:', err);
      setApplicants([]);
    } finally {
      setLoadingApplicants(false);
    }
  };

  const downloadApplicantsPDF = async (jobId, jobTitle) => {
    try {
      const res = await fetch(`http://localhost:5000/api/applications/${jobId}/pdf`, {
        method: 'GET'
      });

      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `${jobTitle}_applicants.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        alert('Failed to download PDF');
      }
    } catch (err) {
      console.error('Error downloading PDF:', err);
      alert('Error downloading PDF');
    }
  };

  const handleViewResume = (resumeUrl, candidateName) => {
    if (!resumeUrl) {
      alert('Resume not available for this applicant.');
      return;
    }

    try {
      const fullResumeUrl = `http://localhost:5000${resumeUrl}`;
      window.open(fullResumeUrl, '_blank');
    } catch (err) {
      console.error('Error opening resume:', err);
      alert('Error opening resume.');
    }
  };

  const handleDownloadResume = async (resumeUrl, candidateName) => {
    if (!resumeUrl) {
      alert('Resume not available for this applicant.');
      return;
    }

    try {
      const fullResumeUrl = `http://localhost:5000${resumeUrl}`;
      const response = await fetch(fullResumeUrl);
      
      if (!response.ok) {
        throw new Error('Failed to fetch resume');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      
      const fileExtension = resumeUrl.split('.').pop() || 'pdf';
      a.download = `${candidateName.replace(/\s+/g, '_')}_Resume.${fileExtension}`;
      
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Error downloading resume:', err);
      alert('Error downloading resume.');
    }
  };

  // New checkbox handling functions
  const handleSelectApplicant = (applicationId) => {
    const newSelected = new Set(selectedApplicants);
    if (newSelected.has(applicationId)) {
      newSelected.delete(applicationId);
    } else {
      newSelected.add(applicationId);
    }
    setSelectedApplicants(newSelected);
    
    // Update select all state
    setSelectAll(newSelected.size === getSelectableApplicants().length && getSelectableApplicants().length > 0);
    
    // Clear number input if manual selection is made
    setSelectByNumber('');
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedApplicants(new Set());
      setSelectAll(false);
    } else {
      const allIds = new Set(getSelectableApplicants().map(app => app._id));
      setSelectedApplicants(allIds);
      setSelectAll(true);
    }
    setSelectByNumber('');
  };

  // New function to select top N applicants by match score
  const handleSelectByNumber = (number) => {
    const num = parseInt(number);
    if (isNaN(num) || num <= 0) {
      setSelectedApplicants(new Set());
      setSelectAll(false);
      return;
    }

    const selectableApplicants = getSelectableApplicants();
    
    // Sort by match score descending and take top N
    const sortedApplicants = [...selectableApplicants].sort((a, b) => {
      const matchA = parseInt(a.result?.match || '0');
      const matchB = parseInt(b.result?.match || '0');
      return matchB - matchA;
    });
    
    const topN = sortedApplicants.slice(0, Math.min(num, sortedApplicants.length));
    const topNIds = new Set(topN.map(app => app._id));
    
    setSelectedApplicants(topNIds);
    setSelectAll(topNIds.size === selectableApplicants.length && selectableApplicants.length > 0);
  };

  const handleNumberInputChange = (e) => {
    const value = e.target.value;
    setSelectByNumber(value);
    
    if (value === '') {
      setSelectedApplicants(new Set());
      setSelectAll(false);
    } else {
      handleSelectByNumber(value);
    }
  };

  // Filter applicants by pending status for bulk actions
  const getSelectableApplicants = () => {
    return applicants.filter(app => !app.result?.status || app.result.status === 'Pending');
  };

  const handleBulkApprove = () => {
    const selectedArray = Array.from(selectedApplicants);
    if (selectedArray.length === 0) {
      alert('Please select at least one applicant to approve.');
      return;
    }
    
    const confirmApprove = window.confirm(`Are you sure you want to approve ${selectedArray.length} applicant(s)?`);
    if (confirmApprove) {
      updateBulkStatus(selectedArray, 'Approved');
    }
  };

  const handleBulkReject = () => {
    const selectedArray = Array.from(selectedApplicants);
    if (selectedArray.length === 0) {
      alert('Please select at least one applicant to reject.');
      return;
    }
    
    const confirmReject = window.confirm(`Are you sure you want to reject ${selectedArray.length} applicant(s)?`);
    if (confirmReject) {
      updateBulkStatus(selectedArray, 'Rejected');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedJobId(null);
    setSelectedJobTitle('');
    setApplicants([]);
    setSelectedApplicants(new Set());
    setSelectAll(false);
    setSelectByNumber('');
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Approved': return 'status-approved';
      case 'Rejected': return 'status-rejected';
      default: return 'status-pending';
    }
  };

  return (
    <Layout>
      <div className="recruiter-console">
        <div className="console-header">
          <div className="header-content">
            <div className="header-text">
              <h2>Job Management Dashboard</h2>
              <p>Manage your posted jobs and review applications</p>
            </div>
            <div className="header-stats">
              <div className="stat-card">
                <div className="stat-number">{jobs.length}</div>
                <div className="stat-label">Total Jobs</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{jobs.filter(job => !job.isClosed).length}</div>
                <div className="stat-label">Active Jobs</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">
                  {Object.values(jobApplicantCounts).reduce((sum, count) => sum + count, 0)}
                </div>
                <div className="stat-label">Total Applications</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="filter-section">
          <div className="filter-header">
            <div className="filter-search">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search jobs by title, role, skills, or description..."
                  value={filters.searchTerm}
                  onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                  className="search-input"
                />
                <div className="search-icon">🔍</div>
              </div>
            </div>
            <div className="filter-actions">
              <button 
                className={`filter-toggle-btn ${showFilters ? 'active' : ''}`}
                onClick={() => setShowFilters(!showFilters)}
              >
                <span>Filters</span>
                {getActiveFilterCount() > 0 && (
                  <span className="filter-count">{getActiveFilterCount()}</span>
                )}
                <span className={`filter-arrow ${showFilters ? 'up' : 'down'}`}>▼</span>
              </button>
              {getActiveFilterCount() > 0 && (
                <button className="clear-filters-btn" onClick={clearFilters}>
                  Clear All
                </button>
              )}
            </div>
          </div>

          {showFilters && (
            <div className="filter-controls">
              <div className="filter-row">
                <div className="filter-group">
                  <label>Role</label>
                  <input
                    type="text"
                    placeholder="e.g., Frontend Developer"
                    value={filters.role}
                    onChange={(e) => handleFilterChange('role', e.target.value)}
                    className="filter-input"
                  />
                </div>
                <div className="filter-group">
                  <label>Experience</label>
                  <input
                    type="text"
                    placeholder="e.g., 2-3 years"
                    value={filters.experience}
                    onChange={(e) => handleFilterChange('experience', e.target.value)}
                    className="filter-input"
                  />
                </div>
                <div className="filter-group">
                  <label>Status</label>
                  <select
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">All Jobs</option>
                    <option value="active">Active Only</option>
                    <option value="closed">Closed Only</option>
                  </select>
                </div>
                <div className="filter-group">
                  <label>Applications</label>
                  <select
                    value={filters.applicantCount}
                    onChange={(e) => handleFilterChange('applicantCount', e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">All Jobs</option>
                    <option value="hasApplicants">With Applications</option>
                    <option value="noApplicants">No Applications</option>
                  </select>
                </div>
                <div className="filter-group">
                  <label>Sort By</label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                    className="filter-select"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="mostApplicants">Most Applications</option>
                    <option value="leastApplicants">Least Applications</option>
                    <option value="title">Title A-Z</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          <div className="results-summary">
            <span className="results-count">
              Showing {filteredJobs.length} of {jobs.length} jobs
            </span>
            {getActiveFilterCount() > 0 && (
              <div className="active-filters">
                {filters.searchTerm && (
                  <span className="filter-tag">
                    Search: "{filters.searchTerm}"
                    <button onClick={() => handleFilterChange('searchTerm', '')}>×</button>
                  </span>
                )}
                {filters.role && (
                  <span className="filter-tag">
                    Role: "{filters.role}"
                    <button onClick={() => handleFilterChange('role', '')}>×</button>
                  </span>
                )}
                {filters.experience && (
                  <span className="filter-tag">
                    Experience: "{filters.experience}"
                    <button onClick={() => handleFilterChange('experience', '')}>×</button>
                  </span>
                )}
                {filters.status !== 'all' && (
                  <span className="filter-tag">
                    Status: {filters.status}
                    <button onClick={() => handleFilterChange('status', 'all')}>×</button>
                  </span>
                )}
                {filters.applicantCount !== 'all' && (
                  <span className="filter-tag">
                    Applications: {filters.applicantCount === 'hasApplicants' ? 'With Applications' : 'No Applications'}
                    <button onClick={() => handleFilterChange('applicantCount', 'all')}>×</button>
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading jobs...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p className="error-message">{error}</p>
          </div>
        ) : (
          <div className="jobs-grid">
            {filteredJobs.length === 0 ? (
              <div className="no-jobs">
                {jobs.length === 0 ? (
                  <>
                    <h3>No jobs posted yet</h3>
                    <p>Start by posting your first job to attract candidates.</p>
                  </>
                ) : (
                  <>
                    <h3>No jobs match your filters</h3>
                    <p>Try adjusting your search criteria or clearing some filters.</p>
                    <button className="btn btn-primary" onClick={clearFilters}>
                      Clear All Filters
                    </button>
                  </>
                )}
              </div>
            ) : (
              filteredJobs.map(job => (
                <div key={job._id} className={`job-card ${job.isClosed ? 'closed' : ''}`}>
                  <div className="job-header">
                    <div className="job-title-section">
                      <div className={`applicant-count-badge ${
                        jobApplicantCounts[job._id] === 0 ? 'zero' : 
                        jobApplicantCounts[job._id] > 10 ? 'high' : 'normal'
                      }`}>
                        {jobApplicantCounts[job._id] || 0}
                      </div>
                      <div className="job-title-info">
                        <h3 className="job-title">{job.title}</h3>
                        <span className="job-role">{job.role}</span>
                      </div>
                    </div>
                    <div className="job-status-badges">
                      {job.isClosed && <span className="status-badge closed">Closed</span>}
                      <span className="date-badge">
                        {new Date(job.postedAt).toLocaleDateString('en-GB')}
                      </span>
                    </div>
                  </div>
                  <div className="job-content">
                    <p className="job-description">{job.description}</p>
                    <div className="job-details">
                      <div className="detail-item">
                        <span className="detail-label">Skills:</span>
                        <span className="detail-value">{job.skills}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Experience:</span>
                        <span className="detail-value">{job.experience}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Applications:</span>
                        <span className="detail-value applicant-count-text">
                          {jobApplicantCounts[job._id] || 0} applicant{jobApplicantCounts[job._id] !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="job-actions">
                    <button 
                      className="btn btn-primary" 
                      onClick={() => fetchApplicants(job._id, job.title)}
                    >
                      View Applications
                    </button>
                    <button 
                      className="btn btn-secondary" 
                      onClick={() => downloadApplicantsPDF(job._id, job.title)}
                    >
                      Download PDF
                    </button>
                    <button
                      className={`btn ${job.isClosed ? 'btn-disabled' : 'btn-danger'}`}
                      onClick={() => handleCloseJob(job._id)}
                      disabled={job.isClosed}
                    >
                      {job.isClosed ? 'Closed' : 'Close Job'}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {showModal && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Applications for: {selectedJobTitle}</h3>
                <button className="close-btn" onClick={closeModal}>×</button>
              </div>
              <div className="modal-body">
                {loadingApplicants ? (
                  <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading applicants...</p>
                  </div>
                ) : applicants.length === 0 ? (
                  <div className="no-applicants">
                    <h4>No applications yet</h4>
                    <p>This job hasn't received any applications.</p>
                  </div>
                ) : (
                  <div className="applicants-section">
                    {/* Bulk Actions Header */}
                    <div className="bulk-actions-header">
                      <div className="selection-controls">
                        <label className="select-all-checkbox">
                          <input
                            type="checkbox"
                            checked={selectAll}
                            onChange={handleSelectAll}
                          />
                          <span className="checkmark"></span>
                          Select All ({getSelectableApplicants().length} pending)
                        </label>
                        
                        <div className="number-selector">
                          <label htmlFor="selectNumber" className="number-label">
                            Select Top:
                          </label>
                          <input
                            id="selectNumber"
                            type="number"
                            min="1"
                            max={getSelectableApplicants().length}
                            value={selectByNumber}
                            onChange={handleNumberInputChange}
                            placeholder="Enter number"
                            className="number-input"
                          />
                          <span className="number-helper">
                            (by match score)
                          </span>
                        </div>
                        
                        <span className="selected-count">
                          {selectedApplicants.size} selected
                        </span>
                      </div>
                      
                      {selectedApplicants.size > 0 && (
                        <div className="bulk-action-buttons">
                          <button
                            className="btn btn-bulk-approve"
                            onClick={handleBulkApprove}
                            disabled={bulkActionLoading}
                          >
                            {bulkActionLoading ? 'Processing...' : `✓ Approve Selected (${selectedApplicants.size})`}
                          </button>
                          <button
                            className="btn btn-bulk-reject"
                            onClick={handleBulkReject}
                            disabled={bulkActionLoading}
                          >
                            {bulkActionLoading ? 'Processing...' : `✗ Reject Selected (${selectedApplicants.size})`}
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="applicants-list">
                      {applicants.map((app, i) => (
                        <div key={i} className={`applicant-card ${selectedApplicants.has(app._id) ? 'selected' : ''}`}>
                          <div className="applicant-header">
                            <div className="applicant-selector">
                              {(!app.result?.status || app.result.status === 'Pending') && (
                                <label className="applicant-checkbox">
                                  <input
                                    type="checkbox"
                                    checked={selectedApplicants.has(app._id)}
                                    onChange={() => handleSelectApplicant(app._id)}
                                  />
                                  <span className="checkmark"></span>
                                </label>
                              )}
                            </div>
                            <div className="applicant-info">
                              <h4>{app.candidateName}</h4>
                              <p className="applicant-email">{app.email}</p>
                            </div>
                            <div className={`status-badge ${getStatusClass(app.result?.status)}`}>
                              {app.result?.status || 'Pending'}
                            </div>
                          </div>
                          <div className="applicant-details">
                            {app.result?.match && (
                              <div className="match-score">
                                <span className="match-label">Match Score: {app.result.match}%</span>
                                <div className="match-bar">
                                  <div className="match-fill" style={{ width: `${app.result.match}%` }}></div>
                                  <span className="match-percentage">{app.result.match}%</span>
                                </div>
                              </div>
                            )}
                            {app.result?.reason && (
                              <div className="reason-section">
                                <span className="reason-label">Assessment:</span>
                                <p className="reason-text">{app.result.reason}</p>
                              </div>
                            )}
                            <div className="resume-section">
                              <span className="resume-label">Resume:</span>
                              <div className="resume-actions">
                                {app.resumeUrl ? (
                                  <>
                                    <button 
                                      className="btn btn-view-resume" 
                                      onClick={() => handleViewResume(app.resumeUrl, app.candidateName)}
                                      title="Open resume in new tab"
                                    >
                                      📄 View Resume
                                    </button>
                                    <button 
                                      className="btn btn-download-resume" 
                                      onClick={() => handleDownloadResume(app.resumeUrl, app.candidateName)}
                                      title="Download resume"
                                    >
                                      ⬇️ Download
                                    </button>
                                  </>
                                ) : (
                                  <span className="no-resume-text">Resume not available</span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="applicant-actions">
                            <button 
                              className={`btn ${app.result?.status === 'Approved' ? 'btn-success-disabled' : 'btn-success'}`} 
                              onClick={() => updateStatus(app._id, 'Approved')} 
                              disabled={app.result?.status === 'Approved'}
                            >
                              {app.result?.status === 'Approved' ? '✓ Approved' : 'Approve'}
                            </button>
                            <button 
                              className={`btn ${app.result?.status === 'Rejected' ? 'btn-danger-disabled' : 'btn-danger'}`} 
                              onClick={() => updateStatus(app._id, 'Rejected')} 
                              disabled={app.result?.status === 'Rejected'}
                            >
                              {app.result?.status === 'Rejected' ? '✗ Rejected' : 'Reject'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default RecruiterConsole;