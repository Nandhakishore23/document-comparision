const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  filename: String,
  data: Buffer,
  contentType: String,
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);
