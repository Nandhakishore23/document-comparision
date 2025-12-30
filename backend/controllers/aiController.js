const { GoogleGenerativeAI } = require("@google/generative-ai");
const pdfParse = require("pdf-parse");
const fs = require("fs");
require("dotenv").config();

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

/**
 * Analyze Resume against Job Description
 */
exports.analyzeResume = async (req, res) => {
  try {
    const { jobDescription, jobTitle, jobRole } = req.body;
    const resumeFile = req.file;

    if (!resumeFile) {
      return res.status(400).json({ error: "Resume file is required." });
    }

    if (!jobDescription) {
      return res.status(400).json({ error: "Job description is required." });
    }

    // 1. Extract Text from PDF
    const dataBuffer = fs.readFileSync(resumeFile.path);
    const pdfData = await pdfParse(dataBuffer);
    const resumeText = pdfData.text;

    // 2. Construct Prompt
    const prompt = `
      You are an expert technical recruiter. Your task is to analyze a candidate's resume against a specific job description.
      
      **Job Title:** ${jobTitle || "Not specified"}
      **Job Role:** ${jobRole || "Not specified"}
      
      **Job Description:**
      ${jobDescription}

      **Candidate Resume Content:**
      ${resumeText}

      **Instructions:**
      1. Analyze the resume specifically for the skills, experience, and requirements mentioned in the JD.
      2. Calculate a Match Percentage (0-100%).
      3. Identify key strengths (matching skills).
      4. Identify key gaps (missing skills or experience).
      5. Provide a short professional summary/reasoning for the score.

      **Output Format:**
      Return ONLY valid JSON in the following format (no markdown backticks):
      {
        "match": "85%",
        "reason": "Candidate has strong experience in React and Node.js but lacks the required Docker knowledge...",
        "strengths": ["React", "Node.js", "MongoDB"],
        "weaknesses": ["Docker", "Kubernetes"]
      }
    `;

    // 3. Call Gemini API
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    console.log("Raw Gemini Response:", responseText);

    // 4. Clean and Parse JSON
    const cleanJson = responseText.replace(/```json/g, "").replace(/```/g, "").trim();

    let analysisResult;
    try {
      analysisResult = JSON.parse(cleanJson);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      analysisResult = {
        match: "0%",
        reason: "AI Analysis failed to generate structured data. Raw response: " + responseText.substring(0, 100) + "...",
        strengths: [],
        weaknesses: []
      };
    }

    res.json({ success: true, analysis: analysisResult });

  } catch (error) {
    console.error("AI Analysis Error:", error);

    // Check for specific API Key error
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "GEMINI_API_KEY is not set in backend/.env" });
    }

    // Return the actual error message to the frontend for debugging
    res.status(500).json({ error: `Analysis Failed: ${error.message}` });
  } finally {
    // if (req.file) fs.unlinkSync(req.file.path);
  }
};

/**
 * Chat with AI Assistant (HexaBuddy)
 */
exports.chat = async (req, res) => {
  try {
    const { message, sessionId } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    const chatPrompt = `
      You are HexaBuddy, an intelligent and helpful AI recruitment assistant for the GenHire platform.
      
      **Context:**
      - The user is using GenHire, a job application and recruitment portal.
      - Users can apply for jobs, view their status, and uploading resumes.
      - Recruiters can post jobs and view candidates.
      
      **User Message:** "${message}"
      
      **Instructions:**
      - Provide a helpful, professional, and friendly response.
      - Keep answers concise (under 3-4 sentences) unless a detailed explanation is needed.
      - If asked about specific jobs or application status, guide them to the Dashboard or Status page (you cannot access their database directly yet).
      - Your tone should be encouraging and supportive.
    `;

    const result = await model.generateContent(chatPrompt);
    const responseText = result.response.text();

    // Standardized internal API response
    res.json({ reply: responseText });

  } catch (error) {
    console.error("Chat Error:", error);
    res.status(500).json({ reply: "I'm having trouble connecting right now. Please try again later." });
  }
};
