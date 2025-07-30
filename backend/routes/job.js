const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// POST /api/jobs - create a new job
router.post('/', async (req, res) => {
  try {
    const { title, role, description, skills, experience } = req.body;
    const job = new Job({ title, role, description, skills, experience });
    await job.save();
    res.status(201).json({ message: 'Job posted successfully', job });
  } catch (err) {
    console.error('Error in POST /api/jobs:', err); // Log error
    res.status(500).json({ message: 'Error posting job', error: err.message });
  }
});


// GET /api/jobs - get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ postedAt: -1 });
    res.json({ jobs });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching jobs', error: err.message });
  }
});

module.exports = router;
