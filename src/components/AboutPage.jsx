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
  const [flippedCards, setFlippedCards] = useState([]);
  const sectionTwoRef = useRef(null);
  const sectionThreeRef = useRef(null);
  const mapSectionRef = useRef(null);
  const tomorrowHeaderRef = useRef(null);
  const tomorrowCardsRef = useRef(null);
  const ctaExpertRef = useRef(null);

  // Toggle flip card on mobile
  const handleCardClick = (index) => {
    if (window.innerWidth <= 768) {
      setFlippedCards(prev => 
        prev.includes(index) 
          ? [] // Close the card if it's already open
          : [index] // Open only this card, close all others
      );
    }
  };

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
    const tomorrowCards = tomorrowCardsRef.current;
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

    // Sequential animation for tomorrow cards
    if (tomorrowCards) {
      const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.tomorrow-card');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('card-animate-in');
              }, index * 150); // 150ms delay between each card
            });
            cardObserver.unobserve(entry.target);
          }
        });
      }, observerOptions);
      
      cardObserver.observe(tomorrowCards);
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
            <span className="badge-text">About</span>
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
          {/* Header outside the grid */}
          <div className="about-section-three-header">
            <h2 className="about-section-three-main-title">Our Values</h2>
            <p className="about-section-three-subtitle">Where everything starts</p>
          </div>

          <div className="about-section-three-grid" ref={sectionThreeRef}>
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
            
            <div className="tomorrow-cards" ref={tomorrowCardsRef}>
              <div className={`tomorrow-card ${flippedCards.includes(0) ? 'flipped' : ''}`} onClick={() => handleCardClick(0)}>
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <img src={`${process.env.PUBLIC_URL}/images/teamMember1.jpg`} alt="Team Member 1" className="tomorrow-card-image" />
                  </div>
                  <div className="flip-card-back">
                    <div className="flip-card-content">
                      <h3 className="team-member-name">Niluka Jayasinghe</h3>
                      <p className="team-member-designation">Chief Operating Officer</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`tomorrow-card ${flippedCards.includes(1) ? 'flipped' : ''}`} onClick={() => handleCardClick(1)}>
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <img src={`${process.env.PUBLIC_URL}/images/teamMember2.jpg`} alt="Team Member 2" className="tomorrow-card-image" />
                  </div>
                  <div className="flip-card-back">
                    <div className="flip-card-content">
                      <h3 className="team-member-name">Achini Dharmasirwardhana</h3>
                      <p className="team-member-designation">Chief Executive Officer</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`tomorrow-card ${flippedCards.includes(2) ? 'flipped' : ''}`} onClick={() => handleCardClick(2)}>
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <img src={`${process.env.PUBLIC_URL}/images/teamMember3.jpg`} alt="Team Member 3" className="tomorrow-card-image" />
                  </div>
                  <div className="flip-card-back">
                    <div className="flip-card-content">
                      <h3 className="team-member-name">Amila Fernando</h3>
                      <p className="team-member-designation">Director – Chief Strategy Officer</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`tomorrow-card ${flippedCards.includes(3) ? 'flipped' : ''}`} onClick={() => handleCardClick(3)}>
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <img src={`${process.env.PUBLIC_URL}/images/teamMember4.png`} alt="Team Member 4" className="tomorrow-card-image" />
                  </div>
                  <div className="flip-card-back">
                    <div className="flip-card-content">
                      <h3 className="team-member-name">Chandika Witharana</h3>
                      <p className="team-member-designation">Chief Technology Officer</p>
                    </div>
                  </div>
                </div>
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
