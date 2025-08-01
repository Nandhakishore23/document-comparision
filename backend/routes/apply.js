const express = require('express');
const router = express.Router();
const multer = require('multer');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const Application = require('../models/Application'); // MongoDB model

const upload = multer({ dest: 'uploads/' }); // Store temp resume file

router.post('/apply', upload.single('resume'), async (req, res) => {
  try {
    const {
      jobId, userId, candidateName, email, jobRole, jobDescription
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'No resume uploaded' });
    }

    const fileStream = fs.createReadStream(req.file.path);

    // Send to n8n webhook
    const n8nRes = await fetch('http://<n8n-ip>:5678/webhook/test', {
      method: 'POST',
      body: (() => {
        const form = new FormData();
        form.append('resume', fileStream, req.file.originalname);
        form.append('candidateName', candidateName);
        form.append('email', email);
        form.append('jobRole', jobRole);
        form.append('jobDescription', jobDescription);
        return form;
      })(),
    });

    const n8nResult = await n8nRes.text();

    // Store in MongoDB
    const newApp = new Application({
      userId,
      jobId,
      candidateName,
      email,
      resumeFileName: req.file.originalname,
      resultFromN8N: n8nResult,
    });

    await newApp.save();

    fs.unlinkSync(req.file.path); // Clean up temp file

    res.json({ message: 'Application submitted successfully' });
  } catch (err) {
    console.error('Error submitting application:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
