import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import './Finance.css';
import './mobile-responsive.css';
import Footer from './Footer';

const TechnologySupport = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isIndustryDropdownOpen, setIsIndustryDropdownOpen] = useState(false);
  const [isMobileIndustryOpen, setIsMobileIndustryOpen] = useState(false);
  
  // Animation refs
  const scalingHeaderRef = useRef(null);
  const scalingCardsRef = useRef(null);
  const servicesHeroRef = useRef(null);
  const servicesGridRef = useRef(null);
  const section2HeroRef = useRef(null);
  const section2GridRef = useRef(null);
  const section3HeroRef = useRef(null);
  const section3GridRef = useRef(null);
  const section4HeroRef = useRef(null);
  const section4GridRef = useRef(null);
  const testimonialRef = useRef(null);
  
  // Calculate max index for carousel (total cards - visible cards)
  const totalCards = 8;
  const visibleCards = 3;
  const maxIndex = totalCards - visibleCards;

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Animation observer effect
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

    const refs = [
      scalingHeaderRef, scalingCardsRef, servicesHeroRef, servicesGridRef,
      section2HeroRef, section2GridRef, section3HeroRef, section3GridRef,
      section4HeroRef, section4GridRef, testimonialRef
    ];

    refs.forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      refs.forEach(ref => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
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

  const handlePrevCard = () => {
    setCurrentCardIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextCard = () => {
    setCurrentCardIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <div className="finance-layout">
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
            <a href="#careers">Careers</a>
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
            <a href="#careers" onClick={() => setIsMobileMenuOpen(false)}>Careers</a>
          </nav>
          
          <button className="mobile-cta-button" onClick={() => setIsMobileMenuOpen(false)}>Talk to an expert</button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="hero-layout">
        <div className="hero-content">
          <div className="badge-chip">
            <span className="badge-text">Technology Support</span>
          </div>
          
          <div className="headline-section">
            <h1 className="main-headline">[Your Headline Here]</h1>
            <p className="headline-description">[Your description here - you can update this later]</p>
          </div>

          <div className="cta-section">
            <button className="schedule-button">Book a free 30-minute demo</button>
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

      {/* Second Section - Stats/Scaling */}
      <div className="finance-scaling-section">
        <div className="finance-scaling-container">
          <div className="finance-scaling-content">
            <div className="finance-scaling-header" ref={scalingHeaderRef}>
              <h2 className="finance-scaling-title">
                <span className="finance-scaling-title-black">[Your Title Here]<br /></span>
                <span className="finance-scaling-title-gray">[Your subtitle here]</span>
              </h2>
            </div>

            <div className="finance-scaling-cards" ref={scalingCardsRef}>
              <div className="finance-scaling-card finance-scaling-card-primary">
                <p className="finance-scaling-card-description">[Card 1 description]</p>
                <div className="finance-scaling-card-value">70%</div>
              </div>

              <div className="finance-scaling-card finance-scaling-card-secondary">
                <p className="finance-scaling-card-description">[Card 2 description]</p>
                <div className="finance-scaling-card-value" style={{ color: '#60A5FA' }}>44,000+</div>
              </div>

              <div className="finance-scaling-card finance-scaling-card-secondary">
                <p className="finance-scaling-card-description">[Card 3 description]</p>
                <div className="finance-scaling-card-value" style={{ color: '#60A5FA' }}>60%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Third Section - Service Category 1 */}
      <div className="finance-services-section">
        <div className="finance-services-container">
          <div className="finance-services-content">
            <div 
              className="finance-hero-card"
              ref={servicesHeroRef}
              style={{
                backgroundImage: `linear-gradient(90deg, #0F172A -6.12%, rgba(15, 23, 42, 0) 70%), url('${process.env.PUBLIC_URL}/images/it_support_image1.png')`,
                backgroundSize: 'cover',
                backgroundPosition: '75% 30%',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <div className="finance-hero-content">
                <div className="finance-hero-icon">
                  <img 
                    src={`${process.env.PUBLIC_URL}/images/it_support_mini_icon1.png`} 
                    alt="Service Icon" 
                    width="48" 
                    height="48"
                    style={{ borderRadius: '8px' }}
                  />
                </div>
                <div className="finance-hero-text-content">
                  <h2 className="finance-hero-title">[Service Category 1 Title]</h2>
                  <p className="finance-hero-description">
                    [Service category 1 description - you can update this later]
                  </p>
                </div>
                <button className="finance-hero-button">
                  Speak to an expert
                  <img 
                    src={`${process.env.PUBLIC_URL}/images/finance_button_arrow_Icon.jpg`} 
                    alt="Arrow" 
                    width="16" 
                    height="16" 
                    style={{ marginLeft: '4px' }}
                  />
                </button>
              </div>
            </div>

            <div className="finance-services-grid" ref={servicesGridRef}>
              <div className="finance-service-card">
                <h3 className="finance-service-title">[Service 1]</h3>
                <p className="finance-service-description">
                  [Service 1 description]
                </p>
              </div>
              
              <div className="finance-service-card">
                <h3 className="finance-service-title">[Service 2]</h3>
                <p className="finance-service-description">
                  [Service 2 description]
                </p>
              </div>
              
              <div className="finance-service-card">
                <h3 className="finance-service-title">[Service 3]</h3>
                <p className="finance-service-description">
                  [Service 3 description]
                </p>
              </div>
              
              <div className="finance-service-card">
                <h3 className="finance-service-title">[Service 4]</h3>
                <p className="finance-service-description">
                  [Service 4 description]
                </p>
              </div>
              
              <div className="finance-service-card">
                <h3 className="finance-service-title">[Service 5]</h3>
                <p className="finance-service-description">
                  [Service 5 description]
                </p>
              </div>
              
              <div className="finance-service-card">
                <h3 className="finance-service-title">[Service 6]</h3>
                <p className="finance-service-description">
                  [Service 6 description]
                </p>
              </div>
            </div>

            <div className="finance-tools-logo">
              <img 
                src={`${process.env.PUBLIC_URL}/images/finance_logo_1.png`} 
                alt="Technology Tools" 
                className="finance-logo-image"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Fourth Section - Service Category 2 */}
      <div className="finance-tax-section">
        <div className="finance-tax-container">
          <div className="finance-tax-content">
            <div 
              className="finance-tax-hero-card"
              ref={section2HeroRef}
              style={{
                backgroundImage: `linear-gradient(90deg, #0F172A -6.12%, rgba(15, 23, 42, 0) 70%), url('${process.env.PUBLIC_URL}/images/it_support_image2.png')`,
                backgroundSize: 'cover',
                backgroundPosition: '75% 30%',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <div className="finance-tax-hero-content">
                <div className="finance-tax-hero-icon">
                  <img 
                    src={`${process.env.PUBLIC_URL}/images/it_support_mini_icon2.png`} 
                    alt="Service Icon" 
                    width="48" 
                    height="48"
                    style={{ borderRadius: '8px' }}
                  />
                </div>
                <div className="finance-tax-hero-text-content">
                  <h2 className="finance-tax-hero-title">[Service Category 2 Title]</h2>
                  <p className="finance-tax-hero-description">
                    [Service category 2 description]
                  </p>
                </div>
                <button className="finance-tax-hero-button">
                  Speak to an expert
                  <img 
                    src={`${process.env.PUBLIC_URL}/images/finance_button_arrow_Icon.jpg`} 
                    alt="Arrow" 
                    width="16" 
                    height="16" 
                    style={{ marginLeft: '4px' }}
                  />
                </button>
              </div>
            </div>

            <div className="finance-tax-services-grid" ref={section2GridRef}>
              <div className="finance-tax-service-card">
                <h3 className="finance-tax-service-title">[Service 1]</h3>
                <p className="finance-tax-service-description">
                  [Service 1 description]
                </p>
              </div>
              
              <div className="finance-tax-service-card">
                <h3 className="finance-tax-service-title">[Service 2]</h3>
                <p className="finance-tax-service-description">
                  [Service 2 description]
                </p>
              </div>
              
              <div className="finance-tax-service-card">
                <h3 className="finance-tax-service-title">[Service 3]</h3>
                <p className="finance-tax-service-description">
                  [Service 3 description]
                </p>
              </div>
              
              <div className="finance-tax-service-card">
                <h3 className="finance-tax-service-title">[Service 4]</h3>
                <p className="finance-tax-service-description">
                  [Service 4 description]
                </p>
              </div>
              
              <div className="finance-tax-service-card">
                <h3 className="finance-tax-service-title">[Service 5]</h3>
                <p className="finance-tax-service-description">
                  [Service 5 description]
                </p>
              </div>
              
              <div className="finance-tax-service-card">
                <h3 className="finance-tax-service-title">[Service 6]</h3>
                <p className="finance-tax-service-description">
                  [Service 6 description]
                </p>
              </div>
            </div>

            <div className="finance-tax-tools-logo">
              <img 
                src={`${process.env.PUBLIC_URL}/images/finance_logo_2.png`}
                alt="Technology Tools" 
                className="finance-tax-logo-image"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Fifth Section - Service Category 3 */}
      <div className="finance-payroll-section">
        <div className="finance-payroll-container">
          <div className="finance-payroll-content">
            <div 
              className="finance-payroll-hero-card"
              ref={section3HeroRef}
              style={{
                backgroundImage: `linear-gradient(90deg, #0F172A -6.12%, rgba(15, 23, 42, 0) 70%), url('${process.env.PUBLIC_URL}/images/it_support_image3.png')`,
                backgroundSize: 'cover',
                backgroundPosition: '75% 30%',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <div className="finance-payroll-hero-content">
                <div className="finance-payroll-hero-icon">
                  <img 
                    src={`${process.env.PUBLIC_URL}/images/it_support_mini_icon3.png`} 
                    alt="Service Icon" 
                    width="48" 
                    height="48"
                    style={{ borderRadius: '8px' }}
                  />
                </div>
                <div className="finance-payroll-hero-text-content">
                  <h2 className="finance-payroll-hero-title">[Service Category 3 Title]</h2>
                  <p className="finance-payroll-hero-description">
                    [Service category 3 description]
                  </p>
                </div>
                <button className="finance-payroll-hero-button">
                  Speak to an expert
                  <img 
                    src={`${process.env.PUBLIC_URL}/images/finance_button_arrow_Icon.jpg`} 
                    alt="Arrow" 
                    width="16" 
                    height="16" 
                    style={{ marginLeft: '4px' }}
                  />
                </button>
              </div>
            </div>

            <div className="finance-payroll-services-grid" ref={section3GridRef}>
              <div className="finance-payroll-service-card">
                <h3 className="finance-payroll-service-title">[Service 1]</h3>
                <p className="finance-payroll-service-description">
                  [Service 1 description]
                </p>
              </div>
              
              <div className="finance-payroll-service-card">
                <h3 className="finance-payroll-service-title">[Service 2]</h3>
                <p className="finance-payroll-service-description">
                  [Service 2 description]
                </p>
              </div>
              
              <div className="finance-payroll-service-card">
                <h3 className="finance-payroll-service-title">[Service 3]</h3>
                <p className="finance-payroll-service-description">
                  [Service 3 description]
                </p>
              </div>
              
              <div className="finance-payroll-service-card">
                <h3 className="finance-payroll-service-title">[Service 4]</h3>
                <p className="finance-payroll-service-description">
                  [Service 4 description]
                </p>
              </div>
              
              <div className="finance-payroll-service-card">
                <h3 className="finance-payroll-service-title">[Service 5]</h3>
                <p className="finance-payroll-service-description">
                  [Service 5 description]
                </p>
              </div>
              
              <div className="finance-payroll-service-card">
                <h3 className="finance-payroll-service-title">[Service 6]</h3>
                <p className="finance-payroll-service-description">
                  [Service 6 description]
                </p>
              </div>
            </div>

            <div className="finance-payroll-tools-logo">
              <img 
                src={`${process.env.PUBLIC_URL}/images/finance_logo_3.png`}
                alt="Technology Tools" 
                className="finance-payroll-logo-image"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sixth Section - Service Category 4 */}
      <div className="finance-management-section">
        <div className="finance-management-container">
          <div className="finance-management-content">
            <div 
              className="finance-management-hero-card"
              ref={section4HeroRef}
              style={{
                backgroundImage: `linear-gradient(90deg, #0F172A -6.12%, rgba(15, 23, 42, 0) 70%), url('${process.env.PUBLIC_URL}/images/it_support_image4.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: '75% 30%',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <div className="finance-management-hero-content">
                <div className="finance-management-hero-icon">
                  <img 
                    src={`${process.env.PUBLIC_URL}/images/it_support_mini_icon4.png`} 
                    alt="Service Icon" 
                    width="48" 
                    height="48"
                    style={{ borderRadius: '8px' }}
                  />
                </div>
                <div className="finance-management-hero-text-content">
                  <h2 className="finance-management-hero-title">[Service Category 4 Title]</h2>
                  <p className="finance-management-hero-description">
                    [Service category 4 description]
                  </p>
                </div>
                <button className="finance-management-hero-button">
                  Speak to an expert
                  <img 
                    src={`${process.env.PUBLIC_URL}/images/finance_button_arrow_Icon.jpg`} 
                    alt="Arrow" 
                    width="16" 
                    height="16" 
                    style={{ marginLeft: '4px' }}
                  />
                </button>
              </div>
            </div>

            <div className="finance-management-services-grid" ref={section4GridRef}>
              <div className="finance-management-service-card">
                <h3 className="finance-management-service-title">[Service 1]</h3>
                <p className="finance-management-service-description">
                  [Service 1 description]
                </p>
              </div>
              
              <div className="finance-management-service-card">
                <h3 className="finance-management-service-title">[Service 2]</h3>
                <p className="finance-management-service-description">
                  [Service 2 description]
                </p>
              </div>
              
              <div className="finance-management-service-card">
                <h3 className="finance-management-service-title">[Service 3]</h3>
                <p className="finance-management-service-description">
                  [Service 3 description]
                </p>
              </div>
              
              <div className="finance-management-service-card">
                <h3 className="finance-management-service-title">[Service 4]</h3>
                <p className="finance-management-service-description">
                  [Service 4 description]
                </p>
              </div>
              
              <div className="finance-management-service-card">
                <h3 className="finance-management-service-title">[Service 5]</h3>
                <p className="finance-management-service-description">
                  [Service 5 description]
                </p>
              </div>
              
              <div className="finance-management-service-card">
                <h3 className="finance-management-service-title">[Service 6]</h3>
                <p className="finance-management-service-description">
                  [Service 6 description]
                </p>
              </div>
            </div>

            <div className="finance-management-tools-logo">
              <img 
                src={`${process.env.PUBLIC_URL}/images/finance_logo_4.png`}
                alt="Technology Tools" 
                className="finance-management-logo-image"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="finance-testimonial-section">
        <div className="finance-testimonial-container">
          <div className="finance-testimonial-content" ref={testimonialRef}>
            <div className="finance-testimonial-stars">
              <span className="finance-star">★</span>
              <span className="finance-star">★</span>
              <span className="finance-star">★</span>
              <span className="finance-star">★</span>
              <span className="finance-star">★</span>
            </div>
            
            <div className="finance-testimonial-quote">
              <p className="finance-testimonial-text">
                "[Your testimonial text here - you can update this later]"
              </p>
            </div>

            <div className="finance-testimonial-profile">
              <div className="finance-testimonial-info">
                <p className="finance-testimonial-role">[Role]</p>
                <p className="finance-testimonial-company">[Company]</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Stories Section */}
      <div className="customer-stories-section">
        <div className="customer-stories-container">
          <div className="customer-stories-content">
            <div className="customer-stories-header">
              <div className="customer-stories-text">
                <h2 className="customer-stories-title">Customer Stories</h2>
                <p className="customer-stories-description">
                  Companies like yours are building<br />
                  better solutions with Branchworks
                </p>
              </div>
              <button className="customer-stories-cta">View All</button>
            </div>
            
            <div className="customer-stories-cards">
              <div className="customer-stories-grid" style={{ transform: `translateX(-${currentCardIndex * 296.67}px)` }}>
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="customer-story-card">
                    <img src={`${process.env.PUBLIC_URL}/images/customer_story_image_1.jpg`} alt="Customer Story" className="story-card-image" />
                    <div className="story-card-content">
                      <div className="story-date">Apr 18, 2026</div>
                      <h3 className="story-title">[Story Title {index + 1}]</h3>
                      <a href="/#" className="story-read-more-link">Read more</a>
                    </div>
                  </div>
                ))}
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

      {/* CTA Expert Section */}
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

export default TechnologySupport;
