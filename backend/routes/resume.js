const express = require('express');
const router = express.Router();
const multer = require('multer');
const Resume = require('../models/Resume');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Upload Resume
router.post('/upload', upload.single('resume'), async (req, res) => {
  try {
    const resume = new Resume({
      filename: req.file.originalname,
      data: req.file.buffer,
      contentType: req.file.mimetype,
      uploadedBy: req.body.userId,
    });
    await resume.save();
    res.status(201).json({ message: 'Resume uploaded successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
});

// Get Resumes by user
router.get('/:userId', async (req, res) => {
  try {
    const resumes = await Resume.find({ uploadedBy: req.params.userId });
    res.json(resumes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Resume
router.delete('/:resumeId', async (req, res) => {
  try {
    await Resume.findByIdAndDelete(req.params.resumeId);
    res.json({ message: 'Resume deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Download Resume
router.get('/download/:resumeId', async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.resumeId);
    res.set('Content-Type', resume.contentType);
    res.set('Content-Disposition', `attachment; filename="${resume.filename}"`);
    res.send(resume.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
