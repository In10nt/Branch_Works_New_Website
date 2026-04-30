import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import './Finance.css';
import './mobile-responsive.css';

const Finance = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isIndustryDropdownOpen, setIsIndustryDropdownOpen] = useState(false);
  const [isMobileIndustryOpen, setIsMobileIndustryOpen] = useState(false);
  
  // Calculate max index for carousel (total cards - visible cards)
  const totalCards = 8; // Total number of story cards
  const visibleCards = 3; // Number of visible cards at once
  const maxIndex = totalCards - visibleCards;

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

  const handlePrevCard = () => {
    setCurrentCardIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextCard = () => {
    setCurrentCardIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <div className="finance-layout">
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

      {/* First Section - Same as HomePage Hero */}
      <div className="hero-layout">
        <div className="hero-content">
          <div className="badge-chip">
            <span className="badge-rating">4.8</span>
            <img src={`${process.env.PUBLIC_URL}/images/trustpilot-logo.svg`} alt="Trustpilot" className="badge-trustpilot-logo" />
          </div>
          
          <div className="headline-section">
            <h1 className="main-headline">Global Finance.
              <br />Simplified. Secured.</h1>
            <p className="headline-description">Empowering global businesses and individuals with trusted offshore finance and asset protection services.</p>
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

      {/* Second Section - How Businesses Are Scaling Finance */}
      <div className="finance-scaling-section">
        <div className="finance-scaling-container">
          <div className="finance-scaling-content">
            <div className="finance-scaling-header">
              <h2 className="finance-scaling-title">
                <span className="finance-scaling-title-black">How businesses are<br /></span>
                <span className="finance-scaling-title-gray">scaling finance more efficiently</span>
              </h2>
            </div>

            <div className="finance-scaling-cards">
              <div className="finance-scaling-card finance-scaling-card-primary">
                <p className="finance-scaling-card-description">Businesses are restructuring finance to improve efficiency</p>
                <div className="finance-scaling-card-value">70%</div>
              </div>

              <div className="finance-scaling-card finance-scaling-card-secondary">
                <p className="finance-scaling-card-description">Finance professionals in pipeline</p>
                <div className="finance-scaling-card-value" style={{ color: '#60A5FA' }}>44,000+</div>
              </div>

              <div className="finance-scaling-card finance-scaling-card-secondary">
                <p className="finance-scaling-card-description">Achieve significant cost efficiency</p>
                <div className="finance-scaling-card-value" style={{ color: '#60A5FA' }}>60%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Third Section - Finance Services */}
      <div className="finance-services-section">
        <div className="finance-services-container">
          <div className="finance-services-content">
            {/* Hero Card with Background Image */}
            <div 
              className="finance-hero-card"
              style={{
                backgroundImage: `linear-gradient(90deg, #0F172A -6.12%, rgba(15, 23, 42, 0) 70%), url('${process.env.PUBLIC_URL}/images/finance_image1.png')`,
                backgroundSize: 'cover',
                backgroundPosition: '75% 30%',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <div className="finance-hero-content">
                <div className="finance-hero-icon">
                  <img 
                    src={`${process.env.PUBLIC_URL}/images/finance_mini_icon1.jpg`} 
                    alt="Bookkeeping Icon" 
                    width="48" 
                    height="48"
                    style={{ borderRadius: '8px' }}
                  />
                </div>
                <div className="finance-hero-text-content">
                  <h2 className="finance-hero-title">Bookkeeping & Accounting</h2>
                  <p className="finance-hero-description">
                    Daily and periodic bookkeeping, reconciliations, financial statements, AR/AP management and closing support with global accounting tools.
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

            {/* Services Grid */}
            <div className="finance-services-grid">
              <div className="finance-service-card">
                <h3 className="finance-service-title">Processing Bills & Invoices</h3>
                <p className="finance-service-description">
                  Recording and categorising supplier bills and invoices with streamlined workflows to improve efficiency.
                </p>
              </div>
              
              <div className="finance-service-card">
                <h3 className="finance-service-title">Accounts Payable & Receivable</h3>
                <p className="finance-service-description">
                  Managing payments and collections to support cash flow, timely settlements, and financial control.
                </p>
              </div>
              
              <div className="finance-service-card">
                <h3 className="finance-service-title">Bank Reconciliation</h3>
                <p className="finance-service-description">
                  Reconciling bank transactions with records to ensure accuracy and reliable financial reporting.
                </p>
              </div>
              
              <div className="finance-service-card">
                <h3 className="finance-service-title">Inventory Tracking</h3>
                <p className="finance-service-description">
                  Monitoring inventory levels and reconciling stock records to support accurate reporting and control.
                </p>
              </div>
              
              <div className="finance-service-card">
                <h3 className="finance-service-title">Period-End Closures</h3>
                <p className="finance-service-description">
                  Managing reconciliations and adjustments to ensure accounts are accurate and ready for reporting.
                </p>
              </div>
              
              <div className="finance-service-card">
                <h3 className="finance-service-title">COA Setup & Maintenance</h3>
                <p className="finance-service-description">
                  Designing and maintaining a structured chart of accounts aligned with business operations.
                </p>
              </div>
            </div>

            {/* Finance Tools Logo */}
            <div className="finance-tools-logo">
              <img 
                src={`${process.env.PUBLIC_URL}/images/finance_logo_1.png`} 
                alt="Finance Tools - QuickBooks, Xero, Sage, MYOB" 
                className="finance-logo-image"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Fourth Section - Tax Services */}
      <div className="finance-tax-section">
        <div className="finance-tax-container">
          <div className="finance-tax-content">
            {/* Tax Hero Card with Background Image */}
            <div 
              className="finance-tax-hero-card"
              style={{
                backgroundImage: `linear-gradient(90deg, #0F172A -6.12%, rgba(15, 23, 42, 0) 70%), url('${process.env.PUBLIC_URL}/images/finance_image2.png')`,
                backgroundSize: 'cover',
                backgroundPosition: '75% 30%',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <div className="finance-tax-hero-content">
                <div className="finance-tax-hero-icon">
                  <img 
                    src={`${process.env.PUBLIC_URL}/images/finance_mini_icon2.jpg`} 
                    alt="Taxation Icon" 
                    width="48" 
                    height="48"
                    style={{ borderRadius: '8px' }}
                  />
                </div>
                <div className="finance-tax-hero-text-content">
                  <h2 className="finance-tax-hero-title">Taxation</h2>
                  <p className="finance-tax-hero-description">
                    Managing tax filing and compliance across jurisdictions, ensuring accuracy and timely submissions.
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

            {/* Tax Services Grid */}
            <div className="finance-tax-services-grid">
              <div className="finance-tax-service-card">
                <h3 className="finance-tax-service-title">BAS Lodgment (Australia)</h3>
                <p className="finance-tax-service-description">
                  Preparing and lodging BAS, including GST and PAYG, in line with Australian tax requirements.
                </p>
              </div>
              
              <div className="finance-tax-service-card">
                <h3 className="finance-tax-service-title">FBT Lodgment (Australia)</h3>
                <p className="finance-tax-service-description">
                  Calculating and lodging FBT returns for employee benefits, ensuring compliance with ATO regulations.
                </p>
              </div>
              
              <div className="finance-tax-service-card">
                <h3 className="finance-tax-service-title">VAT Lodgment (UK)</h3>
                <p className="finance-tax-service-description">
                  Preparing and filing VAT returns in line with HMRC requirements and accurate reporting standards.
                </p>
              </div>
              
              <div className="finance-tax-service-card">
                <h3 className="finance-tax-service-title">Tax Preparation</h3>
                <p className="finance-tax-service-description">
                  Preparing and lodging tax returns for individuals and businesses with full compliance and accuracy.
                </p>
              </div>
              
              <div className="finance-tax-service-card">
                <h3 className="finance-tax-service-title">Income Tax Returns</h3>
                <p className="finance-tax-service-description">
                  Filing income tax returns through secure systems to ensure accuracy, compliance, and confidentiality.
                </p>
              </div>
              
              <div className="finance-tax-service-card">
                <h3 className="finance-tax-service-title">Tax Audit Assistance</h3>
                <p className="finance-tax-service-description">
                  Supporting audits through documentation, reconciliations, and coordination with tax authorities.
                </p>
              </div>
            </div>

            {/* Tax Tools Logo */}
            <div className="finance-tax-tools-logo">
              <img 
                src={`${process.env.PUBLIC_URL}/images/finance_logo_2.png`}
                alt="Tax Tools - QuickBooks, Xero" 
                className="finance-tax-logo-image"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Fifth Section - Payroll & Admin Services */}
      <div className="finance-payroll-section">
        <div className="finance-payroll-container">
          <div className="finance-payroll-content">
            {/* Payroll Hero Card with Background Image */}
            <div 
              className="finance-payroll-hero-card"
              style={{
                backgroundImage: `linear-gradient(90deg, #0F172A -6.12%, rgba(15, 23, 42, 0) 70%), url('${process.env.PUBLIC_URL}/images/finance_image3.png')`,
                backgroundSize: 'cover',
                backgroundPosition: '75% 30%',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <div className="finance-payroll-hero-content">
                <div className="finance-payroll-hero-icon">
                  <img 
                    src={`${process.env.PUBLIC_URL}/images/finance_mini_icon3.jpg`} 
                    alt="Payroll Icon" 
                    width="48" 
                    height="48"
                    style={{ borderRadius: '8px' }}
                  />
                </div>
                <div className="finance-payroll-hero-text-content">
                  <h2 className="finance-payroll-hero-title">Payroll & Admin</h2>
                  <p className="finance-payroll-hero-description">
                    Managing payroll, statutory reporting, and employee administration aligned with compliance requirements.
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

            {/* Payroll Services Grid */}
            <div className="finance-payroll-services-grid">
              <div className="finance-payroll-service-card">
                <h3 className="finance-payroll-service-title">Payroll Processing</h3>
                <p className="finance-payroll-service-description">
                  Processing payroll with accurate calculations of wages, deductions, and benefits across pay cycles.
                </p>
              </div>
              
              <div className="finance-payroll-service-card">
                <h3 className="finance-payroll-service-title">STP Filing (Australia)</h3>
                <p className="finance-payroll-service-description">
                  Submitting payroll data to the ATO via STP systems, ensuring accurate reporting and compliance.
                </p>
              </div>
              
              <div className="finance-payroll-service-card">
                <h3 className="finance-payroll-service-title">End-of-Year Payroll Finalization</h3>
                <p className="finance-payroll-service-description">
                  Preparing year-end payroll reports to ensure accuracy and compliance with regulatory requirements.
                </p>
              </div>
              
              <div className="finance-payroll-service-card">
                <h3 className="finance-payroll-service-title">Debtor Follow-Up</h3>
                <p className="finance-payroll-service-description">
                  Tracking receivables and following up on overdue invoices to support timely collections and cash flow.
                </p>
              </div>
              
              <div className="finance-payroll-service-card">
                <h3 className="finance-payroll-service-title">Customer Onboarding</h3>
                <p className="finance-payroll-service-description">
                  Setting up clients in accounting and CRM systems to ensure accurate data capture and smooth onboarding.
                </p>
              </div>
              
              <div className="finance-payroll-service-card">
                <h3 className="finance-payroll-service-title">Automation Setup & Support</h3>
                <p className="finance-payroll-service-description">
                  Supporting accounting tools for expense tracking, receipt capture, and workflow automation.
                </p>
              </div>
            </div>

            {/* Payroll Tools Logo */}
            <div className="finance-payroll-tools-logo">
              <img 
                src={`${process.env.PUBLIC_URL}/images/finance_logo_3.png`}
                alt="Payroll Tools - Deputy, HubStaff, Harvest, Monday, QuickBooks" 
                className="finance-payroll-logo-image"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sixth Section - Management Accounting Services */}
      <div className="finance-management-section">
        <div className="finance-management-container">
          <div className="finance-management-content">
            {/* Management Accounting Hero Card with Background Image */}
            <div 
              className="finance-management-hero-card"
              style={{
                backgroundImage: `linear-gradient(90deg, #0F172A -6.12%, rgba(15, 23, 42, 0) 70%), url('${process.env.PUBLIC_URL}/images/finance_image4.png')`,
                backgroundSize: 'cover',
                backgroundPosition: '75% 30%',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <div className="finance-management-hero-content">
                <div className="finance-management-hero-icon">
                  <img 
                    src={`${process.env.PUBLIC_URL}/images/finance_mini_icon4.jpg`} 
                    alt="Management Accounting Icon" 
                    width="48" 
                    height="48"
                    style={{ borderRadius: '8px' }}
                  />
                </div>
                <div className="finance-management-hero-text-content">
                  <h2 className="finance-management-hero-title">Management Accounting</h2>
                  <p className="finance-management-hero-description">
                    Budgeting, forecasting, and financial insights to support data-driven decisions and business growth.
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

            {/* Management Accounting Services Grid */}
            <div className="finance-management-services-grid">
              <div className="finance-management-service-card">
                <h3 className="finance-management-service-title">Budgeting & Forecasting</h3>
                <p className="finance-management-service-description">
                  Preparing budgets and forecasts using historical data to guide planning and support financial decisions.
                </p>
              </div>
              
              <div className="finance-management-service-card">
                <h3 className="finance-management-service-title">Variance Analysis</h3>
                <p className="finance-management-service-description">
                  Comparing actuals against budgets to identify gaps and improve financial performance and control.
                </p>
              </div>
              
              <div className="finance-management-service-card">
                <h3 className="finance-management-service-title">Break-Even Analysis</h3>
                <p className="finance-management-service-description">
                  Calculating break-even points to support pricing decisions and improve cost management strategies.
                </p>
              </div>
              
              <div className="finance-management-service-card">
                <h3 className="finance-management-service-title">Cost Allocation Models</h3>
                <p className="finance-management-service-description">
                  Designing cost allocation models to track expenses across departments, projects, and cost centres.
                </p>
              </div>
              
              <div className="finance-management-service-card">
                <h3 className="finance-management-service-title">Management Reports (KPIs & Ratios)</h3>
                <p className="finance-management-service-description">
                  Generating reports with KPIs and ratios to provide insights for informed financial decisions.
                </p>
              </div>
              
              <div className="finance-management-service-card">
                <h3 className="finance-management-service-title">Custom Management Reports</h3>
                <p className="finance-management-service-description">
                  Creating tailored reports such as profitability and cash flow analysis to support business decisions.
                </p>
              </div>
            </div>

            {/* Management Accounting Tools Logo */}
            <div className="finance-management-tools-logo">
              <img 
                src={`${process.env.PUBLIC_URL}/images/finance_logo_4.png`}
                alt="Management Accounting Tools" 
                className="finance-management-logo-image"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Seventh Section - Testimonial */}
      <div className="finance-testimonial-section">
        <div className="finance-testimonial-container">
          <div className="finance-testimonial-content">
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
            
            <div className="finance-testimonial-source">
              <img src={`${process.env.PUBLIC_URL}/images/forbes.svg`} alt="Forbes" className="finance-testimonial-logo" />
            </div>
            
            <div className="finance-testimonial-profile">
              <div className="finance-testimonial-avatar">
                <img src={`${process.env.PUBLIC_URL}/images/fobes_girl.jpg`} alt="Julie Sweet" className="finance-testimonial-avatar-image" />
              </div>
              <div className="finance-testimonial-info">
                <h3 className="finance-testimonial-name">Julie Sweet</h3>
                <p className="finance-testimonial-role">Finance Expert - Company name</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Eighth Section - Customer Stories */}
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

      {/* Ninth Section - CTA Expert (Same as HomePage) */}
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

export default Finance;