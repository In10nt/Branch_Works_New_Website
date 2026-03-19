import React, { useState } from 'react';
import './ComingSoon.css';

const ComingSoon = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    companySize: '0 - 5',
    message: ''
  });

  const [charCount, setCharCount] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'message') {
      setCharCount(value.length);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <div className="coming-soon-container">
      <div className="content-layout">
        <div className="left-section">
          <div className="logo">
            <span>BW</span>
          </div>
          <div className="main-text">
            <h1>Not everything offshore is hidden. Some things are just getting ready.</h1>
          </div>
          <div className="social-icons">
            <div className="social-icon">📷</div>
            <div className="social-icon">💼</div>
            <div className="social-icon">🐦</div>
          </div>
          <div className="brand-name">Branchworks</div>
        </div>
        <div className="right-section">
          <div className="form-container">
            <h2>Join the first wave</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-fields">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="ex: John"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Company</label>
                  <input
                    type="text"
                    name="company"
                    placeholder="ex : Google"
                    value={formData.company}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Company Size</label>
                  <select
                    name="companySize"
                    value={formData.companySize}
                    onChange={handleInputChange}
                  >
                    <option value="0 - 5">0 - 5</option>
                    <option value="6 - 20">6 - 20</option>
                    <option value="21 - 50">21 - 50</option>
                    <option value="51 - 200">51 - 200</option>
                    <option value="200+">200+</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    name="message"
                    placeholder="I want to..."
                    value={formData.message}
                    onChange={handleInputChange}
                    maxLength={250}
                  />
                  <div className="char-count">{charCount}/250</div>
                </div>
              </div>
              <button type="submit" className="join-btn">Join</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;