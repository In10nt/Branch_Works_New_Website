import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import './Careers.css';
import './AboutPage.css';
import './mobile-responsive.css';
import Footer from './Footer';

const Careers = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isIndustryDropdownOpen, setIsIndustryDropdownOpen] = useState(false);
  const [isMobileIndustryOpen, setIsMobileIndustryOpen] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }
  };

  const toggleIndustryDropdown = () => {
    setIsIndustryDropdownOpen(!isIndustryDropdownOpen);
  };

  const closeIndustryDropdown = () => {
    setIsIndustryDropdownOpen(false);
  };

  const toggleMobileIndustry = () => {
    setIsMobileIndustryOpen(!isMobileIndustryOpen);
  };

  return (
    <div className="careers-layout">
      {/* Navigation Bar */}
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
            <Link to="/careers">Careers</Link>
          </nav>
          
          <button className="cta-button">Talk to an expert</button>
          
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

        <div 
          className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>

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
            <Link to="/careers" onClick={() => setIsMobileMenuOpen(false)}>Careers</Link>
          </nav>
          
          <button className="mobile-cta-button" onClick={() => setIsMobileMenuOpen(false)}>Talk to an expert</button>
        </div>
      </header>

      {/* Hero Section - Same as Finance Page */}
      <div className="hero-layout">
        <div className="hero-content">
          <div className="badge-chip">
            <span className="badge-text">Careers</span>
          </div>
          
          <div className="headline-section">
            <h1 className="main-headline">Come build a<br />space to dream</h1>
            <p className="headline-description">We're creating the most inspiring place on the internet.</p>
          </div>

          <div className="cta-section">
            <button className="schedule-button">View open roles</button>
          </div>
        </div>
      </div>

      {/* Image Carousel Section */}
      <div className="careers-carousel-section">
        <div className="careers-carousel-container">
          <div className="careers-carousel-track">
            <div className="careers-carousel-grid">
              <div className="careers-carousel-image">
                <img src={`${process.env.PUBLIC_URL}/images/career_page_image1.jpg`} alt="Team Member" />
              </div>
              <div className="careers-carousel-image">
                <img src={`${process.env.PUBLIC_URL}/images/career_page_image2.jpg`} alt="Team Member" />
              </div>
              <div className="careers-carousel-image">
                <img src={`${process.env.PUBLIC_URL}/images/career_page_image3.jpg`} alt="Team Member" />
              </div>
              <div className="careers-carousel-image">
                <img src={`${process.env.PUBLIC_URL}/images/career_page_image4.jpg`} alt="Team Member" />
              </div>
              <div className="careers-carousel-image">
                <img src={`${process.env.PUBLIC_URL}/images/career_page_image5.jpg`} alt="Team Member" />
              </div>
              {/* Duplicate images for seamless loop */}
              <div className="careers-carousel-image">
                <img src={`${process.env.PUBLIC_URL}/images/career_page_image1.jpg`} alt="Team Member" />
              </div>
              <div className="careers-carousel-image">
                <img src={`${process.env.PUBLIC_URL}/images/career_page_image2.jpg`} alt="Team Member" />
              </div>
              <div className="careers-carousel-image">
                <img src={`${process.env.PUBLIC_URL}/images/career_page_image3.jpg`} alt="Team Member" />
              </div>
              <div className="careers-carousel-image">
                <img src={`${process.env.PUBLIC_URL}/images/career_page_image4.jpg`} alt="Team Member" />
              </div>
              <div className="careers-carousel-image">
                <img src={`${process.env.PUBLIC_URL}/images/career_page_image5.jpg`} alt="Team Member" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Career Growth Section */}
      <div className="careers-growth-section">
        <div className="careers-growth-container">
          <h2 className="careers-growth-title">
            Build your career beyond borders, with real global exposure and structured growth
          </h2>
          
          <div className="careers-growth-content">
            <p className="careers-growth-paragraph">
              At Branchworks Global, you will work with international businesses,<br />
              supporting finance, operations, and technology functions through structured<br />
              teams.
            </p>
            
            <p className="careers-growth-paragraph">
              Our environment is built on clarity, accountability, and consistent delivery. You<br />
              will gain exposure to global standards, real business challenges, and systems<br />
              that support scalable operations.
            </p>
            
            <p className="careers-growth-paragraph">
              If you are looking to grow within a structured, performance-driven environment<br />
              and build meaningful experience, Branchworks Global offers the right<br />
              platform.
            </p>
          </div>
        </div>
      </div>

      {/* Our Values Section - Same as About Page */}
      <div className="about-section-three">
        <div className="about-section-three-container">
          {/* Header outside the grid */}
          <div className="about-section-three-header">
            <h2 className="about-section-three-main-title">Our Values</h2>
            <p className="about-section-three-subtitle">Where everything starts</p>
          </div>

          <div className="about-section-three-grid">
            {/* Card 1 - Integrity in every engagement */}
            <div className="value-card">
              <div className="value-icon">
                <img src={`${process.env.PUBLIC_URL}/images/valueIcon_1.png`} alt="Integrity in every engagement" />
              </div>
              <h3 className="value-card-title">Integrity in every engagement</h3>
              <p className="value-card-description">Full transparency — in our reporting, processes, and every client relationship.</p>
            </div>

            {/* Card 2 - Excellence in delivery */}
            <div className="value-card">
              <div className="value-icon">
                <img src={`${process.env.PUBLIC_URL}/images/valueIcon_2.png`} alt="Excellence in delivery" />
              </div>
              <h3 className="value-card-title">Excellence in delivery</h3>
              <p className="value-card-description">Defined service-level commitments — accuracy and consistency are non-negotiable.</p>
            </div>

            {/* Card 3 - Scalability by design */}
            <div className="value-card">
              <div className="value-icon">
                <img src={`${process.env.PUBLIC_URL}/images/valueIcon_3.png`} alt="Scalability by design" />
              </div>
              <h3 className="value-card-title">Scalability by design</h3>
              <p className="value-card-description">Solutions built to flex — scale up or down without disrupting operations.</p>
            </div>

            {/* Card 4 - Technology-led thinking */}
            <div className="value-card">
              <div className="value-icon">
                <img src={`${process.env.PUBLIC_URL}/images/valueIcon_4.png`} alt="Technology-led thinking" />
              </div>
              <h3 className="value-card-title">Technology-led thinking</h3>
              <p className="value-card-description">Modern platforms and automation delivering speed, accuracy, and real-time visibility.</p>
            </div>

            {/* Card 5 - People at the centre */}
            <div className="value-card">
              <div className="value-icon">
                <img src={`${process.env.PUBLIC_URL}/images/valueIcon_5.png`} alt="People at the centre" />
              </div>
              <h3 className="value-card-title">People at the centre</h3>
              <p className="value-card-description">Dedicated specialists who take genuine ownership of client outcomes.</p>
            </div>

            {/* Card 6 - Global Standards, Region-Specific Know-How */}
            <div className="value-card">
              <div className="value-icon">
                <img src={`${process.env.PUBLIC_URL}/images/valueIcon_6.png`} alt="Global Standards, Region-Specific Know-How" />
              </div>
              <h3 className="value-card-title">Global Standards, Region-Specific Know-How</h3>
              <p className="value-card-description">International expertise shaped by the rules and expectations of each market we serve.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Open Roles Section */}
      <div className="careers-open-roles-section">
        <div className="careers-open-roles-container">
          <div className="careers-open-roles-content">
            <h2 className="careers-open-roles-title">Open Roles</h2>
            
            <div className="careers-roles-list">
              {/* Role 1 */}
              <div className="careers-role-item">
                <div className="careers-role-info">
                  <h3 className="careers-role-title">Senior Accountant</h3>
                  <p className="careers-role-location">Colombo · Hybrid · Finance</p>
                </div>
                <div className="careers-role-arrow">
                  <img src={`${process.env.PUBLIC_URL}/images/career_IconWrapper.png`} alt="Arrow" width="24" height="24" />
                </div>
              </div>

              {/* Role 2 */}
              <div className="careers-role-item">
                <div className="careers-role-info">
                  <h3 className="careers-role-title">Project Manager</h3>
                  <p className="careers-role-location">Colombo · Hybrid · Finance</p>
                </div>
                <div className="careers-role-arrow">
                  <img src={`${process.env.PUBLIC_URL}/images/career_IconWrapper.png`} alt="Arrow" width="24" height="24" />
                </div>
              </div>

              {/* Role 3 */}
              <div className="careers-role-item">
                <div className="careers-role-info">
                  <h3 className="careers-role-title">UX Designer</h3>
                  <p className="careers-role-location">Colombo · Hybrid · Finance</p>
                </div>
                <div className="careers-role-arrow">
                  <img src={`${process.env.PUBLIC_URL}/images/career_IconWrapper.png`} alt="Arrow" width="24" height="24" />
                </div>
              </div>

              {/* Role 4 */}
              <div className="careers-role-item">
                <div className="careers-role-info">
                  <h3 className="careers-role-title">Data Analyst</h3>
                  <p className="careers-role-location">Colombo · Hybrid · Finance</p>
                </div>
                <div className="careers-role-arrow">
                  <img src={`${process.env.PUBLIC_URL}/images/career_IconWrapper.png`} alt="Arrow" width="24" height="24" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Expert Section - Same as Finance Page */}
      <div className="cta-expert-section">
        <div className="cta-expert-container">
          <div className="cta-expert-content">
            <div className="cta-expert-card">
              <div className="cta-expert-left">
                <h2 className="cta-expert-title">Get trusted advice<br />when timing matters</h2>
                <button className="cta-expert-button">
                  Talk to an expert
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              <div className="cta-expert-right">
                <img src={`${process.env.PUBLIC_URL}/images/talkToAndExpert.jpg`} alt="Expert Team" className="cta-expert-image" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Careers;
