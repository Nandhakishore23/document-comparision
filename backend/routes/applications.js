// // const express = require('express');
// // const router = express.Router();
// // const Application = require('../models/Application');

// // // Apply to a job
// // router.post('/apply', async (req, res) => {
// //   const { jobId, userId, candidateName, email } = req.body;

// //   try {
// //     const application = new Application({ jobId, userId, candidateName, email });
// //     await application.save();
// //     res.status(200).json({ message: 'Application submitted successfully' });
// //   } catch (err) {
// //     res.status(500).json({ error: 'Failed to apply' });
// //   }
// // });

// // // Get applicants for a job
// // router.get('/:jobId', async (req, res) => {
// //   try {
// //     const applications = await Application.find({ jobId: req.params.jobId });
// //     res.json({ applications });
// //   } catch (err) {
// //     res.status(500).json({ error: 'Failed to fetch applications' });
// //   }
// // });

// // module.exports = router;


// const express = require('express');
// const router = express.Router();
// const { createApplication } = require('../controllers/applicationController');

// // POST /api/applications
// router.post('/', createApplication);

// module.exports = router;


const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const Job = require('../models/Job');
const PDFDocument = require('pdfkit');
const multer = require('multer');
const path = require('path');
const fs = require('fs');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage });

// Save new application
// router.post('/', async (req, res) => {
//   try {
//     const { userId, candidateName, email, jobId, result } = req.body;
    
//     console.log('Full request body:', JSON.stringify(req.body, null, 2));
//     console.log('Result structure:', result);
    
//     // Handle the actual data structure - result is an array with stringified JSON
//     let resultData;
    
//     if (result && Array.isArray(result) && result.length > 0) {
//       // First parse the stringified JSON in the array
//       const parsedResult = JSON.parse(result[0]);
//       // Then access the output from the parsed object
//       resultData = parsedResult[0]?.output;
//     }
    
//     console.log('Extracted resultData:', resultData);
    
//     if (!resultData) {
//       return res.status(400).json({ error: 'No output from AI.' });
//     }

//     // Extract JSON from markdown code block
//     const jsonMatch = resultData.match(/```json\s*([\s\S]*?)\s*```/);
    
//     if (!jsonMatch || !jsonMatch[1]) {
//       return res.status(400).json({ error: 'AI output does not contain valid JSON format.' });
//     }

//     let parsedData;
//     try {
//       // Parse the extracted JSON string
//       parsedData = JSON.parse(jsonMatch[1].trim());
//     } catch (err) {
//       console.error('JSON parsing failed:', err);
//       return res.status(400).json({ error: 'Invalid JSON format from AI.' });
//     }

//     // Ensure parsedData is an array and has at least one element
//     if (!Array.isArray(parsedData) || parsedData.length === 0) {
//       return res.status(400).json({ error: 'Parsed data is not a valid array or is empty.' });
//     }

//     const matchResult = parsedData[0];
    
//     // Validate that match field exists
//     if (!matchResult || !matchResult.match) {
//       return res.status(400).json({ error: 'Match percentage missing in AI response.' });
//     }

//     // Extract number from "90%" → 90
//     const matchPercentage = parseFloat(matchResult.match.replace('%', ''));
    
//     // Validate match percentage
//     if (isNaN(matchPercentage)) {
//       return res.status(400).json({ error: 'Invalid match percentage format.' });
//     }

//     // Create new application document with only match percentage
//     const application = new Application({
//       userId,
//       candidateName,
//       email,
//       jobId,
//       result: {
//         match: matchPercentage,
//       },
//     });

//     await application.save();
//     res.status(201).json({ success: true, application });
    
//   } catch (err) {
//     console.error('Application save failed:', err);
//     res.status(500).json({ error: 'Internal server error while saving application.' });
//   }
// });


// router.post('/', async (req, res) => {
//   try {

//     const existingApp = await Application.findOne({ email, jobId });

//     if (existingApp) {
//       return res.status(409).json({ error: 'You have already applied for this job.' });
//     }
//     const { userId, candidateName, email, jobId, result } = req.body;
    
//     console.log('Full request body:', JSON.stringify(req.body, null, 2));
//     console.log('Result structure:', result);
    
//     // Handle the actual data structure - result is an array with stringified JSON
//     let resultData;
    
//     if (result && Array.isArray(result) && result.length > 0) {
//       // First parse the stringified JSON in the array
//       const parsedResult = JSON.parse(result[0]);
//       // Then access the output from the parsed object
//       resultData = parsedResult[0]?.output;
//     }
    
//     console.log('Extracted resultData:', resultData);
    
//     if (!resultData) {
//       return res.status(400).json({ error: 'No output from AI.' });
//     }

//     // Extract JSON from markdown code block
//     const jsonMatch = resultData.match(/```json\s*([\s\S]*?)\s*```/);
    
//     if (!jsonMatch || !jsonMatch[1]) {
//       return res.status(400).json({ error: 'AI output does not contain valid JSON format.' });
//     }

//     let parsedData;
//     try {
//       // Parse the extracted JSON string
//       parsedData = JSON.parse(jsonMatch[1].trim());
//     } catch (err) {
//       console.error('JSON parsing failed:', err);
//       return res.status(400).json({ error: 'Invalid JSON format from AI.' });
//     }

//     // Ensure parsedData is an array and has at least one element
//     if (!Array.isArray(parsedData) || parsedData.length === 0) {
//       return res.status(400).json({ error: 'Parsed data is not a valid array or is empty.' });
//     }

//     const matchResult = parsedData[0];
    
//     // Validate that match field exists
//     if (!matchResult || !matchResult.match) {
//       return res.status(400).json({ error: 'Match percentage missing in AI response.' });
//     }

//     // Extract number from "90%" → 90
//     const matchPercentage = parseFloat(matchResult.match.replace('%', ''));
    
//     // Validate match percentage
//     if (isNaN(matchPercentage)) {
//       return res.status(400).json({ error: 'Invalid match percentage format.' });
//     }

//     // Create new application document with match percentage and reason
//     const application = new Application({
//       userId,
//       candidateName,
//       email,
//       jobId,
//       result: {
//         match: matchPercentage,
//         reason: matchResult.reason || '', // Store the reason from AI response
//       },
//     });

//     await application.save();
//     res.status(201).json({ success: true, application });
    
//   } catch (err) {
//     console.error('Application save failed:', err);
//     res.status(500).json({ error: 'Internal server error while saving application.' });
//   }
// });

// router.post('/', async (req, res) => {
//   try {
//     const { userId, candidateName, email, jobId, result } = req.body;

//     // ✅ Check for existing application BEFORE saving
//     const existingApp = await Application.findOne({ email, jobId });
//     if (existingApp) {
//       return res.status(409).json({ error: 'You have already applied for this job.' });
//     }

//     console.log('Full request body:', JSON.stringify(req.body, null, 2));
//     console.log('Result structure:', result);

//     let resultData;

//     if (result && Array.isArray(result) && result.length > 0) {
//       const parsedResult = JSON.parse(result[0]);
//       resultData = parsedResult[0]?.output;
//     }

//     if (!resultData) {
//       return res.status(400).json({ error: 'No output from AI.' });
//     }

//     const jsonMatch = resultData.match(/```json\s*([\s\S]*?)\s*```/);
//     if (!jsonMatch || !jsonMatch[1]) {
//       return res.status(400).json({ error: 'AI output does not contain valid JSON format.' });
//     }

//     let parsedData;
//     try {
//       parsedData = JSON.parse(jsonMatch[1].trim());
//     } catch (err) {
//       console.error('JSON parsing failed:', err);
//       return res.status(400).json({ error: 'Invalid JSON format from AI.' });
//     }

//     if (!Array.isArray(parsedData) || parsedData.length === 0) {
//       return res.status(400).json({ error: 'Parsed data is not a valid array or is empty.' });
//     }

//     const matchResult = parsedData[0];
//     if (!matchResult || !matchResult.match) {
//       return res.status(400).json({ error: 'Match percentage missing in AI response.' });
//     }

//     const matchPercentage = parseFloat(matchResult.match.replace('%', ''));
//     if (isNaN(matchPercentage)) {
//       return res.status(400).json({ error: 'Invalid match percentage format.' });
//     }

//     const application = new Application({
//       userId,
//       candidateName,
//       email,
//       jobId,
//       result: {
//         match: matchPercentage,
//         reason: matchResult.reason || '',
//       },
//     });

//     await application.save();
//     res.status(201).json({ success: true, application });

//   } catch (err) {
//     console.error('Application save failed:', err);
//     res.status(500).json({ error: 'Internal server error while saving application.' });
//   }
// });
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'vstharun2022@gmail.com',         // 🔁 Replace with your Gmail
    pass: 'fmxoomhmzaclvqpm'             // 🔁 Replace with your App Password (not Gmail password)
  }
});

router.post('/', upload.single('resume'), async (req, res) => {
  try {
    const { userId, candidateName, email, jobId, result } = req.body;

    const existingApp = await Application.findOne({ email, jobId });
    if (existingApp) {
      return res.status(409).json({ error: 'You have already applied for this job.' });
    }

    let resultData;
    if (result && Array.isArray(result) && result.length > 0) {
      const parsedResult = JSON.parse(result[0]);
      resultData = parsedResult[0]?.output;
    }

    if (!resultData) {
      return res.status(400).json({ error: 'No output from AI.' });
    }

    const jsonMatch = resultData.match(/```json\s*([\s\S]*?)\s*```/);
    if (!jsonMatch || !jsonMatch[1]) {
      return res.status(400).json({ error: 'AI output does not contain valid JSON format.' });
    }

    let parsedData;
    try {
      parsedData = JSON.parse(jsonMatch[1].trim());
    } catch (err) {
      return res.status(400).json({ error: 'Invalid JSON format from AI.' });
    }

    const matchResult = parsedData[0];
    const matchPercentage = parseFloat(matchResult.match.replace('%', ''));
    if (isNaN(matchPercentage)) {
      return res.status(400).json({ error: 'Invalid match percentage format.' });
    }

    const application = new Application({
      userId,
      candidateName,
      email,
      jobId,
      result: {
        match: matchPercentage,
        reason: matchResult.reason || '',
      },
      resumeUrl: req.file ? `/uploads/${req.file.filename}` : ''
    });

    await application.save();
    res.status(201).json({ success: true, application });

  } catch (err) {
    res.status(500).json({ error: 'Internal server error while saving application.' });
  }
});



// Get all applications for a job
router.get('/:jobId', async (req, res) => {
  try {
    const applications = await Application.find({ jobId: req.params.jobId }).populate('userId');

    // 🔽 Sort descending by numeric match percentage
    const sorted = applications.sort((a, b) => {
      const matchA = parseInt(a.result?.match || '0');
      const matchB = parseInt(b.result?.match || '0');
      return matchB - matchA; // Descending
    });

    res.json({ success: true, applications: sorted });
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch applications' });
  }
});


// Update application status by ID
// router.put('/:id/status', async (req, res) => {
//   try {
//     const applicationId = req.params.id;
//     const { status } = req.body;

//     if (!['Approved', 'Rejected'].includes(status)) {
//       return res.status(400).json({ error: 'Invalid status' });
//     }

//     // Inside PUT /applications/:id/status
// const updated = await Application.findByIdAndUpdate(
//   req.params.id,
//   { result: { ...app.result, status } },
//   { new: true }
// );

// res.json({ success: true, application: updated });


//     if (!updated) {
//       return res.status(404).json({ error: 'Application not found' });
//     }

//     res.status(200).json({ success: true, application: updated });
//   } catch (err) {
//     console.error('Status update error:', err);
//     res.status(500).json({ error: 'Failed to update status' });
//   }
// });

router.put('/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    // 1. Find the application
    const application = await Application.findById(id);
    if (!application) {
      return res.status(404).json({ success: false, error: 'Application not found' });
    }

    // 2. Find the job to get its title
    const job = await Job.findById(application.jobId);
    const jobTitle = job ? job.title : 'your applied job';

    // 3. Update the application status
    application.result.status = status;
    await application.save();

    // 4. Prepare email
    const subject = `Update on your application for ${jobTitle}`;
    const message = status === 'Approved'
      ? `Hi ${application.candidateName},

🎉 Congratulations! We're excited to inform you that your application for the role of ${jobTitle} has been successfully reviewed and approved by our hiring team.

Based on your qualifications and experience, you have been shortlisted to proceed to the next stage of our recruitment process. This is a significant step forward, and we truly appreciate your interest in joining our organization.

What’s next?
Our recruitment team will be in touch with you shortly to share further details regarding the upcoming round(s). This may include a technical interview, an assignment, or a discussion with the hiring manager, depending on the role requirements.

Please keep an eye on your email or phone for further communication. In the meantime, feel free to prepare any relevant documents or questions you may have for the next phase.

We wish you the very best for the next round and look forward to learning more about you.

Warm regards,  
Recruitment Team
`
      : `Hi ${application.candidateName},

Thank you for applying for the position of ${jobTitle} and for taking the time to go through our recruitment process.

After careful consideration and review of your profile, we regret to inform you that you have not been shortlisted for the next stage of the selection process. This decision was not easy, as we received a large number of strong applications, and yours was among them.

Please don’t be discouraged. We truly appreciate your interest in our organization and the effort you put into your application. We encourage you to apply for future opportunities that match your skills and experience.

We wish you all the best in your job search and future career endeavors.

Warm regards,  
Recruitment Team
`;

    // 5. Send email
    await transporter.sendMail({
      from: "mpayyappan2004@gmail.com",
      to: application.email,
      subject,
      text: message,
    });

    res.json({ success: true, message: 'Status updated and email sent.' });
  } catch (error) {
    console.error('Status update error:', error.message);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});


// Get applications by userId (or email)
router.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    const applications = await Application.find({ userId }).populate('jobId');

    res.status(200).json({ success: true, applications });
  } catch (err) {
    console.error('Fetch candidate applications failed:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

router.get('/:jobId/pdf', async (req, res) => {
  try {
    const { jobId } = req.params;
    const applications = await Application.find({ jobId });

    if (!applications.length) {
      return res.status(404).json({ error: 'No applications found' });
    }

    const doc = new PDFDocument();
    const filename = `applicants_${jobId}.pdf`;

    res.setHeader('Content-disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-type', 'application/pdf');

    doc.pipe(res);

    applications.forEach((app, index) => {
      doc.fontSize(14).text(`Applicant ${index + 1}`);
      doc.fontSize(12).text(`Name: ${app.candidateName}`);
      doc.text(`Email: ${app.email}`);
      doc.text(`Match: ${app.result?.match || 'N/A'}%`);
      doc.text(`Status: ${app.result?.status || 'Pending'}`);
      doc.text(`Reason: ${app.result?.reason || 'Not provided'}`);
      doc.moveDown();
    });

    doc.end();
  } catch (err) {
    console.error('Error generating PDF:', err);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
});



module.exports = router;
