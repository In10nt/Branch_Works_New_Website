import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Layout.css';

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  const username = localStorage.getItem('username');

  return (
    <div className="layout">
      <nav className="sidebar">
        <div className="sidebar-header">
          <h2>BranchWorks</h2>
          <p>Admin Panel</p>
        </div>
        <ul className="nav-menu">
          <li>
            <Link 
              to="/dashboard" 
              className={isActive('/dashboard') ? 'active' : ''}
            >
              <span className="icon">📊</span>
              Dashboard
            </Link>
          </li>
          <li>
            <Link 
              to="/blogs" 
              className={isActive('/blogs') ? 'active' : ''}
            >
              <span className="icon">📝</span>
              Blog Posts
            </Link>
          </li>
          <li>
            <Link 
              to="/careers" 
              className={isActive('/careers') ? 'active' : ''}
            >
              <span className="icon">💼</span>
              Careers
            </Link>
          </li>
        </ul>
        <div className="sidebar-footer">
          <div className="user-info">
            <span className="user-icon">👤</span>
            <span className="username">{username}</span>
          </div>
          <button onClick={handleLogout} className="logout-button">
            <span className="icon">🚪</span>
            Logout
          </button>
        </div>
      </nav>
      <main className="main-content">
        <div className="content-wrapper">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
