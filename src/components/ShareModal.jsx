import React, { useState, useEffect } from 'react';

const ShareModal = ({ isOpen, onClose, resumeId }) => {
  const [isPublic, setIsPublic] = useState(false);
  const [shareLink, setShareLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && resumeId) {
      fetchResumeStatus();
      setShareLink(`${window.location.origin}/resume/${resumeId}`);
    }
  }, [isOpen, resumeId]);

  const fetchResumeStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/resume/${resumeId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      if (result.success) {
        setIsPublic(result.data.isPublic);
      }
    } catch (error) {
      console.error('Error fetching resume status:', error);
    }
  };

  const togglePublicAccess = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/resume/${resumeId}/toggle-public`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const result = await response.json();

      if (result.success) {
        setIsPublic(result.data.isPublic);
        alert(result.message);
      } else {
        alert('Error toggling public access');
      }
    } catch (error) {
      console.error('Error toggling public access:', error);
      alert('Error connecting to server');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy:', err);
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>📤 Share Resume</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <div className="share-section">
            <div className="toggle-section">
              <div className="toggle-info">
                <h3>Public Access</h3>
                <p>Allow anyone with the link to view this resume</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={isPublic}
                  onChange={togglePublicAccess}
                  disabled={isLoading}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            {isPublic && (
              <div className="share-link-section">
                <label>Shareable Link:</label>
                <div className="link-input-group">
                  <input
                    type="text"
                    value={shareLink}
                    readOnly
                    className="share-link-input"
                  />
                  <button
                    className={`btn-copy ${copied ? 'copied' : ''}`}
                    onClick={copyToClipboard}
                  >
                    {copied ? '✓ Copied!' : '📋 Copy'}
                  </button>
                </div>
                <p className="share-note">
                  Anyone with this link can view your resume online
                </p>
              </div>
            )}

            {!isPublic && (
              <div className="private-notice">
                <p>🔒 This resume is currently private. Enable public access to share it.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
