// API Configuration
// Use environment-aware API URL
const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000' 
    : 'BACKEND_NOT_DEPLOYED'; // Backend needs to be deployed to AWS Elastic Beanstalk

// Check if backend is deployed
function isBackendDeployed() {
    return API_BASE_URL !== 'BACKEND_NOT_DEPLOYED';
}

// Show backend not deployed message
function showBackendNotDeployedMessage() {
    alert('⚠️ Backend Not Deployed\n\nThe admin panel requires the backend API to be deployed.\n\nPlease follow NEXT_STEPS.md to:\n1. Deploy backend to AWS Elastic Beanstalk\n2. Update this config file with backend URL\n3. Redeploy frontend');
}

const API_ENDPOINTS = {
    blogs: `${API_BASE_URL}/api/admin/blogs`,
    upload: `${API_BASE_URL}/api/admin/upload`,
    careers: `${API_BASE_URL}/api/admin/careers`
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
