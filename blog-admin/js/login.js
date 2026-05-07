document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
    
    // Simple authentication (replace with real authentication)
    if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('blogAdminLoggedIn', 'true');
        window.location.href = 'blogs.html';
    } else {
        errorMessage.textContent = 'Invalid username or password';
        errorMessage.style.display = 'block';
    }
});
