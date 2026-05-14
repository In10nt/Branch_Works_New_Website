import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalBlogs: 0,
    publishedBlogs: 0,
    draftBlogs: 0,
    totalCareers: 0,
    activeCareers: 0
  });
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [recentCareers, setRecentCareers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [blogsRes, careersRes] = await Promise.all([
        axios.get('/api/admin/blogs'),
        axios.get('/api/admin/careers')
      ]);

      const blogs = blogsRes.data;
      const careers = careersRes.data;

      setStats({
        totalBlogs: blogs.length,
        publishedBlogs: blogs.filter(b => b.published).length,
        draftBlogs: blogs.filter(b => !b.published).length,
        totalCareers: careers.length,
        activeCareers: careers.filter(c => c.active).length
      });

      // Get 5 most recent blogs
      setRecentBlogs(blogs.slice(0, 5));
      
      // Get 5 most recent careers
      setRecentCareers(careers.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p className="dashboard-subtitle">Welcome to BranchWorks Admin Panel</p>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card blog-card">
          <div className="stat-icon">📝</div>
          <div className="stat-content">
            <h3>Total Blog Posts</h3>
            <p className="stat-number">{stats.totalBlogs}</p>
            <div className="stat-details">
              <span className="stat-badge published">✓ {stats.publishedBlogs} Published</span>
              <span className="stat-badge draft">✎ {stats.draftBlogs} Drafts</span>
            </div>
          </div>
        </div>

        <div className="stat-card career-card">
          <div className="stat-icon">💼</div>
          <div className="stat-content">
            <h3>Career Openings</h3>
            <p className="stat-number">{stats.totalCareers}</p>
            <div className="stat-details">
              <span className="stat-badge active">✓ {stats.activeCareers} Active</span>
              <span className="stat-badge inactive">⏸ {stats.totalCareers - stats.activeCareers} Inactive</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Blogs Table */}
      <div className="dashboard-section">
        <div className="section-header">
          <h2>Recent Blog Posts</h2>
          <Link to="/blogs" className="view-all-link">View All →</Link>
        </div>
        
        {recentBlogs.length > 0 ? (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Published Date</th>
                  <th>Author</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentBlogs.map(blog => (
                  <tr key={blog.id}>
                    <td className="title-cell">
                      <div className="title-content">
                        <strong>{blog.title}</strong>
                        {blog.excerpt && (
                          <span className="excerpt">{blog.excerpt.substring(0, 80)}...</span>
                        )}
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge ${blog.published ? 'published' : 'draft'}`}>
                        {blog.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td>{formatDate(blog.publishedAt)}</td>
                    <td>{blog.author || 'Admin'}</td>
                    <td>
                      <Link to={`/blogs/edit/${blog.id}`} className="action-link">
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <p>No blog posts yet</p>
            <Link to="/blogs/new" className="btn-primary">Create First Blog</Link>
          </div>
        )}
      </div>

      {/* Recent Careers Table */}
      <div className="dashboard-section">
        <div className="section-header">
          <h2>Recent Career Openings</h2>
          <Link to="/careers" className="view-all-link">View All →</Link>
        </div>
        
        {recentCareers.length > 0 ? (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Location</th>
                  <th>Work Type</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th>Posted Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentCareers.map(career => (
                  <tr key={career.id}>
                    <td className="title-cell">
                      <strong>{career.title}</strong>
                    </td>
                    <td>{career.location}</td>
                    <td>{career.workType}</td>
                    <td>{career.department || 'N/A'}</td>
                    <td>
                      <span className={`status-badge ${career.active ? 'active' : 'inactive'}`}>
                        {career.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>{formatDate(career.createdAt)}</td>
                    <td>
                      <Link to={`/careers/edit/${career.id}`} className="action-link">
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <p>No career openings yet</p>
            <Link to="/careers/new" className="btn-primary">Post First Career</Link>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <Link to="/blogs/new" className="action-btn">
            <span className="action-icon">➕</span>
            <span>Create New Blog Post</span>
          </Link>
          <Link to="/careers/new" className="action-btn">
            <span className="action-icon">➕</span>
            <span>Post New Career</span>
          </Link>
          <Link to="/blogs" className="action-btn secondary">
            <span className="action-icon">📋</span>
            <span>Manage Blogs</span>
          </Link>
          <Link to="/careers" className="action-btn secondary">
            <span className="action-icon">📋</span>
            <span>Manage Careers</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
