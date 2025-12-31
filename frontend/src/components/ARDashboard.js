import React, { useEffect, useState } from 'react';
import Bot from './Chatbot';
import Layout from './Layout';
import './ARDashboard.css';
import BASE_URL from '../apiConfig';

const ARDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resume, setResume] = useState(null);
  const [error, setError] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const [userResumes, setUserResumes] = useState([]);
  const [selectedResumeId, setSelectedResumeId] = useState('');
  const [hasExistingResume, setHasExistingResume] = useState(false);
  const [useExistingResume, setUseExistingResume] = useState(false);
  const [isLoadingResumes, setIsLoadingResumes] = useState(false);

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [sortBy, setSortBy] = useState('title');

  // State to store user's applied jobs
  const [myApplications, setMyApplications] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      window.location.href = '/login';
    } else {
      // Fetch User's Applications
      const fetchMyApplications = async () => {
        try {
          const res = await fetch(`${BASE_URL}/api/applications/user/${user._id}`);
          const data = await res.json();
          if (data.success) {
            const appMap = {};
            data.applications.forEach(app => {
              if (app.jobId) {
                // Handle populated or direct ID
                const jId = app.jobId._id || app.jobId;
                appMap[jId] = app;
              }
            });
            setMyApplications(appMap);
          }
        } catch (error) {
          console.error('Error fetching applications:', error);
        }
      };
      fetchMyApplications();
    }
  }, []);

  // Fetch jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/jobs`);
        const data = await response.json();

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
        setFilteredJobs(openJobs);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Failed to load jobs from server.');
      }
    };

    fetchJobs();
  }, []);

  // Filter and search jobs
  useEffect(() => {
    let filtered = [...jobs];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (job.description && job.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (job.skills && job.skills.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Role filter
    if (selectedRole) {
      filtered = filtered.filter(job =>
        job.role.toLowerCase().includes(selectedRole.toLowerCase())
      );
    }

    // Experience filter
    if (selectedExperience) {
      filtered = filtered.filter(job => {
        if (!job.experience) return selectedExperience === 'not-specified';
        const exp = job.experience.toLowerCase();
        switch (selectedExperience) {
          case 'entry':
            return exp.includes('entry') || exp.includes('0-1') || exp.includes('fresher');
          case 'junior':
            return exp.includes('1-3') || exp.includes('junior');
          case 'mid':
            return exp.includes('3-5') || exp.includes('mid') || exp.includes('senior');
          case 'senior':
            return exp.includes('5+') || exp.includes('senior') || exp.includes('lead');
          case 'not-specified':
            return !job.experience;
          default:
            return true;
        }
      });
    }

    // Sort jobs
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'role':
          return a.role.localeCompare(b.role);
        case 'experience':
          return (a.experience || '').localeCompare(b.experience || '');
        default:
          return 0;
      }
    });

    setFilteredJobs(filtered);
  }, [jobs, searchQuery, selectedRole, selectedExperience, sortBy]);

  // Get unique roles for filter dropdown
  const getUniqueRoles = () => {
    const roles = jobs.map(job => job.role);
    return [...new Set(roles)].sort();
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedRole('');
    setSelectedExperience('');
    setSortBy('title');
  };

  // Check if user has existing resumes
  const checkUserResumes = async (userId) => {
    setIsLoadingResumes(true);
    try {
      const response = await fetch(`${BASE_URL}/api/resumes/${userId}`);
      const data = await response.json();

      if (response.ok) {
        setUserResumes(data);
        setHasExistingResume(data.length > 0);
        if (data.length > 0) {
          setSelectedResumeId(data[0]._id); // Select first resume by default
        }
      } else {
        console.error('Error fetching resumes:', data.error);
      }
    } catch (err) {
      console.error('Error checking user resumes:', err);
    } finally {
      setIsLoadingResumes(false);
    }
  };

  const handleJobClick = async (job) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user._id) {
      alert('User not found. Please login again.');
      return;
    }

    setSelectedJob(job);
    setIsModalOpen(true);
    setResume(null);
    setUseExistingResume(false);

    // Only fetch resumes if NOT already applied
    if (!myApplications[job._id]) {
      await checkUserResumes(user._id);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
    setResume(null);
    setUserResumes([]);
    setHasExistingResume(false);
    setUseExistingResume(false);
    setSelectedResumeId('');
  };

  const handleResumeChange = (e) => {
    setResume(e.target.files[0]);
    setUseExistingResume(false); // If uploading new resume, don't use existing one
  };

  const handleUseExistingResume = () => {
    setUseExistingResume(true);
    setResume(null); // Clear any uploaded file
  };

  const handleUploadNewResume = () => {
    setUseExistingResume(false);
    setResume(null);
  };

  const handleApply = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user._id || !user.name || !user.email) {
      alert('User not found. Please login again.');
      return;
    }

    // Check if user has selected a resume (either existing or uploaded new one)
    if (!useExistingResume && !resume) {
      alert('Please upload a resume or select an existing one before applying.');
      return;
    }

    if (useExistingResume && !selectedResumeId) {
      alert('Please select a resume from your existing resumes.');
      return;
    }

    setIsApplying(true);

    try {
      let resumeData;

      if (useExistingResume) {
        // Get the existing resume data
        const resumeResponse = await fetch(`${BASE_URL}/api/resumes/download/${selectedResumeId}`);
        if (!resumeResponse.ok) {
          throw new Error('Failed to fetch existing resume');
        }
        const resumeBlob = await resumeResponse.blob();
        const selectedResume = userResumes.find(r => r._id === selectedResumeId);
        resumeData = new File([resumeBlob], selectedResume.filename, { type: selectedResume.contentType });
      } else {
        resumeData = resume;
      }

      const formData = new FormData();
      formData.append('resume', resumeData);
      formData.append('jobId', selectedJob._id);
      formData.append('userId', user._id);
      formData.append('candidateName', user.name);
      formData.append('email', user.email);
      formData.append('jobTitle', selectedJob.title);
      formData.append('jobRole', selectedJob.role);
      formData.append('jobDescription', selectedJob.description);
      formData.append('skills', selectedJob.skills || '');
      formData.append('experience', selectedJob.experience || '');

      // NEW: Internal AI Endpoint
      const aiRes = await fetch(`${BASE_URL}/api/ai/analyze`, {
        method: 'POST',
        body: formData,
      });

      const aiData = await aiRes.json();

      if (!aiRes.ok || !aiData.success) {
        throw new Error(aiData.error || 'AI Analysis failed');
      }

      // Save application in MongoDB
      const saveRes = await fetch(`${BASE_URL}/api/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user._id,
          candidateName: user.name,
          email: user.email,
          jobId: selectedJob._id,
          result: aiData.analysis, // Send clean JSON object
        }),
      });

      if (saveRes.status === 409) {
        alert('You have already applied for this job.');
        return;
      }

      const saveData = await saveRes.json();
      if (saveRes.ok) {
        alert('Applied Successfully!');

        // Update local state immediately so UI reflects "Applied"
        setMyApplications(prev => ({
          ...prev,
          [selectedJob._id]: {
            result: aiData.analysis,
            status: 'Applied',
            jobId: selectedJob._id
          }
        }));

        closeModal();
      } else {
        alert(saveData.error || 'Failed to store application.');
      }

    } catch (error) {
      console.error('Application error:', error);
      alert(`Error occurred: ${error.message}`);
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <Layout>
      <div className="ardashboard">
        <div className="dashboard-header">
          <h1 className="main-title">Job Opportunities</h1>
          <p className="subtitle">Discover your next career move</p>
        </div>

        {/* Search and Filter Section */}
        <div className="search-filter-section">
          <div className="search-bar-container">
            <div className="search-input-wrapper">
              <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search jobs by title, role, skills, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="clear-search-btn"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          <div className="filters-row">
            <div className="filter-group">
              <label className="filter-label">Role</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="filter-select"
              >
                <option value="">All Roles</option>
                {getUniqueRoles().map((role) => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Experience Level</label>
              <select
                value={selectedExperience}
                onChange={(e) => setSelectedExperience(e.target.value)}
                className="filter-select"
              >
                <option value="">All Levels</option>
                <option value="entry">Entry Level (0-1 years)</option>
                <option value="junior">Junior (1-3 years)</option>
                <option value="mid">Mid Level (3-5 years)</option>
                <option value="senior">Senior (5+ years)</option>
                <option value="not-specified">Not Specified</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                <option value="title">Job Title</option>
                <option value="role">Role</option>
                <option value="experience">Experience</option>
              </select>
            </div>

            {(searchQuery || selectedRole || selectedExperience || sortBy !== 'title') && (
              <button onClick={clearFilters} className="clear-filters-btn">
                Clear Filters
              </button>
            )}
          </div>

          <div className="results-summary">
            <span className="results-count">
              {filteredJobs.length} of {jobs.length} jobs
            </span>
            {searchQuery && (
              <span className="search-query">
                for "{searchQuery}"
              </span>
            )}
          </div>
        </div>

        {error && (
          <div className="error-container">
            <div className="error-icon">⚠️</div>
            <p className="error-message">{error}</p>
          </div>
        )}

        <div className="jobs-grid">
          {Array.isArray(filteredJobs) && filteredJobs.map((job) => (
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
                {myApplications[job._id] ? (
                  <button className="apply-btn disabled" disabled>✓ Application Sent</button>
                ) : (
                  <button className="apply-btn">View Details & Apply</button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && !error && jobs.length > 0 && (
          <div className="no-results-container">
            <div className="no-results-icon">🔍</div>
            <h3>No jobs found</h3>
            <p>Try adjusting your search criteria or filters</p>
            <button onClick={clearFilters} className="clear-filters-btn-alt">
              Clear All Filters
            </button>
          </div>
        )}

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
                  <h3>{myApplications[selectedJob._id] ? 'Application Status' : 'Apply for this position'}</h3>

                  {myApplications[selectedJob._id] ? (
                    <div className="already-applied-view" style={{ textAlign: 'center', padding: '30px', backgroundColor: '#f0fdf4', borderRadius: '12px', border: '2px solid #86efac' }}>
                      <div style={{ fontSize: '50px', marginBottom: '15px' }}>🎉</div>
                      <h4 style={{ color: '#166534', margin: '0 0 10px 0', fontSize: '24px' }}>Application Submitted!</h4>
                      <p style={{ color: '#374151', fontSize: '16px' }}>You have already applied for this position <strong>{new Date(myApplications[selectedJob._id].appliedAt || Date.now()).toLocaleDateString()}</strong>.</p>
                    </div>
                  ) : (
                    <>
                      {isLoadingResumes ? (
                        <div className="loading-resumes">
                          <span className="loading-spinner"></span>
                          <span>Checking your resumes...</span>
                        </div>
                      ) : (
                        <>
                          {hasExistingResume && (
                            <div className="resume-options">
                              <div className="option-buttons">
                                <button
                                  className={`option-btn ${useExistingResume ? 'active' : ''}`}
                                  onClick={handleUseExistingResume}
                                >
                                  Use Existing Resume
                                </button>
                                <button
                                  className={`option-btn ${!useExistingResume ? 'active' : ''}`}
                                  onClick={handleUploadNewResume}
                                >
                                  Upload New Resume
                                </button>
                              </div>
                            </div>
                          )}

                          {useExistingResume && hasExistingResume ? (
                            <div className="existing-resumes-section">
                              <h4>Select from your existing resumes:</h4>
                              <div className="resume-select-container">
                                <select
                                  value={selectedResumeId}
                                  onChange={(e) => setSelectedResumeId(e.target.value)}
                                  className="resume-select"
                                >
                                  {userResumes.map((resume) => (
                                    <option key={resume._id} value={resume._id}>
                                      {resume.filename}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              {selectedResumeId && (
                                <div className="selected-resume-info">
                                  <span className="file-icon">✓</span>
                                  <span>Selected: {userResumes.find(r => r._id === selectedResumeId)?.filename}</span>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="file-upload-container">
                              <label htmlFor="resume-upload" className="file-upload-label">
                                <div className="upload-icon">📄</div>
                                <div className="upload-text">
                                  <span className="upload-title">
                                    {hasExistingResume ? 'Upload New Resume' : 'Upload Resume'}
                                  </span>
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
                          )}

                          {resume && (
                            <div className="selected-file">
                              <span className="file-icon">✓</span>
                              <span className="file-name">{resume.name}</span>
                              <span className="file-size">({(resume.size / 1024 / 1024).toFixed(2)} MB)</span>
                            </div>
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>

              <div className="modal-footer">
                {!myApplications[selectedJob._id] && (
                  <>
                    <button className="cancel-btn" onClick={closeModal}>Cancel</button>
                    <button
                      className="submit-application-btn"
                      onClick={handleApply}
                      disabled={(!resume && !useExistingResume) || isApplying || isLoadingResumes}
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
                  </>
                )}
                {myApplications[selectedJob._id] && (
                  <button className="cancel-btn" onClick={closeModal}>Close</button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <Bot />
    </Layout>
  );
};

export default ARDashboard;