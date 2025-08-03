const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const Application = require('../models/Application'); // Adjust the path if needed


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

// Close the job and reject all pending applications
router.put('/:jobId/close', async (req, res) => {
  const { jobId } = req.params;

  try {
    // 1. Update job to mark it as closed
    await Job.findByIdAndUpdate(jobId, { isClosed: true });

    // 2. Reject all pending applications for that job
    const applications = await Application.find({ jobId, 'result.status': { $ne: 'Approved' } });

    for (let app of applications) {
      app.result.status = 'Rejected';
      await app.save();
    }

    res.json({ success: true, message: 'Job closed and pending applications rejected.' });
  } catch (err) {
    console.error('Error closing job:', err);
    res.status(500).json({ error: 'Failed to close job.' });
  }
});

router.put('/jobs/:id/close', async (req, res) => {
  const jobId = req.params.id;
  try {
    // 1. Close the job
    await Job.findByIdAndUpdate(jobId, { closed: true });

    // 2. Reject all non-approved applications for the job
    await Application.updateMany(
      { jobId, 'result.status': { $ne: 'Approved' } },
      { $set: { 'result.status': 'Rejected' } }
    );

    res.json({ success: true });
  } catch (err) {
    console.error('Error closing job:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});


module.exports = router;
