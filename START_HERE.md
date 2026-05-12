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
   cd blog-admin
   python -m http.server 8080
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
- **Admin Panel:** http://localhost:8080 (Click "Admin" in footer)
- **Backend API:** http://localhost:5000/api

## 📝 Admin Login Credentials

- **Username:** admin
- **Password:** admin123

## ⚠️ Important Notes

1. **Keep all three command windows open** while using the application
2. The backend takes 30-60 seconds to fully start
3. The React website will automatically open in your browser
4. If port 3000, 5000, or 8080 is already in use, close other applications using those ports

## 🔧 Troubleshooting

### Backend won't start
- Make sure Java 17+ is installed: `java -version`
- Make sure Maven is installed: `mvn -version`

### Admin Panel won't start
- Make sure Python 3 is installed: `python --version`

### React Website won't start
- Make sure Node.js is installed: `node -version`
- Run `npm install` if dependencies are missing

### Port already in use
- Run `stop-all.bat` to close any existing instances
- Or manually close applications using ports 3000, 5000, or 8080

## 📚 Features

- **Blog Management:** Create, edit, and delete blog posts
- **Category Filtering:** Blogs automatically show on relevant pages (Finance, Technology Support, Offshore Hiring)
- **Image Upload:** Upload blog images with automatic storage
- **Draft/Publish:** Save drafts or publish immediately
- **Responsive Design:** Works on desktop, tablet, and mobile

## 🎯 Workflow

1. Start all services using `start-all.bat`
2. Website opens automatically at http://localhost:3000
3. Click "Admin" in the footer to access blog management
4. Login with admin credentials
5. Create/edit blogs as needed
6. View blogs on the website immediately
7. When done, run `stop-all.bat` to stop all services

---

**Need Help?** Check the README files in each folder for detailed documentation.
