// API Configuration
// The client can modify this file to point to their backend URL

const API_CONFIG = {
  // Backend API URL
  // For development: http://localhost:5000
  // For production: https://api.yourdomain.com or http://your-server-ip:5000
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  
  // API endpoints
  ENDPOINTS: {
    // Public endpoints
    BLOGS: '/api/blogs',
    BLOG_BY_SLUG: (slug) => `/api/blogs/${slug}`,
    CAREERS: '/api/careers',
    CONTACT: '/api/contact',
    HEALTH: '/api/health',
    
    // Auth endpoints
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    VALIDATE: '/api/auth/validate',
    
    // Admin endpoints
    ADMIN_BLOGS: '/api/admin/blogs',
    ADMIN_BLOG_BY_ID: (id) => `/api/admin/blogs/${id}`,
    ADMIN_BLOG_PUBLISH: (id) => `/api/admin/blogs/${id}/publish`,
    ADMIN_CAREERS: '/api/admin/careers',
    ADMIN_CAREER_BY_ID: (id) => `/api/admin/careers/${id}`,
    ADMIN_UPLOAD: '/api/admin/upload',
  }
};

// Helper function to get full URL
export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

export default API_CONFIG;
