import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import './mobile-responsive.css';
import Footer from './Footer';

const HomePage = () => {
  const statsHeadlineRef = useRef(null);
  const statsCardsRef = useRef(null);
  const facesHeaderRef = useRef(null);
  const testimonialRef = useRef(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState(-1); // All items collapsed by default
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Finance');
  const [isIndustryDropdownOpen, setIsIndustryDropdownOpen] = useState(false);
  const [isMobileIndustryOpen, setIsMobileIndustryOpen] = useState(false);
  const [flippedCards, setFlippedCards] = useState([]);

  // Toggle flip card on mobile
  const handleCardClick = (index) => {
    if (window.innerWidth <= 768) {
      setFlippedCards(prev => 
        prev.includes(index) 
          ? prev.filter(i => i !== index)
          : [...prev, index]
      );
    }
  };

  // Tab switching function
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
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

  // Tab content data
  const tabContent = {
    Finance: {
      description: "A structured extension of your finance function, aligned with your systems, processes, and reporting.",
      expertName: "Alexandra",
      expertRole: "Finance Expert",
      expertImage: "teamMember5.jpg",
      showContainer: true
    },
    "Technology Support": {
      description: "Secure systems and infrastructure that enable your teams to operate efficiently and scale with confidence.",
      expertName: "Alexandra",
      expertRole: "Technology Specialist",
      expertImage: "girlImageFinance.jpg",
      showContainer: false
    },
    "Offshore Hiring": {
      description: "Dedicated offshore teams aligned with your business processes, working as an extension of your internal workforce.",
      expertName: "Alexandra",
      expertRole: "Offshore Hiring Expert",
      expertImage: "girlImageFinance.jpg",
      showContainer: false
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
    const statsHeadline = statsHeadlineRef.current;
    const statsCards = statsCardsRef.current;
    const facesHeader = facesHeaderRef.current;
    const testimonial = testimonialRef.current;

    if (statsHeadline) {
      observer.observe(statsHeadline);
    }
    if (statsCards) {
      observer.observe(statsCards);
    }
    if (facesHeader) {
      observer.observe(facesHeader);
    }
    if (testimonial) {
      observer.observe(testimonial);
    }

    return () => {
      if (statsHeadline) {
        observer.unobserve(statsHeadline);
      }
      if (statsCards) {
        observer.unobserve(statsCards);
      }
      if (facesHeader) {
        observer.unobserve(facesHeader);
      }
      if (testimonial) {
        observer.unobserve(testimonial);
      }
    };
  }, []);

  // Customer Stories carousel navigation
  const totalCards = 8; // Total number of cards
  const cardsPerView = 3; // Number of full cards visible at once (plus half of next one)
  const maxIndex = totalCards - cardsPerView; // Maximum index we can scroll to

  const handlePrevCard = () => {
    setCurrentCardIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextCard = () => {
    setCurrentCardIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  // FAQ accordion toggle
  const toggleFaq = (index) => {
    setExpandedFaqIndex(expandedFaqIndex === index ? -1 : index);
  };

  return (
    <div className="page-container">
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

      <div className="hero-layout">
        <div className="hero-content">
          <div className="badge-chip">
            <span className="badge-rating">4.8</span>
            <img src={`${process.env.PUBLIC_URL}/images/trustpilot-logo.svg`} alt="Trustpilot" className="badge-trustpilot-logo" />
          </div>
          
          <div className="headline-section">
            <h1 className="main-headline">Global Talent.<br />Offshore Strategy.</h1>
            <p className="headline-description">Exploring global talent, offshore strategy, and the economics shaping the future of work.</p>
          </div>

          <div className="cta-section">
            <button className="schedule-button">Schedule a Consultation</button>
          </div>

          <div className="logos-section">
            <div className="logos-container">
              <div className="logos-wrapper">
                <img src={`${process.env.PUBLIC_URL}/images/Brands.svg`} alt="Brand Partners" className="brands-svg" />
                <img src={`${process.env.PUBLIC_URL}/images/Brands.svg`} alt="Brand Partners" className="brands-svg" />
                <img src={`${process.env.PUBLIC_URL}/images/Brands.svg`} alt="Brand Partners" className="brands-svg" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="video-section">
        <div className="video-content">
          <div className="video-placeholder">
            <video 
              className="main-video"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src={`${process.env.PUBLIC_URL}/Video/video_1.mp4`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <div className="stats-container">
          <div className="stats-headline" ref={statsHeadlineRef}>
            <h2 className="stats-title">
              <span className="stats-title-black">We connect </span>
              <span className="stats-title-gray">forward-thinking enterprises with rigorously vetted offshore professionals.</span>
            </h2>
          </div>

          <div className="stats-cards" ref={statsCardsRef}>
            <div className="stat-card">
              <div className="stat-logo">
                <img src={`${process.env.PUBLIC_URL}/images/pwc.png`} alt="pwc" className="stat-company-logo" />
              </div>
              <p className="stat-description">CFOs are prioritising finance transformation</p>
              <div className="stat-value" style={{ color: '#60A5FA' }}>65%</div>
            </div>

            <div className="stat-card">
              <div className="stat-logo">
                <img src={`${process.env.PUBLIC_URL}/images/deloitte.png`} alt="Deloitte" className="stat-company-logo" />
              </div>
              <p className="stat-description">Businesses use offshore teams to scale faster</p>
              <div className="stat-value" style={{ color: '#60A5FA' }}>54%</div>
            </div>

            <div className="stat-card">
              <div className="stat-logo">
                <img src={`${process.env.PUBLIC_URL}/images/mcKinsey.png`} alt="mcKinsey" className="stat-company-logo" />
              </div>
              <p className="stat-description">Companies invest in automation to improve efficiency</p>
              <div className="stat-value" style={{ color: '#60A5FA' }}>45%</div>
            </div>
          </div>
        </div>
      </div>

      <div className="map-section">
        <div className="map-container">
          <div className="map-content">
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

      <div className="new-section">
        <div className="new-section-container">
          <div className="new-section-content">
            <div className="new-section-header">
              <h2 className="new-section-title">What you get with Branchworks</h2>
              <p className="new-section-description">
                End-to-end support across finance, technology, and offshore teams, helping you manage operations effectively and scale with confidence
              </p>
            </div>

            <div className="new-section-tabs-wrapper">
              <div className="new-section-tabs">
                <button 
                  className={`new-tab-button ${activeTab === 'Finance' ? 'active' : ''}`}
                  onClick={() => handleTabClick('Finance')}
                >
                  Finance
                </button>
                <button 
                  className={`new-tab-button ${activeTab === 'Technology Support' ? 'active' : ''}`}
                  onClick={() => handleTabClick('Technology Support')}
                >
                  Technology Support
                </button>
                <button 
                  className={`new-tab-button ${activeTab === 'Offshore Hiring' ? 'active' : ''}`}
                  onClick={() => handleTabClick('Offshore Hiring')}
                >
                  Offshore Hiring
                </button>
              </div>
            </div>

            <div className="new-section-tab-content">
              <div className="new-tab-content-left">
                <p className="new-tab-description">
                  {tabContent[activeTab].description}
                </p>
                
                {tabContent[activeTab].showContainer && (
                  <div className="new-services-list">
                    <img src={`${process.env.PUBLIC_URL}/images/Container.svg`} alt="Services" className="services-container-svg" />
                  </div>
                )}

                <button className="new-cta-button">Know more</button>
              </div>

              <div className="new-tab-content-right">
                <img src={`${process.env.PUBLIC_URL}/images/${tabContent[activeTab].expertImage}`} alt={`${tabContent[activeTab].expertName} - ${tabContent[activeTab].expertRole}`} className="new-expert-photo" />
                <div className="new-expert-label">
                  <div className="new-expert-name">{tabContent[activeTab].expertName}</div>
                  <div className="new-expert-role">{tabContent[activeTab].expertRole}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="faces-section">
        <div className="faces-container">
          <div className="faces-content">
            <div className="faces-header" ref={facesHeaderRef}>
              <h2 className="faces-title">The real faces behind<br />every local insight</h2>
              <p className="faces-description">
                We work with an incredible<br />
                global network of moderators<br />
                researchers, and cultural experts
              </p>
              <button className="faces-cta-button">Join free</button>
            </div>
            
            <div className="real-faces-grid">
              <div className="real-face-item real-face-1">
                <img 
                  src={`${process.env.PUBLIC_URL}/images/realFace_1.png`} 
                  alt="Real Face 1" 
                  className="real-face-image" 
                />
              </div>
              <div className="real-face-item real-face-2">
                <img 
                  src={`${process.env.PUBLIC_URL}/images/realFace_2.png`} 
                  alt="Real Face 2" 
                  className="real-face-image" 
                />
              </div>
              <div className="real-face-item real-face-3">
                <img 
                  src={`${process.env.PUBLIC_URL}/images/realFace_3.png`} 
                  alt="Real Face 3" 
                  className="real-face-image" 
                />
              </div>
              <div className="real-face-item real-face-4">
                <img 
                  src={`${process.env.PUBLIC_URL}/images/realFace_4.png`} 
                  alt="Real Face 4" 
                  className="real-face-image" 
                />
              </div>
              <div className="real-face-item real-face-5">
                <img 
                  src={`${process.env.PUBLIC_URL}/images/realFace_5.png`} 
                  alt="Real Face 5" 
                  className="real-face-image" 
                />
              </div>
              {/* Duplicate for seamless scrolling */}
              <div className="real-face-item real-face-1">
                <img 
                  src={`${process.env.PUBLIC_URL}/images/realFace_1.png`} 
                  alt="Real Face 1" 
                  className="real-face-image" 
                />
              </div>
              <div className="real-face-item real-face-2">
                <img 
                  src={`${process.env.PUBLIC_URL}/images/realFace_2.png`} 
                  alt="Real Face 2" 
                  className="real-face-image" 
                />
              </div>
              <div className="real-face-item real-face-3">
                <img 
                  src={`${process.env.PUBLIC_URL}/images/realFace_3.png`} 
                  alt="Real Face 3" 
                  className="real-face-image" 
                />
              </div>
              <div className="real-face-item real-face-4">
                <img 
                  src={`${process.env.PUBLIC_URL}/images/realFace_4.png`} 
                  alt="Real Face 4" 
                  className="real-face-image" 
                />
              </div>
              <div className="real-face-item real-face-5">
                <img 
                  src={`${process.env.PUBLIC_URL}/images/realFace_5.png`} 
                  alt="Real Face 5" 
                  className="real-face-image" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="tomorrow-section">
        <div className="tomorrow-container">
          <div className="tomorrow-content">
            <div className="tomorrow-header">
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
              <div className={`tomorrow-card ${flippedCards.includes(0) ? 'flipped' : ''}`} onClick={() => handleCardClick(0)}>
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <img src={`${process.env.PUBLIC_URL}/images/teamMember1.jpg`} alt="Team Member 1" className="tomorrow-card-image" />
                  </div>
                  <div className="flip-card-back">
                    <div className="flip-card-content">
                      <h3 className="team-member-name">Sarah Johnson</h3>
                      <p className="team-member-designation">Senior Finance Manager</p>
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
                      <h3 className="team-member-name">Priya Sharma</h3>
                      <p className="team-member-designation">Technology Lead</p>
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
                      <h3 className="team-member-name">Michael Chen</h3>
                      <p className="team-member-designation">Operations Director</p>
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
                      <h3 className="team-member-name">Rajesh Kumar</h3>
                      <p className="team-member-designation">Business Analyst</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="testimonial-section">
        <div className="testimonial-container">
          <div className="testimonial-content" ref={testimonialRef}>
            <div className="testimonial-stars">
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="star">★</span>
            </div>
            
            <div className="testimonial-quote">
              <p className="testimonial-text">
                "We moved from reactive bookkeeping to a structured finance function. The visibility and control we now have has changed how we operate."
              </p>
            </div>
            
            <div className="testimonial-source">
              <img src={`${process.env.PUBLIC_URL}/images/forbes.svg`} alt="Forbes" className="testimonial-logo" />
            </div>
            
            <div className="testimonial-profile">
              <div className="testimonial-avatar">
                <img src={`${process.env.PUBLIC_URL}/images/fobes_girl.jpg`} alt="Julie Sweet" className="testimonial-avatar-image" />
              </div>
              <div className="testimonial-info">
                <h3 className="testimonial-name">Julie Sweet</h3>
                <p className="testimonial-role">Finance Expert - Company name</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="customer-stories-section">
        <div className="customer-stories-container">
          <div className="customer-stories-content">
            <div className="customer-stories-header">
              <div className="customer-stories-text">
                <h2 className="customer-stories-title">Customer Stories</h2>
                <p className="customer-stories-description">
                  Companies like yours are building<br />
                  better docs with Branchworks
                </p>
              </div>
              <button className="customer-stories-cta">View All</button>
            </div>
            
            <div className="customer-stories-cards">
              <div className="customer-stories-grid" style={{ transform: `translateX(-${currentCardIndex * 296.67}px)` }}>
                {/* Individual Cards */}
                <div className="customer-story-card">
                  <img src={`${process.env.PUBLIC_URL}/images/customer_story_image_1.jpg`} alt="Customer Story" className="story-card-image" />
                  <div className="story-card-content">
                    <div className="story-date">Apr 18, 2026</div>
                    <h3 className="story-title">Async First: Cut Meetings, Boost Remote Wins</h3>
                    <a href="/#" className="story-read-more-link">Read more</a>
                  </div>
                </div>
                
                <div className="customer-story-card">
                  <img src={`${process.env.PUBLIC_URL}/images/customer_story_image_1.jpg`} alt="Customer Story" className="story-card-image" />
                  <div className="story-card-content">
                    <div className="story-date">Apr 18, 2026</div>
                    <h3 className="story-title">Async First: Cut Meetings, Boost Remote Wins</h3>
                    <a href="/#" className="story-read-more-link">Read more</a>
                  </div>
                </div>
                
                <div className="customer-story-card">
                  <img src={`${process.env.PUBLIC_URL}/images/customer_story_image_1.jpg`} alt="Customer Story" className="story-card-image" />
                  <div className="story-card-content">
                    <div className="story-date">Apr 18, 2026</div>
                    <h3 className="story-title">Async First: Cut Meetings, Boost Remote Wins</h3>
                    <a href="/#" className="story-read-more-link">Read more</a>
                  </div>
                </div>
                
                <div className="customer-story-card">
                  <img src={`${process.env.PUBLIC_URL}/images/customer_story_image_1.jpg`} alt="Customer Story" className="story-card-image" />
                  <div className="story-card-content">
                    <div className="story-date">Apr 18, 2026</div>
                    <h3 className="story-title">Async First: Cut Meetings, Boost Remote Wins</h3>
                    <a href="/#" className="story-read-more-link">Read more</a>
                  </div>
                </div>

                <div className="customer-story-card">
                  <img src={`${process.env.PUBLIC_URL}/images/customer_story_image_1.jpg`} alt="Customer Story" className="story-card-image" />
                  <div className="story-card-content">
                    <div className="story-date">Apr 20, 2026</div>
                    <h3 className="story-title">Remote Team Success: Building Culture Across Borders</h3>
                    <a href="/#" className="story-read-more-link">Read more</a>
                  </div>
                </div>
                
                <div className="customer-story-card">
                  <img src={`${process.env.PUBLIC_URL}/images/customer_story_image_1.jpg`} alt="Customer Story" className="story-card-image" />
                  <div className="story-card-content">
                    <div className="story-date">Apr 20, 2026</div>
                    <h3 className="story-title">Remote Team Success: Building Culture Across Borders</h3>
                    <a href="/#" className="story-read-more-link">Read more</a>
                  </div>
                </div>
                
                <div className="customer-story-card">
                  <img src={`${process.env.PUBLIC_URL}/images/customer_story_image_1.jpg`} alt="Customer Story" className="story-card-image" />
                  <div className="story-card-content">
                    <div className="story-date">Apr 20, 2026</div>
                    <h3 className="story-title">Digital Transformation: Scaling Teams Globally</h3>
                    <a href="/#" className="story-read-more-link">Read more</a>
                  </div>
                </div>
                
                <div className="customer-story-card">
                  <img src={`${process.env.PUBLIC_URL}/images/customer_story_image_1.jpg`} alt="Customer Story" className="story-card-image" />
                  <div className="story-card-content">
                    <div className="story-date">Apr 22, 2026</div>
                    <h3 className="story-title">Cost Optimization: 40% Savings with Offshore Teams</h3>
                    <a href="/#" className="story-read-more-link">Read more</a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="customer-stories-navigation">
              <button 
                className="nav-arrow nav-prev" 
                onClick={handlePrevCard}
                disabled={currentCardIndex === 0}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button 
                className="nav-arrow nav-next" 
                onClick={handleNextCard}
                disabled={currentCardIndex === maxIndex}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="faq-section">
        <div className="faq-container">
          <div className="faq-content">
            <div className="faq-header">
              <h2 className="faq-title">
                <span className="faq-title-black">Got questions?</span><br />
                <span className="faq-title-gray">Here's the answers.</span>
              </h2>
            </div>
            
            <div className="faq-list">
              <div className="faq-items">
                <div className={`faq-item ${expandedFaqIndex === 0 ? 'expanded' : ''}`} onClick={() => toggleFaq(0)}>
                  <div className="faq-question">
                    <span>What services does your offshore company provide?</span>
                    <button className="faq-toggle">{expandedFaqIndex === 0 ? '−' : '+'}</button>
                  </div>
                  {expandedFaqIndex === 0 && (
                    <div className="faq-answer">
                      <p>BranchWorks Global delivers integrated offshore solutions across three core areas: Finance & Accounting BPO, Offshore Staffing, and Enterprise-Grade IT Solutions.</p>
                      <p>Our Finance & Accounting services include bookkeeping, accounts payable and receivable, payroll processing, bank reconciliation, tax compliance (BAS, VAT, STP, FBT), financial reporting, and management accounting. Our Offshore Staffing solutions cover end-to-end talent acquisition, onboarding, HR, and performance management for dedicated remote teams. Our IT capabilities span infrastructure management, software development, data analytics, and ERP implementation.</p>
                      <p>All services are delivered through a single, integrated operating model — so finance, people, and technology work together seamlessly for your business.</p>
                    </div>
                  )}
                </div>
                
                <div className={`faq-item ${expandedFaqIndex === 1 ? 'expanded' : ''}`} onClick={() => toggleFaq(1)}>
                  <div className="faq-question">
                    <span>How do you ensure communication and collaboration with offshore teams?</span>
                    <button className="faq-toggle">{expandedFaqIndex === 1 ? '−' : '+'}</button>
                  </div>
                  {expandedFaqIndex === 1 && (
                    <div className="faq-answer">
                      <p>We treat communication as a core part of our service — not an afterthought. Each client is assigned a dedicated team aligned specifically to their business, which means you work with the same people every day. There are no rotating staff or unfamiliar faces.</p>
                      <p>We operate using your preferred collaboration tools — whether that is email, Microsoft Teams, Slack, or video calls — and we establish structured check-ins, reporting cadences, and escalation protocols from day one. Our onboarding process includes a full communication plan so expectations are clear on both sides from the start.</p>
                      <p>Transparency is built into everything we do. You always have visibility into what your team is working on, when deliverables are due, and how performance is tracking.</p>
                    </div>
                  )}
                </div>
                
                <div className={`faq-item ${expandedFaqIndex === 2 ? 'expanded' : ''}`} onClick={() => toggleFaq(2)}>
                  <div className="faq-question">
                    <span>What time zone coverage can your team support?</span>
                    <button className="faq-toggle">{expandedFaqIndex === 2 ? '−' : '+'}</button>
                  </div>
                  {expandedFaqIndex === 2 && (
                    <div className="faq-answer">
                      <p>Our head office is based in Sri Lanka (IST, UTC+5:30), which gives us strong natural overlap with our primary client markets. For Australian clients, our team operates during AEST business hours, ensuring real-time responsiveness throughout the working day. For UK and US clients, we offer flexible scheduling to align with your core hours.</p>
                      <p>We are experienced in managing time zone differences as part of a structured delivery model — with agreed turnaround times, end-of-day handovers, and cloud-based reporting that ensures nothing falls through the gap overnight. Whether you need same-day responses or a reliable overnight processing cycle, we design our working hours around your business needs.</p>
                    </div>
                  )}
                </div>
                
                <div className={`faq-item ${expandedFaqIndex === 3 ? 'expanded' : ''}`} onClick={() => toggleFaq(3)}>
                  <div className="faq-question">
                    <span>How do you handle data security and confidentiality?</span>
                    <button className="faq-toggle">{expandedFaqIndex === 3 ? '−' : '+'}</button>
                  </div>
                  {expandedFaqIndex === 3 && (
                    <div className="faq-answer">
                      <p>Data security and client confidentiality are fundamental to how we operate. All client engagements are covered by a Non-Disclosure Agreement (NDA) from the outset, and our team members are bound by strict confidentiality obligations as part of their contracts.</p>
                      <p>We use cloud-based platforms — including Xero, QuickBooks, and MYOB — that carry their own enterprise-grade security, including two-factor authentication, role-based access controls, and encrypted data storage. Access to client data is restricted strictly to the team members working on that account.</p>
                      <p>We operate in alignment with international data handling best practices and are happy to work within any specific data governance requirements your organisation has in place. If you have questions about our security protocols, our team is available to walk you through them in detail.</p>
                    </div>
                  )}
                </div>
                
                <div className={`faq-item ${expandedFaqIndex === 4 ? 'expanded' : ''}`} onClick={() => toggleFaq(4)}>
                  <div className="faq-question">
                    <span>What is your onboarding process for new clients and teams?</span>
                    <button className="faq-toggle">{expandedFaqIndex === 4 ? '−' : '+'}</button>
                  </div>
                  {expandedFaqIndex === 4 && (
                    <div className="faq-answer">
                      <p>We have built a structured onboarding process designed to get you operational quickly and confidently — with no disruption to your existing workflows.</p>
                      <p>It begins with a discovery session to understand your business, current processes, tools, and goals. From there, we set up your systems — including Xero, QuickBooks, or MYOB migration if required — and handle all data transfer at no additional cost. Your dedicated team is then introduced, communication protocols are established, and a clear service schedule is agreed upon.</p>
                      <p>Most clients are fully onboarded within one to two weeks. We also offer a complimentary two-week trial — up to 50 transactions or 6 hours of work — so you can experience the quality of our service before making any long-term commitment. For new offshore teams, we manage the full recruitment, onboarding, and HR setup so your team is ready to perform from day one.</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="faq-footer">
                <p className="faq-footer-text">Don't see what you want?</p>
                <a href="#contact" className="faq-contact-link">Send us an email</a>
              </div>
            </div>
          </div>
        </div>
      </div>

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

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;