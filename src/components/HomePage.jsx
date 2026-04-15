import React from 'react';
import './HomePage.css';

const HomePage = () => {
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
    </div>
  );
};

export default HomePage;
