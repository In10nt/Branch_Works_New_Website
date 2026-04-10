import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="page-container">
      <header className="header">
        <div className="logo">
          <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="Branchworks Logo" />
        </div>
        <nav className="navbar">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      <main className="main-content">
        <section id="home" className="hero-section">
          <h1>Welcome to Branchworks</h1>
          <p>Your trusted partner for global solutions</p>
        </section>

        <section id="about" className="about-section">
          <h2>About Us</h2>
          <p>Learn more about our company and mission</p>
        </section>

        <section id="services" className="services-section">
          <h2>Our Services</h2>
          <div className="services-grid">
            <div className="service-card">
              <h3>Service 1</h3>
              <p>Description here</p>
            </div>
            <div className="service-card">
              <h3>Service 2</h3>
              <p>Description here</p>
            </div>
            <div className="service-card">
              <h3>Service 3</h3>
              <p>Description here</p>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <h2>Get In Touch</h2>
          <p>Contact us for more information</p>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2026 Branchworks. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
