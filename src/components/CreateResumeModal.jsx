import React, { useState } from 'react';

const CreateResumeModal = ({ isOpen, onClose, onCreateResume }) => {
  const [resumeTitle, setResumeTitle] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (resumeTitle.trim()) {
      onCreateResume(resumeTitle);
      setResumeTitle('');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create a New Resume</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Enter Resume Title</label>
            <input
              type="text"
              value={resumeTitle}
              onChange={(e) => setResumeTitle(e.target.value)}
              placeholder="e.g., Software Engineer Resume"
              className="modal-input"
              autoFocus
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="btn-modal-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-modal-create" disabled={!resumeTitle.trim()}>
              Create Resume
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateResumeModal;
