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


router.post('/', async (req, res) => {
  try {
    const { userId, candidateName, email, jobId, result } = req.body;
    
    // console.log('Full request body:', JSON.stringify(req.body, null, 2));
    // console.log('Result structure:', result);
    
    // Handle the actual data structure - result is an array with stringified JSON
    let resultData;
    
    if (result && Array.isArray(result) && result.length > 0) {
      // First parse the stringified JSON in the array
      const parsedResult = JSON.parse(result[0]);
      // Then access the output from the parsed object
      resultData = parsedResult[0]?.output;
    }
    
    //console.log('Extracted resultData:', resultData);
    
    if (!resultData) {
      return res.status(400).json({ error: 'No output from AI.' });
    }

    // Extract JSON from markdown code block
    const jsonMatch = resultData.match(/```json\s*([\s\S]*?)\s*```/);
    
    if (!jsonMatch || !jsonMatch[1]) {
      return res.status(400).json({ error: 'AI output does not contain valid JSON format.' });
    }

    let parsedData;
    try {
      // Parse the extracted JSON string
      parsedData = JSON.parse(jsonMatch[1].trim());
    } catch (err) {
      console.error('JSON parsing failed:', err);
      return res.status(400).json({ error: 'Invalid JSON format from AI.' });
    }

    // Ensure parsedData is an array and has at least one element
    if (!Array.isArray(parsedData) || parsedData.length === 0) {
      return res.status(400).json({ error: 'Parsed data is not a valid array or is empty.' });
    }

    const matchResult = parsedData[0];
    
    // Validate that match field exists
    if (!matchResult || !matchResult.match) {
      return res.status(400).json({ error: 'Match percentage missing in AI response.' });
    }

    // Extract number from "90%" → 90
    const matchPercentage = parseFloat(matchResult.match.replace('%', ''));
    
    // Validate match percentage
    if (isNaN(matchPercentage)) {
      return res.status(400).json({ error: 'Invalid match percentage format.' });
    }

    // Create new application document with only match percentage
    const application = new Application({
      userId,
      candidateName,
      email,
      jobId,
      result: {
        match: matchPercentage,
      },
    });

    await application.save();
    res.status(201).json({ success: true, application });
    
  } catch (err) {
    console.error('Application save failed:', err);
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
router.put('/:id/status', async (req, res) => {
  try {
    const applicationId = req.params.id;
    const { status } = req.body;

    if (!['Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const updated = await Application.findByIdAndUpdate(
      applicationId,
      { 'result.status': status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.status(200).json({ success: true, application: updated });
  } catch (err) {
    console.error('Status update error:', err);
    res.status(500).json({ error: 'Failed to update status' });
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


module.exports = router;
