# BranchWorks Admin Panel

A comprehensive admin panel for managing career openings and blog posts for the BranchWorks platform.

## 🚀 Quick Setup

### First Time Setup

1. **Install dependencies:**
   ```bash
   cd backend/admin-panel
   npm install
   ```

2. **Build and integrate with backend:**
   ```bash
   # From the root directory
   setup-admin.bat
   ```

   This will:
   - Install dependencies
   - Build the React app
   - Copy build files to backend's static folder
   - Make admin accessible at `http://localhost:5000/admin/`

### Development Mode

If you want to develop the admin panel with hot-reload:

```bash
cd backend/admin-panel
npm start
```

This runs the admin panel on `http://localhost:3001` for development.

### Production Mode

The admin panel is served by the Spring Boot backend at:
```
http://localhost:5000/admin/
```

After making changes, rebuild and copy:
```bash
cd backend/admin-panel
npm run build
xcopy /E /I /Y build\* ..\src\main\resources\static\admin\
```

Or use the provided script:
```bash
cd backend/admin-panel
build-and-copy.bat
```

## 📁 Integration

The admin panel is integrated with the backend as follows:

```
backend/
├── admin-panel/          # React source code
│   ├── src/             # Admin panel source
│   ├── public/          # Public assets
│   ├── package.json     # Dependencies
│   └── build/           # Built files (after npm run build)
│
└── src/main/resources/
    └── static/
        └── admin/       # Deployed admin panel (served by Spring Boot)
```

## ✨ Features

### Dashboard
- Overview statistics for blogs and careers
- Quick action buttons for common tasks
- Real-time data visualization

### Blog Management
- Create, edit, and delete blog posts
- Rich text editor (React Quill) with formatting
- Publish/unpublish functionality
- Image URL support
- Draft and published status tracking

### Career Management
- Post, edit, and delete career openings
- Detailed job information including:
  - Job title and description
  - Location and employment type
  - Experience requirements
  - Salary range
  - Required skills
  - Responsibilities and qualifications
- Active/inactive status toggle

## 🔧 Configuration

### API Proxy (Development)
When running in development mode (`npm start`), the admin panel proxies API requests to:
```
http://localhost:5000
```

This is configured in `package.json`:
```json
"proxy": "http://localhost:5000"
```

### Build Configuration
The admin panel is built to be served from `/admin` path:
```json
"homepage": "/admin"
```

## 🌐 Access URLs

- **Development:** http://localhost:3001 (when running `npm start`)
- **Production:** http://localhost:5000/admin/ (served by backend)

## 📡 API Endpoints Used

### Blog Endpoints
- `GET /api/admin/blogs` - Get all blogs
- `GET /api/admin/blogs/:id` - Get single blog
- `POST /api/admin/blogs` - Create new blog
- `PUT /api/admin/blogs/:id` - Update blog
- `DELETE /api/admin/blogs/:id` - Delete blog
- `PATCH /api/admin/blogs/:id/publish` - Toggle publish status

### Career Endpoints
- `GET /api/careers` - Get all careers
- `GET /api/careers/:id` - Get single career
- `POST /api/careers` - Create new career
- `PUT /api/careers/:id` - Update career
- `DELETE /api/careers/:id` - Delete career

## 🎨 Technology Stack

- **React 18.2.0** - UI framework
- **React Router DOM 6.20.0** - Navigation
- **Axios 1.6.2** - HTTP client
- **React Quill 2.0.0** - Rich text editor
- **CSS3** - Custom styling

## 📝 Development Workflow

1. Make changes in `src/` folder
2. Test in development mode: `npm start`
3. Build for production: `npm run build`
4. Copy to backend: `build-and-copy.bat`
5. Restart backend to see changes

## 🚢 Deployment

For production deployment:

1. Build the admin panel:
   ```bash
   cd backend/admin-panel
   npm run build
   ```

2. The build files are automatically included when you build the backend JAR:
   ```bash
   cd backend
   mvn clean package
   ```

3. Deploy the JAR file - admin panel is included and accessible at `/admin/`

## 🔒 Security Notes

- No authentication in development mode
- For production: implement proper authentication (JWT/OAuth)
- Add authentication middleware in Spring Boot
- Restrict admin endpoints to authenticated users only

## 🐛 Troubleshooting

### Admin panel not loading
- Make sure you ran `setup-admin.bat`
- Check that files exist in `backend/src/main/resources/static/admin/`
- Restart the backend server

### API calls failing
- Verify backend is running on port 5000
- Check CORS configuration in backend
- Check browser console for errors

### Changes not showing
- Rebuild the admin panel: `npm run build`
- Copy files to backend: `build-and-copy.bat`
- Restart backend server

---

**Created for:** BranchWorks Global  
**Version:** 2.0.0  
**Type:** React Admin Panel (Integrated with Backend)
