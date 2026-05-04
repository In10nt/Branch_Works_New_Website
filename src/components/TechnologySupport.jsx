import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import './Finance.css';
import './TechnologySupport.css';
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

      {/* Hero Section */}
      <div className="hero-layout">
        <div className="hero-content">
          <div className="badge-chip">
            <span className="badge-text">Technology Support</span>
          </div>
          
          <div className="headline-section">
            <h1 className="main-headline">Technology Solutions.<br />Simplified. Secured.</h1>
            <p className="headline-description">Empowering businesses with comprehensive technology solutions to enhance operations, improve efficiency, and enable digital transformation.</p>
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
                <span className="finance-scaling-title-black">Why businesses are investing in<br /></span>
                <span className="finance-scaling-title-gray">technology enablement</span>
              </h2>
            </div>

            <div className="finance-scaling-cards" ref={scalingCardsRef}>
              <div className="finance-scaling-card finance-scaling-card-primary">
                <p className="finance-scaling-card-description">Businesses rely on cloud-based systems for operations</p>
                <div className="finance-scaling-card-value">90%+</div>
              </div>

              <div className="finance-scaling-card finance-scaling-card-secondary">
                <p className="finance-scaling-card-description">Faster workflows with connected systems</p>
                <div className="finance-scaling-card-value" style={{ color: '#60A5FA' }}>3x</div>
              </div>

              <div className="finance-scaling-card finance-scaling-card-secondary">
                <p className="finance-scaling-card-description">Companies invest in secure remote access</p>
                <div className="finance-scaling-card-value" style={{ color: '#60A5FA' }}>65%</div>
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
                  <h2 className="finance-hero-title">Data, Analytics & Cloud Architecture</h2>
                  <p className="finance-hero-description">
                    Delivering comprehensive technology solutions to enhance business operations, improve efficiency, and enable digital transformation.
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
                <h3 className="finance-service-title">Business Intelligence Dashboards</h3>
                <p className="finance-service-description">
                  Building dashboards using BI tools to provide real-time insights and support data-driven decisions.
                </p>
              </div>
              
              <div className="finance-service-card">
                <h3 className="finance-service-title">Data Engineering & Warehousing</h3>
                <p className="finance-service-description">
                  Designing data pipelines and warehouses to consolidate data and support reporting and analysis.
                </p>
              </div>
              
              <div className="finance-service-card">
                <h3 className="finance-service-title">Cloud Architecture & DevOps</h3>
                <p className="finance-service-description">
                  Setting up secure cloud environments and DevOps pipelines to support scalable operations.
                </p>
              </div>
              
              <div className="finance-service-card">
                <h3 className="finance-service-title">Analytics & Forecasting</h3>
                <p className="finance-service-description">
                  Using analytics and forecasting models to support planning, monitoring, and decision-making.
                </p>
              </div>
              
              <div className="finance-service-card">
                <h3 className="finance-service-title">Strategic Value</h3>
                <p className="finance-service-description">
                  Enabling structured systems and reporting to improve visibility, efficiency, and operational scalability.
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
                  <h2 className="finance-tax-hero-title">Tailored Industry ERP Solutions</h2>
                  <p className="finance-tax-hero-description">
                    Corporate and individual tax filing, advisory, and compliance across geographies, ensuring accuracy and timeliness.
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
                <h3 className="finance-tax-service-title">Healthcare ERP</h3>
                <p className="finance-tax-service-description">
                  Comprehensive ERP solution for healthcare organizations including EMR, billing, pharmacy, laboratory workflows, appointments, and clinical processes.
                </p>
              </div>
              
              <div className="finance-tax-service-card">
                <h3 className="finance-tax-service-title">Retail ERP</h3>
                <p className="finance-tax-service-description">
                  Retail ERP system with POS, inventory management, promotions, multi-branch operations, and real-time analytics.
                </p>
              </div>
              
              <div className="finance-tax-service-card">
                <h3 className="finance-tax-service-title">Service ERP</h3>
                <p className="finance-tax-service-description">
                  ERP designed for service-based businesses including job management, scheduling, field service operations, and billing functionalities.
                </p>
              </div>
              
              <div className="finance-tax-service-card">
                <h3 className="finance-tax-service-title">Manufacturing ERP</h3>
                <p className="finance-tax-service-description">
                  Manufacturing ERP covering BOM, MRP, production planning, quality control, costing, and OEE dashboards.
                </p>
              </div>
              
              <div className="finance-tax-service-card">
                <h3 className="finance-tax-service-title">Integrated Ecosystem</h3>
                <p className="finance-tax-service-description">
                  All ERP modules integrate seamlessly with accounting systems, HRIS, payment gateways, and business intelligence platforms.
                </p>
              </div>
              
              <div className="finance-tax-service-card">
                <h3 className="finance-tax-service-title">Strategic Value</h3>
                <p className="finance-tax-service-description">
                  Deliver scalable, industry-specific ERP systems that improve efficiency, standardize operations, and create long-term business value.
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
                  <h2 className="finance-payroll-hero-title">Secure IT Infrastructure, Cybersecurity & Managed Operations</h2>
                  <p className="finance-payroll-hero-description">
                    Comprehensive payroll outsourcing with statutory reporting, salary processing, employee benefits, and HR admin management.
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
                <h3 className="finance-payroll-service-title">IT Infrastructure Deployment & Device Provisioning</h3>
                <p className="finance-payroll-service-description">
                  Establish secure and standardized IT environments through infrastructure setup, device provisioning, and system configuration for remote and distributed teams.
                </p>
              </div>
              
              <div className="finance-payroll-service-card">
                <h3 className="finance-payroll-service-title">Help Desk (L1/L2) & IT Operations</h3>
                <p className="finance-payroll-service-description">
                  Provide continuous end-user support and IT operations management to ensure smooth business continuity and fast issue resolution.
                </p>
              </div>
              
              <div className="finance-payroll-service-card">
                <h3 className="finance-payroll-service-title">Remote Monitoring & Endpoint Management</h3>
                <p className="finance-payroll-service-description">
                  Deliver real-time monitoring, control, and management of endpoints and workstations to ensure performance, stability, and security.
                </p>
              </div>
              
              <div className="finance-payroll-service-card">
                <h3 className="finance-payroll-service-title">Cybersecurity Frameworks, Zero Trust Access & Compliance Governance</h3>
                <p className="finance-payroll-service-description">
                  Implement enterprise-grade cybersecurity controls based on Zero Trust architecture to protect systems, users, and data from threats.
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
                  <h2 className="finance-management-hero-title">Software Engineering, Automation & Digital Transformation</h2>
                  <p className="finance-management-hero-description">
                    Budgeting, forecasting, variance analysis, and strategic financial insights to empower data-driven business decisions.
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
                <h3 className="finance-management-service-title">Full-stack web, mobile & enterprise software development</h3>
                <p className="finance-management-service-description">
                  Dedicated developer teams that deliver modern software solutions to enhance client efficiency and internal workflows.
                </p>
              </div>
              
              <div className="finance-management-service-card">
                <h3 className="finance-management-service-title">AI solutions (chatbots, NLP processing, predictive analytics)</h3>
                <p className="finance-management-service-description">
                  Leverage artificial intelligence and machine learning to power intelligent automation, conversational experiences, and data-driven decision making.
                </p>
              </div>
              
              <div className="finance-management-service-card">
                <h3 className="finance-management-service-title">Process automation (Power Automate / RPA / workflow engines)</h3>
                <p className="finance-management-service-description">
                  Streamline repetitive tasks and manual processes to help clients reduce operational overhead and scale faster.
                </p>
              </div>
              
              <div className="finance-management-service-card">
                <h3 className="finance-management-service-title">Modernization, integration & technology consulting</h3>
                <p className="finance-management-service-description">
                  Provide strategic advisory services to help clients assess their technology maturity, map digital transformation roadmaps, and implement new systems and integrations.
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
                "We moved from reactive bookkeeping to a structured finance function. The visibility and control we now have has changed how we operate."
              </p>
            </div>

            <div className="finance-testimonial-profile">
              <div className="finance-testimonial-info">
                <p className="finance-testimonial-role">Technology Expert</p>
                <p className="finance-testimonial-company">Small-to-Medium Enterprise (Australia)</p>
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
