document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
    
    // Simple authentication (replace with real authentication)
    if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('blogAdminLoggedIn', 'true');
        
        // Show success popup with import message
        const popup = document.createElement('div');
        popup.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 30px 40px;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            z-index: 10000;
            text-align: center;
            max-width: 450px;
        `;
        
        popup.innerHTML = `
            <div style="margin-bottom: 20px;">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="color: #10B981;">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                    <path d="M8 12L11 15L16 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <h2 style="margin: 0 0 10px 0; color: #111827; font-size: 24px; font-weight: 600;">Login Successful!</h2>
            <p style="margin: 0 0 20px 0; color: #6B7280; font-size: 14px;">
                Welcome to Admin Panel
            </p>
            <div style="background: #EFF6FF; border: 1px solid #3B82F6; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
                <p style="margin: 0; color: #1E40AF; font-size: 14px; font-weight: 500;">
                    📥 First time? Import current blogs →
                </p>
                <p style="margin: 8px 0 0 0; color: #6B7280; font-size: 12px;">
                    Click "Import Blogs" in the dashboard to get started
                </p>
            </div>
            <button id="closePopup" style="
                background: #3B82F6;
                color: white;
                border: none;
                padding: 10px 24px;
                border-radius: 6px;
                font-size: 14px;
                font-weight: 500;
                cursor: pointer;
            ">Continue to Dashboard</button>
        `;
        
        // Add overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 9999;
        `;
        
        document.body.appendChild(overlay);
        document.body.appendChild(popup);
        
        // Close popup and redirect
        document.getElementById('closePopup').addEventListener('click', function() {
            window.location.href = 'dashboard.html';
        });
        
        // Auto redirect after 5 seconds
        setTimeout(function() {
            window.location.href = 'dashboard.html';
        }, 5000);
    } else {
        errorMessage.textContent = 'Invalid username or password';
        errorMessage.style.display = 'block';
    }
});
