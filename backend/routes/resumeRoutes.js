const express = require('express');
const router = express.Router();
const {
  createResume,
  getUserResumes,
  getResumeById,
  updateResume,
  deleteResume,
  togglePublicStatus,
  getPublicResume
} = require('../controllers/resumeController');
const authMiddleware = require('../middleware/authMiddleware');

// Protected Routes (require authentication)

// POST /api/resume - Create a new resume
router.post('/', authMiddleware, createResume);

// GET /api/resume - Get all resumes for logged-in user
router.get('/', authMiddleware, getUserResumes);

// GET /api/resume/:id - Get resume by ID
router.get('/:id', authMiddleware, getResumeById);

// PUT /api/resume/:id - Update resume
router.put('/:id', authMiddleware, updateResume);

// DELETE /api/resume/:id - Delete resume
router.delete('/:id', authMiddleware, deleteResume);

// PATCH /api/resume/:id/toggle-public - Toggle isPublic status
router.patch('/:id/toggle-public', authMiddleware, togglePublicStatus);

// Public Routes (no authentication required)

// GET /api/resume/public/:id - Get public resume by ID
router.get('/public/:id', getPublicResume);

module.exports = router;
