import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import API_CONFIG, { getApiUrl } from '../config/api';
import './HomePage.css';
import './Finance.css';
import './BlogDetail.css';
import './mobile-responsive.css';
import Footer from './Footer';

const BlogDetail = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isIndustryDropdownOpen, setIsIndustryDropdownOpen] = useState(false);
  const [isMobileIndustryOpen, setIsMobileIndustryOpen] = useState(false);
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch blog data
  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        // Check if it's the static blog
        if (slug === '1') {
          // Static blog data
          setBlog({
            id: 'static-1',
            title: 'Offshore vs. In-House Assistants: Smarter Support for Buyer\'s Agents in Australia',
            slug: '1',
            category: 'Finance',
            excerpt: 'Running a successful buyer\'s agent business in Australia means managing far more than just inspections and negotiations.',
            content: `<p class="blog-detail-intro">Running a successful buyer's agent business in Australia means managing far more than just inspections and negotiations. From chasing paperwork to updating CRMs and coordinating with conveyancers, the growing admin load can quickly cap your capacity. If you're serious about scaling, delegating this work isn't optional, it's strategic.</p>

<p class="blog-detail-paragraph">This is why many buyer's agents are questioning whether to bring someone in-house or start going offshore. Both options can help, but they serve different needs. Let's break down when to choose in-house support and when outsourcing to a virtual assistant or offshore team makes more sense.</p>

<h3 class="blog-detail-heading">What In-House Assistants Do Well</h3>

<p class="blog-detail-paragraph">In-house assistants are best suited for roles that require a physical presence or hands-on involvement in daily operations. If your buyer's agency relies on face-to-face contact or has a team working from a central office, having someone on-site can be incredibly valuable.</p>

<p class="blog-detail-paragraph">You might consider in-house support if:</p>

<ul class="blog-detail-list">
<li>You need help setting up or attending property inspections</li>
<li>Your marketing or client delivery involves printed materials and local logistics</li>
<li>You want someone who can jump into ad hoc, in-person tasks</li>
</ul>

<p class="blog-detail-paragraph">However, this model comes with overhead, such as salary, super, equipment, and workspace all adding up. And most in-house assistants are only available during standard business hours, which limits flexibility during evenings or weekends when buyers are often most active.</p>`,
            featuredImage: '/images/customer_story_image_1.jpg',
            publishedAt: '2025-06-24',
            authorName: 'Branchworks Team',
            isStatic: true
          });
          setLoading(false);
        } else {
          // Fetch from API
          const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.BLOG_BY_SLUG(slug)));
          if (response.ok) {
            const data = await response.json();
            setBlog(data);
          } else {
            console.error('Blog not found');
            setBlog(null);
          }
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  // Fetch related blogs
  useEffect(() => {
    const fetchRelatedBlogs = async () => {
      try {
        const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.BLOGS));
        const data = await response.json();
        
        // Filter out current blog and limit to 3
        const filtered = data.filter(b => b.slug !== slug).slice(0, 3);
        setRelatedBlogs(filtered);
      } catch (error) {
        console.error('Error fetching related blogs:', error);
      }
    };

    fetchRelatedBlogs();
  }, [slug]);

  const formatDate = (dateString) => {
    if (!dateString) return 'June 24, 2025';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
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

  return (
    <div className="blog-detail-layout">
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
      {loading ? (
        <div className="hero-layout">
          <div className="hero-content">
            <p>Loading...</p>
          </div>
        </div>
      ) : blog ? (
        <>
          <div className="hero-layout">
            <div className="hero-content">
              <div className="badge-chip">
                <span className="badge-text">{blog.category || 'Blog'}</span>
              </div>
              
              <div className="headline-section">
                <h1 className="main-headline">
                  {blog.title.split(':').map((part, index, array) => (
                    <React.Fragment key={index}>
                      {part.trim()}
                      {index < array.length - 1 && <>:<br /></>}
                    </React.Fragment>
                  ))}
                </h1>
                <p className="blog-detail-date">{formatDate(blog.publishedAt)}</p>
              </div>
            </div>
          </div>

          {/* Article Content Section */}
          <div className="blog-detail-content-section">
            <div className="blog-detail-content-container">
              <article className="blog-detail-article">
                <h2 className="blog-detail-article-title">
                  {blog.title.split(':').map((part, index, array) => (
                    <React.Fragment key={index}>
                      {part.trim()}
                      {index < array.length - 1 && <>:<br /></>}
                    </React.Fragment>
                  ))}
                </h2>
                
                {blog.excerpt && (
                  <p className="blog-detail-intro">{blog.excerpt}</p>
                )}
                
                {/* Format content with proper CSS classes */}
                <div className="blog-detail-content">
                  {blog.isStatic ? (
                    // Static blog uses HTML content directly
                    <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                  ) : (
                    // Dynamic blogs: format plain text content
                    blog.content && blog.content.trim() ? (
                      blog.content.split('\n\n').map((paragraph, index) => {
                        const trimmed = paragraph.trim();
                        
                        // Skip empty paragraphs
                        if (!trimmed) return null;
                        
                        // Check if it's a heading (starts with #)
                        if (trimmed.startsWith('###')) {
                          const headingText = trimmed.replace(/^###\s*/, '');
                          return <h3 key={index} className="blog-detail-heading">{headingText}</h3>;
                        } else if (trimmed.startsWith('##')) {
                          const headingText = trimmed.replace(/^##\s*/, '');
                          return <h2 key={index} className="blog-detail-heading">{headingText}</h2>;
                        } else if (trimmed.startsWith('#')) {
                          const headingText = trimmed.replace(/^#\s*/, '');
                          return <h3 key={index} className="blog-detail-heading">{headingText}</h3>;
                        }
                        // Check if it's a list (contains multiple lines starting with - or *)
                        else if (trimmed.includes('\n-') || trimmed.includes('\n*') || trimmed.startsWith('-') || trimmed.startsWith('*')) {
                          const lines = trimmed.split('\n');
                          const listItems = lines.filter(line => {
                            const l = line.trim();
                            return l.startsWith('-') || l.startsWith('*');
                          });
                          
                          if (listItems.length > 0) {
                            return (
                              <ul key={index} className="blog-detail-list">
                                {listItems.map((item, i) => (
                                  <li key={i}>{item.replace(/^[-*]\s*/, '').trim()}</li>
                                ))}
                              </ul>
                            );
                          }
                        }
                        // Regular paragraph
                        return <p key={index} className="blog-detail-paragraph">{trimmed}</p>;
                      })
                    ) : (
                      <p className="blog-detail-paragraph">No content available.</p>
                    )
                  )}
                </div>
              </article>
            </div>
          </div>
        </>
      ) : (
        <div className="hero-layout">
          <div className="hero-content">
            <h1 className="main-headline">Blog Not Found</h1>
            <Link to="/blog" className="cta-button">Back to Blogs</Link>
          </div>
        </div>
      )}

      {/* Similar Reading Section */}
      <div className="customer-stories-section">
        <div className="customer-stories-container">
          <div className="customer-stories-content">
            <div className="customer-stories-header">
              <div className="customer-stories-text">
                <h2 className="customer-stories-title">Similar reading</h2>
                <p className="customer-stories-description">
                  A trusted offshore partner supporting businesses<br />
                  across Australia, the United Kingdom, the United
                </p>
              </div>
            </div>
            
            <div className="customer-stories-cards">
              <div className="customer-stories-grid">
                {relatedBlogs.length > 0 ? (
                  relatedBlogs.map((relatedBlog) => (
                    <div key={relatedBlog.id} className="customer-story-card">
                      <img 
                        src={`${API_CONFIG.BASE_URL}${relatedBlog.featuredImage}`} 
                        alt={relatedBlog.title} 
                        className="story-card-image" 
                      />
                      <div className="story-card-content">
                        <div className="story-date">{formatDate(relatedBlog.publishedAt)}</div>
                        <h3 className="story-title">{relatedBlog.title.substring(0, 60)}{relatedBlog.title.length > 60 ? '...' : ''}</h3>
                        <Link to={`/blog/${relatedBlog.slug}`} className="story-read-more-link">Read more</Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="customer-story-card">
                      <img src={`${process.env.PUBLIC_URL}/images/customer_story_image_1.jpg`} alt="Customer Story" className="story-card-image" />
                      <div className="story-card-content">
                        <div className="story-date">June 24, 2025</div>
                        <h3 className="story-title">Offshore vs. In-House Assistants</h3>
                        <Link to="/blog/1" className="story-read-more-link">Read more</Link>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="customer-stories-navigation">
              <button className="nav-arrow nav-prev">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className="nav-arrow nav-next">
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

export default BlogDetail;
