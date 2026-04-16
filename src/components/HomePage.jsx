import React, { useEffect, useRef } from 'react';
import './HomePage.css';

const HomePage = () => {
  const statsHeadlineRef = useRef(null);
  const statsCardsRef = useRef(null);
  const facesHeaderRef = useRef(null);

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

    if (statsHeadlineRef.current) {
      observer.observe(statsHeadlineRef.current);
    }
    if (statsCardsRef.current) {
      observer.observe(statsCardsRef.current);
    }
    if (facesHeaderRef.current) {
      observer.observe(facesHeaderRef.current);
    }

    return () => {
      if (statsHeadlineRef.current) {
        observer.unobserve(statsHeadlineRef.current);
      }
      if (statsCardsRef.current) {
        observer.unobserve(statsCardsRef.current);
      }
      if (facesHeaderRef.current) {
        observer.unobserve(facesHeaderRef.current);
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
                  <img src={`${process.env.PUBLIC_URL}/images/google_icon.svg`} alt="Google" className="company-logo google-logo" />
                </div>
                <div className="logo-item">
                  <img src={`${process.env.PUBLIC_URL}/images/heineken.svg`} alt="Heineken" className="company-logo" />
                </div>
                <div className="logo-item">
                  <img src={`${process.env.PUBLIC_URL}/images/forbes.svg`} alt="Forbes" className="company-logo" />
                </div>
                <div className="logo-item">
                  <img src={`${process.env.PUBLIC_URL}/images/intrax.png`} alt="Intrax" className="company-logo" />
                </div>
                <div className="logo-item">
                  <img src={`${process.env.PUBLIC_URL}/images/linkedin-logo.svg`} alt="LinkedIn" className="company-logo" />
                </div>
                <div className="logo-item">
                  <img src={`${process.env.PUBLIC_URL}/images/google_icon.svg`} alt="Google" className="company-logo google-logo" />
                </div>
                <div className="logo-item">
                  <img src={`${process.env.PUBLIC_URL}/images/heineken.svg`} alt="Heineken" className="company-logo" />
                </div>
                <div className="logo-item">
                  <img src={`${process.env.PUBLIC_URL}/images/forbes.svg`} alt="Forbes" className="company-logo" />
                </div>
                <div className="logo-item">
                  <img src={`${process.env.PUBLIC_URL}/images/intrax.png`} alt="Intrax" className="company-logo" />
                </div>
                <div className="logo-item">
                  <img src={`${process.env.PUBLIC_URL}/images/linkedin-logo.svg`} alt="LinkedIn" className="company-logo" />
                </div>
                <div className="logo-item">
                  <img src={`${process.env.PUBLIC_URL}/images/google_icon.svg`} alt="Google" className="company-logo google-logo" />
                </div>
                <div className="logo-item">
                  <img src={`${process.env.PUBLIC_URL}/images/heineken.svg`} alt="Heineken" className="company-logo" />
                </div>
                <div className="logo-item">
                  <img src={`${process.env.PUBLIC_URL}/images/forbes.svg`} alt="Forbes" className="company-logo" />
                </div>
                <div className="logo-item">
                  <img src={`${process.env.PUBLIC_URL}/images/intrax.png`} alt="Intrax" className="company-logo" />
                </div>
                <div className="logo-item">
                  <img src={`${process.env.PUBLIC_URL}/images/linkedin-logo.svg`} alt="LinkedIn" className="company-logo" />
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
              <p className="stat-description">We connects forward-thinking with rigorously</p>
              <div className="stat-value" style={{ color: '#0D9488' }}>70%</div>
            </div>

            <div className="stat-card">
              <div className="stat-logo">
                <img src={`${process.env.PUBLIC_URL}/images/linkedin-logo.svg`} alt="LinkedIn" className="stat-company-logo" />
              </div>
              <p className="stat-description">We connects forward-thinking with rigorously</p>
              <div className="stat-value" style={{ color: '#EB4E00' }}>4x</div>
            </div>

            <div className="stat-card">
              <div className="stat-logo">
                <img src={`${process.env.PUBLIC_URL}/images/google_icon.svg`} alt="Google" className="stat-company-logo" />
              </div>
              <p className="stat-description">We connects forward-thinking with rigorously</p>
              <div className="stat-value" style={{ color: '#CA8A04' }}>60%</div>
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
                A trusted offshore partner supporting businesses <br />
                across Australia, the United Kingdom, the United States, <br />
                Europe, and the Asia-Pacific region
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
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <circle cx="16" cy="16" r="16" fill="#172554"/>
                        <path d="M11.3333 22C10.9667 22 10.6528 21.8694 10.3917 21.6083C10.1306 21.3472 10 21.0333 10 20.6667V11.3333C10 10.9667 10.1306 10.6528 10.3917 10.3917C10.6528 10.1306 10.9667 10 11.3333 10H20.6667C21.0333 10 21.3472 10.1306 21.6083 10.3917C21.8694 10.6528 22 10.9667 22 11.3333V20.6667C22 21.0333 21.8694 21.3472 21.6083 21.6083C21.3472 21.8694 21.0333 22 20.6667 22H11.3333ZM12.6667 19.3333H17.3333V18H12.6667V19.3333ZM12.6667 16.6667H19.3333V15.3333H12.6667V16.6667ZM12.6667 14H19.3333V12.6667H12.6667V14Z" fill="white"/>
                      </svg>
                    </div>
                    <h3 className="new-service-title">Accounting</h3>
                  </div>
                  
                  <div className="new-service-item">
                    <div className="new-service-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <circle cx="16" cy="16" r="16" fill="#172554"/>
                        <path d="M11.3333 22C10.9667 22 10.6528 21.8694 10.3917 21.6083C10.1306 21.3472 10 21.0333 10 20.6667V11.3333C10 10.9667 10.1306 10.6528 10.3917 10.3917C10.6528 10.1306 10.9667 10 11.3333 10H20.6667C21.0333 10 21.3472 10.1306 21.6083 10.3917C21.8694 10.6528 22 10.9667 22 11.3333V20.6667C22 21.0333 21.8694 21.3472 21.6083 21.6083C21.3472 21.8694 21.0333 22 20.6667 22H11.3333ZM12.6667 19.3333H17.3333V18H12.6667V19.3333ZM12.6667 16.6667H19.3333V15.3333H12.6667V16.6667ZM12.6667 14H19.3333V12.6667H12.6667V14Z" fill="white"/>
                      </svg>
                    </div>
                    <h3 className="new-service-title">Finance Reporting</h3>
                  </div>
                  
                  <div className="new-service-item">
                    <div className="new-service-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <circle cx="16" cy="16" r="16" fill="#172554"/>
                        <path d="M11.3333 22C10.9667 22 10.6528 21.8694 10.3917 21.6083C10.1306 21.3472 10 21.0333 10 20.6667V11.3333C10 10.9667 10.1306 10.6528 10.3917 10.3917C10.6528 10.1306 10.9667 10 11.3333 10H20.6667C21.0333 10 21.3472 10.1306 21.6083 10.3917C21.8694 10.6528 22 10.9667 22 11.3333V20.6667C22 21.0333 21.8694 21.3472 21.6083 21.6083C21.3472 21.8694 21.0333 22 20.6667 22H11.3333ZM12.6667 19.3333H17.3333V18H12.6667V19.3333ZM12.6667 16.6667H19.3333V15.3333H12.6667V16.6667ZM12.6667 14H19.3333V12.6667H12.6667V14Z" fill="white"/>
                      </svg>
                    </div>
                    <h3 className="new-service-title">Payroll</h3>
                  </div>
                </div>

                <button className="new-cta-button">Talk to an expert</button>
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
              {/* Row 1 - Scrolls Left from corner */}
              <div className="faces-row faces-row-1">
                {generateFaceItems(1, 100)}
              </div>
              
              {/* Row 2 - Scrolls Right from corner */}
              <div className="faces-row faces-row-2">
                {generateFaceItems(5, 100)}
              </div>
              
              {/* Row 3 - Scrolls Left from corner */}
              <div className="faces-row faces-row-3">
                {generateFaceItems(8, 100)}
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
          <div className="testimonial-content">
            <div className="testimonial-stars">
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="star">★</span>
            </div>
            
            <div className="testimonial-quote">
              <p className="testimonial-text">
                "Public earns high marks for ease-of-use and its<br />
                investment selection - options traders will likely get excited<br />
                about their PFOF rebate program"
              </p>
            </div>
            
            <div className="testimonial-source">
              <p className="testimonial-company">Forbes</p>
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
    </div>
  );
};

export default HomePage;