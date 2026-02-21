import React from 'react';

const CreativeTemplate = ({ data, accentColor }) => {
  return (
    <div className="template creative-template">
      {/* Creative Header */}
      <div className="creative-header" style={{ background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}dd 100%)` }}>
        {data.personalInfo.photo && (
          <div className="creative-photo">
            <img src={data.personalInfo.photo} alt="Profile" />
          </div>
        )}
        <div className="creative-header-text">
          <h1>{data.personalInfo.fullName || 'Your Name'}</h1>
          <h2>{data.personalInfo.jobTitle || 'Your Job Title'}</h2>
          <div className="creative-contact">
            {data.personalInfo.email && <span>✉️ {data.personalInfo.email}</span>}
            {data.personalInfo.phone && <span>📱 {data.personalInfo.phone}</span>}
            {data.personalInfo.location && <span>📍 {data.personalInfo.location}</span>}
          </div>
        </div>
      </div>

      <div className="creative-content">
        <div className="creative-grid">
          {/* Left Column */}
          <div className="creative-left">
            {data.summary && (
              <div className="creative-section">
                <h3 style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
                  💼 About Me
                </h3>
                <p>{data.summary}</p>
              </div>
            )}

            {data.experience.length > 0 && data.experience.some(exp => exp.company || exp.role) && (
              <div className="creative-section">
                <h3 style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
                  🚀 Experience
                </h3>
                {data.experience.map(exp => (
                  (exp.company || exp.role) && (
                    <div key={exp.id} className="creative-item">
                      <div className="creative-item-header">
                        <h4>{exp.role || 'Role'}</h4>
                        <span className="badge" style={{ backgroundColor: accentColor }}>
                          {exp.startDate && new Date(exp.startDate + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                          {exp.startDate && ' - '}
                          {exp.currentlyWorking ? 'Present' : (exp.endDate && new Date(exp.endDate + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }))}
                        </span>
                      </div>
                      <p className="company-name" style={{ color: accentColor }}>
                        {exp.company || 'Company'}
                      </p>
                      {exp.description && <p>{exp.description}</p>}
                    </div>
                  )
                ))}
              </div>
            )}

            {data.projects.length > 0 && data.projects.some(proj => proj.title) && (
              <div className="creative-section">
                <h3 style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
                  🎨 Projects
                </h3>
                {data.projects.map(proj => (
                  proj.title && (
                    <div key={proj.id} className="creative-item">
                      <h4>{proj.title}</h4>
                      {proj.techStack && (
                        <p className="tech-badge" style={{ color: accentColor }}>
                          {proj.techStack}
                        </p>
                      )}
                      {proj.description && <p>{proj.description}</p>}
                    </div>
                  )
                ))}
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="creative-right">
            {(data.personalInfo.website || data.personalInfo.linkedin) && (
              <div className="creative-section">
                <h3 style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
                  🔗 Links
                </h3>
                <div className="links-list">
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
            )}

            {data.skills.length > 0 && (
              <div className="creative-section">
                <h3 style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
                  ⚡ Skills
                </h3>
                <div className="creative-skills">
                  {data.skills.map((skill, index) => (
                    <span 
                      key={index} 
                      className="creative-skill-tag"
                      style={{ backgroundColor: `${accentColor}30`, borderColor: accentColor }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {data.education.length > 0 && data.education.some(edu => edu.degree || edu.college) && (
              <div className="creative-section">
                <h3 style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
                  🎓 Education
                </h3>
                {data.education.map(edu => (
                  (edu.degree || edu.college) && (
                    <div key={edu.id} className="creative-item">
                      <h4>{edu.degree || 'Degree'}</h4>
                      <p>{edu.college || 'College'}</p>
                      {edu.fieldOfStudy && <p>{edu.fieldOfStudy}</p>}
                      {edu.gpa && <p>GPA: {edu.gpa}</p>}
                      {edu.year && (
                        <span className="year-badge" style={{ backgroundColor: accentColor }}>
                          {new Date(edu.year + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </span>
                      )}
                    </div>
                  )
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreativeTemplate;
