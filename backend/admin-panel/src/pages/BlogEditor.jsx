import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BlogEditor.css';

const BlogEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    authorName: '',
    category: 'Finance',
    featuredImage: '',
    status: 'DRAFT'
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (id) {
      fetchBlog();
    }
  }, [id]);

  const fetchBlog = async () => {
    try {
      const response = await axios.get(`/api/admin/blogs/${id}`);
      const blog = response.data;
      setFormData({
        title: blog.title || '',
        slug: blog.slug || '',
        excerpt: blog.excerpt || '',
        content: blog.content || '',
        authorName: blog.authorName || '',
        category: blog.category || 'Finance',
        featuredImage: blog.featuredImage || '',
        status: blog.status || 'DRAFT'
      });
      if (blog.featuredImage) {
        setImagePreview(`https://7902b8afabb745.lhr.life${blog.featuredImage}`);
      }
    } catch (error) {
      setError('Failed to fetch blog');
      console.error('Error fetching blog:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      let imagePath = formData.featuredImage;
      
      // Upload image if a new one was selected
      if (imageFile) {
        const imageFormData = new FormData();
        imageFormData.append('file', imageFile);
        
        const uploadResponse = await axios.post('/api/admin/upload', imageFormData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        
        imagePath = uploadResponse.data.url;
      }
      
      const blogData = {
        ...formData,
        featuredImage: imagePath
      };
      
      if (id) {
        await axios.put(`/api/admin/blogs/${id}`, blogData);
        setSuccess('Blog updated successfully!');
      } else {
        await axios.post('/api/admin/blogs', blogData);
        setSuccess('Blog created successfully!');
      }
      setTimeout(() => navigate('/blogs'), 1500);
    } catch (error) {
      setError('Failed to save blog: ' + (error.response?.data?.message || error.message));
      console.error('Error saving blog:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="blog-editor">
      <div className="editor-header">
        <h1>{id ? 'Edit Blog Post' : 'Create New Blog Post'}</h1>
        <button onClick={() => navigate('/blogs')} className="btn btn-secondary">
          ← Back to List
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit} className="editor-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Offshore vs. In-House Assistants: Smarter Support"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="slug">URL Slug *</label>
            <input
              type="text"
              id="slug"
              name="slug"
              className="form-control"
              value={formData.slug}
              onChange={handleChange}
              placeholder="e.g., offshore-vs-inhouse-assistants"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="authorName">Author Name *</label>
            <input
              type="text"
              id="authorName"
              name="authorName"
              className="form-control"
              value={formData.authorName}
              onChange={handleChange}
              placeholder="e.g., Branchworks Team"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              name="category"
              className="form-control"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="Finance">Finance</option>
              <option value="Technology Support">Technology Support</option>
              <option value="Offshore Hiring">Offshore Hiring</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="excerpt">Excerpt (Short Description) *</label>
          <textarea
            id="excerpt"
            name="excerpt"
            className="form-control"
            value={formData.excerpt}
            onChange={handleChange}
            rows="3"
            placeholder="A brief summary that appears in blog listings and as the intro paragraph"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="featuredImage">Featured Image *</label>
          <input
            type="file"
            id="featuredImage"
            accept="image/*"
            onChange={handleImageChange}
            className="form-control"
          />
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" style={{ maxWidth: '300px', marginTop: '10px' }} />
            </div>
          )}
          <small className="form-text">Upload an image for the blog header (JPG, PNG, WebP)</small>
        </div>

        <div className="form-group">
          <label>Content *</label>
          <div className="content-help">
            <p><strong>Formatting Guide:</strong></p>
            <ul>
              <li><code>### Heading</code> - Creates a section heading</li>
              <li><code>- List item</code> - Creates a bullet point</li>
              <li>Leave blank lines between paragraphs</li>
            </ul>
          </div>
          <textarea
            name="content"
            className="form-control content-textarea"
            value={formData.content}
            onChange={handleChange}
            rows="20"
            placeholder="Write your blog content here...

### What In-House Assistants Do Well

In-house assistants are best suited for roles that require a physical presence.

- Point one
- Point two
- Point three

Regular paragraph text goes here..."
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status *</label>
          <select
            id="status"
            name="status"
            className="form-control"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="DRAFT">Draft (not visible on website)</option>
            <option value="PUBLISHED">Published (visible on website)</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving...' : (id ? 'Update Blog' : 'Create Blog')}
          </button>
          <button
            type="button"
            onClick={() => navigate('/blogs')}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogEditor;
