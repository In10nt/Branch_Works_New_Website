# BranchWorks - Quick Start Guide

## 🚀 Starting the Application

### Option 1: Start Everything at Once (Recommended)
Double-click `start-all.bat` to start all services:
- Backend API (Port 5000)
- Admin Panel (Port 8080)
- React Website (Port 3000)

Three command windows will open - **DO NOT CLOSE THEM** while using the application.

### Option 2: Start Services Manually
If you prefer to start services individually:

1. **Backend Server:**
   ```bash
   cd backend
   mvn spring-boot:run
   ```

2. **Admin Panel:**
   ```bash
   cd admin-panel
   npm start
   ```

3. **React Website:**
   ```bash
   npm start
   ```

## 🛑 Stopping the Application

### Option 1: Quick Stop
Double-click `stop-all.bat` to stop all services at once.

### Option 2: Manual Stop
Close each command window individually or press `Ctrl+C` in each terminal.

## 🌐 Access URLs

- **Website:** http://localhost:3000
- **Admin Panel:** http://localhost:3001 (Click "Admin" in footer)
- **Backend API:** http://localhost:5000/api

## 📝 Admin Panel

- No login required - direct access to admin features
- Manage blogs and career postings
- Modern React-based interface with rich text editor

## ⚠️ Important Notes

1. **Keep all three command windows open** while using the application
2. The backend takes 30-60 seconds to fully start
3. The React website will automatically open in your browser
4. If port 3000, 3001, or 5000 is already in use, close other applications using those ports

## 🔧 Troubleshooting

### Backend won't start
- Make sure Java 17+ is installed: `java -version`
- Make sure Maven is installed: `mvn -version`

### Admin Panel won't start
- Make sure Node.js is installed: `node -version`
- Run `npm install` in the admin-panel folder if dependencies are missing

### React Website won't start
- Make sure Node.js is installed: `node -version`
- Run `npm install` if dependencies are missing

### Port already in use
- Run `stop-all.bat` to close any existing instances
- Or manually close applications using ports 3000, 3001, or 5000

## 📚 Features

- **Blog Management:** Create, edit, and delete blog posts with rich text editor
- **Career Management:** Post, edit, and delete career openings
- **Category Filtering:** Blogs automatically show on relevant pages (Finance, Technology Support, Offshore Hiring)
- **Image Support:** Add image URLs to blog posts
- **Draft/Publish:** Toggle publish status for blogs
- **Active/Inactive:** Toggle active status for careers
- **Responsive Design:** Works on desktop, tablet, and mobile

## 🎯 Workflow

1. Start all services using `start-all.bat`
2. Website opens automatically at http://localhost:3000
3. Click "Admin" in the footer to access admin panel (opens in new tab)
4. Create/edit blogs and career postings as needed
5. View blogs and careers on the website immediately
6. When done, run `stop-all.bat` to stop all services

---

**Need Help?** Check the README files in each folder for detailed documentation.
