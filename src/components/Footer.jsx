import React from 'react';
import './Finance.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        {/* First Part - Logo and Tagline */}
        <div className="footer-hero-container">
          <div className="footer-logo-section">
            <div className="footer-logo">
              <img src="/images/footer_logo.svg" alt="BranchWorks Global" className="footer-logo-image" />
            </div>

            <div className="footer-tagline-container">
              <h2 className="footer-tagline">
                Dedicated teams, built to scale with control
              </h2>
              <p className="footer-description">
                More than outsourcing we build your international branch
              </p>
            </div>
          </div>

          {/* Second Part - Links Section */}
          <div className="footer-links-section">
            {/* Industry Column */}
            <div className="footer-column industry">
              <h3 className="footer-column-title">
                Industry
              </h3>
              <div className="footer-column-links">
                <a href="/finance" className="footer-link">Finance</a>
                <a href="/technology" className="footer-link">Technology Support</a>
                <a href="/offshore" className="footer-link">Offshore Hiring</a>
              </div>
            </div>

            {/* Quick Links Column */}
            <div className="footer-column quick-links">
              <h3 className="footer-column-title">
                Quick links
              </h3>
              <div className="footer-column-links">
                <a href="/about" className="footer-link">About us</a>
                <a href="/blog" className="footer-link">Blog</a>
                <a href="/careers" className="footer-link">Careers</a>
              </div>
            </div>
          </div>
        </div>

        {/* Third Part - Bottom Section */}
        <div className="footer-bottom-section">
          <div className="footer-bottom-container">
            <p className="footer-copyright">
              © 2026 Branchworks Global Global
            </p>
            <div className="footer-legal-links">
              <a href="/privacy" className="footer-legal-link">Policy</a>
              <a href="/terms" className="footer-legal-link">Terms</a>
            </div>
          </div>

          <div className="footer-social-links">
            <a 
              href="https://instagram.com" 
              className="footer-social-icon" 
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
                <circle cx="18" cy="6" r="1" fill="currentColor"/>
              </svg>
            </a>
            <a 
              href="https://linkedin.com" 
              className="footer-social-icon" 
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a 
              href="https://twitter.com" 
              className="footer-social-icon" 
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
