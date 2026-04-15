import React, { useEffect, useRef } from 'react';
import './HomePage.css';

const HomePage = () => {
  const statsHeadlineRef = useRef(null);
  const statsCardsRef = useRef(null);

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

    return () => {
      if (statsHeadlineRef.current) {
        observer.unobserve(statsHeadlineRef.current);
      }
      if (statsCardsRef.current) {
        observer.unobserve(statsCardsRef.current);
      }
    };
  }, []);
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
    </div>
  );
};

export default HomePage;
