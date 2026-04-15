import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="page-container">
      <header className="header-section">
        <div className="header-content">
          <div className="logo">
            <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="Branchworks Logo" />
            <span className="logo-text">BRANCHWORKS<br />GLOBAL</span>
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
        <div className="badge-chip">
          <span className="badge-icon">⭐</span>
          <span className="badge-text">Trustpilot</span>
        </div>
        
        {/* Hero content will go here */}
      </div>
    </div>
  );
};

export default HomePage;
