import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import './AboutPage.css';
import Footer from './Footer';
import './mobile-responsive.css';
import './AboutPage-mobile-responsive.css';

const AboutPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isIndustryDropdownOpen, setIsIndustryDropdownOpen] = useState(false);
  const [isMobileIndustryOpen, setIsMobileIndustryOpen] = useState(false);
  const sectionTwoRef = useRef(null);
  const sectionThreeRef = useRef(null);
  const mapSectionRef = useRef(null);
  const tomorrowHeaderRef = useRef(null);
  const ctaExpertRef = useRef(null);

  // Mobile menu toggle functions
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu when clicking overlay
  const handleOverlayClick = () => {
    closeMobileMenu();
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

  // Handle body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('mobile-menu-open');
    };
  }, [isMobileMenuOpen]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Animation observer for sections
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Store current ref values
    const sectionTwo = sectionTwoRef.current;
    const sectionThree = sectionThreeRef.current;
    const mapSection = mapSectionRef.current;
    const tomorrowHeader = tomorrowHeaderRef.current;
    const ctaExpert = ctaExpertRef.current;

    if (sectionTwo) {
      observer.observe(sectionTwo);
    }
    if (sectionThree) {
      observer.observe(sectionThree);
    }
    if (mapSection) {
      observer.observe(mapSection);
    }
    if (tomorrowHeader) {
      observer.observe(tomorrowHeader);
    }
    if (ctaExpert) {
      observer.observe(ctaExpert);
    }

    return () => {
      if (sectionTwo) {
        observer.unobserve(sectionTwo);
      }
      if (sectionThree) {
        observer.unobserve(sectionThree);
      }
      if (mapSection) {
        observer.unobserve(mapSection);
      }
      if (tomorrowHeader) {
        observer.unobserve(tomorrowHeader);
      }
      if (ctaExpert) {
        observer.unobserve(ctaExpert);
      }
    };
  }, []);

  return (
    <div className="page-container">
      {/* Header Section - Same as Home Page */}
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
          onClick={handleOverlayClick}
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
              onClick={closeMobileMenu}
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
                  <Link to="/finance" className="mobile-dropdown-item" onClick={closeMobileMenu}>
                    Finance
                  </Link>
                  <Link to="/technology-support" className="mobile-dropdown-item" onClick={closeMobileMenu}>
                    Technology Support
                  </Link>
                  <Link to="/offshore-hiring" className="mobile-dropdown-item" onClick={closeMobileMenu}>
                    Offshore Hiring
                  </Link>
                </div>
              )}
            </div>
            <Link to="/about" onClick={closeMobileMenu}>About</Link>
            <a href="#careers" onClick={closeMobileMenu}>Careers</a>
          </nav>
          
          <div className="mobile-menu-cta">
            <button className="cta-button" onClick={closeMobileMenu}>Talk to an expert</button>
          </div>
        </div>
      </header>

      {/* First Section - Hero with Small Changes */}
      <div className="hero-layout about-hero-layout">
        <div className="hero-content">
          <div className="badge-chip">
            <span className="badge-rating">4.8</span>
            <img src={`${process.env.PUBLIC_URL}/images/trustpilot-logo.svg`} alt="Trustpilot" className="badge-trustpilot-logo" />
          </div>
          
          <div className="headline-section">
            <h1 className="main-headline">Driven by<br />Real Experience</h1>
            <p className="headline-description">We started Branchworks Teams from a genuine need within our own business.</p>
          </div>

          <div className="cta-section">
            <button className="schedule-button">Schedule a Consultation</button>
          </div>
        </div>
      </div>

      {/* Second Section - Company Introduction */}
      <div className="about-section-two">
        <div className="about-section-two-container">
          <div className="about-section-two-content" ref={sectionTwoRef}>
            <h2 className="about-section-two-title">Branchworks Global is a forward-thinking leader in modern offshoring solutions</h2>
            <p className="about-section-two-description">
              Providing specialized support for business needs with a deep understanding of the ever-evolving landscape of growing businesses in today's digital age.
            </p>
            <div className="about-section-two-image">
              <img src={`${process.env.PUBLIC_URL}/images/about_us_page_group_image.jpg`} alt="Branchworks Global Team" className="about-team-image" />
            </div>
          </div>
        </div>
      </div>

      {/* Third Section - Our Values */}
      <div className="about-section-three">
        <div className="about-section-three-container">
          <div className="about-section-three-grid" ref={sectionThreeRef}>
            {/* Header takes first position */}
            <div className="about-section-three-header">
              <h2 className="about-section-three-main-title">Our Values</h2>
              <p className="about-section-three-subtitle">Where everything starts</p>
            </div>
            
            {/* Card 1 - Customer-Centric Innovation */}
            <div className="value-card">
              <div className="value-icon">
                <img src={`${process.env.PUBLIC_URL}/images/valueIcon_1.png`} alt="Customer-Centric Innovation" />
              </div>
              <h3 className="value-card-title">Customer-Centric Innovation</h3>
              <p className="value-card-description">Prioritises user needs by designing intuitive, user-friendly digital solutions that solve real business problems.</p>
            </div>

            {/* Card 2 - Scalable Growth Mindset */}
            <div className="value-card">
              <div className="value-icon">
                <img src={`${process.env.PUBLIC_URL}/images/valueIcon_2.png`} alt="Scalable Growth Mindset" />
              </div>
              <h3 className="value-card-title">Scalable Growth Mindset</h3>
              <p className="value-card-description">develops systems that are built to grow with businesses, supporting long-term expansion and adaptability.</p>
            </div>

            {/* Card 3 - Agile & Efficient Execution */}
            <div className="value-card">
              <div className="value-icon">
                <img src={`${process.env.PUBLIC_URL}/images/valueIcon_3.png`} alt="Agile & Efficient Execution" />
              </div>
              <h3 className="value-card-title">Agile & Efficient Execution</h3>
              <p className="value-card-description">Deliver high-quality solutions quickly and iteratively.</p>
            </div>

            {/* Card 4 - Data-Driven Decision Making */}
            <div className="value-card">
              <div className="value-icon">
                <img src={`${process.env.PUBLIC_URL}/images/valueIcon_4.png`} alt="Data-Driven Decision Making" />
              </div>
              <h3 className="value-card-title">Data-Driven Decision Making</h3>
              <p className="value-card-description">Analytics and insights to guide smarter business strategies and product outcomes.</p>
            </div>

            {/* Card 5 - Reliability & Continuous Support */}
            <div className="value-card">
              <div className="value-icon">
                <img src={`${process.env.PUBLIC_URL}/images/valueIcon_5.png`} alt="Reliability & Continuous Support" />
              </div>
              <h3 className="value-card-title">Reliability & Continuous Support</h3>
              <p className="value-card-description">Committed to dependable performance with ongoing support and system maintenance.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Fourth Section - Supporting organisations worldwide (Map Section) */}
      <div className="map-section">
        <div className="map-container">
          <div className="map-content" ref={mapSectionRef}>
            <div className="map-text-box">
              <h2 className="map-title">Supporting organisations worldwide with offshore expertise</h2>
              <p className="map-description">
                A trusted offshore partner supporting businesses across Australia, the United Kingdom, the United States, Europe, and the Asia-Pacific region
              </p>
            </div>
          </div>
          <div className="map-image-box">
            <img src={`${process.env.PUBLIC_URL}/images/worldMap.png`} alt="World Map" className="world-map" />
          </div>
        </div>
      </div>

      {/* Fifth Section - Tomorrow, today */}
      <div className="tomorrow-section">
        <div className="tomorrow-container">
          <div className="tomorrow-content">
            <div className="tomorrow-header" ref={tomorrowHeaderRef}>
              <h2 className="tomorrow-title">Tomorrow,<br />today.</h2>
              <p className="tomorrow-description">
                We work with an incredible<br />
                global network of moderators.
              </p>
              <button className="tomorrow-cta-button">
                Talk to an expert
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            <div className="tomorrow-cards">
              <div className="tomorrow-card">
                <img src={`${process.env.PUBLIC_URL}/images/teamMember1.jpg`} alt="Team Member 1" className="tomorrow-card-image" />
              </div>
              <div className="tomorrow-card">
                <img src={`${process.env.PUBLIC_URL}/images/teamMember2.jpg`} alt="Team Member 2" className="tomorrow-card-image" />
              </div>
              <div className="tomorrow-card">
                <img src={`${process.env.PUBLIC_URL}/images/teamMember3.jpg`} alt="Team Member 3" className="tomorrow-card-image" />
              </div>
              <div className="tomorrow-card">
                <img src={`${process.env.PUBLIC_URL}/images/teamMember4.png`} alt="Team Member 4" className="tomorrow-card-image" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sixth Section - Get trusted advice when timing matters */}
      <div className="cta-expert-section">
        <div className="cta-expert-container">
          <div className="cta-expert-content" ref={ctaExpertRef}>
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

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutPage;
