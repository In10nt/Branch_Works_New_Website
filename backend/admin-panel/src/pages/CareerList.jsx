import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './CareerList.css';

const CareerList = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    try {
      const response = await axios.get('/api/careers');
      setCareers(response.data);
    } catch (error) {
      setError('Failed to fetch careers');
      console.error('Error fetching careers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this career posting?')) {
      return;
    }

    try {
      await axios.delete(`/api/careers/${id}`);
      setCareers(careers.filter(career => career.id !== id));
    } catch (error) {
      setError('Failed to delete career');
      console.error('Error deleting career:', error);
    }
  };

  const toggleActive = async (id, currentStatus) => {
    try {
      const career = careers.find(c => c.id === id);
      await axios.put(`/api/careers/${id}`, {
        ...career,
        active: !currentStatus
      });
      setCareers(careers.map(career => 
        career.id === id ? { ...career, active: !currentStatus } : career
      ));
    } catch (error) {
      setError('Failed to update career status');
      console.error('Error updating career:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading careers...</div>;
  }

  return (
    <div className="career-list">
      <div className="page-header">
        <h1>Career Openings</h1>
        <Link to="/careers/new" className="btn btn-primary">
          ➕ Post New Career
        </Link>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="career-grid">
        {careers.length === 0 ? (
          <div className="empty-state">
            <p>No career postings yet. Create your first one!</p>
            <Link to="/careers/new" className="btn btn-primary">
              Post Career Opening
            </Link>
          </div>
        ) : (
          careers.map(career => (
            <div key={career.id} className="career-card">
              <div className="career-header">
                <div>
                  <h3>{career.title}</h3>
                  <div className="career-meta">
                    <span className="location">📍 {career.location}</span>
                    <span className="type">💼 {career.type}</span>
                  </div>
                </div>
                <span className={`status-badge ${career.active ? 'active' : 'inactive'}`}>
                  {career.active ? 'Active' : 'Inactive'}
                </span>
              </div>

              <p className="career-description">{career.description}</p>

              <div className="career-details">
                <div className="detail-item">
                  <strong>Experience:</strong> {career.experience}
                </div>
                <div className="detail-item">
                  <strong>Salary:</strong> {career.salary}
                </div>
                {career.skills && (
                  <div className="detail-item">
                    <strong>Skills:</strong>
                    <div className="skills-tags">
                      {career.skills.split(',').map((skill, idx) => (
                        <span key={idx} className="skill-tag">{skill.trim()}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="career-footer">
                <span className="posted-date">
                  Posted: {new Date(career.postedDate).toLocaleDateString()}
                </span>
              </div>

              <div className="career-actions">
                <Link to={`/careers/edit/${career.id}`} className="btn btn-secondary">
                  ✏️ Edit
                </Link>
                <button
                  onClick={() => toggleActive(career.id, career.active)}
                  className={`btn ${career.active ? 'btn-secondary' : 'btn-success'}`}
                >
                  {career.active ? '⏸️ Deactivate' : '▶️ Activate'}
                </button>
                <button
                  onClick={() => handleDelete(career.id)}
                  className="btn btn-danger"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CareerList;
