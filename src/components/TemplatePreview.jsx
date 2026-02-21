import React from 'react';
import ModernTemplate from './templates/ModernTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import ProfessionalTemplate from './templates/ProfessionalTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import ATSTemplate from './templates/ATSTemplate';

const TemplatePreview = ({ resumeData, template, accentColor }) => {
  const renderTemplate = () => {
    switch (template) {
      case 'Modern':
        return <ModernTemplate data={resumeData} accentColor={accentColor} />;
      case 'Minimal':
        return <MinimalTemplate data={resumeData} accentColor={accentColor} />;
      case 'Professional':
        return <ProfessionalTemplate data={resumeData} accentColor={accentColor} />;
      case 'Creative':
        return <CreativeTemplate data={resumeData} accentColor={accentColor} />;
      case 'ATS':
        return <ATSTemplate data={resumeData} accentColor={accentColor} />;
      default:
        return <ModernTemplate data={resumeData} accentColor={accentColor} />;
    }
  };

  return (
    <div className="template-preview">
      <div className="preview-paper" id="resume-preview">
        {renderTemplate()}
      </div>
    </div>
  );
};

export default TemplatePreview;
