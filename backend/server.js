const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user');



const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/hexa', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/User', userRoutes);



const PORT = process.env.PORT || 7117;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});