# Blog Management System - Standalone Admin Panel

## Overview
This is a simple, standalone HTML/JavaScript blog management system that connects to your Spring Boot backend API.

## Features
- ✅ Simple HTML/CSS/JavaScript (no build process needed)
- ✅ WordPress-style interface
- ✅ Create, edit, delete blog posts
- ✅ Image upload
- ✅ Category management
- ✅ Draft/Publish workflow
- ✅ Runs on any port independently

## How to Run

### Option 1: Using Python (Easiest)
```bash
cd blog-admin
python -m http.server 8080
```
Access at: `http://localhost:8080`

### Option 2: Using Node.js
```bash
cd blog-admin
npx http-server -p 8080
```
Access at: `http://localhost:8080`

### Option 3: Using Live Server (VS Code)
1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## Login Credentials
- **Username:** admin
- **Password:** admin123

## Backend Connection
The admin panel connects to your Spring Boot backend at:
- **Backend URL:** `http://localhost:5000`
- **API Endpoints:** `/api/admin/blogs`, `/api/admin/upload`

Make sure your backend is running before using the admin panel!

## File Structure
```
blog-admin/
├── index.html          # Login page
├── blogs.html          # Blog list page
├── editor.html         # Blog editor page
├── css/
│   └── style.css       # All styles
└── js/
    ├── config.js       # API configuration
    ├── login.js        # Login logic
    ├── blogs.js        # Blog list logic
    └── editor.js       # Editor logic
```

## Deployment for Client

### Give to Client:
1. **blog-admin folder** - Complete standalone admin system
2. **backend folder** - Spring Boot application
3. **database folder** - Database schema

### Client Setup:
1. Start backend: `java -jar backend.jar`
2. Start admin panel: `python -m http.server 8080` (in blog-admin folder)
3. Access admin: `http://localhost:8080`

### Production Deployment:
- Deploy admin panel to any web server (Apache, Nginx, etc.)
- Update `API_BASE_URL` in `js/config.js` to production backend URL
- Enable HTTPS for security

## Customization

### Change Backend URL:
Edit `blog-admin/js/config.js`:
```javascript
const API_BASE_URL = 'https://your-backend-url.com';
```

### Change Login Credentials:
Edit `blog-admin/js/login.js` (line 8-9)

### Change Port:
```bash
python -m http.server 9000  # Run on port 9000
```

## Browser Support
- Chrome, Firefox, Safari, Edge (latest versions)
- No IE support

## Security Notes
- Change default login credentials in production
- Use HTTPS in production
- Implement proper authentication (JWT) for production
- Add CORS configuration in backend for production domain

---

**Created for:** Branchworks Global  
**Version:** 1.0.0  
**Type:** Standalone Admin Panel
