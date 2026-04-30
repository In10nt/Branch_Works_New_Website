import React, { useState } from 'react';
import './Finance.css';

const Footer = () => {
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

  return (
    <footer className="footer-section blue-accent">
      <div className="footer-container">
        <div className="footer-hero-container">
          {/* Logo and Tagline Section */}
          <div className="footer-logo-section">
            <div className="footer-logo">
              <svg viewBox="0 0 139 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Add your logo SVG paths here */}
                <text x="0" y="24" fill="#FFFFFF" fontSize="20" fontFamily="Inter">
                  BranchWorks
                </text>
              </svg>
            </div>

            <div className="footer-tagline-container">
              <h2 className="footer-tagline">
                Dedicated teams, built to scale with control
              </h2>
            </div>

            <p className="footer-description">
              More than outsourcing we build your international branch
            </p>
          </div>

          {/* Links Section - Desktop */}
          <div className="footer-links-section">
            {/* Industry Column */}
            <div className="footer-column industry">
              <h3 
                className={`footer-column-title ${expandedSections.industry ? 'expanded' : ''}`}
                onClick={() => toggleSection('industry')}
              >
                Industry
              </h3>
              <div className={`footer-column-links ${expandedSections.industry ? 'expanded' : ''}`}>
                <a href="/finance" className="footer-link">Finance</a>
                <a href="/technology" className="footer-link">Technology Support</a>
                <a href="/offshore" className="footer-link">Offshore Hiring</a>
              </div>
            </div>

            {/* Quick Links Column */}
            <div className="footer-column quick-links">
              <h3 
                className={`footer-column-title ${expandedSections.quickLinks ? 'expanded' : ''}`}
                onClick={() => toggleSection('quickLinks')}
              >
                Quick links
              </h3>
              <div className={`footer-column-links ${expandedSections.quickLinks ? 'expanded' : ''}`}>
                <a href="/about" className="footer-link">About us</a>
                <a href="/blog" className="footer-link">Blog</a>
                <a href="/careers" className="footer-link">Careers</a>
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
            <a href="https://instagram.com" className="footer-social-icon" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://linkedin.com" className="footer-social-icon" aria-label="LinkedIn">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://twitter.com" className="footer-social-icon" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
