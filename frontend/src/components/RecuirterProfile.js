import React, { useEffect, useState } from 'react';
import Layout from './RecruiterLayout';
import './Recruiterprofile.css';

const RecruiterProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Replace with actual recruiter ID or authentication logic as needed
        const res = await fetch('http://localhost:5000/api/User/profile');
        if (res.ok) {
          const data = await res.json();
          setProfile(data.user);
        } else {
          setError('Failed to fetch profile');
        }
      } catch (err) {
        setError('Error fetching profile');
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  return (
    <Layout>
    <div className="recruiter-profile">
      <h2>Recruiter Profile</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : profile ? (
        <div className="profile-details">
          <p><strong>Username:</strong> {profile.username}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          {/* Add more fields as needed */}
        </div>
      ) : (
        <p>No profile data found.</p>
      )}
    </div>
    </Layout>
  );
};

export default RecruiterProfile;
