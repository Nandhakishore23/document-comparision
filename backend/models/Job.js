const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  role: { type: String, required: true },
  description: { type: String, required: true },
  skills: { type: String, required: true },
  experience: { type: String, enum: ['freshers', '0-2', 'above-2'], required: true },
  postedAt: { type: Date, default: Date.now },
  isClosed: {
  type: Boolean,
  default: false
}

});

module.exports = mongoose.model('Job', JobSchema);
