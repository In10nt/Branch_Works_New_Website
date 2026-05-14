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
      const response = await axios.get('/api/admin/careers');
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
      await axios.delete(`/api/admin/careers/${id}`);
      setCareers(careers.filter(career => career.id !== id));
    } catch (error) {
      setError('Failed to delete career');
      console.error('Error deleting career:', error);
    }
  };

  const toggleActive = async (id, currentStatus) => {
    try {
      const career = careers.find(c => c.id === id);
      await axios.put(`/api/admin/careers/${id}`, {
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

      {careers.length === 0 ? (
        <div className="empty-state">
          <p>No career postings yet. Create your first one!</p>
          <Link to="/careers/new" className="btn btn-primary">
            Post Career Opening
          </Link>
        </div>
      ) : (
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
              {careers.map(career => (
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
                  <td>{new Date(career.createdAt).toLocaleDateString()}</td>
                  <td className="actions-cell">
                    <Link to={`/careers/edit/${career.id}`} className="btn-action btn-edit">
                      ✏️ Edit
                    </Link>
                    <button
                      onClick={() => toggleActive(career.id, career.active)}
                      className={`btn-action ${career.active ? 'btn-deactivate' : 'btn-activate'}`}
                    >
                      {career.active ? '⏸️ Deactivate' : '▶️ Activate'}
                    </button>
                    <button
                      onClick={() => handleDelete(career.id)}
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

export default CareerList;
