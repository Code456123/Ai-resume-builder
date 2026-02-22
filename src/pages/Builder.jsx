import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import BuilderTabs from '../components/BuilderTabs';
import TemplatePreview from '../components/TemplatePreview';
import ShareModal from '../components/ShareModal';

const Builder = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id: resumeId } = useParams(); // Get resume ID from URL
  const [resumeTitle, setResumeTitle] = useState(location.state?.resumeTitle || 'Untitled Resume');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [resumeData, setResumeData] = useState(() => {
    // Check if we're loading an existing resume from Dashboard
    if (location.state?.resumeData) {
      return location.state.resumeData;
    }
    
    // Check if there's temporary data for this specific resume (page refresh case)
    const tempKey = `tempResume_${location.state?.resumeTitle || 'Untitled Resume'}`;
    const tempData = localStorage.getItem(tempKey);
    if (tempData) {
      return JSON.parse(tempData);
    }
    
    // For new resume, return empty data
    return {
      personalInfo: {
        photo: '',
        fullName: '',
        jobTitle: '',
        email: '',
        phone: '',
        location: '',
        website: '',
        linkedin: ''
      },
      summary: '',
      experience: [
        {
          id: Date.now(),
          company: '',
          role: '',
          startDate: '',
          endDate: '',
          currentlyWorking: false,
          description: ''
        }
      ],
      education: [
        {
          id: Date.now(),
          degree: '',
          college: '',
          fieldOfStudy: '',
          year: '',
          gpa: ''
        }
      ],
      skills: [],
      projects: [
        {
          id: Date.now(),
          title: '',
          description: '',
          techStack: ''
        }
      ]
    };
  });

  const [selectedTemplate, setSelectedTemplate] = useState(location.state?.selectedTemplate || 'Modern');
  const [accentColor, setAccentColor] = useState(location.state?.accentColor || '#10b981');

  // Fetch resume data if resumeId exists in URL
  useEffect(() => {
    if (resumeId) {
      fetchResumeData();
    }
  }, [resumeId]);

  const fetchResumeData = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`https://ai-resume-builder-kbai.onrender.com/api/resume/${resumeId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();

      if (result.success) {
        const resume = result.data;
        setResumeTitle(resume.title);
        setResumeData(resume.resumeData);
        if (resume.resumeData.template) setSelectedTemplate(resume.resumeData.template);
        if (resume.resumeData.accentColor) setAccentColor(resume.resumeData.accentColor);
      } else {
        alert('Error loading resume');
      }
    } catch (error) {
      console.error('Error fetching resume:', error);
      alert('Error loading resume from database');
    } finally {
      setIsLoading(false);
    }
  };

  // Clean up old global localStorage key on mount
  useEffect(() => {
    localStorage.removeItem('resumeData');
  }, []);

  // Save to localStorage with resume title as key (for page refresh)
  useEffect(() => {
    const tempKey = `tempResume_${resumeTitle}`;
    localStorage.setItem(tempKey, JSON.stringify(resumeData));
  }, [resumeData, resumeTitle]);

  const updateResumeData = (section, data) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Save to MongoDB via backend API
      const response = await fetch('https://ai-resume-builder-kbai.onrender.com/api/resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: resumeTitle,
          resumeData: {
            ...resumeData,
            template: selectedTemplate,
            accentColor: accentColor
          },
          template: selectedTemplate,
          accentColor: accentColor
        })
      });

      const result = await response.json();

      if (result.success) {
        // Also save to localStorage
        const savedResumes = JSON.parse(localStorage.getItem('resumes') || '[]');
        savedResumes.push({
          id: result.data._id,
          title: resumeTitle,
          data: resumeData,
          template: selectedTemplate,
          accentColor: accentColor,
          updatedAt: new Date().toISOString()
        });
        localStorage.setItem('resumes', JSON.stringify(savedResumes));
        
        alert(`✅ Resume saved successfully to Database!\nID: ${result.data._id}`);
        
        // Redirect to builder with ID
        navigate(`/builder/${result.data._id}`, { replace: true });
      } else {
        alert('❌ Error saving resume: ' + result.message);
      }
    } catch (error) {
      console.error('Error saving resume:', error);
      alert('❌ Error connecting to server. Resume saved locally only.');
      
      // Fallback to localStorage
      const savedResumes = JSON.parse(localStorage.getItem('resumes') || '[]');
      const resumeId = Date.now();
      savedResumes.push({
        id: resumeId,
        title: resumeTitle,
        data: resumeData,
        template: selectedTemplate,
        accentColor: accentColor,
        updatedAt: new Date().toISOString()
      });
      localStorage.setItem('resumes', JSON.stringify(savedResumes));
    }
  };

  const handleExport = async () => {
    const element = document.getElementById('resume-preview');
    
    try {
      // Capture the element as canvas with high quality
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        scrollY: 0,
        scrollX: 0,
        windowHeight: element.scrollHeight,
        height: element.scrollHeight,
        backgroundColor: '#ffffff'
      });
      
      // Create PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'in',
        format: 'letter'
      });
      
      // Get page dimensions
      const pageWidth = 8.5;
      const pageHeight = 11;
      const margin = 0.3;
      const maxWidth = pageWidth - (margin * 2);
      const maxHeight = pageHeight - (margin * 2);
      
      // Get image dimensions and calculate aspect ratio
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = imgWidth / imgHeight;
      
      // Calculate dimensions to fit on one page
      let finalWidth = maxWidth;
      let finalHeight = finalWidth / ratio;
      
      // If height exceeds page, scale based on height
      if (finalHeight > maxHeight) {
        finalHeight = maxHeight;
        finalWidth = finalHeight * ratio;
      }
      
      // Center the content on the page
      const x = (pageWidth - finalWidth) / 2;
      const y = (pageHeight - finalHeight) / 2;
      
      // Convert canvas to image and add to PDF (SINGLE PAGE ONLY)
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      pdf.addImage(imgData, 'JPEG', x, y, finalWidth, finalHeight);
      
      // Save the PDF
      pdf.save(`${resumeTitle || 'Resume'}.pdf`);
      
      // Save resume metadata to localStorage
      const savedResumes = JSON.parse(localStorage.getItem('savedResumes') || '[]');
      const resumeId = Date.now();
      
      // Check if this resume already exists (by title), update if yes
      const existingIndex = savedResumes.findIndex(r => r.title === resumeTitle);
      const resumeRecord = {
        id: existingIndex >= 0 ? savedResumes[existingIndex].id : resumeId,
        title: resumeTitle,
        data: resumeData,
        template: selectedTemplate,
        accentColor: accentColor,
        thumbnail: imgData,
        createdAt: existingIndex >= 0 ? savedResumes[existingIndex].createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        downloadCount: existingIndex >= 0 ? savedResumes[existingIndex].downloadCount + 1 : 1
      };
      
      if (existingIndex >= 0) {
        savedResumes[existingIndex] = resumeRecord;
      } else {
        savedResumes.push(resumeRecord);
      }
      
      localStorage.setItem('savedResumes', JSON.stringify(savedResumes));
      
      // Clean up temporary localStorage for this resume
      const tempKey = `tempResume_${resumeTitle}`;
      localStorage.removeItem(tempKey);
      
      alert('PDF downloaded and saved successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  return (
    <div className="builder-container">
      {/* Top Navigation Bar */}
      <div className="builder-navbar">
        <div className="builder-nav-left">
          <button className="btn-back" onClick={() => navigate('/dashboard')}>
            ← Back to Dashboard
          </button>
          <h2 className="resume-title">{resumeTitle}</h2>
        </div>
        <div className="builder-nav-right">
          <button className="btn-save" onClick={handleSave}>
            💾 Save
          </button>
          {resumeId && (
            <button className="btn-share" onClick={() => setIsShareModalOpen(true)}>
              📤 Share
            </button>
          )}
          <button className="btn-export" onClick={handleExport}>
            📥 Export PDF
          </button>
        </div>
      </div>

      {/* Split Screen Layout */}
      <div className="builder-split">
        {/* Left Side - Form */}
        <div className="builder-left">
          <BuilderTabs 
            resumeData={resumeData} 
            updateResumeData={updateResumeData}
          />
        </div>

        {/* Right Side - Live Preview */}
        <div className="builder-right">
          <div className="preview-controls">
            <div className="control-group">
              <label>Template:</label>
              <select 
                value={selectedTemplate} 
                onChange={(e) => setSelectedTemplate(e.target.value)}
                className="template-selector"
              >
                <option value="Modern">Modern</option>
                <option value="Minimal">Minimal</option>
                <option value="Professional">Professional</option>
                <option value="Creative">Creative</option>
                <option value="ATS">ATS Optimized</option>
              </select>
            </div>

            <div className="control-group">
              <label>Accent Color:</label>
              <div className="color-picker">
                <input 
                  type="color" 
                  value={accentColor} 
                  onChange={(e) => setAccentColor(e.target.value)}
                />
                <div className="color-presets">
                  <button 
                    className="color-btn" 
                    style={{background: '#10b981'}}
                    onClick={() => setAccentColor('#10b981')}
                  />
                  <button 
                    className="color-btn" 
                    style={{background: '#3b82f6'}}
                    onClick={() => setAccentColor('#3b82f6')}
                  />
                  <button 
                    className="color-btn" 
                    style={{background: '#8b5cf6'}}
                    onClick={() => setAccentColor('#8b5cf6')}
                  />
                  <button 
                    className="color-btn" 
                    style={{background: '#ef4444'}}
                    onClick={() => setAccentColor('#ef4444')}
                  />
                  <button 
                    className="color-btn" 
                    style={{background: '#f59e0b'}}
                    onClick={() => setAccentColor('#f59e0b')}
                  />
                </div>
              </div>
            </div>
          </div>

          <TemplatePreview 
            resumeData={resumeData}
            template={selectedTemplate}
            accentColor={accentColor}
          />
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal 
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        resumeId={resumeId}
      />
    </div>
  );
};

export default Builder;
