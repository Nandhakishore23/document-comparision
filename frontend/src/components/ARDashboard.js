import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import './ARDashboard.css'; // Optional styling

const ARDashboard = () => {
  const [jobs, setJobs] = useState([]); // ✅ Ensure jobs is an array
  const [selectedJob, setSelectedJob] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/jobs');
        if (!res.ok) {
          throw new Error('Failed to fetch jobs');
        }

        const data = await res.json();
        console.log('Fetched jobs:', data); // 🔍 Debug response

        // ✅ If backend returns { jobs: [...] }
        const jobList = Array.isArray(data) ? data : data.jobs;
        setJobs(jobList);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Error fetching jobs');
      }
    };

    fetchJobs();
  }, []);

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  const handleApply = async () => {
  const user = JSON.parse(localStorage.getItem('user')); // 👈 fetch logged-in user
  if (!user || !user._id || !user.name || !user.email) {
    alert('User not found. Please login again.');
    return;
  }

  try {
    const res = await fetch('http://localhost:5678/webhook/test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jobId: selectedJob._id,
        userId: user._id,                  // 👈 use actual ID
        candidateName: user.name, 
        jobRole:selectedJob.role,        // 👈 use actual name
        jobDescription:selectedJob.description,                // 👈 use actual email
      }),
    });

    const result = await res.json();
    if (res.ok) {
      alert('Applied Successfully!');
    } else {
      alert(result.error || 'Failed to apply.');
    }
  } catch (error) {
    console.error('Application error:', error);
    alert('Error occurred while applying.');
  }
};



  return (
    <Layout>
      <div className="ardashboard">
        <h2>Jobs Posted by Recruiter</h2>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div className="job-container">
          <div className="job-list">
            {Array.isArray(jobs) && jobs.length > 0 ? (
              jobs.map((job) => (
                <div
                  key={job._id}
                  className="job-card"
                  onClick={() => handleJobClick(job)}
                >
                  <h3>{job.title}</h3>
                  <p>{job.role}</p>
                  <p><strong>Posted on:</strong> {new Date(job.postedAt).toLocaleDateString('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric'
})}</p>

                  
                </div>
              ))
            ) : (
              <p>No jobs found.</p>
            )}
          </div>

          {selectedJob && (
            <div className="job-details">
              <h3>{selectedJob.title}</h3>
              <p><strong>Role:</strong> {selectedJob.role}</p>
              <p><strong>Description:</strong> {selectedJob.description}</p>
              <p><strong>Skills:</strong> {selectedJob.skills}</p>
              <p><strong>Experience:</strong> {selectedJob.experience}</p>
              <p><strong>Posted on:</strong> {new Date(selectedJob.postedAt).toLocaleDateString('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric'
})}</p>

              <button onClick={handleApply}>Apply</button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ARDashboard;
