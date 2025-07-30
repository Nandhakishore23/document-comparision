
import React, { useEffect, useState } from 'react';
import Layout from './RecruiterLayout';


const RecruiterConsole = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/jobs');
        if (res.ok) {
          const data = await res.json();
          setJobs(data.jobs || []);
        } else {
          setError('Failed to fetch jobs');
        }
      } catch (err) {
        setError('Error fetching jobs');
      }
      setLoading(false);
    };
    fetchJobs();
  }, []);

  return (
    <Layout>
      <div className="recruiter-console">
        <h2>Posted Jobs</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : jobs.length === 0 ? (
          <p>No jobs posted yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Role</th>
                <th>Description</th>
                <th>Skills</th>
                <th>Experience</th>
                <th>Posted At</th>
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
                  <td>{new Date(job.postedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
};

export default RecruiterConsole