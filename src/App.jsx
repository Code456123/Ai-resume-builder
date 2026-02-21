import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import Builder from './pages/Builder';
import PublicResume from './pages/PublicResume';
import ProtectedRoute from './components/ProtectedRoute';

function MainApp() {
  const navigate = useNavigate();
  const [showBuilder, setShowBuilder] = useState(false);
  const [resumeData, setResumeData] = useState({
    name: '',
    email: '',
    skills: '',
    education: [{ degree: '', school: '', year: '' }],
    experience: [{ title: '', company: '', duration: '', description: '' }]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResumeData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...resumeData.education];
    updatedEducation[index][field] = value;
    setResumeData(prev => ({
      ...prev,
      education: updatedEducation
    }));
  };

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, { degree: '', school: '', year: '' }]
    }));
  };

  const removeEducation = (index) => {
    if (resumeData.education.length > 1) {
      const updatedEducation = resumeData.education.filter((_, i) => i !== index);
      setResumeData(prev => ({
        ...prev,
        education: updatedEducation
      }));
    }
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperience = [...resumeData.experience];
    updatedExperience[index][field] = value;
    setResumeData(prev => ({
      ...prev,
      experience: updatedExperience
    }));
  };

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, { title: '', company: '', duration: '', description: '' }]
    }));
  };

  const removeExperience = (index) => {
    if (resumeData.experience.length > 1) {
      const updatedExperience = resumeData.experience.filter((_, i) => i !== index);
      setResumeData(prev => ({
        ...prev,
        experience: updatedExperience
      }));
    }
  };

  return (
    <>
      {!showBuilder ? (
        // Landing Page
        <div className="landing-page">
          {/* Navigation */}
          <nav className="navbar">
            <div className="nav-container">
              <div className="logo">
                resume<span className="logo-dot">.</span>
              </div>
              <ul className="nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#features">Features</a></li>
                <li><a href="#testimonials">Testimonials</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
              <div className="nav-buttons">
                <button className="btn-primary" onClick={() => navigate('/signup')}>
                  Get started
                </button>
                <button className="btn-secondary" onClick={() => navigate('/login')}>
                  Login
                </button>
              </div>
            </div>
          </nav>

          {/* Hero Section */}
          <section className="hero-section" id="home">
            <div className="hero-content">
              <div className="social-proof">
                <div className="user-avatars">
                  <div className="avatar">👨‍💼</div>
                  <div className="avatar">👩‍💻</div>
                  <div className="avatar">👨‍🎓</div>
                  <div className="avatar">👩‍🎨</div>
                </div>
                <div className="rating">
                  ⭐⭐⭐⭐⭐
                  <p>Used by 1000+ users</p>
                </div>
              </div>
              <h1 className="hero-title">
                Land your dream job with<br />
                <span className="highlight">AI-powered</span> resumes.
              </h1>
              <p className="hero-subtitle">
                Create, edit and download professional resumes with<br />
                AI-powered assistance.
              </p>
              <div className="hero-buttons">
                <button className="btn-primary large" onClick={() => navigate('/signup')}>
                  Get started →
                </button>
                <button className="btn-secondary large">📹 Try demo</button>
              </div>
              <p className="trust-text">Trusted by leading brands, including</p>
              <div className="brand-logos">
                <div className="brand-logo">🚀 TechCorp</div>
                <div className="brand-logo">💼 StartupHub</div>
                <div className="brand-logo">🎯 InnovateLab</div>
                <div className="brand-logo">⚡ FastHire</div>
                <div className="brand-logo">🌟 CareerPro</div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="features-section" id="features">
            <div className="section-badge">⚡ Simple Process</div>
            <h2 className="section-title">Build your resume</h2>
            <p className="section-subtitle">
              Our streamlined process helps you create a professional resume in minutes with<br />
              intelligent AI-powered tools and features.
            </p>
            <div className="features-grid">
              <div className="feature-card purple">
                <div className="feature-icon">🔍</div>
                <h3>Real-Time Analytics</h3>
                <p>Get instant insights into your finances with live dashboards.</p>
              </div>
              <div className="feature-card green">
                <div className="feature-icon">✅</div>
                <h3>Bank-Grade Security</h3>
                <p>End-to-end encryption, 2FA, compliance with GDPR standards.</p>
              </div>
              <div className="feature-card orange">
                <div className="feature-icon">📥</div>
                <h3>Customizable Reports</h3>
                <p>Export professional, audit-ready financial reports for tax or internal review.</p>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="testimonials-section" id="testimonials">
            <div className="section-badge green">📝 Testimonials</div>
            <h2 className="section-title">Don't just take our words</h2>
            <p className="section-subtitle">
              Hear what our users say about us. We're always looking for ways to improve. If you<br />
              have a positive experience with us, leave a review.
            </p>
            
            <div className="testimonials-carousel">
              {/* First Row - Scroll Left */}
              <div className="testimonials-track scroll-left">
                <div className="testimonial-card">
                  <div className="testimonial-header">
                    <div className="testimonial-avatar">👨‍💼</div>
                    <div>
                      <h4>Briar Martin ✓</h4>
                      <p>@neilstellor</p>
                    </div>
                  </div>
                  <p className="testimonial-text">
                    This resume builder helped me land my dream job! The AI suggestions were spot on.
                  </p>
                </div>
                <div className="testimonial-card">
                  <div className="testimonial-header">
                    <div className="testimonial-avatar">👩‍💻</div>
                    <div>
                      <h4>Avery Johnson ✓</h4>
                      <p>@averywrites</p>
                    </div>
                  </div>
                  <p className="testimonial-text">
                    Super easy to use! Created a professional resume in minutes. Highly recommend!
                  </p>
                </div>
                <div className="testimonial-card">
                  <div className="testimonial-header">
                    <div className="testimonial-avatar">👨‍🎓</div>
                    <div>
                      <h4>Jordan Lee ✓</h4>
                      <p>@jordantalks</p>
                    </div>
                  </div>
                  <p className="testimonial-text">
                    The live preview feature is amazing. I could see my resume come to life instantly!
                  </p>
                </div>
                {/* Duplicate for infinite scroll */}
                <div className="testimonial-card">
                  <div className="testimonial-header">
                    <div className="testimonial-avatar">👨‍💼</div>
                    <div>
                      <h4>Briar Martin ✓</h4>
                      <p>@neilstellor</p>
                    </div>
                  </div>
                  <p className="testimonial-text">
                    This resume builder helped me land my dream job! The AI suggestions were spot on.
                  </p>
                </div>
                <div className="testimonial-card">
                  <div className="testimonial-header">
                    <div className="testimonial-avatar">👩‍💻</div>
                    <div>
                      <h4>Avery Johnson ✓</h4>
                      <p>@averywrites</p>
                    </div>
                  </div>
                  <p className="testimonial-text">
                    Super easy to use! Created a professional resume in minutes. Highly recommend!
                  </p>
                </div>
                <div className="testimonial-card">
                  <div className="testimonial-header">
                    <div className="testimonial-avatar">👨‍🎓</div>
                    <div>
                      <h4>Jordan Lee ✓</h4>
                      <p>@jordantalks</p>
                    </div>
                  </div>
                  <p className="testimonial-text">
                    The live preview feature is amazing. I could see my resume come to life instantly!
                  </p>
                </div>
              </div>

              {/* Second Row - Scroll Right */}
              <div className="testimonials-track scroll-right">
                <div className="testimonial-card">
                  <div className="testimonial-header">
                    <div className="testimonial-avatar">👩‍🎨</div>
                    <div>
                      <h4>Sarah Kim ✓</h4>
                      <p>@sarahdesigns</p>
                    </div>
                  </div>
                  <p className="testimonial-text">
                    Beautiful templates and very intuitive interface. Worth every penny!
                  </p>
                </div>
                <div className="testimonial-card">
                  <div className="testimonial-header">
                    <div className="testimonial-avatar">👨‍🔧</div>
                    <div>
                      <h4>Michael Park ✓</h4>
                      <p>@miketech</p>
                    </div>
                  </div>
                  <p className="testimonial-text">
                    Got 3 interview calls within a week of updating my resume with this tool!
                  </p>
                </div>
                <div className="testimonial-card">
                  <div className="testimonial-header">
                    <div className="testimonial-avatar">👩‍⚕️</div>
                    <div>
                      <h4>Emma Wilson ✓</h4>
                      <p>@emmawrites</p>
                    </div>
                  </div>
                  <p className="testimonial-text">
                    The customization options are endless. Made my resume stand out from the crowd!
                  </p>
                </div>
                {/* Duplicate for infinite scroll */}
                <div className="testimonial-card">
                  <div className="testimonial-header">
                    <div className="testimonial-avatar">👩‍🎨</div>
                    <div>
                      <h4>Sarah Kim ✓</h4>
                      <p>@sarahdesigns</p>
                    </div>
                  </div>
                  <p className="testimonial-text">
                    Beautiful templates and very intuitive interface. Worth every penny!
                  </p>
                </div>
                <div className="testimonial-card">
                  <div className="testimonial-header">
                    <div className="testimonial-avatar">👨‍🔧</div>
                    <div>
                      <h4>Michael Park ✓</h4>
                      <p>@miketech</p>
                    </div>
                  </div>
                  <p className="testimonial-text">
                    Got 3 interview calls within a week of updating my resume with this tool!
                  </p>
                </div>
                <div className="testimonial-card">
                  <div className="testimonial-header">
                    <div className="testimonial-avatar">👩‍⚕️</div>
                    <div>
                      <h4>Emma Wilson ✓</h4>
                      <p>@emmawrites</p>
                    </div>
                  </div>
                  <p className="testimonial-text">
                    The customization options are endless. Made my resume stand out from the crowd!
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="cta-section">
            <div className="cta-content">
              <h2>Build a Professional Resume That Helps<br />You Stand Out and Get Hired</h2>
              <button className="btn-primary large" onClick={() => navigate('/signup')}>
                Get Started →
              </button>
            </div>
          </section>

          {/* Footer */}
          <footer className="footer" id="contact">
            <div className="footer-content">
              <div className="footer-column">
                <div className="footer-logo">
                  resume<span className="logo-dot">.</span>
                </div>
                <p className="footer-tagline">
                  Making every customer feel valued<br />
                  —no matter the size of your<br />
                  audience.
                </p>
                <div className="social-icons">
                  <a href="#">🌐</a>
                  <a href="#">💼</a>
                  <a href="#">🐦</a>
                  <a href="#">▶️</a>
                </div>
                <p className="copyright">© 2026 Resume Builder</p>
              </div>
              <div className="footer-column">
                <h4>Product</h4>
                <ul>
                  <li><a href="#">Home</a></li>
                  <li><a href="#">Support</a></li>
                  <li><a href="#">Pricing</a></li>
                  <li><a href="#">Affiliate</a></li>
                </ul>
              </div>
              <div className="footer-column">
                <h4>Resources</h4>
                <ul>
                  <li><a href="#">Company</a></li>
                  <li><a href="#">Blogs</a></li>
                  <li><a href="#">Community</a></li>
                  <li><a href="#">Careers <span className="hiring-badge">We're hiring!</span></a></li>
                  <li><a href="#">About</a></li>
                </ul>
              </div>
              <div className="footer-column">
                <h4>Legal</h4>
                <ul>
                  <li><a href="#">Privacy</a></li>
                  <li><a href="#">Terms</a></li>
                </ul>
              </div>
            </div>
          </footer>
        </div>
      ) : (
        // Resume Builder
        <div className="builder-page">
          <div className="builder-header">
            <button className="back-btn" onClick={() => setShowBuilder(false)}>
              ← Back to Home
            </button>
          </div>
          <div className="app-container">
            {/* Form Section */}
            <div className="form-section">
              <h1>Resume Builder</h1>
              
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={resumeData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={resumeData.email}
                  onChange={handleChange}
                  placeholder="john.doe@example.com"
                />
              </div>

              <div className="form-group">
                <label>Skills (comma separated)</label>
                <textarea
                  name="skills"
                  value={resumeData.skills}
                  onChange={handleChange}
                  placeholder="JavaScript, React, CSS, Node.js"
                  rows="3"
                />
              </div>

              <div className="form-section-divider">
                <h3>Education</h3>
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="dynamic-section">
                    <div className="form-group">
                      <label>Degree</label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                        placeholder="Bachelor of Science in Computer Science"
                      />
                    </div>
                    <div className="form-group">
                      <label>School/University</label>
                      <input
                        type="text"
                        value={edu.school}
                        onChange={(e) => handleEducationChange(index, 'school', e.target.value)}
                        placeholder="University Name"
                      />
                    </div>
                    <div className="form-group">
                      <label>Year</label>
                      <input
                        type="text"
                        value={edu.year}
                        onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
                        placeholder="2020 - 2024"
                      />
                    </div>
                    {resumeData.education.length > 1 && (
                      <button onClick={() => removeEducation(index)} className="remove-btn">
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button onClick={addEducation} className="add-btn">+ Add Education</button>
              </div>

              <div className="form-section-divider">
                <h3>Experience</h3>
                {resumeData.experience.map((exp, index) => (
                  <div key={index} className="dynamic-section">
                    <div className="form-group">
                      <label>Job Title</label>
                      <input
                        type="text"
                        value={exp.title}
                        onChange={(e) => handleExperienceChange(index, 'title', e.target.value)}
                        placeholder="Software Engineer"
                      />
                    </div>
                    <div className="form-group">
                      <label>Company</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                        placeholder="Company Name"
                      />
                    </div>
                    <div className="form-group">
                      <label>Duration</label>
                      <input
                        type="text"
                        value={exp.duration}
                        onChange={(e) => handleExperienceChange(index, 'duration', e.target.value)}
                        placeholder="Jan 2022 - Present"
                      />
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        value={exp.description}
                        onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                        placeholder="Describe your responsibilities and achievements"
                        rows="3"
                      />
                    </div>
                    {resumeData.experience.length > 1 && (
                      <button onClick={() => removeExperience(index)} className="remove-btn">
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button onClick={addExperience} className="add-btn">+ Add Experience</button>
              </div>
            </div>

            {/* Preview Section */}
            <div className="preview-section">
              <h2>Resume Preview</h2>
              <div className="resume-preview">
                {resumeData.name && (
                  <div className="preview-header">
                    <h1>{resumeData.name}</h1>
                    {resumeData.email && <p className="email">{resumeData.email}</p>}
                  </div>
                )}

                {resumeData.skills && (
                  <div className="preview-section-block">
                    <h3>Skills</h3>
                    <p>{resumeData.skills}</p>
                  </div>
                )}

                {resumeData.education.some(edu => edu.degree || edu.school || edu.year) && (
                  <div className="preview-section-block">
                    <h3>Education</h3>
                    {resumeData.education.map((edu, index) => (
                      (edu.degree || edu.school || edu.year) && (
                        <div key={index} className="preview-item">
                          {edu.degree && <h4>{edu.degree}</h4>}
                          {edu.school && <p className="institution">{edu.school}</p>}
                          {edu.year && <p className="date">{edu.year}</p>}
                        </div>
                      )
                    ))}
                  </div>
                )}

                {resumeData.experience.some(exp => exp.title || exp.company || exp.duration || exp.description) && (
                  <div className="preview-section-block">
                    <h3>Experience</h3>
                    {resumeData.experience.map((exp, index) => (
                      (exp.title || exp.company || exp.duration || exp.description) && (
                        <div key={index} className="preview-item">
                          {exp.title && <h4>{exp.title}</h4>}
                          {exp.company && <p className="institution">{exp.company}</p>}
                          {exp.duration && <p className="date">{exp.duration}</p>}
                          {exp.description && <p className="description">{exp.description}</p>}
                        </div>
                      )
                    ))}
                  </div>
                )}

                {!resumeData.name && !resumeData.email && !resumeData.skills && 
                 !resumeData.education.some(edu => edu.degree || edu.school || edu.year) &&
                 !resumeData.experience.some(exp => exp.title || exp.company || exp.duration || exp.description) && (
                  <p className="empty-state">Start filling out the form to see your resume preview</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/builder" 
          element={
            <ProtectedRoute>
              <Builder />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/builder/:id" 
          element={
            <ProtectedRoute>
              <Builder />
            </ProtectedRoute>
          } 
        />
        <Route path="/resume/:id" element={<PublicResume />} />
      </Routes>
    </Router>
  );
}

export default App;
