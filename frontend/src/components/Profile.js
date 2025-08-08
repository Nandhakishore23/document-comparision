// import React, { useEffect, useState } from 'react';

// const Profile = () => {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         // Replace with actual recruiter ID or authentication logic as needed
//         const res = await fetch('http://localhost:5000/api/User/ar-profile?role=AR%20Requestor');
//         if (res.ok) {
//           const data = await res.json();
//           setProfile(data.user);
//         } else {
//           setError('Failed to fetch profile');
//         }
//       } catch (err) {
//         setError('Error fetching profile');
//       }
//       setLoading(false);
//     };
//     fetchProfile();
//   }, []);

//   return (
//     <div className="recruiter-profile">
//       <h2>Recruiter Profile</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p style={{ color: 'red' }}>{error}</p>
//       ) : profile ? (
//         <div className="profile-details">
//           <p><strong>Username:</strong> {profile.username}</p>
//           <p><strong>Email:</strong> {profile.email}</p>
//           {/* Add more fields as needed */}
//         </div>
//       ) : (
//         <p>No profile data found.</p>
//       )}
//     </div>
//   );
// };

// export default Profile;


// import React, { useEffect, useState } from 'react';
// import Layout from './Layout';
// import './profile.css';

// const Profile = () => {
//   const [profile, setProfile] = useState(null);
//   const [resumeFile, setResumeFile] = useState(null);
//   const [resumes, setResumes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   //onst userId = '6889c717da5503a8e82c4ca5'; // Replace with actual ID logic

//   const user = JSON.parse(localStorage.getItem('user'));
  
//   const userId=user._id;
  
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         //const res = await fetch(`http://localhost:5000/api/User/ar-profile?role=AR%20Requestor`);
//         const res = await fetch(`http://localhost:5000/api/User/ar-profile?email=${user.email}`);

//         const data = await res.json();
//         setProfile(data.user);
//       } catch (err) {
//         setError('Error fetching profile');
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchResumes = async () => {
//       const res = await fetch(`http://localhost:5000/api/resumes/${userId}`);
//       const data = await res.json();
//       setResumes(data);
//     };

//     fetchProfile();
//     fetchResumes();
//   }, []);

  
//   const handleUpload = async () => {
//     const formData = new FormData();
//     formData.append('resume', resumeFile);
//     formData.append('userId', userId);

//     const res = await fetch('http://localhost:5000/api/resumes/upload', {
//       method: 'POST',
//       body: formData,
//     });

//     if (res.ok) {
//       alert('Uploaded');
//       window.location.reload();
//     }
//   };

//   const handleDelete = async (resumeId) => {
//     await fetch(`http://localhost:5000/api/resumes/${resumeId}`, {
//       method: 'DELETE',
//     });
//     window.location.reload();
//   };

//   return (
//     <Layout>
//     <div className="recruiter-profile">
//       <h2>AR Requestor Profile</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p style={{ color: 'red' }}>{error}</p>
//       ) : (
//         <div>
//           <p><strong>Username:</strong>{profile?.username}</p>
//           <p><strong>Email:</strong> {profile?.email}</p>
//         </div>
//       )}

//       <h3>Upload Resume</h3>
//       <input type="file" onChange={(e) => setResumeFile(e.target.files[0])} />
//       <button onClick={handleUpload}>Upload</button>

//       <h3>Your Resumes</h3>
//       <ul>
//         {resumes.map((resume) => (
//           <li key={resume._id}>
//             {resume.filename}{' '}
//             <a href={`http://localhost:5000/api/resumes/download/${resume._id}`} target="_blank" rel="noreferrer">
//               Download
//             </a>{' '}
//             <button onClick={() => handleDelete(resume._id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//     </Layout>
//   );
// };

// export default Profile;


import React, { useEffect, useState } from 'react';
import Bot from './Chatbot';
import Layout from './Layout';
import './profile.css';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user._id;
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/User/ar-profile?email=${user.email}`);
        const data = await res.json();
        setProfile(data.user);
      } catch (err) {
        setError('Error fetching profile');
      } finally {
        setLoading(false);
      }
    };

    const fetchResumes = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/resumes/${userId}`);
        const data = await res.json();
        setResumes(data);
      } catch (err) {
        console.error('Error fetching resumes:', err);
      }
    };

    fetchProfile();
    fetchResumes();
  }, [userId, user.email]);

  const handleUpload = async () => {
    if (!resumeFile) {
      alert('Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('userId', userId);

    try {
      const res = await fetch('http://localhost:5000/api/resumes/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        alert('Resume uploaded successfully!');
        setResumeFile(null);
        // Refresh resumes list
        const resumesRes = await fetch(`http://localhost:5000/api/resumes/${userId}`);
        const resumesData = await resumesRes.json();
        setResumes(resumesData);
      } else {
        alert('Upload failed. Please try again.');
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('Upload failed. Please try again.');
    }
  };

  const handleDelete = async (resumeId) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        await fetch(`http://localhost:5000/api/resumes/${resumeId}`, {
          method: 'DELETE',
        });
        // Refresh resumes list
        const resumesRes = await fetch(`http://localhost:5000/api/resumes/${userId}`);
        const resumesData = await resumesRes.json();
        setResumes(resumesData);
      } catch (err) {
        console.error('Delete error:', err);
        alert('Delete failed. Please try again.');
      }
    }
  };

  return (
    <Layout>
      <div className="recruiter-profile">
        <h2>AR Requestor Profile</h2>
        
        {loading ? (
          <div className="loading-text">Loading your profile...</div>
        ) : error ? (
          <div className="error-text">{error}</div>
        ) : (
          <div className="profile-info">
            <p><strong>Username:</strong> {profile?.username}</p>
            <p><strong>Email:</strong> {profile?.email}</p>
          </div>
        )}

        <div className="upload-section">
          <h3>Upload Resume</h3>
          <div className="file-input-container">
            <input 
              type="file" 
              id="resume-upload"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setResumeFile(e.target.files[0])} 
            />
            <label htmlFor="resume-upload" className="file-input-label">
              {resumeFile ? resumeFile.name : 'Choose Resume File'}
            </label>
          </div>
          <button className="upload-btn" onClick={handleUpload}>
            Upload Resume
          </button>
        </div>

        <div className="resumes-section">
          <h3>Your Resumes</h3>
          {resumes.length === 0 ? (
            <div className="empty-resumes">
              No resumes uploaded yet. Upload your first resume above!
            </div>
          ) : (
            <ul className="resumes-list">
              {resumes.map((resume) => (
                <li key={resume._id} className="resume-item">
                  <span className="resume-filename">{resume.filename}</span>
                  <div className="resume-actions">
                    <a 
                      href={`http://localhost:5000/api/resumes/download/${resume._id}`} 
                      target="_blank" 
                      rel="noreferrer"
                      className="download-link"
                    >
                      Download
                    </a>
                    <button 
                      className="delete-btn" 
                      onClick={() => handleDelete(resume._id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <Bot />
    </Layout>
  );
};

export default Profile;
