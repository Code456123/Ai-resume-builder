const express = require('express');
const router = express.Router();
const {
  generateSummary,
  generateJobDescription,
  generateSkills
} = require('../controllers/aiController');
const authMiddleware = require('../middleware/authMiddleware');

// POST /api/ai/generate-summary - Generate AI resume summary
router.post('/generate-summary', authMiddleware, generateSummary);

// POST /api/ai/generate-description - Generate AI job description
router.post('/generate-description', authMiddleware, generateJobDescription);

// POST /api/ai/generate-skills - Generate AI skills suggestions
router.post('/generate-skills', authMiddleware, generateSkills);

module.exports = router;
