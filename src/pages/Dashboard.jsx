import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CreateResumeModal from '../components/CreateResumeModal';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savedResumes, setSavedResumes] = useState([]);

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    
    // Load saved resumes
    loadSavedResumes();
  }, []);

  const loadSavedResumes = () => {
    const resumes = JSON.parse(localStorage.getItem('savedResumes') || '[]');
    setSavedResumes(resumes.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)));
  };

  const handleCreateResume = (resumeTitle) => {
    setIsModalOpen(false);
    navigate('/builder', { state: { resumeTitle } });
  };

  const handleOpenResume = (resume) => {
    navigate('/builder', { 
      state: { 
        resumeTitle: resume.title,
        resumeData: resume.data,
        selectedTemplate: resume.template,
        accentColor: resume.accentColor
      } 
    });
  };

  const handleDeleteResume = (resumeId) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      const resumes = savedResumes.filter(r => r.id !== resumeId);
      localStorage.setItem('savedResumes', JSON.stringify(resumes));
      setSavedResumes(resumes);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <nav className="dashboard-navbar">
        <div className="dashboard-nav-content">
          <div className="logo">
            resume<span className="logo-dot">.</span>
          </div>
          <button className="btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Welcome to Dashboard</h1>
          {user && <p className="dashboard-subtitle">Hello, {user.name || user.email}! 👋</p>}
          <button className="btn-create-resume" onClick={() => setIsModalOpen(true)}>
            ✨ Create New Resume
          </button>
        </div>

        {/* Saved Resumes Section */}
        {savedResumes.length > 0 && (
          <div className="saved-resumes-section">
            <h2 className="section-title">📄 My Saved Resumes</h2>
            <div className="resumes-grid">
              {savedResumes.map((resume) => (
                <div key={resume.id} className="resume-card">
                  <div className="resume-thumbnail">
                    {resume.thumbnail ? (
                      <img src={resume.thumbnail} alt={resume.title} />
                    ) : (
                      <div className="thumbnail-placeholder">📄</div>
                    )}
                  </div>
                  <div className="resume-info">
                    <h3>{resume.title}</h3>
                    <p className="resume-meta">
                      Template: {resume.template} • 
                      Updated: {new Date(resume.updatedAt).toLocaleDateString()}
                    </p>
                    <p className="resume-stats">
                      Downloads: {resume.downloadCount || 0}
                    </p>
                  </div>
                  <div className="resume-actions">
                    <button 
                      className="btn-resume-action btn-open"
                      onClick={() => handleOpenResume(resume)}
                    >
                      ✏️ Edit
                    </button>
                    <button 
                      className="btn-resume-action btn-delete"
                      onClick={() => handleDeleteResume(resume.id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="dashboard-cards">
          <div className="dashboard-card">
            <div className="card-icon">📄</div>
            <h3>Resume Builder</h3>
            <p>Create and customize your professional resume</p>
            <button className="btn-card" onClick={() => setIsModalOpen(true)}>
              Start Building
            </button>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">📊</div>
            <h3>Analytics</h3>
            <p>Track your resume views and downloads</p>
            <button className="btn-card">Coming Soon</button>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">⚙️</div>
            <h3>Settings</h3>
            <p>Manage your account and preferences</p>
            <button className="btn-card">Coming Soon</button>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">💼</div>
            <h3>Templates</h3>
            <p>Browse premium resume templates</p>
            <button className="btn-card">Coming Soon</button>
          </div>
        </div>

        <div className="dashboard-stats">
          <div className="stat-box">
            <h4>{savedResumes.length}</h4>
            <p>Resumes Created</p>
          </div>
          <div className="stat-box">
            <h4>0</h4>
            <p>Total Views</p>
          </div>
          <div className="stat-box">
            <h4>{savedResumes.reduce((sum, r) => sum + (r.downloadCount || 0), 0)}</h4>
            <p>Downloads</p>

      <CreateResumeModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateResume={handleCreateResume}
      />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
