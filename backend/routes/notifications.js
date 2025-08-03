const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/send', async (req, res) => {
  const { to, subject, message } = req.body;

  if (!to || !subject || !message) {
    return res.status(400).json({ error: 'Missing email details' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // or another service
      auth: {
        user: 'mpayyappan2004@gmail.com',
        pass: 'tkzprjomwabiuzvl', // Use App Password if 2FA is on
      },
    });

    await transporter.sendMail({
      from: '"Recruiter Team" <your-email@gmail.com>',
      to,
      subject,
      text: message,
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

module.exports = router;
