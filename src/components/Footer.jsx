import React from 'react';
import { Link } from 'react-router-dom';
import './Finance.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-top">
            <div className="footer-left">
              <div className="footer-logo">
                <img src={`${process.env.PUBLIC_URL}/images/footer_logo.svg`} alt="BRANCHWORKS GLOBAL" className="footer-logo-image" />
              </div>
              <div className="footer-tagline">
                <h2 className="footer-title">Dedicated teams,<br />built to scale with control</h2>
              </div>
              <p className="footer-description">More than outsourcing<br />we build your international branch</p>
            </div>
            
            <div className="footer-right">
              <div className="footer-column">
                <h3 className="footer-column-title">Industry</h3>
                <ul className="footer-links">
                  <li><Link to="/finance">Finance</Link></li>
                  <li><a href="#technology">Technology Support</a></li>
                  <li><a href="#offshore">Offshore Hiring</a></li>
                </ul>
              </div>
              
              <div className="footer-column">
                <h3 className="footer-column-title">Quick links</h3>
                <ul className="footer-links">
                  <li><Link to="/about">About us</Link></li>
                  <li><a href="#blog">Blog</a></li>
                  <li><a href="#careers">Careers</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div className="footer-left-group">
              <p className="footer-copyright">© 2026 Branchworks Global</p>
              <div className="footer-policy-terms">
                <Link to="/privacy-policy" className="footer-link-bottom">Policy</Link>
                <Link to="/terms" className="footer-link-bottom">Terms</Link>
              </div>
            </div>
            <div className="footer-social">
              <a href="https://instagram.com" className="social-icon" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <img src="/images/instagram.png" alt="Instagram" width="18" height="22" />
              </a>
              <a href="https://linkedin.com" className="social-icon" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <img src="/images/linkedin.png" alt="LinkedIn" width="18" height="22" />
              </a>
              <a href="https://twitter.com" className="social-icon" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                <img src="/images/twitter.png" alt="Twitter" width="18" height="22" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
