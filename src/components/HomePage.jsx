import React, { useEffect, useRef, useState } from 'react';
import './HomePage.css';
import './mobile-responsive.css';

const HomePage = () => {
  const statsHeadlineRef = useRef(null);
  const statsCardsRef = useRef(null);
  const facesHeaderRef = useRef(null);
  const testimonialRef = useRef(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState(-1); // All items collapsed by default
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  // Generate face items for each row with enough duplicates for seamless scrolling across any screen size
  const generateFaceItems = (startIndex, count = 100) => {
    return Array.from({ length: count }, (_, index) => {
      const imageNum = ((startIndex + index) % 10) || 10;
      const extension = imageNum === 5 ? 'png' : 'jpg';
      return (
        <div key={`face-${startIndex}-${index}`} className="face-item">
          <img 
            src={`${process.env.PUBLIC_URL}/images/people${imageNum}.${extension}`} 
            alt={`Person ${imageNum}`} 
            className="face-image" 
          />
        </div>
      );
    });
  };

  // Customer Stories carousel navigation
  const handlePrevCard = () => {
    setCurrentCardIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextCard = () => {
    setCurrentCardIndex((prev) => Math.min(1, prev + 1)); // Max 1 to show cards 0-2 or 1-3
  };

  // FAQ accordion toggle
  const toggleFaq = (index) => {
    setExpandedFaqIndex(expandedFaqIndex === index ? -1 : index);
  };

  return (
    <div className="page-container">
      <header className="header-section">
        <div className="header-content">
          <div className="logo">
            <div className="logo-background">
              <div className="logo-circle">
                <span className="logo-letter">B</span>
              </div>
            </div>
            <img src={`${process.env.PUBLIC_URL}/images/branchWorksGlobalNavText.svg`} alt="BRANCHWORKS GLOBAL" className="logo-text-svg" />
          </div>
          
          <nav className="nav-menu">
            <a href="#industry">Industry</a>
            <a href="#roles">Our Roles</a>
            <a href="#about">About</a>
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
                  <span className="logo-letter">B</span>
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
            <a href="#industry" onClick={closeMobileMenu}>Industry</a>
            <a href="#roles" onClick={closeMobileMenu}>Our Roles</a>
            <a href="#about" onClick={closeMobileMenu}>About</a>
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
                <div className="logo-item">
                  <img src={`${process.env.PUBLIC_URL}/images/google_icon.svg`} alt="Monday" className="company-logo google-logo" />
                </div>
                <div className="logo-item">
                  <img src={`${process.env.PUBLIC_URL}/images/heineken.svg`} alt="Hubstaff" className="company-logo" />
                </div>
                <div className="logo-item">
                  <img src={`${process.env.PUBLIC_URL}/images/forbes.svg`} alt="Deputy" className="company-logo" />
                </div>
                <div className="logo-item">
                  <img src={`${process.env.PUBLIC_URL}/images/intrax.png`} alt="Myob" className="company-logo" />
                </div>
                <div className="logo-item">
                  <img src={`${process.env.PUBLIC_URL}/images/linkedin-logo.svg`} alt="Quickbooks" className="company-logo" />
                </div>
                <div className="logo-item">
                  <img src={`${process.env.PUBLIC_URL}/images/google_icon.svg`} alt="Monday" className="company-logo google-logo" />
                </div>
                <div className="logo-item">
                  <img src={`${process.env.PUBLIC_URL}/images/heineken.svg`} alt="Hubstaff" className="company-logo" />
                </div>
                <div className="logo-item">
                  <img src={`${process.env.PUBLIC_URL}/images/forbes.svg`} alt="Deputy" className="company-logo" />
                </div>
                <div className="logo-item">
                  <img src={`${process.env.PUBLIC_URL}/images/intrax.png`} alt="Myob" className="company-logo" />
                </div>
                <div className="logo-item">
                  <img src={`${process.env.PUBLIC_URL}/images/linkedin-logo.svg`} alt="Quickbooks" className="company-logo" />
                </div>
                <div className="logo-item">
                  <img src={`${process.env.PUBLIC_URL}/images/google_icon.svg`} alt="Monday" className="company-logo google-logo" />
                </div>
                <div className="logo-item">
                  <img src={`${process.env.PUBLIC_URL}/images/heineken.svg`} alt="Hubstaff" className="company-logo" />
                </div>
                <div className="logo-item">
                  <img src={`${process.env.PUBLIC_URL}/images/forbes.svg`} alt="Deputy" className="company-logo" />
                </div>
                <div className="logo-item">
                  <img src={`${process.env.PUBLIC_URL}/images/intrax.png`} alt="Myob" className="company-logo" />
                </div>
                <div className="logo-item">
                  <img src={`${process.env.PUBLIC_URL}/images/linkedin-logo.svg`} alt="Quickbooks" className="company-logo" />
                </div>
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
                <img src={`${process.env.PUBLIC_URL}/images/forbes.svg`} alt="Forbes" className="stat-company-logo" />
              </div>
              <p className="stat-description">CFOs are prioritising finance transformation
                PwC</p>
              <div className="stat-value" style={{ color: '#60A5FA' }}>65%</div>
            </div>

            <div className="stat-card">
              <div className="stat-logo">
                <img src={`${process.env.PUBLIC_URL}/images/linkedin-logo.svg`} alt="LinkedIn" className="stat-company-logo" />
              </div>
              <p className="stat-description">Businesses use offshore teams to scale faster Deloitte</p>
              <div className="stat-value" style={{ color: '#60A5FA' }}>54%</div>
            </div>

            <div className="stat-card">
              <div className="stat-logo">
                <img src={`${process.env.PUBLIC_URL}/images/google_icon.svg`} alt="Google" className="stat-company-logo" />
              </div>
              <p className="stat-description">Companies invest in automation to improve efficiency
                McKinsey</p>
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
                A trusted offshore partner supporting businesses globally
              </p>
            </div>
          </div>
          <div className="map-image-box">
            <img src={`${process.env.PUBLIC_URL}/images/worldMap.jpg`} alt="World Map" className="world-map" />
          </div>
        </div>
      </div>

      <div className="new-section">
        <div className="new-section-container">
          <div className="new-section-content">
            <div className="new-section-header">
              <h2 className="new-section-title">What you get with Branchworks</h2>
              <p className="new-section-description">
                Everything you need to run payments, manage money, and grow, without extra hassle.
              </p>
            </div>

            <div className="new-section-tabs-wrapper">
              <div className="new-section-tabs">
                <button className="new-tab-button active">
                  Finance
                </button>
                <button className="new-tab-button">
                  IT
                </button>
                <button className="new-tab-button">
                  HR
                </button>
                <button className="new-tab-button">
                  BPO
                </button>
                <button className="new-tab-button">
                  KPO
                </button>
              </div>
            </div>

            <div className="new-section-tab-content">
              <div className="new-tab-content-left">
                <p className="new-tab-description">
                  Ttrue extension of their internal workforce, from our operational hub in Sri Lanka.
                </p>
                
                <div className="new-services-list">
                  <div className="new-service-item">
                    <div className="new-service-icon">
                      <img src={`${process.env.PUBLIC_URL}/images/Accounting.svg`} alt="Accounting" className="service-icon-image" />
                    </div>
                    <h3 className="new-service-title">Accounting</h3>
                  </div>
                  
                  <div className="new-service-item">
                    <div className="new-service-icon">
                      <img src={`${process.env.PUBLIC_URL}/images/financeReporting.svg`} alt="Finance Reporting" className="service-icon-image" />
                    </div>
                    <h3 className="new-service-title">Finance Reporting</h3>
                  </div>
                  
                  <div className="new-service-item">
                    <div className="new-service-icon">
                      <img src={`${process.env.PUBLIC_URL}/images/Payroll.svg`} alt="Payroll" className="service-icon-image" />
                    </div>
                    <h3 className="new-service-title">Payroll</h3>
                  </div>
                </div>

                <button className="new-cta-button">Know more</button>
              </div>

              <div className="new-tab-content-right">
                <img src={`${process.env.PUBLIC_URL}/images/girlImageFinance.jpg`} alt="Alexandra - Finance Expert" className="new-expert-photo" />
                <div className="new-expert-label">
                  <div className="new-expert-name">Alexandra</div>
                  <div className="new-expert-role">Finance Expert</div>
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

            <div className="faces-grid">
              <div className="faces-row faces-row-1">
                <div className="faces-strip-container">
                  <img src="/images/faces1.png" alt="Face 1" className="face-strip-image" />
                  <img src="/images/faces2.png" alt="Face 2" className="face-strip-image" />
                  <img src="/images/faces3.png" alt="Face 3" className="face-strip-image" />
                  <img src="/images/faces4.png" alt="Face 4" className="face-strip-image" />
                  <img src="/images/faces5.png" alt="Face 5" className="face-strip-image" />
                </div>
                <div className="faces-strip-container">
                  <img src="/images/faces1.png" alt="Face 1" className="face-strip-image" />
                  <img src="/images/faces2.png" alt="Face 2" className="face-strip-image" />
                  <img src="/images/faces3.png" alt="Face 3" className="face-strip-image" />
                  <img src="/images/faces4.png" alt="Face 4" className="face-strip-image" />
                  <img src="/images/faces5.png" alt="Face 5" className="face-strip-image" />
                </div>
                <div className="faces-strip-container">
                  <img src="/images/faces1.png" alt="Face 1" className="face-strip-image" />
                  <img src="/images/faces2.png" alt="Face 2" className="face-strip-image" />
                  <img src="/images/faces3.png" alt="Face 3" className="face-strip-image" />
                  <img src="/images/faces4.png" alt="Face 4" className="face-strip-image" />
                  <img src="/images/faces5.png" alt="Face 5" className="face-strip-image" />
                </div>
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
              <div className="tomorrow-card">
                <img src={`${process.env.PUBLIC_URL}/images/teamMember1.jpg`} alt="Team Member 1" className="tomorrow-card-image" />
              </div>
              <div className="tomorrow-card">
                <img src={`${process.env.PUBLIC_URL}/images/teamMember3.jpg`} alt="Team Member 3" className="tomorrow-card-image" />
              </div>
              <div className="tomorrow-card">
                <img src={`${process.env.PUBLIC_URL}/images/teamMember2.jpg`} alt="Team Member 2" className="tomorrow-card-image" />
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
                "We moved from reactive bookkeeping to a structured finance function.<br />
                The visibility and control we now have has changed how we operate."
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
                <h3 className="testimonial-name">CFO</h3>
                <p className="testimonial-role">SME Business</p>
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
              <div className="cards-container" style={{ transform: `translateX(-${currentCardIndex * 262}px)` }}>
                <div className="customer-story-card featured-card">
                  <img src={`${process.env.PUBLIC_URL}/images/customer_story_section_image.png`} alt="Customer Story" className="story-card-image" />
                  <button className="story-read-more">Read more</button>
                </div>
                <div className="customer-story-card placeholder-card">
                  <div className="placeholder-content"></div>
                </div>
                <div className="customer-story-card placeholder-card">
                  <div className="placeholder-content"></div>
                </div>
                <div className="customer-story-card placeholder-card">
                  <div className="placeholder-content"></div>
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
                disabled={currentCardIndex === 1}
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
                      <p>Flexible Finance Account is a flexible line of credit where, once opened, you can reuse your line of credit to make further purchases from Apple and choose how long you want to make your repayments for.</p>
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
                      <p>We use modern communication tools and establish clear protocols to ensure seamless collaboration with our offshore teams across different time zones.</p>
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
                      <p>Our teams provide coverage across multiple time zones to ensure 24/7 support for your business operations.</p>
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
                      <p>We implement industry-standard security measures and strict confidentiality protocols to protect your sensitive data.</p>
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
                      <p>Our streamlined onboarding process ensures quick integration of new clients and teams with comprehensive training and support.</p>
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

      <footer className="footer-section">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-top">
              <div className="footer-left">
                <div className="footer-logo">
                  <img src={`${process.env.PUBLIC_URL}/images/footer_logo.svg`} alt="BRANCHWORKS GLOBAL" className="footer-logo-image" />
                </div>
                <div className="footer-tagline">
                  <h2 className="footer-title">On Demand Factory OS,<br />Delivered Overnight .</h2>
                  <p className="footer-description">More than outsourcing<br />we build your international branch</p>
                </div>
              </div>
              
              <div className="footer-right">
                <div className="footer-column">
                  <h3 className="footer-column-title">Industry</h3>
                  <ul className="footer-links">
                    <li><a href="#finance">Finance</a></li>
                    <li><a href="#it">Information Technology</a></li>
                    <li><a href="#hr">HR</a></li>
                    <li><a href="#bpo">BPO</a></li>
                    <li><a href="#kpo">KPO</a></li>
                  </ul>
                </div>
                
                <div className="footer-column">
                  <h3 className="footer-column-title">Quick links</h3>
                  <ul className="footer-links">
                    <li><a href="#about">About us</a></li>
                    <li><a href="#blog">Blog</a></li>
                    <li><a href="#careers">Careers</a></li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="footer-bottom">
              <p className="footer-copyright">© 2026 Branchworks Global</p>
              <div className="footer-social">
                <a href="#instagram" className="social-icon" aria-label="Instagram">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 7C13.93 7 15.5 8.57 15.5 10.5C15.5 12.43 13.93 14 12 14C10.07 14 8.5 12.43 8.5 10.5C8.5 8.57 10.07 7 12 7ZM12 20C9.97 20 8.11 19.16 6.75 17.83C7.82 16.5 9.69 15.75 12 15.75C14.31 15.75 16.18 16.5 17.25 17.83C15.89 19.16 14.03 20 12 20Z" fill="currentColor"/>
                  </svg>
                </a>
                <a href="#linkedin" className="social-icon" aria-label="LinkedIn">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM9 17H6.5V10H9V17ZM7.75 8.75C6.92 8.75 6.25 8.08 6.25 7.25C6.25 6.42 6.92 5.75 7.75 5.75C8.58 5.75 9.25 6.42 9.25 7.25C9.25 8.08 8.58 8.75 7.75 8.75ZM17 17H14.5V13.5C14.5 12.4 13.6 11.5 12.5 11.5C11.4 11.5 10.5 12.4 10.5 13.5V17H8V10H10.5V11C11.1 10.2 12.2 9.75 13.25 9.75C15.32 9.75 17 11.43 17 13.5V17Z" fill="currentColor"/>
                  </svg>
                </a>
                <a href="#twitter" className="social-icon" aria-label="Twitter">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.46 6C21.69 6.35 20.86 6.58 20 6.69C20.88 6.16 21.56 5.32 21.88 4.31C21.05 4.81 20.13 5.16 19.16 5.36C18.37 4.5 17.26 4 16 4C13.65 4 11.73 5.92 11.73 8.29C11.73 8.63 11.77 8.96 11.84 9.27C8.28 9.09 5.11 7.38 3 4.79C2.63 5.42 2.42 6.16 2.42 6.94C2.42 8.43 3.17 9.75 4.33 10.5C3.62 10.5 2.96 10.3 2.38 10C2.38 10 2.38 10 2.38 10.03C2.38 12.11 3.86 13.85 5.82 14.24C5.46 14.34 5.08 14.39 4.69 14.39C4.42 14.39 4.15 14.36 3.89 14.31C4.43 16 6 17.26 7.89 17.29C6.43 18.45 4.58 19.13 2.56 19.13C2.22 19.13 1.88 19.11 1.54 19.07C3.44 20.29 5.70 21 8.12 21C16 21 20.33 14.46 20.33 8.79C20.33 8.6 20.33 8.42 20.32 8.23C21.16 7.63 21.88 6.87 22.46 6Z" fill="currentColor"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;