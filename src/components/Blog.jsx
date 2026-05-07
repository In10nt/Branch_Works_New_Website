import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import './Finance.css';
import './Blog.css';
import './mobile-responsive.css';
import Footer from './Footer';

const Blog = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isIndustryDropdownOpen, setIsIndustryDropdownOpen] = useState(false);
  const [isMobileIndustryOpen, setIsMobileIndustryOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [dynamicBlogs, setDynamicBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Calculate max index for carousel (8 cards total, 3 visible)
  const totalCards = 8;
  const visibleCards = 3;
  const maxIndex = totalCards - visibleCards;

  // Static blogs (your current blogs - keep as is)
  const staticBlogs = [
    {
      id: 'static-1',
      title: 'Async First: Cut Meetings, Boost Remote Wins',
      slug: '1',
      category: 'Technology Support',
      featuredImage: '/images/customer_story_image_1.jpg',
      publishedAt: '2026-04-18',
      isStatic: true
    },
    {
      id: 'static-2',
      title: 'Async First: Cut Meetings, Boost Remote Wins',
      slug: '1',
      category: 'Technology Support',
      featuredImage: '/images/customer_story_image_1.jpg',
      publishedAt: '2026-04-18',
      isStatic: true
    },
    {
      id: 'static-3',
      title: 'Async First: Cut Meetings, Boost Remote Wins',
      slug: '1',
      category: 'Finance',
      featuredImage: '/images/customer_story_image_1.jpg',
      publishedAt: '2026-04-18',
      isStatic: true
    },
    {
      id: 'static-4',
      title: 'Async First: Cut Meetings, Boost Remote Wins',
      slug: '1',
      category: 'Offshore Hiring',
      featuredImage: '/images/customer_story_image_1.jpg',
      publishedAt: '2026-04-18',
      isStatic: true
    },
    {
      id: 'static-5',
      title: 'Async First: Cut Meetings, Boost Remote Wins',
      slug: '1',
      category: 'Technology Support',
      featuredImage: '/images/customer_story_image_1.jpg',
      publishedAt: '2026-04-18',
      isStatic: true
    },
    {
      id: 'static-6',
      title: 'Async First: Cut Meetings, Boost Remote Wins',
      slug: '1',
      category: 'Finance',
      featuredImage: '/images/customer_story_image_1.jpg',
      publishedAt: '2026-04-18',
      isStatic: true
    }
  ];

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch dynamic blogs from database
  useEffect(() => {
    fetchDynamicBlogs();
  }, []);

  const fetchDynamicBlogs = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/blogs');
      const data = await response.json();
      setDynamicBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setDynamicBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  // Combine static and dynamic blogs
  const getAllBlogs = () => {
    let combined = [...staticBlogs, ...dynamicBlogs];
    
    // Filter by category if not "All"
    if (activeFilter !== 'All') {
      combined = combined.filter(blog => blog.category === activeFilter);
    }
    
    return combined;
  };

  const allBlogs = getAllBlogs();

  const formatDate = (dateString) => {
    if (!dateString) return 'Apr 18, 2026';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

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

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  const handlePrevCard = () => {
    setCurrentCardIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextCard = () => {
    setCurrentCardIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <div className="blog-layout">
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
            <span className="badge-text">Blog</span>
          </div>
          
          <div className="headline-section">
            <h1 className="main-headline">Offshore Growth<br />Success Guide</h1>
            <p className="headline-description">
              Our goal is to see business and business leaders who want to grow matched, with talent who wants to fuel growth. Our blog will outline tips and tricks to grow your business with offshoring.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="blog-filter-buttons">
            <button 
              className={`blog-filter-btn ${activeFilter === 'All' ? 'active' : ''}`}
              onClick={() => handleFilterClick('All')}
            >
              All
            </button>
            <button 
              className={`blog-filter-btn ${activeFilter === 'Finance' ? 'active' : ''}`}
              onClick={() => handleFilterClick('Finance')}
            >
              Finance
            </button>
            <button 
              className={`blog-filter-btn ${activeFilter === 'Technology Support' ? 'active' : ''}`}
              onClick={() => handleFilterClick('Technology Support')}
            >
              Technology Support
            </button>
            <button 
              className={`blog-filter-btn ${activeFilter === 'Offshore Hiring' ? 'active' : ''}`}
              onClick={() => handleFilterClick('Offshore Hiring')}
            >
              Offshore Hiring
            </button>
          </div>
        </div>
      </div>

      {/* Blog Posts Grid Section */}
      <div className="blog-posts-section">
        <div className="blog-posts-container">
          <div className="blog-posts-grid">
            {allBlogs.map((blog) => (
              <div key={blog.id} className="blog-post-card">
                <img 
                  src={
                    blog.isStatic 
                      ? `${process.env.PUBLIC_URL}${blog.featuredImage}` 
                      : blog.featuredImage 
                        ? `http://localhost:5000${blog.featuredImage}` 
                        : `${process.env.PUBLIC_URL}/images/customer_story_image_1.jpg`
                  } 
                  alt={blog.title} 
                  className="blog-post-image" 
                />
                <div className="blog-post-content">
                  <div className="blog-post-date">{formatDate(blog.publishedAt)}</div>
                  <h3 className="blog-post-title">{blog.title}</h3>
                  <Link to={`/blog/${blog.slug}`} className="blog-read-more">Read more</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial Section - Same as Finance */}
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

            <div className="finance-testimonial-profile">
              <div className="finance-testimonial-info">
                <p className="finance-testimonial-role">Finance Expert</p>
                <p className="finance-testimonial-company">Small-to-Medium Enterprise (Australia)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Stories Section - Same as Finance */}
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

      {/* CTA Expert Section - Same as Finance */}
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

export default Blog;
