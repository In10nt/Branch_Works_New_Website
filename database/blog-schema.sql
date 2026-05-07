-- Blog Management System Database Schema
-- This file contains the database structure for the blog management system

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(250) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    featured_image VARCHAR(255),
    category VARCHAR(100),
    status VARCHAR(20) NOT NULL DEFAULT 'DRAFT',
    author_name VARCHAR(100),
    view_count BIGINT DEFAULT 0,
    published_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create blog_post_tags table for storing tags
CREATE TABLE IF NOT EXISTS blog_post_tags (
    blog_post_id BIGINT NOT NULL,
    tag VARCHAR(100) NOT NULL,
    FOREIGN KEY (blog_post_id) REFERENCES blog_posts(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);

-- Insert sample blog posts
INSERT INTO blog_posts (title, slug, excerpt, content, featured_image, category, status, author_name, published_at) VALUES
('Async First: Cut Meetings, Boost Remote Wins', 'async-first-cut-meetings-boost-remote-wins', 
 'Learn how async-first approach can transform your remote team productivity and reduce meeting fatigue.',
 '<p>Running a successful remote team requires more than just video calls. The async-first approach is revolutionizing how distributed teams collaborate.</p><h3>What is Async-First?</h3><p>Async-first means prioritizing asynchronous communication over synchronous meetings. Instead of scheduling calls for every discussion, teams document decisions, share updates in writing, and give everyone time to respond thoughtfully.</p><h3>Benefits of Async Communication</h3><ul><li>Reduced meeting fatigue</li><li>Better work-life balance</li><li>Increased productivity</li><li>More inclusive for global teams</li></ul><p>By embracing async-first principles, your team can achieve better outcomes while respecting everyone''s time and schedule.</p>',
 '/images/customer_story_image_1.jpg', 'Technology Support', 'PUBLISHED', 'Admin', CURRENT_TIMESTAMP),

('5 Finance Automation Tips for Growing Businesses', 'finance-automation-tips-growing-businesses',
 'Discover how finance automation can streamline your business operations and improve accuracy.',
 '<p>As your business grows, manual finance processes become bottlenecks. Here are 5 essential automation tips to scale your finance function effectively.</p><h3>1. Automate Invoice Processing</h3><p>Use OCR technology to extract data from invoices automatically, reducing data entry time by 80%.</p><h3>2. Implement Automated Reconciliation</h3><p>Connect your bank accounts and accounting software for real-time reconciliation.</p><h3>3. Set Up Approval Workflows</h3><p>Create automated approval chains for expenses and purchases to maintain control while speeding up processes.</p><h3>4. Use Predictive Analytics</h3><p>Leverage AI to forecast cash flow and identify potential issues before they become problems.</p><h3>5. Automate Reporting</h3><p>Generate financial reports automatically on schedule, giving stakeholders timely insights.</p>',
 '/images/customer_story_image_1.jpg', 'Finance', 'PUBLISHED', 'Admin', CURRENT_TIMESTAMP),

('Building High-Performance Offshore Teams', 'building-high-performance-offshore-teams',
 'A comprehensive guide to recruiting, onboarding, and managing successful offshore development teams.',
 '<p>Offshore teams can be a game-changer for businesses looking to scale quickly and cost-effectively. Here''s how to build teams that deliver exceptional results.</p><h3>Recruitment Best Practices</h3><p>Focus on cultural fit alongside technical skills. Look for candidates who demonstrate strong communication abilities and self-motivation.</p><h3>Effective Onboarding</h3><p>Create a structured 30-60-90 day onboarding plan that includes:</p><ul><li>Company culture immersion</li><li>Technical training and setup</li><li>Regular check-ins with mentors</li><li>Clear goal setting</li></ul><h3>Communication Strategies</h3><p>Establish clear communication protocols, use collaboration tools effectively, and schedule regular sync meetings that respect time zones.</p><h3>Performance Management</h3><p>Set measurable KPIs, provide regular feedback, and create opportunities for professional development.</p>',
 '/images/customer_story_image_1.jpg', 'Offshore Hiring', 'PUBLISHED', 'Admin', CURRENT_TIMESTAMP);

-- Insert sample tags
INSERT INTO blog_post_tags (blog_post_id, tag) VALUES
(1, 'Remote Work'),
(1, 'Productivity'),
(1, 'Async Communication'),
(2, 'Finance'),
(2, 'Automation'),
(2, 'Business Growth'),
(3, 'Offshore'),
(3, 'Team Building'),
(3, 'Management');
