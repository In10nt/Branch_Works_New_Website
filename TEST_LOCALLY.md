# Testing the Application Locally

## ✅ Prerequisites Check

Before running, ensure you have:
- ✅ Node.js 16+ installed
- ✅ Java 17+ installed
- ✅ Maven 3.6+ installed

## 🚀 Quick Start Guide

### Step 1: Build the Admin Panel (One-time setup)

The admin panel needs to be built and copied to the backend before starting:

```bash
cd backend\admin-panel
build-and-copy.bat
```

This will:
- Build the admin panel React app
- Copy the build files to `backend/src/main/resources/static/admin/`

**Note:** You only need to do this once, or whenever you make changes to the admin panel code.

### Step 2: Start the Backend

Open a terminal in the project root and run:

```bash
cd backend
mvn spring-boot:run
```

**Wait for the backend to start completely.** You should see:
```
Started ComingSoonApplication in X.XXX seconds
Tomcat started on port 5000 (http)
```

The backend will be available at: `http://localhost:5000`

### Step 3: Start the Frontend

Open a **NEW terminal** in the project root and run:

```bash
cd frontend
npm start
```

The frontend will automatically open in your browser at: `http://localhost:3000`

## 🔍 What to Test

### 1. Public Website (http://localhost:3000)
- ✅ Home page loads
- ✅ Navigation works (Services, Blog, Careers, About, Contact)
- ✅ Blog page shows posts
- ✅ Careers page shows job openings
- ✅ Contact form works

### 2. Admin Panel (http://localhost:5000/admin/)
- ✅ Login page loads
- ✅ Login with credentials:
  - **Username:** `admin`
  - **Password:** `admin123`
- ✅ Dashboard shows statistics
- ✅ Blog management works (Create, Edit, Delete, Publish)
- ✅ Career management works (Create, Edit, Delete, Activate)
- ✅ Logout works

### 3. Database (http://localhost:5000/h2-console)
- ✅ H2 Console accessible
- **JDBC URL:** `jdbc:h2:file:./data/branchworks_db`
- **Username:** `sa`
- **Password:** (leave empty)
- ✅ Tables exist: users, blog_posts, careers
- ✅ Data is present (2 blogs, careers, admin user)

## 🐛 Troubleshooting

### Frontend won't start
**Error:** "Module not found: Can't resolve 'public/index.html'"

**Solution:** Make sure you're running from the `frontend/` directory:
```bash
cd frontend
npm start
```

### Backend won't start
**Error:** "Port 5000 is already in use"

**Solution:** Stop any other process using port 5000 or change the port in `application.properties`

### Database errors
**Error:** "Table not found"

**Solution:** Delete the `backend/data/` folder and restart the backend. It will recreate the database.

### Admin panel shows blank page
**Solution:** 
1. Build the admin panel: `cd backend/admin-panel && npm run build`
2. Restart the backend

### CORS errors in browser console
**Solution:** Make sure:
1. Backend is running on port 5000
2. Frontend `.env` has `REACT_APP_API_URL=http://localhost:5000`
3. Restart both frontend and backend

## 📝 Current Database Contents

The database in `database/` folder includes:

### Users Table
- Admin user: username `admin`, password `admin123`

### Blog Posts Table
- 2 sample blog posts (published)

### Careers Table
- Sample job openings with all fields

## ✅ Success Checklist

Before delivering to client, verify:
- [ ] Backend starts without errors
- [ ] Frontend starts and loads at http://localhost:3000
- [ ] Admin panel accessible at http://localhost:5000/admin/
- [ ] Can login to admin panel
- [ ] Can create/edit/delete blogs
- [ ] Can create/edit/delete careers
- [ ] Public website shows blogs and careers
- [ ] Contact form sends emails (if email configured)
- [ ] No console errors in browser
- [ ] No errors in backend logs

## 🎯 Next Steps After Testing

Once local testing is successful:

1. **Build for Production:**
   ```bash
   # Build frontend
   cd frontend
   npm run build
   cd ..
   
   # Build admin panel
   cd backend/admin-panel
   npm run build
   cd ../..
   
   # Build backend
   cd backend
   mvn clean package -DskipTests
   cd ..
   ```

2. **Deliverable:**
   - JAR file: `backend/target/coming-soon-backend-0.0.1-SNAPSHOT.jar`
   - This single JAR contains everything (backend API + frontend + admin panel)

3. **Deploy:**
   - Copy JAR to server
   - Configure production `application.properties`
   - Run: `java -jar coming-soon-backend-0.0.1-SNAPSHOT.jar`

---

**Last Updated:** May 14, 2026
