// // const mongoose = require('mongoose');

// // const applicationSchema = new mongoose.Schema({
// //   jobId: {
// //     type: mongoose.Schema.Types.ObjectId,
// //     ref: 'Job',
// //     required: true,
// //   },
// //   userId: {
// //     type: String, // or ObjectId if you store AR Requestors as users
// //     required: true,
// //   },
// //   candidateName: String,
// //   email: String,
// //   appliedAt: {
// //     type: Date,
// //     default: Date.now,
// //   },
// // });

// // module.exports = mongoose.model('Application', applicationSchema);


// // const mongoose = require('mongoose');

// // const applicationSchema = new mongoose.Schema({
// //   userId: {
// //     type: mongoose.Schema.Types.ObjectId,
// //     ref: 'User',
// //     required: true
// //   },
// //   candidateName: {
// //     type: String,
// //     required: true
// //   },
// //   email: {
// //     type: String,
// //     required: true
// //   },
// //   jobId: {
// //     type: mongoose.Schema.Types.ObjectId,
// //     ref: 'Job',
// //     required: true
// //   },
// //   result: {
// //     type: Object, // Result from n8n webhook (summary, similarity, etc.)
// //     required: true
// //   },
// //   appliedAt: {
// //     type: Date,
// //     default: Date.now
// //   }
// // });

// // module.exports = mongoose.model('Application', applicationSchema);


// const mongoose = require('mongoose');

// const applicationSchema = new mongoose.Schema({
//   userId: String,
//   jobId: String,
//   candidateName: String,
//   email: String,
//   resumeFileName: String,
//   resultFromN8N: mongoose.Schema.Types.Mixed,
//   appliedAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model('Application', applicationSchema);


const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  candidateName: String,
  email: String,
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  
  result: {
    name: String,
    status: String,
    match: String,
    reason: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('Application', applicationSchema);
