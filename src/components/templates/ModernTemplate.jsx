import React from 'react';

const ModernTemplate = ({ data, accentColor }) => {
  return (
    <div className="template modern-template">
      {/* Header Section */}
      <div className="template-header" style={{ borderBottomColor: accentColor }}>
        <div className="header-content">
          {data.personalInfo.photo && (
            <img 
              src={data.personalInfo.photo} 
              alt="Profile" 
              className="profile-photo"
            />
          )}
          <div className="header-text">
            <h1 style={{ color: accentColor }}>
              {data.personalInfo.fullName || 'Your Name'}
            </h1>
            <h2>{data.personalInfo.jobTitle || 'Your Job Title'}</h2>
            <div className="contact-info">
              {data.personalInfo.email && (
                <span>✉️ {data.personalInfo.email}</span>
              )}
              {data.personalInfo.phone && (
                <span>📱 {data.personalInfo.phone}</span>
              )}
              {data.personalInfo.location && (
                <span>📍 {data.personalInfo.location}</span>
              )}
            </div>
            <div className="links-info">
              {data.personalInfo.website && (
                <a href={data.personalInfo.website} style={{ color: accentColor }}>
                  🌐 Website
                </a>
              )}
              {data.personalInfo.linkedin && (
                <a href={data.personalInfo.linkedin} style={{ color: accentColor }}>
                  💼 LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Summary Section */}
      {data.summary && (
        <div className="template-section">
          <h3 style={{ color: accentColor }}>PROFILE</h3>
          <p className="summary-text">{data.summary}</p>
        </div>
      )}

      {/* Experience Section */}
      {data.experience.length > 0 && data.experience.some(exp => exp.company || exp.role) && (
        <div className="template-section">
          <h3 style={{ color: accentColor }}>EXPERIENCE</h3>
          {data.experience.map(exp => (
            (exp.company || exp.role) && (
              <div key={exp.id} className="experience-item">
                <div className="exp-header">
                  <div>
                    <h4>{exp.role || 'Role'}</h4>
                    <p className="company" style={{ color: accentColor }}>
                      {exp.company || 'Company'}
                    </p>
                  </div>
                  <span className="duration">
                    {exp.startDate && new Date(exp.startDate + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    {exp.startDate && ' - '}
                    {exp.currentlyWorking ? 'Present' : (exp.endDate && new Date(exp.endDate + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }))}
                  </span>
                </div>
                {exp.description && (
                  <p className="description">{exp.description}</p>
                )}
              </div>
            )
          ))}
        </div>
      )}

      {/* Education Section */}
      {data.education.length > 0 && data.education.some(edu => edu.degree || edu.college) && (
        <div className="template-section">
          <h3 style={{ color: accentColor }}>EDUCATION</h3>
          {data.education.map(edu => (
            (edu.degree || edu.college) && (
              <div key={edu.id} className="education-item">
                <div className="edu-header">
                  <div>
                    <h4>{edu.degree || 'Degree'}</h4>
                    <p className="college">{edu.college || 'College'}</p>
                    {edu.fieldOfStudy && <p className="field-of-study">{edu.fieldOfStudy}</p>}
                    {edu.gpa && <p className="gpa">GPA: {edu.gpa}</p>}
                  </div>
                  <span className="year">
                    {edu.year && new Date(edu.year + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </div>
            )
          ))}
        </div>
      )}

      {/* Skills Section */}
      {data.skills.length > 0 && (
        <div className="template-section">
          <h3 style={{ color: accentColor }}>SKILLS</h3>
          <div className="skills-grid">
            {data.skills.map((skill, index) => (
              <span 
                key={index} 
                className="skill-badge"
                style={{ backgroundColor: `${accentColor}20`, color: accentColor, borderColor: accentColor }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects Section */}
      {data.projects.length > 0 && data.projects.some(proj => proj.title) && (
        <div className="template-section">
          <h3 style={{ color: accentColor }}>PROJECTS</h3>
          {data.projects.map(proj => (
            proj.title && (
              <div key={proj.id} className="project-item">
                <h4>{proj.title}</h4>
                {proj.techStack && (
                  <p className="tech-stack" style={{ color: accentColor }}>
                    {proj.techStack}
                  </p>
                )}
                {proj.description && (
                  <p className="description">{proj.description}</p>
                )}
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
};

export default ModernTemplate;
