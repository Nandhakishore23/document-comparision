const Application = require('../models/Application');

// POST /api/applications
const createApplication = async (req, res) => {
  try {
    const { userId, candidateName, email, jobId, result } = req.body;

    if (!userId || !candidateName || !email || !jobId || !result) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newApp = new Application({
      userId,
      candidateName,
      email,
      jobId,
      result
    });

    await newApp.save();
    res.status(201).json({ message: 'Application saved successfully', application: newApp });
  } catch (err) {
    console.error('Error saving application:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createApplication
};
