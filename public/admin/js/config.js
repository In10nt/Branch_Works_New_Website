// API Configuration
// Use environment-aware API URL
const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000' 
    : ''; // In production, API will be on same domain

const API_ENDPOINTS = {
    blogs: `${API_BASE_URL}/api/admin/blogs`,
    upload: `${API_BASE_URL}/api/admin/upload`
};

// Check if user is logged in
function checkAuth() {
    const isLoggedIn = localStorage.getItem('blogAdminLoggedIn');
    if (!isLoggedIn && !window.location.pathname.endsWith('index.html') && !window.location.pathname.endsWith('/')) {
        window.location.href = 'index.html';
    }
}

// Logout function
function logout() {
    localStorage.removeItem('blogAdminLoggedIn');
    window.location.href = 'index.html';
}

// Format date
function formatDate(dateString) {
    if (!dateString) return 'Not published';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}
