import React, { useState } from 'react';
import Layout from './RecruiterLayout';
import './Postjob.css'; // Optional styling

const experienceOptions = [
  { value: 'freshers', label: 'Freshers' },
  { value: '0-2', label: '0-2 yrs' },
  { value: 'above-2', label: 'Above 2 yrs' }
];

const Postjob = () => {
  const [form, setForm] = useState({
    title: '',
    role: '',
    description: '',
    skills: '',
    experience: 'freshers'
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!form.skills.trim()) {
    setMessage('Please enter required skills.');
    return;
  }

  try {
    const res = await fetch('http://localhost:5000/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    if (res.ok) {
      setMessage('Job posted successfully!');
      setForm({ title: '', role: '', description: '', skills: '', experience: 'freshers' });
    } else {
      // Check if response is JSON before parsing
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const errorRes = await res.json();
        setMessage(`Failed to post job: ${errorRes.message}`);
      } else {
        setMessage('Failed to post job: Server error or not found.');
      }
    }
  } catch (err) {
    setMessage('Error posting job.');
    console.error('Fetch error:', err);
  }
};


  return (
    <Layout>
    <div className="postjob-container">
      <h2>Post a Job</h2>
      <form onSubmit={handleSubmit} className="postjob-form">
        <label>
          Job Title:
          <input type="text" name="title" value={form.title} onChange={handleChange} required />
        </label>
        <label>
          Role:
          <input type="text" name="role" value={form.role} onChange={handleChange} required />
        </label>
        <label>
          Description:
          <textarea name="description" value={form.description} onChange={handleChange} required />
        </label>
        <label>
          Skills (comma separated):
          <input type="text" name="skills" value={form.skills} onChange={handleChange} required />
        </label>
        <label>
          Experience:
          <select name="experience" value={form.experience} onChange={handleChange} required>
            {experienceOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </label>
        <button type="submit">Post Job</button>
      </form>
      {message && <p>{message}</p>}
    </div>
    </Layout>
  );
};

export default Postjob;
