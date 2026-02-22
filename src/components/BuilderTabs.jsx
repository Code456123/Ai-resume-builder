import React, { useState } from 'react';

const BuilderTabs = ({ resumeData, updateResumeData }) => {
  const [activeTab, setActiveTab] = useState('Personal Info');
  const [skillInput, setSkillInput] = useState('');
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  const tabs = ['Personal Info', 'Summary', 'Experience', 'Education', 'Skills', 'Projects'];

  const goToNextTab = () => {
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    }
  };

  const goToPreviousTab = () => {
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1]);
    }
  };

  const handleAddExperience = () => {
    updateResumeData('experience', [
      ...resumeData.experience,
      { id: Date.now(), company: '', role: '', startDate: '', endDate: '', currentlyWorking: false, description: '' }
    ]);
  };

  const handleRemoveExperience = (id) => {
    updateResumeData('experience', resumeData.experience.filter(exp => exp.id !== id));
  };

  const handleUpdateExperience = (id, field, value) => {
    updateResumeData('experience', resumeData.experience.map(exp =>
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const handleAddEducation = () => {
    updateResumeData('education', [
      ...resumeData.education,
      { id: Date.now(), degree: '', college: '', fieldOfStudy: '', year: '', gpa: '' }
    ]);
  };

  const handleRemoveEducation = (id) => {
    updateResumeData('education', resumeData.education.filter(edu => edu.id !== id));
  };

  const handleUpdateEducation = (id, field, value) => {
    updateResumeData('education', resumeData.education.map(edu =>
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const handleAddProject = () => {
    updateResumeData('projects', [
      ...resumeData.projects,
      { id: Date.now(), title: '', description: '', techStack: '' }
    ]);
  };

  const handleRemoveProject = (id) => {
    updateResumeData('projects', resumeData.projects.filter(proj => proj.id !== id));
  };

  const handleUpdateProject = (id, field, value) => {
    updateResumeData('projects', resumeData.projects.map(proj =>
      proj.id === id ? { ...proj, [field]: value } : proj
    ));
  };

  const handleAddSkill = () => {
    if (skillInput.trim()) {
      updateResumeData('skills', [...resumeData.skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (index) => {
    updateResumeData('skills', resumeData.skills.filter((_, i) => i !== index));
  };

  const handleSkillKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const generateAISummary = async () => {
    if (!resumeData.summary || resumeData.summary.trim() === '') {
      alert('Please write a basic summary first, then AI will improve it!');
      return;
    }

    setIsGeneratingAI(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://ai-resume-builder-kbai.onrender.com/api/ai/generate-summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ input: resumeData.summary })
      });

      const data = await response.json();

      if (data.success) {
        updateResumeData('summary', data.result);
        alert('✨ AI has improved your summary!');
      } else {
        alert('Error generating summary: ' + data.message);
      }
    } catch (error) {
      console.error('AI Error:', error);
      alert('Failed to generate AI summary. Please try again.');
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const generateAIJobDescription = async (experienceId) => {
    const experience = resumeData.experience.find(exp => exp.id === experienceId);
    
    if (!experience || !experience.description || experience.description.trim() === '') {
      alert('Please write a basic job description first, then AI will improve it!');
      return;
    }

    setIsGeneratingAI(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://ai-resume-builder-kbai.onrender.com/api/ai/generate-description', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ input: experience.description })
      });

      const data = await response.json();

      if (data.success) {
        handleUpdateExperience(experienceId, 'description', data.result);
        alert('✨ AI has improved your job description!');
      } else {
        alert('Error generating description: ' + data.message);
      }
    } catch (error) {
      console.error('AI Error:', error);
      alert('Failed to generate AI description. Please try again.');
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateResumeData('personalInfo', {
          ...resumeData.personalInfo,
          photo: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="builder-tabs">
      {/* Tab Navigation */}
      <div className="tabs-header">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tabs-content">
        {activeTab === 'Personal Info' && (
          <div className="tab-panel">
            <div className="tab-header-section">
              <div>
                <h3>Personal Information</h3>
                <p className="tab-subtitle">Get started with the personal information</p>
              </div>
              <div className="tab-navigation">
                <button 
                  className="btn-nav" 
                  onClick={goToPreviousTab}
                  disabled={tabs.indexOf(activeTab) === 0}
                >
                  ← Previous
                </button>
                <button 
                  className="btn-nav btn-nav-next" 
                  onClick={goToNextTab}
                  disabled={tabs.indexOf(activeTab) === tabs.length - 1}
                >
                  Next →
                </button>
              </div>
            </div>
            
            <div className="form-group">
              <label>Profile Photo</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={handlePhotoUpload}
                className="input-file"
              />
              {resumeData.personalInfo.photo && (
                <img src={resumeData.personalInfo.photo} alt="Preview" className="photo-preview" />
              )}
            </div>

            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                value={resumeData.personalInfo.fullName}
                onChange={(e) => updateResumeData('personalInfo', {
                  ...resumeData.personalInfo,
                  fullName: e.target.value
                })}
                placeholder="John Doe"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Job Title *</label>
              <input
                type="text"
                value={resumeData.personalInfo.jobTitle}
                onChange={(e) => updateResumeData('personalInfo', {
                  ...resumeData.personalInfo,
                  jobTitle: e.target.value
                })}
                placeholder="Full Stack Developer"
                className="form-input"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  value={resumeData.personalInfo.email}
                  onChange={(e) => updateResumeData('personalInfo', {
                    ...resumeData.personalInfo,
                    email: e.target.value
                  })}
                  placeholder="john@example.com"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  value={resumeData.personalInfo.phone}
                  onChange={(e) => updateResumeData('personalInfo', {
                    ...resumeData.personalInfo,
                    phone: e.target.value
                  })}
                  placeholder="+1 (555) 000-0000"
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                value={resumeData.personalInfo.location}
                onChange={(e) => updateResumeData('personalInfo', {
                  ...resumeData.personalInfo,
                  location: e.target.value
                })}
                placeholder="New York, NY"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Website / Portfolio</label>
              <input
                type="url"
                value={resumeData.personalInfo.website}
                onChange={(e) => updateResumeData('personalInfo', {
                  ...resumeData.personalInfo,
                  website: e.target.value
                })}
                placeholder="https://johndoe.com"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>LinkedIn Profile</label>
              <input
                type="url"
                value={resumeData.personalInfo.linkedin}
                onChange={(e) => updateResumeData('personalInfo', {
                  ...resumeData.personalInfo,
                  linkedin: e.target.value
                })}
                placeholder="https://linkedin.com/in/johndoe"
                className="form-input"
              />
            </div>

            <button className="btn-save-changes" onClick={() => alert('✅ Saved Successfully!')}>
              Save Changes
            </button>
          </div>
        )}

        {activeTab === 'Summary' && (
          <div className="tab-panel">
            <div className="tab-header-section">
              <div>
                <h3>Professional Summary</h3>
                <p className="tab-subtitle">Write a brief professional summary</p>
              </div>
              <div className="tab-navigation">
                <button className="btn-nav" onClick={goToPreviousTab}>← Previous</button>
                <button className="btn-nav btn-nav-next" onClick={goToNextTab}>Next →</button>
              </div>
            </div>

            <div className="form-group">
              <label>Summary</label>
              <textarea
                value={resumeData.summary}
                onChange={(e) => updateResumeData('summary', e.target.value)}
                placeholder="Write a brief professional summary about yourself..."
                className="form-textarea"
                rows="8"
              />
              <button 
                className="btn-ai-generate"
                onClick={generateAISummary}
                disabled={isGeneratingAI}
                style={{
                  marginTop: '10px',
                  padding: '10px 20px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: isGeneratingAI ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  opacity: isGeneratingAI ? 0.7 : 1
                }}
              >
                {isGeneratingAI ? '✨ Generating...' : '✨ Improve with AI'}
              </button>
            </div>

            <button className="btn-save-changes" onClick={() => alert('✅ Saved Successfully!')}>
              Save Changes
            </button>
          </div>
        )}

        {activeTab === 'Experience' && (
          <div className="tab-panel">
            <div className="tab-header-section">
              <div>
                <h3>Professional Experience</h3>
                <p className="tab-subtitle">Add your job experience</p>
              </div>
              <div className="tab-navigation">
                <button className="btn-nav" onClick={goToPreviousTab}>← Previous</button>
                <button className="btn-nav btn-nav-next" onClick={goToNextTab}>Next →</button>
              </div>
            </div>

            {resumeData.experience.map((exp, index) => (
              <div key={exp.id} className="item-card">
                <div className="card-header">
                  <h4>Experience #{index + 1}</h4>
                  {resumeData.experience.length > 1 && (
                    <button 
                      className="btn-remove-icon" 
                      onClick={() => handleRemoveExperience(exp.id)}
                    >
                      🗑️
                    </button>
                  )}
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>Company Name</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => handleUpdateExperience(exp.id, 'company', e.target.value)}
                      placeholder="Company Name"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Job Title</label>
                    <input
                      type="text"
                      value={exp.role}
                      onChange={(e) => handleUpdateExperience(exp.id, 'role', e.target.value)}
                      placeholder="Job Title"
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>Start Date</label>
                    <input
                      type="month"
                      value={exp.startDate || ''}
                      onChange={(e) => handleUpdateExperience(exp.id, 'startDate', e.target.value)}
                      className="form-input date-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>End Date</label>
                    <input
                      type="month"
                      value={exp.endDate || ''}
                      onChange={(e) => handleUpdateExperience(exp.id, 'endDate', e.target.value)}
                      className="form-input date-input"
                      disabled={exp.currentlyWorking}
                    />
                  </div>
                </div>

                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={exp.currentlyWorking || false}
                      onChange={(e) => handleUpdateExperience(exp.id, 'currentlyWorking', e.target.checked)}
                      className="form-checkbox"
                    />
                    Currently working here
                  </label>
                </div>

                <div className="form-group">
                  <label>Job Description</label>
                  <textarea
                    value={exp.description}
                    onChange={(e) => handleUpdateExperience(exp.id, 'description', e.target.value)}
                    placeholder="Describe your key responsibilities and achievements..."
                    className="form-textarea"
                    rows="4"
                  />
                  <button 
                    className="btn-enhance"
                    onClick={() => generateAIJobDescription(exp.id)}
                    disabled={isGeneratingAI}
                    style={{
                      marginTop: '10px',
                      padding: '10px 20px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: isGeneratingAI ? 'not-allowed' : 'pointer',
                      fontSize: '14px',
                      fontWeight: '600',
                      opacity: isGeneratingAI ? 0.7 : 1
                    }}
                  >
                    {isGeneratingAI ? '✨ Generating...' : '✨ Enhance with AI'}
                  </button>
                </div>
              </div>
            ))}

            <button className="btn-add-section" onClick={handleAddExperience}>
              + Add Experience
            </button>

            <button className="btn-save-changes" onClick={() => alert('✅ Saved Successfully!')}>
              Save Changes
            </button>
          </div>
        )}

        {activeTab === 'Education' && (
          <div className="tab-panel">
            <div className="tab-header-section">
              <div>
                <h3>Education</h3>
                <p className="tab-subtitle">Add your education details</p>
              </div>
              <div className="tab-navigation">
                <button className="btn-nav" onClick={goToPreviousTab}>← Previous</button>
                <button className="btn-nav btn-nav-next" onClick={goToNextTab}>Next →</button>
              </div>
            </div>

            {resumeData.education.map((edu, index) => (
              <div key={edu.id} className="item-card">
                <div className="card-header">
                  <h4>Education #{index + 1}</h4>
                  {resumeData.education.length > 1 && (
                    <button 
                      className="btn-remove-icon" 
                      onClick={() => handleRemoveEducation(edu.id)}
                    >
                      🗑️
                    </button>
                  )}
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>Institution Name</label>
                    <input
                      type="text"
                      value={edu.college}
                      onChange={(e) => handleUpdateEducation(edu.id, 'college', e.target.value)}
                      placeholder="Institution Name"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Degree (e.g., Bachelor's, Master's)</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => handleUpdateEducation(edu.id, 'degree', e.target.value)}
                      placeholder="Degree (e.g., Bachelor's, Ma..."
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>Field of Study</label>
                    <input
                      type="text"
                      value={edu.fieldOfStudy || ''}
                      onChange={(e) => handleUpdateEducation(edu.id, 'fieldOfStudy', e.target.value)}
                      placeholder="Field of Study"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Graduation Date</label>
                    <input
                      type="month"
                      value={edu.year || ''}
                      onChange={(e) => handleUpdateEducation(edu.id, 'year', e.target.value)}
                      className="form-input date-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>GPA (optional)</label>
                  <input
                    type="text"
                    value={edu.gpa || ''}
                    onChange={(e) => handleUpdateEducation(edu.id, 'gpa', e.target.value)}
                    placeholder="GPA (optional)"
                    className="form-input"
                  />
                </div>
              </div>
            ))}

            <button className="btn-add-section" onClick={handleAddEducation}>
              + Add Education
            </button>

            <button className="btn-save-changes" onClick={() => alert('✅ Saved Successfully!')}>
              Save Changes
            </button>
          </div>
        )}

        {activeTab === 'Skills' && (
          <div className="tab-panel">
            <div className="tab-header-section">
              <div>
                <h3>Skills</h3>
                <p className="tab-subtitle">Add your technical and soft skills</p>
              </div>
              <div className="tab-navigation">
                <button className="btn-nav" onClick={goToPreviousTab}>← Previous</button>
                <button className="btn-nav btn-nav-next" onClick={goToNextTab}>Next →</button>
              </div>
            </div>

            <div className="skill-input-section">
              <div className="skill-input-group">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={handleSkillKeyPress}
                  placeholder="Enter a skill (e.g., JavaScript, Project Management)"
                  className="form-input skill-input-field"
                />
                <button className="btn-add-skill" onClick={handleAddSkill}>
                  + Add
                </button>
              </div>

              {resumeData.skills.length > 0 && (
                <div className="skills-list">
                  {resumeData.skills.map((skill, index) => (
                    <div key={index} className="skill-chip">
                      <span>{skill}</span>
                      <button 
                        className="skill-remove" 
                        onClick={() => handleRemoveSkill(index)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="skill-tip">
                <strong>Tip:</strong> Add 8-12 relevant skills. Include both technical skills (programming languages, tools) and soft skills (leadership, communication).
              </div>
            </div>

            <button className="btn-save-changes" onClick={() => alert('✅ Saved Successfully!')}>
              Save Changes
            </button>
          </div>
        )}

        {activeTab === 'Projects' && (
          <div className="tab-panel">
            <div className="tab-header-section">
              <div>
                <h3>Projects</h3>
                <p className="tab-subtitle">Add your notable projects</p>
              </div>
              <div className="tab-navigation">
                <button className="btn-nav" onClick={goToPreviousTab}>← Previous</button>
                <button className="btn-nav btn-nav-next" onClick={goToNextTab} disabled>Next →</button>
              </div>
            </div>

            {resumeData.projects.map((proj, index) => (
              <div key={proj.id} className="item-card">
                <div className="card-header">
                  <h4>Project #{index + 1}</h4>
                  {resumeData.projects.length > 1 && (
                    <button 
                      className="btn-remove-icon" 
                      onClick={() => handleRemoveProject(proj.id)}
                    >
                      🗑️
                    </button>
                  )}
                </div>

                <div className="form-group">
                  <label>Project Title</label>
                  <input
                    type="text"
                    value={proj.title}
                    onChange={(e) => handleUpdateProject(proj.id, 'title', e.target.value)}
                    placeholder="Project Title"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={proj.description}
                    onChange={(e) => handleUpdateProject(proj.id, 'description', e.target.value)}
                    placeholder="Describe what you built and achieved..."
                    className="form-textarea"
                    rows="4"
                  />
                </div>

                <div className="form-group">
                  <label>Tech Stack</label>
                  <input
                    type="text"
                    value={proj.techStack}
                    onChange={(e) => handleUpdateProject(proj.id, 'techStack', e.target.value)}
                    placeholder="React, Node.js, MongoDB"
                    className="form-input"
                  />
                </div>
              </div>
            ))}

            <button className="btn-add-section" onClick={handleAddProject}>
              + Add Project
            </button>

            <button className="btn-save-changes" onClick={() => alert('✅ Saved Successfully!')}>
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuilderTabs;
