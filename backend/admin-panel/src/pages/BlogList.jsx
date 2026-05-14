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

      {blogs.length === 0 ? (
        <div className="empty-state">
          <p>No blog posts yet. Create your first one!</p>
          <Link to="/blogs/new" className="btn btn-primary">
            Create Blog Post
          </Link>
        </div>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Status</th>
                <th>Published Date</th>
                <th>Created Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map(blog => (
                <tr key={blog.id}>
                  <td className="title-cell">
                    <div className="title-content">
                      <strong>{blog.title}</strong>
                      {blog.excerpt && (
                        <span className="excerpt">{blog.excerpt.substring(0, 80)}...</span>
                      )}
                    </div>
                  </td>
                  <td>{blog.author || 'Admin'}</td>
                  <td>
                    <span className={`status-badge ${blog.published ? 'published' : 'draft'}`}>
                      {blog.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td>{blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : 'N/A'}</td>
                  <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
                  <td className="actions-cell">
                    <Link to={`/blogs/edit/${blog.id}`} className="btn-action btn-edit">
                      ✏️ Edit
                    </Link>
                    <button
                      onClick={() => togglePublish(blog.id, blog.published)}
                      className={`btn-action ${blog.published ? 'btn-unpublish' : 'btn-publish'}`}
                    >
                      {blog.published ? '📥 Unpublish' : '📤 Publish'}
                    </button>
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="btn-action btn-delete"
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BlogList;
