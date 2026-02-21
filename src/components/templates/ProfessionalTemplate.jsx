import React from 'react';

const ProfessionalTemplate = ({ data, accentColor }) => {
  return (
    <div className="template professional-template">
      <div className="professional-layout">
        {/* Left Sidebar */}
        <div className="professional-sidebar" style={{ backgroundColor: accentColor }}>
          {data.personalInfo.photo && (
            <div className="sidebar-photo">
              <img src={data.personalInfo.photo} alt="Profile" />
            </div>
          )}

          <div className="sidebar-section">
            <h3>CONTACT</h3>
            <div className="sidebar-content">
              {data.personalInfo.email && (
                <div className="contact-item">
                  <strong>Email</strong>
                  <p>{data.personalInfo.email}</p>
                </div>
              )}
              {data.personalInfo.phone && (
                <div className="contact-item">
                  <strong>Phone</strong>
                  <p>{data.personalInfo.phone}</p>
                </div>
              )}
              {data.personalInfo.location && (
                <div className="contact-item">
                  <strong>Location</strong>
                  <p>{data.personalInfo.location}</p>
                </div>
              )}
              {data.personalInfo.website && (
                <div className="contact-item">
                  <strong>Website</strong>
                  <p className="link-text">{data.personalInfo.website}</p>
                </div>
              )}
              {data.personalInfo.linkedin && (
                <div className="contact-item">
                  <strong>LinkedIn</strong>
                  <p className="link-text">{data.personalInfo.linkedin}</p>
                </div>
              )}
            </div>
          </div>

          {data.skills.length > 0 && (
            <div className="sidebar-section">
              <h3>SKILLS</h3>
              <div className="sidebar-content">
                <ul className="skills-list">
                  {data.skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="professional-main">
          <div className="professional-header">
            <h1>{data.personalInfo.fullName || 'Your Name'}</h1>
            <h2 style={{ color: accentColor }}>
              {data.personalInfo.jobTitle || 'Your Job Title'}
            </h2>
          </div>

          {data.summary && (
            <div className="professional-section">
              <h3 style={{ color: accentColor }}>PROFILE</h3>
              <div className="section-divider" style={{ backgroundColor: accentColor }}></div>
              <p>{data.summary}</p>
            </div>
          )}

          {data.experience.length > 0 && data.experience.some(exp => exp.company || exp.role) && (
            <div className="professional-section">
              <h3 style={{ color: accentColor }}>EXPERIENCE</h3>
              <div className="section-divider" style={{ backgroundColor: accentColor }}></div>
              {data.experience.map(exp => (
                (exp.company || exp.role) && (
                  <div key={exp.id} className="prof-item">
                    <div className="prof-item-header">
                      <div>
                        <h4>{exp.role || 'Role'}</h4>
                        <p className="company-name">{exp.company || 'Company'}</p>
                      </div>
                      <span className="duration">
                        {exp.startDate && new Date(exp.startDate + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        {exp.startDate && ' - '}
                        {exp.currentlyWorking ? 'Present' : (exp.endDate && new Date(exp.endDate + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }))}
                      </span>
                    </div>
                    {exp.description && <p>{exp.description}</p>}
                  </div>
                )
              ))}
            </div>
          )}

          {data.education.length > 0 && data.education.some(edu => edu.degree || edu.college) && (
            <div className="professional-section">
              <h3 style={{ color: accentColor }}>EDUCATION</h3>
              <div className="section-divider" style={{ backgroundColor: accentColor }}></div>
              {data.education.map(edu => (
                (edu.degree || edu.college) && (
                  <div key={edu.id} className="prof-item">
                    <div className="prof-item-header">
                      <div>
                        <h4>{edu.degree || 'Degree'}</h4>
                        <p>{edu.college || 'College'}</p>
                        {edu.fieldOfStudy && <p>{edu.fieldOfStudy}</p>}
                        {edu.gpa && <p>GPA: {edu.gpa}</p>}
                      </div>
                      <span className="duration">
                        {edu.year && new Date(edu.year + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                  </div>
                )
              ))}
            </div>
          )}

          {data.projects.length > 0 && data.projects.some(proj => proj.title) && (
            <div className="professional-section">
              <h3 style={{ color: accentColor }}>PROJECTS</h3>
              <div className="section-divider" style={{ backgroundColor: accentColor }}></div>
              {data.projects.map(proj => (
                proj.title && (
                  <div key={proj.id} className="prof-item">
                    <h4>{proj.title}</h4>
                    {proj.techStack && (
                      <p className="tech-stack">{proj.techStack}</p>
                    )}
                    {proj.description && <p>{proj.description}</p>}
                  </div>
                )
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalTemplate;
