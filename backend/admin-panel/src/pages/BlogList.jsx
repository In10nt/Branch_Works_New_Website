import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './BlogList.css';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('/api/admin/blogs');
      setBlogs(response.data);
    } catch (error) {
      setError('Failed to fetch blogs');
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) {
      return;
    }

    try {
      await axios.delete(`/api/admin/blogs/${id}`);
      setBlogs(blogs.filter(blog => blog.id !== id));
    } catch (error) {
      setError('Failed to delete blog');
      console.error('Error deleting blog:', error);
    }
  };

  const togglePublish = async (id, currentStatus) => {
    try {
      await axios.patch(`/api/admin/blogs/${id}/publish`, null, {
        params: { published: !currentStatus }
      });
      setBlogs(blogs.map(blog => 
        blog.id === id ? { ...blog, published: !currentStatus } : blog
      ));
    } catch (error) {
      setError('Failed to update blog status');
      console.error('Error updating blog:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading blogs...</div>;
  }

  return (
    <div className="blog-list">
      <div className="page-header">
        <h1>Blog Posts</h1>
        <Link to="/blogs/new" className="btn btn-primary">
          ➕ Create New Post
        </Link>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="blog-grid">
        {blogs.length === 0 ? (
          <div className="empty-state">
            <p>No blog posts yet. Create your first one!</p>
            <Link to="/blogs/new" className="btn btn-primary">
              Create Blog Post
            </Link>
          </div>
        ) : (
          blogs.map(blog => (
            <div key={blog.id} className="blog-card">
              {blog.imageUrl && (
                <div className="blog-image">
                  <img src={blog.imageUrl} alt={blog.title} />
                </div>
              )}
              <div className="blog-content">
                <div className="blog-header">
                  <h3>{blog.title}</h3>
                  <span className={`status-badge ${blog.published ? 'published' : 'draft'}`}>
                    {blog.published ? 'Published' : 'Draft'}
                  </span>
                </div>
                <p className="blog-excerpt">{blog.excerpt}</p>
                <div className="blog-meta">
                  <span>By {blog.author}</span>
                  <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="blog-actions">
                  <Link to={`/blogs/edit/${blog.id}`} className="btn btn-secondary">
                    ✏️ Edit
                  </Link>
                  <button
                    onClick={() => togglePublish(blog.id, blog.published)}
                    className={`btn ${blog.published ? 'btn-secondary' : 'btn-success'}`}
                  >
                    {blog.published ? '📥 Unpublish' : '📤 Publish'}
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="btn btn-danger"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BlogList;
