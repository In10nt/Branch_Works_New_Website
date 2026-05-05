import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Finance.css';

const Footer = () => {
  const navigate = useNavigate();

  const handleHomeClick = (e) => {
    e.preventDefault();
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-top">
            <div className="footer-left">
              <Link to="/" className="footer-logo" onClick={handleHomeClick}>
                <img src={`${process.env.PUBLIC_URL}/images/footer_logo.svg`} alt="BRANCHWORKS GLOBAL" className="footer-logo-image" />
              </Link>
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
                  <li><Link to="/technology-support">Technology Support</Link></li>
                  <li><Link to="/offshore-hiring">Offshore Hiring</Link></li>
                </ul>
              </div>
              
              <div className="footer-column">
                <h3 className="footer-column-title">Quick links</h3>
                <ul className="footer-links">
                  <li><Link to="/" onClick={handleHomeClick}>Home</Link></li>
                  <li><Link to="/about">About us</Link></li>
                  <li><Link to="/blog">Blog</Link></li>
                  <li><Link to="/careers">Careers</Link></li>
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
              <a href="https://www.instagram.com/branchworksglobal" className="social-icon" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <img src="/images/instagram.png" alt="Instagram" width="18" height="22" />
              </a>
              <a href="https://www.linkedin.com/company/branchworksglobal" className="social-icon" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <img src="/images/linkedin.png" alt="LinkedIn" width="18" height="22" />
              </a>
              <a href="https://www.facebook.com/branchworksglobal" className="social-icon" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <svg width="18" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 17.9895 4.3882 22.954 10.125 23.8542V15.4688H7.07812V12H10.125V9.35625C10.125 6.34875 11.9166 4.6875 14.6576 4.6875C15.9701 4.6875 17.3438 4.92188 17.3438 4.92188V7.875H15.8306C14.34 7.875 13.875 8.80008 13.875 9.75V12H17.2031L16.6711 15.4688H13.875V23.8542C19.6118 22.954 24 17.9895 24 12Z" fill="white"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
