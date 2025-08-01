const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Register a new user
router.post('/', async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(400).send('All fields are required.');
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).send('Email already registered.');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();
    res.status(201).send('User registered successfully.');
  } catch (err) {
    res.status(500).send('Server error.');
  }
});

// User login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).send('Email and password are required.');

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).send('Invalid email or password.');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send('Invalid email or password.');

    // Respond with user info (excluding password)
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (err) {
    res.status(500).send('Server error.');
  }
});

// Get recruiter profile (for demo, returns first recruiter)
router.get('/profile', async (req, res) => {
  try {
    // In production, use authentication to get recruiter ID
    const user = await User.findOne({ role: /recruiter/i });
    if (!user) return res.status(404).json({ message: 'Recruiter not found' });
    res.json({
      user: {
        username: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching profile', error: err.message });
  }
});

// router.get('/ar-profile', async (req, res) => {
//   try {
//     const role = req.query.role; // ?role=AR%20Requestor
//     if (!role) return res.status(400).json({ message: 'Role required' });

//     const user = await User.findOne({ role: new RegExp(role, 'i') });

//     if (!user) return res.status(404).json({ message: `${role} not found` });

//     res.json({
//       user: {
//         username: user.name,
//         email: user.email,
//         role: user.role
//       }
//     });
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching profile', error: err.message });
//   }
// });

router.get('/ar-profile', async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) return res.status(400).json({ message: 'Email is required' });

    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({
      user: {
        username: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching profile', error: err.message });
  }
});


module.exports = router;