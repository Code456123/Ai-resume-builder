import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ModernTemplate from '../components/templates/ModernTemplate';
import MinimalTemplate from '../components/templates/MinimalTemplate';
import ProfessionalTemplate from '../components/templates/ProfessionalTemplate';
import CreativeTemplate from '../components/templates/CreativeTemplate';
import ATSTemplate from '../components/templates/ATSTemplate';

const PublicResume = () => {
  const { id } = useParams();
  const [resume, setResume] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPublicResume();
  }, [id]);

  const fetchPublicResume = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`https://ai-resume-builder-kbai.onrender.com/api/resume/${id}`);
      const result = await response.json();

      if (result.success) {
        if (result.data.isPublic) {
          setResume(result.data);
        } else {
          setError('private');
        }
      } else {
        setError('notfound');
      }
    } catch (error) {
      console.error('Error fetching resume:', error);
      setError('server');
    } finally {
      setIsLoading(false);
    }
  };

  const renderTemplate = () => {
    if (!resume) return null;

    const { resumeData } = resume;
    const template = resumeData.template || 'Modern';
    const accentColor = resumeData.accentColor || '#10b981';

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

  if (isLoading) {
    return (
      <div className="public-resume-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading resume...</p>
        </div>
      </div>
    );
  }

  if (error === 'private') {
    return (
      <div className="public-resume-container">
        <div className="error-state">
          <div className="error-icon">🔒</div>
          <h2>This Resume is Private</h2>
          <p>The owner has not made this resume publicly accessible.</p>
        </div>
      </div>
    );
  }

  if (error === 'notfound') {
    return (
      <div className="public-resume-container">
        <div className="error-state">
          <div className="error-icon">❌</div>
          <h2>Resume Not Found</h2>
          <p>The resume you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  if (error === 'server') {
    return (
      <div className="public-resume-container">
        <div className="error-state">
          <div className="error-icon">⚠️</div>
          <h2>Server Error</h2>
          <p>Unable to load the resume. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="public-resume-container">
      <div className="public-resume-header">
        <h1>{resume.title}</h1>
        <p>Shared Resume</p>
      </div>
      <div className="public-resume-content">
        <div className="resume-paper">
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
};

export default PublicResume;
