-- Import Current Static Blogs from Website
-- Run this to add your existing blog pages to the management system

-- Clear existing sample data (optional)
-- DELETE FROM blog_post_tags;
-- DELETE FROM blog_posts;

-- Insert your current static blogs
INSERT INTO blog_posts (title, slug, excerpt, content, featured_image, category, status, author_name, published_at, created_at) VALUES

-- Blog 1: Async First
('Async First: Cut Meetings, Boost Remote Wins', 
 'async-first-cut-meetings-boost-remote-wins',
 'Learn how async-first approach can transform your remote team productivity and reduce meeting fatigue.',
 '<h2>Offshore vs. In-House Assistants: Smarter Support for Buyer''s Agents in Australia</h2>
<p>Running a successful buyer''s agent business in Australia means managing far more than just inspections and negotiations. From chasing paperwork to updating CRMs and coordinating with conveyancers, the growing admin load can quickly cap your capacity. If you''re serious about scaling, delegating this work isn''t optional, it''s strategic.</p>
<p>This is why many buyer''s agents are questioning whether to bring someone in-house or start going offshore. Both options can help, but they serve different needs. Let''s break down when to choose in-house support and when outsourcing to a virtual assistant or offshore team makes more sense.</p>
<h3>What In-House Assistants Do Well</h3>
<p>In-house assistants are best suited for roles that require a physical presence or hands-on involvement in daily operations. If your buyer''s agency relies on face-to-face contact or has a team working from a central office, having someone on-site can be incredibly valuable.</p>
<p>You might consider in-house support if:</p>
<ul>
<li>You need help setting up or attending property inspections</li>
<li>Your marketing or client delivery involves printed materials and local logistics</li>
<li>You want someone who can jump into ad hoc, in-person tasks</li>
</ul>
<p>However, this model comes with overhead, such as salary, super, equipment, and workspace all adding up. And most in-house assistants are only available during standard business hours, which limits flexibility during evenings or weekends when buyers are often most active.</p>',
 '/images/customer_story_image_1.jpg',
 'Technology Support',
 'PUBLISHED',
 'Admin',
 '2026-04-18 10:00:00',
 CURRENT_TIMESTAMP),

-- Blog 2: Finance Automation
('5 Finance Automation Tips for Growing Businesses',
 'finance-automation-tips-growing-businesses',
 'Discover how finance automation can streamline your business operations and improve accuracy.',
 '<h2>5 Finance Automation Tips for Growing Businesses</h2>
<p>As your business grows, manual finance processes become bottlenecks. Here are 5 essential automation tips to scale your finance function effectively.</p>
<h3>1. Automate Invoice Processing</h3>
<p>Use OCR technology to extract data from invoices automatically, reducing data entry time by 80%.</p>
<h3>2. Implement Automated Reconciliation</h3>
<p>Connect your bank accounts and accounting software for real-time reconciliation.</p>
<h3>3. Set Up Approval Workflows</h3>
<p>Create automated approval chains for expenses and purchases to maintain control while speeding up processes.</p>
<h3>4. Use Predictive Analytics</h3>
<p>Leverage AI to forecast cash flow and identify potential issues before they become problems.</p>
<h3>5. Automate Reporting</h3>
<p>Generate financial reports automatically on schedule, giving stakeholders timely insights.</p>',
 '/images/customer_story_image_1.jpg',
 'Finance',
 'PUBLISHED',
 'Admin',
 '2026-04-17 10:00:00',
 CURRENT_TIMESTAMP),

-- Blog 3: Offshore Teams
('Building High-Performance Offshore Teams',
 'building-high-performance-offshore-teams',
 'A comprehensive guide to recruiting, onboarding, and managing successful offshore development teams.',
 '<h2>Building High-Performance Offshore Teams</h2>
<p>Offshore teams can be a game-changer for businesses looking to scale quickly and cost-effectively. Here''s how to build teams that deliver exceptional results.</p>
<h3>Recruitment Best Practices</h3>
<p>Focus on cultural fit alongside technical skills. Look for candidates who demonstrate strong communication abilities and self-motivation.</p>
<h3>Effective Onboarding</h3>
<p>Create a structured 30-60-90 day onboarding plan that includes:</p>
<ul>
<li>Company culture immersion</li>
<li>Technical training and setup</li>
<li>Regular check-ins with mentors</li>
<li>Clear goal setting</li>
</ul>
<h3>Communication Strategies</h3>
<p>Establish clear communication protocols, use collaboration tools effectively, and schedule regular sync meetings that respect time zones.</p>
<h3>Performance Management</h3>
<p>Set measurable KPIs, provide regular feedback, and create opportunities for professional development.</p>',
 '/images/customer_story_image_1.jpg',
 'Offshore Hiring',
 'PUBLISHED',
 'Admin',
 '2026-04-16 10:00:00',
 CURRENT_TIMESTAMP),

-- Blog 4: Remote Team Success
('Remote Team Success: Building Culture Across Borders',
 'remote-team-success-building-culture-across-borders',
 'Learn strategies for building strong team culture in distributed remote teams across different time zones.',
 '<h2>Remote Team Success: Building Culture Across Borders</h2>
<p>Building a strong team culture in a remote environment requires intentional effort and the right strategies.</p>
<h3>Virtual Team Building</h3>
<p>Regular virtual events, coffee chats, and team celebrations help maintain connection and camaraderie.</p>
<h3>Clear Communication</h3>
<p>Establish communication norms, use the right tools, and ensure everyone feels heard and valued.</p>
<h3>Recognition and Appreciation</h3>
<p>Celebrate wins, acknowledge contributions, and create a culture of appreciation across time zones.</p>',
 '/images/customer_story_image_1.jpg',
 'Technology Support',
 'PUBLISHED',
 'Admin',
 '2026-04-20 10:00:00',
 CURRENT_TIMESTAMP),

-- Blog 5: Digital Transformation
('Digital Transformation: Scaling Teams Globally',
 'digital-transformation-scaling-teams-globally',
 'How digital transformation enables businesses to scale their teams globally and compete effectively.',
 '<h2>Digital Transformation: Scaling Teams Globally</h2>
<p>Digital transformation is not just about technology—it''s about enabling your business to scale globally.</p>
<h3>Cloud Infrastructure</h3>
<p>Move to cloud-based systems that enable seamless collaboration across locations.</p>
<h3>Automation Tools</h3>
<p>Implement automation to reduce manual work and increase efficiency.</p>
<h3>Data-Driven Decisions</h3>
<p>Use analytics and insights to make informed decisions about team scaling and resource allocation.</p>',
 '/images/customer_story_image_1.jpg',
 'Technology Support',
 'PUBLISHED',
 'Admin',
 '2026-04-20 10:00:00',
 CURRENT_TIMESTAMP),

-- Blog 6: Cost Optimization
('Cost Optimization: 40% Savings with Offshore Teams',
 'cost-optimization-40-percent-savings-offshore-teams',
 'Real-world case study showing how businesses achieve significant cost savings through strategic offshore hiring.',
 '<h2>Cost Optimization: 40% Savings with Offshore Teams</h2>
<p>Discover how companies are achieving 40% cost savings while maintaining or improving quality through offshore teams.</p>
<h3>The Business Case</h3>
<p>Lower operational costs, access to global talent, and increased flexibility make offshore teams attractive.</p>
<h3>Quality Assurance</h3>
<p>Implement robust quality processes to ensure offshore teams deliver excellent results.</p>
<h3>Long-term Benefits</h3>
<p>Beyond cost savings, offshore teams provide scalability, 24/7 operations, and diverse perspectives.</p>',
 '/images/customer_story_image_1.jpg',
 'Offshore Hiring',
 'PUBLISHED',
 'Admin',
 '2026-04-22 10:00:00',
 CURRENT_TIMESTAMP);

-- Add tags for the blogs
INSERT INTO blog_post_tags (blog_post_id, tag) VALUES
(1, 'Remote Work'),
(1, 'Productivity'),
(1, 'Async Communication'),
(2, 'Finance'),
(2, 'Automation'),
(2, 'Business Growth'),
(3, 'Offshore'),
(3, 'Team Building'),
(3, 'Management'),
(4, 'Remote Work'),
(4, 'Team Culture'),
(4, 'Communication'),
(5, 'Digital Transformation'),
(5, 'Scaling'),
(5, 'Technology'),
(6, 'Cost Savings'),
(6, 'Offshore'),
(6, 'ROI');
