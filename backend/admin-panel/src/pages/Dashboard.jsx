import React, { useState, useEffect } from 'react';
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [blogsRes, careersRes] = await Promise.all([
        axios.get('/api/admin/blogs'),
        axios.get('/api/careers')
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
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="stats-grid">
        <div className="stat-card blog-card">
          <div className="stat-icon">📝</div>
          <div className="stat-content">
            <h3>Total Blog Posts</h3>
            <p className="stat-number">{stats.totalBlogs}</p>
            <div className="stat-details">
              <span>Published: {stats.publishedBlogs}</span>
              <span>Drafts: {stats.draftBlogs}</span>
            </div>
          </div>
        </div>

        <div className="stat-card career-card">
          <div className="stat-icon">💼</div>
          <div className="stat-content">
            <h3>Career Openings</h3>
            <p className="stat-number">{stats.totalCareers}</p>
            <div className="stat-details">
              <span>Active: {stats.activeCareers}</span>
              <span>Inactive: {stats.totalCareers - stats.activeCareers}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <a href="/blogs/new" className="action-btn">
            <span className="action-icon">➕</span>
            <span>Create New Blog Post</span>
          </a>
          <a href="/careers/new" className="action-btn">
            <span className="action-icon">➕</span>
            <span>Post New Career</span>
          </a>
          <a href="/blogs" className="action-btn">
            <span className="action-icon">📋</span>
            <span>Manage Blogs</span>
          </a>
          <a href="/careers" className="action-btn">
            <span className="action-icon">📋</span>
            <span>Manage Careers</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
