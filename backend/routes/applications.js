const express = require('express');
const router = express.Router();
const Application = require('../models/Application');

// Apply to a job
router.post('/apply', async (req, res) => {
  const { jobId, userId, candidateName, email } = req.body;

  try {
    const application = new Application({ jobId, userId, candidateName, email });
    await application.save();
    res.status(200).json({ message: 'Application submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to apply' });
  }
});

// Get applicants for a job
router.get('/:jobId', async (req, res) => {
  try {
    const applications = await Application.find({ jobId: req.params.jobId });
    res.json({ applications });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

module.exports = router;
