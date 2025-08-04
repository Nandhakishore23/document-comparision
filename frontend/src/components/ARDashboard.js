// import React, { useEffect, useState } from 'react';
// import Layout from './Layout';
// import './ARDashboard.css'; // Optional styling

// const ARDashboard = () => {
//   const [jobs, setJobs] = useState([]); // ✅ Ensure jobs is an array
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const res = await fetch('http://localhost:5000/api/jobs');
//         if (!res.ok) {
//           throw new Error('Failed to fetch jobs');
//         }

//         const data = await res.json();
//         console.log('Fetched jobs:', data); // 🔍 Debug response

//         // ✅ If backend returns { jobs: [...] }
//         const jobList = Array.isArray(data) ? data : data.jobs;
//         setJobs(jobList);
//       } catch (err) {
//         console.error('Error fetching jobs:', err);
//         setError('Error fetching jobs');
//       }
//     };

//     fetchJobs();
//   }, []);

//   const handleJobClick = (job) => {
//     setSelectedJob(job);
//   };

// //   const handleApply = async () => {
// //   const user = JSON.parse(localStorage.getItem('user')); // 👈 fetch logged-in user
// //   if (!user || !user._id || !user.name || !user.email) {
// //     alert('User not found. Please login again.');
// //     return;
// //   }

// //   try {
// //     const res = await fetch('http://localhost:5678/webhook/test', {
// //       method: 'POST',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify({
// //         jobId: selectedJob._id,
// //         userId: user._id,                  // 👈 use actual ID
// //         candidateName: user.name, 
// //         jobRole:selectedJob.role,        // 👈 use actual name
// //         jobDescription:selectedJob.description,                // 👈 use actual email
// //       }),
// //     });

// //     const result = await res.json();
// //     if (res.ok) {
// //       alert('Applied Successfully!');
// //     } else {
// //       alert(result.error || 'Failed to apply.');
// //     }
// //   } catch (error) {
// //     console.error('Application error:', error);
// //     alert('Error occurred while applying.');
// //   }
// // };

// const handleApply = async () => {
//   const user = JSON.parse(localStorage.getItem('user'));
//   if (!user || !user._id || !user.name || !user.email) {
//     alert('User not found. Please login again.');
//     return;
//   }

//   try {
//     const res = await fetch('http://localhost:5678/webhook/test', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         jobId: selectedJob._id,
//         userId: user._id,
//         candidateName: user.name,
//         email: user.email,
//         jobRole: selectedJob.role,
//         jobDescription: selectedJob.description,
//       }),
//     });

//     const contentType = res.headers.get('content-type');
//     const result = contentType?.includes('application/json') ? await res.json() : null;

//     if (res.ok) {
//       // Save to MongoDB
//       const saveRes = await fetch('http://localhost:5000/api/applications', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           userId: user._id,
//           candidateName: user.name,
//           email: user.email,
//           jobId: selectedJob._id,
//           result: result || { raw: 'No result from n8n' }
//         }),
//       });

//       const saveData = await saveRes.json();
//       if (saveRes.ok) {
//         alert('Applied Successfully!');
//       } else {
//         alert(saveData.error || 'Failed to store application.');
//       }
//     } else {
//       alert('n8n returned an error');
//     }
//   } catch (error) {
//     console.error('Application error:', error);
//     alert('Error occurred while applying.');
//   }
// };



//   return (
//     <Layout>
//       <div className="ardashboard">
//         <h2>Jobs Posted by Recruiter</h2>

//         {error && <p style={{ color: 'red' }}>{error}</p>}

//         <div className="job-container">
//           <div className="job-list">
//             {Array.isArray(jobs) && jobs.length > 0 ? (
//               jobs.map((job) => (
//                 <div
//                   key={job._id}
//                   className="job-card"
//                   onClick={() => handleJobClick(job)}
//                 >
//                   <h3>{job.title}</h3>
//                   <p>{job.role}</p>
//                   <p><strong>Posted on:</strong> {new Date(job.postedAt).toLocaleDateString('en-GB', {
//   day: '2-digit',
//   month: 'short',
//   year: 'numeric'
// })}</p>

                  
//                 </div>
//               ))
//             ) : (
//               <p>No jobs found.</p>
//             )}
//           </div>

//           {selectedJob && (
//             <div className="job-details">
//               <h3>{selectedJob.title}</h3>
//               <p><strong>Role:</strong> {selectedJob.role}</p>
//               <p><strong>Description:</strong> {selectedJob.description}</p>
//               <p><strong>Skills:</strong> {selectedJob.skills}</p>
//               <p><strong>Experience:</strong> {selectedJob.experience}</p>
//               <p><strong>Posted on:</strong> {new Date(selectedJob.postedAt).toLocaleDateString('en-GB', {
//   day: '2-digit',
//   month: 'short',
//   year: 'numeric'
// })}</p>

//               <button onClick={handleApply}>Apply</button>
//             </div>
//           )}
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default ARDashboard;

// import React, { useEffect, useState } from 'react';
// import Layout from './Layout';
// import './ARDashboard.css';

// const ARDashboard = () => {
//   const [jobs, setJobs] = useState([]);
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [resume, setResume] = useState(null);
//   const [error, setError] = useState('');

//   // Fetch jobs from backend
//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/jobs');
//         const data = await response.json();
//         console.log('Fetched jobs:', data);

//         if (Array.isArray(data)) {
//           setJobs(data);
//         } else if (Array.isArray(data.jobs)) {
//           setJobs(data.jobs);
//         } else {
//           setError('Unexpected response format from server.');
//         }
//       } catch (err) {
//         console.error('Error fetching jobs:', err);
//         setError('Failed to load jobs from server.');
//       }
//     };

//     fetchJobs();
//   }, []);

//   const handleJobClick = (job) => {
//     setSelectedJob(job);
//   };

//   const handleResumeChange = (e) => {
//     setResume(e.target.files[0]);
//   };

//   const handleApply = async () => {
//     const user = JSON.parse(localStorage.getItem('user'));
//     if (!user || !user._id || !user.name || !user.email) {
//       alert('User not found. Please login again.');
//       return;
//     }

//     if (!resume) {
//       alert('Please upload a resume before applying.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('resume', resume); // Using state here
//     formData.append('jobId', selectedJob._id);
//     formData.append('userId', user._id);
//     formData.append('candidateName', user.name);
//     formData.append('email', user.email);
//     formData.append('jobRole', selectedJob.role);
//     formData.append('jobDescription', selectedJob.description);
//     formData.append('skills', selectedJob.skills || '');
//     //vyfewvyviyvewfv
//     formData.append('experience', selectedJob.experience || '');

//     try {
//       // Send to n8n webhook
//       const res = await fetch('http://localhost:5678/webhook-test/test', {
//         method: 'POST',
//         body: formData,
//       });

//       const result = await res.text();

//       if (res.ok) {
//         // Save application in MongoDB
//         const saveRes = await fetch('http://localhost:5000/api/applications', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({
//     userId: user._id,
//     candidateName: user.name,
//     email: user.email,
//     jobId: selectedJob._id,
//     result: [result], // <- wrap in array
//   }),
// });



//         const saveData = await saveRes.json();
//         if (saveRes.ok) {
//           alert('Applied Successfully!');
//         } else {
//           alert(saveData.error || 'Failed to store application.');
//         }
//       } else {
//         alert('n8n returned an error');
//       }
//     } catch (error) {
//       console.error('Application error:', error);
//       alert('Error occurred while applying.');
//     }
//   };

//   return (
//     <Layout>
//       <div className="ardashboard">
//         <h2>Jobs Posted by Recruiter</h2>
//         {error && <p style={{ color: 'red' }}>{error}</p>}

//         <div className="job-container">
//           <div className="job-list">
//             {Array.isArray(jobs) && jobs.map((job) => (
//               <div
//                 key={job._id}
//                 className="job-card"
//                 onClick={() => handleJobClick(job)}
//               >
//                 <h3>{job.title}</h3>
//                 <p>{job.role}</p>
//               </div>
//             ))}
//           </div>

//           {selectedJob && (
//             <div className="job-details">
//               <h3>{selectedJob.title}</h3>
//               <p><strong>Role:</strong> {selectedJob.role}</p>
//               <p><strong>Description:</strong> {selectedJob.description}</p>

//               <input
//                 type="file"
//                 onChange={handleResumeChange}
//                 accept=".pdf,.doc,.docx"
//               />

//               {resume && <p style={{ marginTop: '5px' }}>Selected file: {resume.name}</p>}

//               <button onClick={handleApply}>Apply</button>
//             </div>
//           )}
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default ARDashboard;



import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import './ARDashboard.css';

const ARDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resume, setResume] = useState(null);
  const [error, setError] = useState('');
  const [isApplying, setIsApplying] = useState(false);

  // Fetch jobs from backend
  // useEffect(() => {
  //   const fetchJobs = async () => {
  //     try {
  //       const response = await fetch('http://localhost:5000/api/jobs');
  //       const data = await response.json();
  //       console.log('Fetched jobs:', data);

  //       if (Array.isArray(data)) {
  //         setJobs(data);
  //       } else if (Array.isArray(data.jobs)) {
  //         setJobs(data.jobs);
  //       } else {
  //         setError('Unexpected response format from server.');
  //       }
  //     } catch (err) {
  //       console.error('Error fetching jobs:', err);
  //       setError('Failed to load jobs from server.');
  //     }
  //   };

  //   fetchJobs();
  // }, []);

useEffect(() => {
  const fetchJobs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/jobs');
      const data = await response.json();
      console.log('Fetched jobs:', data);

      // Ensure you're filtering out closed jobs
      let jobsList = [];
      if (Array.isArray(data)) {
        jobsList = data;
      } else if (Array.isArray(data.jobs)) {
        jobsList = data.jobs;
      } else {
        setError('Unexpected response format from server.');
        return;
      }

      // ✅ Filter out closed jobs
      const openJobs = jobsList.filter(job => !job.isClosed);
      setJobs(openJobs);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError('Failed to load jobs from server.');
    }
  };

  fetchJobs();
}, []);


  const handleJobClick = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
    setResume(null); // Reset resume when opening new job
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
    setResume(null);
  };

  const handleResumeChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleApply = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user._id || !user.name || !user.email) {
      alert('User not found. Please login again.');
      return;
    }

    if (!resume) {
      alert('Please upload a resume before applying.');
      return;
    }

    setIsApplying(true);

    const formData = new FormData();
    formData.append('resume', resume);
    formData.append('jobId', selectedJob._id);
    formData.append('userId', user._id);
    formData.append('candidateName', user.name);
    formData.append('email', user.email);
    formData.append('jobTitle', selectedJob.title);
    formData.append('jobRole', selectedJob.role);
    formData.append('jobDescription', selectedJob.description);
    formData.append('skills', selectedJob.skills || '');
    formData.append('experience', selectedJob.experience || '');

    try {
      // Send to n8n webhook
      const res = await fetch('https://tharunvs.app.n8n.cloud/webhook/test', {
        method: 'POST',
        body: formData,
      });

      const result = await res.text();

      if (res.ok) {
        // Save application in MongoDB
        const saveRes = await fetch('http://localhost:5000/api/applications', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user._id,
            candidateName: user.name,
            email: user.email,
            jobId: selectedJob._id,
            result: [result],
          }),
        });
        if (saveRes.status === 409) {
  alert('You have already applied for this job.');
  return;
}

        const saveData = await saveRes.json();
        if (saveRes.ok) {
          alert('Applied Successfully!');
          closeModal();
        } else {
          alert(saveData.error || 'Failed to store application.');
        }
      } else {
        alert('n8n returned an error');
      }
    } catch (error) {
      console.error('Application error:', error);
      alert('Error occurred while applying.');
    } finally {
      setIsApplying(false);
    }
  };

  


  return (
    <Layout>
      <div className="ardashboard">
        <div className="dashboard-header">
          <h2>Available Job Opportunities</h2>
          <p className="job-count">{jobs.length} jobs available</p>
        </div>

        {error && (
          <div className="error-container">
            <div className="error-icon">⚠️</div>
            <p className="error-message">{error}</p>
          </div>
        )}

        <div className="jobs-grid">
          {Array.isArray(jobs) && jobs.map((job) => (
            <div
              key={job._id}
              className="job-card"
              onClick={() => handleJobClick(job)}
            >
              <div className="job-card-header">
                <h3 className="job-title">{job.title}</h3>
                <div className="job-type-badge">Full Time</div>
              </div>
              
              <div className="job-role">
                <span className="role-icon">💼</span>
                <span>{job.role}</span>
              </div>
              
              <div className="job-experience">
                <span className="exp-icon">📊</span>
                <span>{job.experience || 'Not specified'}</span>
              </div>
              
              <div className="job-skills">
                <span className="skills-icon">🛠️</span>
                <div className="skills-list">
                  {job.skills ? job.skills.split(',').slice(0, 3).map((skill, index) => (
                    <span key={index} className="skill-tag">{skill.trim()}</span>
                  )) : <span>No skills specified</span>}
                  {job.skills && job.skills.split(',').length > 3 && (
                    <span className="more-skills">+{job.skills.split(',').length - 3} more</span>
                  )}
                </div>
              </div>
              
              <div className="job-card-footer">
                <button className="apply-btn">View Details & Apply</button>
              </div>
            </div>
          ))}
        </div>

        {jobs.length === 0 && !error && (
          <div className="no-jobs-container">
            <div className="no-jobs-icon">🔍</div>
            <h3>No Jobs Available</h3>
            <p>Check back later for new opportunities!</p>
          </div>
        )}

        {/* Job Application Modal */}
        {isModalOpen && selectedJob && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{selectedJob.title}</h2>
                <button className="close-btn" onClick={closeModal}>×</button>
              </div>
              
              <div className="modal-body">
                <div className="job-details-section">
                  <div className="detail-row">
                    <span className="detail-label">Role:</span>
                    <span className="detail-value">{selectedJob.role}</span>
                  </div>
                  
                  <div className="detail-row">
                    <span className="detail-label">Experience:</span>
                    <span className="detail-value">{selectedJob.experience || 'Not specified'}</span>
                  </div>
                  
                  <div className="detail-row full-width">
                    <span className="detail-label">Description:</span>
                    <p className="job-description">{selectedJob.description}</p>
                  </div>
                  
                  <div className="detail-row full-width">
                    <span className="detail-label">Required Skills:</span>
                    <div className="modal-skills-list">
                      {selectedJob.skills ? selectedJob.skills.split(',').map((skill, index) => (
                        <span key={index} className="modal-skill-tag">{skill.trim()}</span>
                      )) : <span>No skills specified</span>}
                    </div>
                  </div>
                </div>

                <div className="application-section">
                  <h3>Apply for this position</h3>
                  <div className="file-upload-container">
                    <label htmlFor="resume-upload" className="file-upload-label">
                      <div className="upload-icon">📄</div>
                      <div className="upload-text">
                        <span className="upload-title">Upload Resume</span>
                        <span className="upload-subtitle">PDF, DOC, DOCX files only</span>
                      </div>
                    </label>
                    <input
                      id="resume-upload"
                      type="file"
                      onChange={handleResumeChange}
                      accept=".pdf,.doc,.docx"
                      className="file-input"
                    />
                  </div>

                  {resume && (
                    <div className="selected-file">
                      <span className="file-icon">✓</span>
                      <span className="file-name">{resume.name}</span>
                      <span className="file-size">({(resume.size / 1024 / 1024).toFixed(2)} MB)</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="modal-footer">
                <button className="cancel-btn" onClick={closeModal}>Cancel</button>
                <button 
                  className="submit-application-btn" 
                  onClick={handleApply}
                  disabled={!resume || isApplying}
                >
                  {isApplying ? (
                    <>
                      <span className="loading-spinner"></span>
                      Applying...
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ARDashboard;