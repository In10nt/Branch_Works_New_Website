import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Finance.css';

const ChevronIcon = ({ isExpanded }) => (
  <svg 
    className={`footer-expandable-icon ${isExpanded ? 'expanded' : ''}`}
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M6 9L12 15L18 9" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const FooterExpandable = () => {
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState({
    industry: false,
    quickLinks: false,
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-section blue-accent">
      <div className="footer-container">
        <div className="footer-hero-container">
          {/* Logo and Tagline Section */}
          <div className="footer-logo-section">
            <Link to="/" className="footer-logo" onClick={handleHomeClick}>
              <img src="/images/footer_logo.svg" alt="BranchWorks Global" />
            </Link>

            <div className="footer-tagline-container">
              <h2 className="footer-tagline">
                Dedicated teams, built to scale with control
              </h2>
            </div>

            <p className="footer-description">
              More than outsourcing we build your international branch
            </p>
          </div>

          {/* Links Section with Expandable */}
          <div className="footer-links-section">
            {/* Industry Expandable Section */}
            <div className="footer-expandable-section">
              <div 
                className="footer-expandable-header"
                onClick={() => toggleSection('industry')}
              >
                <h3 className="footer-expandable-title">Industry</h3>
                <ChevronIcon isExpanded={expandedSections.industry} />
              </div>
              <div className={`footer-expandable-content ${expandedSections.industry ? 'expanded' : ''}`}>
                <div className="footer-expandable-links">
                  <a href="/finance" className="footer-expandable-link">Finance</a>
                  <a href="/technology" className="footer-expandable-link">Technology Support</a>
                  <a href="/offshore" className="footer-expandable-link">Offshore Hiring</a>
                </div>
              </div>
            </div>

            {/* Quick Links Expandable Section */}
            <div className="footer-expandable-section">
              <div 
                className="footer-expandable-header"
                onClick={() => toggleSection('quickLinks')}
              >
                <h3 className="footer-expandable-title">Quick links</h3>
                <ChevronIcon isExpanded={expandedSections.quickLinks} />
              </div>
              <div className={`footer-expandable-content ${expandedSections.quickLinks ? 'expanded' : ''}`}>
                <div className="footer-expandable-links">
                  <Link to="/" className="footer-expandable-link" onClick={handleHomeClick}>Home</Link>
                  <Link to="/about" className="footer-expandable-link">About us</Link>
                  <Link to="/blog" className="footer-expandable-link">Blog</Link>
                  <Link to="/careers" className="footer-expandable-link">Careers</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom-section">
          <div className="footer-bottom-container">
            <p className="footer-copyright">
              © 2026 Branchworks Global
            </p>
            <div className="footer-legal-links">
              <a href="/privacy" className="footer-legal-link">Policy</a>
              <a href="/terms" className="footer-legal-link">Terms</a>
            </div>
          </div>

          <div className="footer-social-links">
            <a 
              href="https://www.instagram.com/branchworksglobal" 
              className="footer-social-icon" 
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/images/instagram.png" alt="Instagram" style={{ width: '18px', height: '18px' }} />
            </a>
            <a 
              href="https://www.linkedin.com/company/branchworksglobal" 
              className="footer-social-icon" 
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/images/linkedin.png" alt="LinkedIn" style={{ width: '18px', height: '18px' }} />
            </a>
            <a 
              href="https://www.facebook.com/branchworksglobal" 
              className="footer-social-icon" 
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/images/facebook_icon.png" alt="Facebook" style={{ width: '18px', height: '18px' }} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterExpandable;
