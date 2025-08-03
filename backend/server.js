// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const userRoutes = require('./routes/user');
// const jobRoutes = require('./routes/job');
// const resumeRoutes = require('./routes/resume');
// const applicationRoutes = require('./routes/applications');
// const applyRoutes = require('./routes/apply');


// const app = express();
// app.use(cors());
// app.use(express.json());

// mongoose.connect('mongodb://localhost:27017/hexa', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));


// app.use('/api/User', userRoutes);
// app.use('/api/jobs', jobRoutes);
// app.use('/api/resumes', resumeRoutes);
// app.use('/api/applications', applicationRoutes);
// app.use('/api/apply', applyRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server started on port ${PORT}`);
// });


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const userRoutes = require('./routes/user');
const jobRoutes = require('./routes/job');
const resumeRoutes = require('./routes/resume');
const applicationRoutes = require('./routes/applications');
const applyRoutes = require('./routes/apply');
const User = require('./models/User'); // Make sure this is imported

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/hexa', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Seed default recruiter
const seedDefaultRecruiter = async () => {
  const email = 'hexawarerecuirter@gmail.com';
  const password = 'Hexa@2025';
  const role = 'Recruiter';
  const name = 'Hexaware Recruiter';

  try {
    const existing = await User.findOne({ email });
    if (!existing) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hashedPassword, role });
      await user.save();
      console.log('✅ Default recruiter created');
    } else {
      console.log('ℹ️ Default recruiter already exists');
    }
  } catch (err) {
    console.error('❌ Failed to create default recruiter:', err);
  }
};

seedDefaultRecruiter();

app.use('/api/User', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/apply', applyRoutes);

const notificationRoutes = require('./routes/notifications');
app.use('/api/notifications', notificationRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
