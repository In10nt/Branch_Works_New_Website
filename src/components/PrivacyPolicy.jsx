import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PrivacyPolicy.css';
import './mobile-responsive.css';

const PrivacyPolicy = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isIndustryDropdownOpen, setIsIndustryDropdownOpen] = useState(false);
  const [isMobileIndustryOpen, setIsMobileIndustryOpen] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Prevent body scroll when mobile menu is open
    if (!isMobileMenuOpen) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }
  };

  // Industry dropdown toggle
  const toggleIndustryDropdown = () => {
    setIsIndustryDropdownOpen(!isIndustryDropdownOpen);
  };

  const closeIndustryDropdown = () => {
    setIsIndustryDropdownOpen(false);
  };

  // Mobile industry dropdown toggle
  const toggleMobileIndustry = () => {
    setIsMobileIndustryOpen(!isMobileIndustryOpen);
  };

  return (
    <div className="privacy-policy-layout">
      {/* Navigation Bar - Same as HomePage */}
      <header className="header-section">
        <div className="header-content">
          <Link to="/" className="logo">
            <div className="logo-background">
              <div className="logo-circle">
                <img src={`${process.env.PUBLIC_URL}/images/Eclipse.png`} alt="Branchworks Logo" className="logo-icon" />
              </div>
            </div>
            <img src={`${process.env.PUBLIC_URL}/images/branchWorksGlobalNavText.svg`} alt="BRANCHWORKS GLOBAL" className="logo-text-svg" />
          </Link>
          
          <nav className="nav-menu">
            <div 
              className="nav-item-dropdown"
              onMouseEnter={toggleIndustryDropdown}
              onMouseLeave={closeIndustryDropdown}
            >
              <a href="#industry" className="nav-link-dropdown" onClick={(e) => e.preventDefault()}>
                Industry
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ marginLeft: '4px' }}>
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              {isIndustryDropdownOpen && (
                <div className="industry-dropdown-menu">
                  <Link to="/finance" className="dropdown-item">
                    Finance
                  </Link>
                  <Link to="/technology-support" className="dropdown-item">
                    Technology Support
                  </Link>
                  <Link to="/offshore-hiring" className="dropdown-item">
                    Offshore Hiring
                  </Link>
                </div>
              )}
            </div>
            <Link to="/about">About</Link>
            <a href="#careers">Careers</a>
          </nav>
          
          <button className="cta-button">Talk to an expert</button>
          
          {/* Mobile Menu Toggle */}
          <button 
            className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div 
          className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <div className="mobile-menu-header">
            <div className="logo">
              <div className="logo-background">
                <div className="logo-circle">
                  <img src={`${process.env.PUBLIC_URL}/images/Eclipse.png`} alt="Branchworks Logo" className="logo-icon" />
                </div>
              </div>
              <img src={`${process.env.PUBLIC_URL}/images/branchWorksGlobalNavText.svg`} alt="BRANCHWORKS GLOBAL" className="logo-text-svg" />
            </div>
            <button 
              className="mobile-menu-close"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close mobile menu"
            >
              ×
            </button>
          </div>
          
          <nav className="mobile-menu-nav">
            <div className="mobile-nav-item-dropdown">
              <button 
                className="mobile-nav-dropdown-toggle" 
                onClick={toggleMobileIndustry}
              >
                Industry
                <svg 
                  width="12" 
                  height="12" 
                  viewBox="0 0 12 12" 
                  fill="none" 
                  style={{ 
                    marginLeft: '8px',
                    transform: isMobileIndustryOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease'
                  }}
                >
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {isMobileIndustryOpen && (
                <div className="mobile-industry-dropdown">
                  <Link to="/finance" className="mobile-dropdown-item" onClick={() => setIsMobileMenuOpen(false)}>
                    Finance
                  </Link>
                  <Link to="/technology-support" className="mobile-dropdown-item" onClick={() => setIsMobileMenuOpen(false)}>
                    Technology Support
                  </Link>
                  <Link to="/offshore-hiring" className="mobile-dropdown-item" onClick={() => setIsMobileMenuOpen(false)}>
                    Offshore Hiring
                  </Link>
                </div>
              )}
            </div>
            <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
            <a href="#careers" onClick={() => setIsMobileMenuOpen(false)}>Careers</a>
          </nav>
          
          <button className="mobile-cta-button" onClick={() => setIsMobileMenuOpen(false)}>Talk to an expert</button>
        </div>
      </header>

      {/* Privacy Policy Content */}
      <main className="privacy-policy-main">
        <div className="privacy-policy-container">
          <h1 className="privacy-policy-title">Privacy Policy</h1>
          <p className="privacy-policy-last-updated">Last updated: 2025-10-01</p>
          
          <div className="privacy-policy-content">
            <div className="privacy-policy-intro">
              <p>
                Luma, Inc. ("us", "we", or "our") operates luma.com (the "Service"). This page informs you of our policies regarding the collection, use and disclosure of Personal Information we receive from users of the Service. We use your Personal Information only for providing and improving the Service. By using the Service, you agree to the collection and use of information in accordance with this policy.
              </p>
            </div>

            <div className="privacy-policy-section">
              <h2 className="privacy-policy-section-title">Information Collection And Use</h2>
              <p className="privacy-policy-section-text">
                While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information may include, but is not limited to your name and email address ("Personal Information").
              </p>
            </div>

            <div className="privacy-policy-section">
              <p className="privacy-policy-section-text">
                We may share your personal data with third-parties to provide necessary services, including:
              </p>
              <ul className="privacy-policy-list">
                <li>if you are the host of an event, we will share your personal data with your guests;</li>
                <li>when you register for an event, we will share your personal data with the event host; and</li>
                <li>when you purchase ticket for an event, we will share relevant information with Stripe, our payment processor.</li>
              </ul>
              <p className="privacy-policy-section-text">
                We make it clear to you throughout the Service when we share your personal data with third-parties. We have no control over, and are not responsible or liable for the ways those third-parties use your personal data.
              </p>
            </div>

            <div className="privacy-policy-section">
              <h2 className="privacy-policy-section-title">Log Data</h2>
              <p className="privacy-policy-section-text">
                Like many site operators, we collect information that your browser sends whenever you visit our Service ("Log Data").
              </p>
              <p className="privacy-policy-section-text">
                This Log Data may include information such as your computer's Internet Protocol ("IP") address, browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages and other statistics. In addition, we may use third party services such as Google Analytics that collect data about your visit.
              </p>
              <p className="privacy-policy-section-text">
                We make it clear to you throughout the Service when we share your personal data with third-parties. We have no control over, and are not responsible or liable for the ways those third-parties use your personal data.
              </p>
            </div>

            <div className="privacy-policy-section">
              <h2 className="privacy-policy-section-title">Cookies</h2>
              <p className="privacy-policy-section-text">
                Cookies are files with small amount of data, which may include an anonymous unique identifier. Cookies are sent to your browser from a web site and stored on your computer's hard drive.
              </p>
              <p className="privacy-policy-section-text">
                Like many sites, we use "cookies" to collect information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
              </p>
              <p className="privacy-policy-section-text">
                We make it clear to you throughout the Service when we share your personal data with third-parties. We have no control over, and are not responsible or liable for the ways those third-parties use your personal data.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer - Same as HomePage */}
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
                  <p className="footer-description">More than outsourcing<br />we build your international branch</p>
                </div>
              </div>
              
              <div className="footer-right">
                <div className="footer-column">
                  <h3 className="footer-column-title">Industry</h3>
                  <ul className="footer-links">
                    <li><Link to="/finance">Finance</Link></li>
                    <li><a href="#it">Technology Support</a></li>
                    <li><a href="#hr">Offshore Hiring</a></li>
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
                <a href="#instagram" className="social-icon" aria-label="Instagram">
                  <img src="/images/instagram.png" alt="Instagram" width="18" height="22" />
                </a>
                <a href="#linkdin" className="social-icon" aria-label="LinkdIn">
                  <img src="/images/linkedin.png" alt="Linkdin" width="18" height="22" />
                </a>
                <a href="#twitter" className="social-icon" aria-label="Twitter">
                  <img src="/images/twitter.png" alt="Twitter" width="18" height="22" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;