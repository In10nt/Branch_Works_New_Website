import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CareerEditor.css';

const CareerEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    workType: 'Full-time',
    department: '',
    linkedinUrl: '',
    experience: '',
    salary: '',
    skills: '',
    responsibilities: '',
    qualifications: '',
    active: true
  });

  useEffect(() => {
    if (id) {
      fetchCareer();
    }
  }, [id]);

  const fetchCareer = async () => {
    try {
      const response = await axios.get(`/api/admin/careers/${id}`);
      setFormData(response.data);
    } catch (error) {
      setError('Failed to fetch career');
      console.error('Error fetching career:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (id) {
        await axios.put(`/api/admin/careers/${id}`, formData);
        setSuccess('Career updated successfully!');
      } else {
        await axios.post('/api/admin/careers', formData);
        setSuccess('Career created successfully!');
      }
      setTimeout(() => navigate('/careers'), 1500);
    } catch (error) {
      setError('Failed to save career');
      console.error('Error saving career:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="career-editor">
      <div className="editor-header">
        <h1>{id ? 'Edit Career Opening' : 'Post New Career Opening'}</h1>
        <button onClick={() => navigate('/careers')} className="btn btn-secondary">
          ← Back to List
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit} className="editor-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Job Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location *</label>
            <input
              type="text"
              id="location"
              name="location"
              className="form-control"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="workType">Work Type *</label>
            <select
              id="workType"
              name="workType"
              className="form-control"
              value={formData.workType}
              onChange={handleChange}
              required
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="department">Department *</label>
            <input
              type="text"
              id="department"
              name="department"
              className="form-control"
              value={formData.department}
              onChange={handleChange}
              placeholder="e.g., Finance, Technology, Operations"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="experience">Experience Required</label>
            <input
              type="text"
              id="experience"
              name="experience"
              className="form-control"
              value={formData.experience}
              onChange={handleChange}
              placeholder="e.g., 2-5 years"
            />
          </div>

          <div className="form-group">
            <label htmlFor="linkedinUrl">LinkedIn Job URL *</label>
            <input
              type="url"
              id="linkedinUrl"
              name="linkedinUrl"
              className="form-control"
              value={formData.linkedinUrl}
              onChange={handleChange}
              placeholder="https://www.linkedin.com/jobs/view/..."
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="salary">Salary Range</label>
          <input
            type="text"
            id="salary"
            name="salary"
            className="form-control"
            value={formData.salary}
            onChange={handleChange}
            placeholder="e.g., $80,000 - $120,000"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Job Description *</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="skills">Required Skills (comma-separated)</label>
          <input
            type="text"
            id="skills"
            name="skills"
            className="form-control"
            value={formData.skills}
            onChange={handleChange}
            placeholder="e.g., React, Node.js, MongoDB"
          />
        </div>

        <div className="form-group">
          <label htmlFor="responsibilities">Key Responsibilities</label>
          <textarea
            id="responsibilities"
            name="responsibilities"
            className="form-control"
            value={formData.responsibilities}
            onChange={handleChange}
            rows="5"
            placeholder="Enter each responsibility on a new line"
          />
        </div>

        <div className="form-group">
          <label htmlFor="qualifications">Qualifications</label>
          <textarea
            id="qualifications"
            name="qualifications"
            className="form-control"
            value={formData.qualifications}
            onChange={handleChange}
            rows="5"
            placeholder="Enter each qualification on a new line"
          />
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleChange}
            />
            <span>Active (visible to applicants)</span>
          </label>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving...' : (id ? 'Update Career' : 'Post Career')}
          </button>
          <button
            type="button"
            onClick={() => navigate('/careers')}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CareerEditor;
