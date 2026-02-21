import React from 'react';

const ATSTemplate = ({ data, accentColor }) => {
  return (
    <div className="template ats-template">
      {/* Simple Header for ATS */}
      <div className="ats-header">
        <h1>{data.personalInfo.fullName || 'Your Name'}</h1>
        <div className="ats-contact">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span> | {data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span> | {data.personalInfo.location}</span>}
        </div>
        {(data.personalInfo.website || data.personalInfo.linkedin) && (
          <div className="ats-links">
            {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
            {data.personalInfo.linkedin && <span> | {data.personalInfo.linkedin}</span>}
          </div>
        )}
      </div>

      {/* Professional Title */}
      {data.personalInfo.jobTitle && (
        <div className="ats-section">
          <h2 style={{ borderBottomColor: accentColor }}>PROFESSIONAL TITLE</h2>
          <p>{data.personalInfo.jobTitle}</p>
        </div>
      )}

      {/* Summary */}
      {data.summary && (
        <div className="ats-section">
          <h2 style={{ borderBottomColor: accentColor }}>PROFESSIONAL SUMMARY</h2>
          <p>{data.summary}</p>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="ats-section">
          <h2 style={{ borderBottomColor: accentColor }}>SKILLS</h2>
          <p>{data.skills.join(' • ')}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && data.experience.some(exp => exp.company || exp.role) && (
        <div className="ats-section">
          <h2 style={{ borderBottomColor: accentColor }}>PROFESSIONAL EXPERIENCE</h2>
          {data.experience.map(exp => (
            (exp.company || exp.role) && (
              <div key={exp.id} className="ats-item">
                <div className="ats-item-title">
                  <strong>{exp.role || 'Role'}</strong>
                  <span className="ats-date">
                    {exp.startDate && new Date(exp.startDate + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    {exp.startDate && ' - '}
                    {exp.currentlyWorking ? 'Present' : (exp.endDate && new Date(exp.endDate + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }))}
                  </span>
                </div>
                <p className="ats-company">{exp.company || 'Company'}</p>
                {exp.description && (
                  <p className="ats-description">{exp.description}</p>
                )}
              </div>
            )
          ))}
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && data.education.some(edu => edu.degree || edu.college) && (
        <div className="ats-section">
          <h2 style={{ borderBottomColor: accentColor }}>EDUCATION</h2>
          {data.education.map(edu => (
            (edu.degree || edu.college) && (
              <div key={edu.id} className="ats-item">
                <div className="ats-item-title">
                  <strong>{edu.degree || 'Degree'}</strong>
                    <span className="ats-date">
                      {edu.year && new Date(edu.year + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <p>{edu.college || 'College'}</p>
                  {edu.fieldOfStudy && <p>{edu.fieldOfStudy}</p>}
                  {edu.gpa && <p>GPA: {edu.gpa}</p>}
              </div>
            )
          ))}
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && data.projects.some(proj => proj.title) && (
        <div className="ats-section">
          <h2 style={{ borderBottomColor: accentColor }}>PROJECTS</h2>
          {data.projects.map(proj => (
            proj.title && (
              <div key={proj.id} className="ats-item">
                <strong>{proj.title}</strong>
                {proj.techStack && (
                  <p className="ats-tech">Technologies: {proj.techStack}</p>
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

export default ATSTemplate;
