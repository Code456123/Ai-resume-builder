import React from 'react';

const MinimalTemplate = ({ data, accentColor }) => {
  return (
    <div className="template minimal-template">
      {/* Simple Header */}
      <div className="minimal-header">
        <h1>{data.personalInfo.fullName || 'Your Name'}</h1>
        <h2 style={{ color: accentColor }}>
          {data.personalInfo.jobTitle || 'Your Job Title'}
        </h2>
        <div className="minimal-contact">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
        </div>
        <div className="minimal-links">
          {data.personalInfo.website && (
            <a href={data.personalInfo.website} style={{ color: accentColor }}>
              {data.personalInfo.website}
            </a>
          )}
          {data.personalInfo.linkedin && (
            <a href={data.personalInfo.linkedin} style={{ color: accentColor }}>
              LinkedIn
            </a>
          )}
        </div>
      </div>

      <div className="divider" style={{ backgroundColor: accentColor }}></div>

      {/* Summary */}
      {data.summary && (
        <div className="minimal-section">
          <p className="minimal-summary">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && data.experience.some(exp => exp.company || exp.role) && (
        <div className="minimal-section">
          <h3 style={{ borderLeftColor: accentColor }}>Experience</h3>
          {data.experience.map(exp => (
            (exp.company || exp.role) && (
              <div key={exp.id} className="minimal-item">
                <div className="item-row">
                  <strong>{exp.role || 'Role'}</strong>
                  <span className="text-muted">
                    {exp.startDate && new Date(exp.startDate + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    {exp.startDate && ' - '}
                    {exp.currentlyWorking ? 'Present' : (exp.endDate && new Date(exp.endDate + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }))}
                  </span>
                </div>
                <div className="item-row">
                  <span style={{ color: accentColor }}>{exp.company || 'Company'}</span>
                </div>
                {exp.description && <p>{exp.description}</p>}
              </div>
            )
          ))}
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && data.education.some(edu => edu.degree || edu.college) && (
        <div className="minimal-section">
          <h3 style={{ borderLeftColor: accentColor }}>Education</h3>
          {data.education.map(edu => (
            (edu.degree || edu.college) && (
              <div key={edu.id} className="minimal-item">
                <div className="item-row">
                  <strong>{edu.degree || 'Degree'}</strong>
                  <span className="text-muted">
                    {edu.year && new Date(edu.year + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                </div>
                <div className="item-row">
                  <span>{edu.college || 'College'}</span>
                </div>
                {edu.fieldOfStudy && <p>{edu.fieldOfStudy}</p>}
                {edu.gpa && <p>GPA: {edu.gpa}</p>}
              </div>
            )
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="minimal-section">
          <h3 style={{ borderLeftColor: accentColor }}>Skills</h3>
          <p className="skills-text">{data.skills.join(' • ')}</p>
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && data.projects.some(proj => proj.title) && (
        <div className="minimal-section">
          <h3 style={{ borderLeftColor: accentColor }}>Projects</h3>
          {data.projects.map(proj => (
            proj.title && (
              <div key={proj.id} className="minimal-item">
                <strong>{proj.title}</strong>
                {proj.techStack && (
                  <span style={{ color: accentColor }}> — {proj.techStack}</span>
                )}
                {proj.description && <p>{proj.description}</p>}
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
};

export default MinimalTemplate;
