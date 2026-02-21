const Resume = require('../models/Resume');

// Create a new resume
exports.createResume = async (req, res) => {
  try {
    const { title, resumeData, template, accentColor } = req.body;

    if (!title || !resumeData) {
      return res.status(400).json({ 
        success: false, 
        message: 'Title and resumeData are required' 
      });
    }

    const resume = new Resume({
      userId: req.user.id, // Get userId from authenticated user
      title,
      resumeData,
      template: template || 'professional',
      accentColor: accentColor || '#3B82F6'
    });

    const savedResume = await resume.save();

    res.status(201).json({
      success: true,
      message: 'Resume created successfully',
      data: savedResume
    });
  } catch (error) {
    console.error('Error creating resume:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating resume',
      error: error.message
    });
  }
};

// Get all resumes for the logged-in user
exports.getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user.id })
      .sort({ updatedAt: -1 }); // Sort by most recently updated

    res.status(200).json({
      success: true,
      count: resumes.length,
      data: resumes
    });
  } catch (error) {
    console.error('Error fetching user resumes:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching resumes',
      error: error.message
    });
  }
};

// Get resume by ID
exports.getResumeById = async (req, res) => {
  try {
    const { id } = req.params;

    const resume = await Resume.findById(id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found'
      });
    }

    // Check if resume is public or belongs to the user
    if (!resume.isPublic && resume.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.status(200).json({
      success: true,
      data: resume
    });
  } catch (error) {
    console.error('Error fetching resume:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching resume',
      error: error.message
    });
  }
};

// Update resume
exports.updateResume = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, resumeData, template, accentColor } = req.body;

    const resume = await Resume.findById(id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found'
      });
    }

    // Check if resume belongs to the user
    if (resume.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Update fields
    if (title) resume.title = title;
    if (resumeData) resume.resumeData = resumeData;
    if (template) resume.template = template;
    if (accentColor) resume.accentColor = accentColor;

    const updatedResume = await resume.save();

    res.status(200).json({
      success: true,
      message: 'Resume updated successfully',
      data: updatedResume
    });
  } catch (error) {
    console.error('Error updating resume:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating resume',
      error: error.message
    });
  }
};

// Delete resume
exports.deleteResume = async (req, res) => {
  try {
    const { id } = req.params;

    const resume = await Resume.findById(id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found'
      });
    }

    // Check if resume belongs to the user
    if (resume.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    await Resume.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Resume deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting resume:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting resume',
      error: error.message
    });
  }
};

// Toggle isPublic status
exports.togglePublicStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const resume = await Resume.findById(id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found'
      });
    }

    // Check if resume belongs to the user
    if (resume.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    resume.isPublic = !resume.isPublic;
    await resume.save();

    res.status(200).json({
      success: true,
      message: `Resume is now ${resume.isPublic ? 'public' : 'private'}`,
      data: resume
    });
  } catch (error) {
    console.error('Error toggling public status:', error);
    res.status(500).json({
      success: false,
      message: 'Error toggling public status',
      error: error.message
    });
  }
};

// Get public resume by ID (no authentication required)
exports.getPublicResume = async (req, res) => {
  try {
    const { id } = req.params;

    const resume = await Resume.findById(id).populate('userId', 'name email');

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found'
      });
    }

    if (!resume.isPublic) {
      return res.status(403).json({
        success: false,
        message: 'This resume is private'
      });
    }

    res.status(200).json({
      success: true,
      data: resume
    });
  } catch (error) {
    console.error('Error fetching public resume:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching resume',
      error: error.message
    });
  }
};
