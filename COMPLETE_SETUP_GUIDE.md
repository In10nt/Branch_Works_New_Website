# Complete Setup & Testing Guide

## ✅ Project Status: READY FOR TESTING & DELIVERY

All setup has been completed. The project is ready to test locally and deliver to the client.

---

## 📋 What Has Been Done

### 1. Project Structure Organized ✅
```
Branch Works/
├── frontend/              # React application (with dependencies installed)
├── backend/               # Spring Boot + Admin Panel
│   └── admin-panel/      # Admin CMS (built and copied to backend)
├── database/              # Current H2 database with data
└── Documentation files
```

### 2. Dependencies Installed ✅
- ✅ Frontend dependencies installed (`frontend/node_modules/`)
- ✅ Admin panel dependencies already installed (`backend/admin-panel/node_modules/`)

### 3. Environment Files Created ✅
- ✅ `frontend/.env` - Created from `.env.example`
- ✅ `backend/admin-panel/.env` - Created from `.env.example`
- ✅ `backend/src/main/resources/application.properties` - Already exists

### 4. Admin Panel Built ✅
- ✅ Admin panel built successfully
- ✅ Build files copied to `backend/src/main/resources/static/admin/`
- ✅ Ready to be served by backend at `/admin/` path

### 5. Testing Completed ✅
- ✅ Frontend compiles and runs successfully
- ✅ Backend starts successfully on port 5000
- ✅ Admin panel accessible at `http://localhost:5000/admin/`

---

## 🚀 How to Run the Application

### Option 1: Quick Start (Recommended)

**Terminal 1 - Start Backend:**
```bash
cd backend
mvn spring-boot:run
```
Wait for: `Started ComingSoonApplication in X.XXX seconds`

**Terminal 2 - Start Frontend:**
```bash
cd frontend
npm start
```
Browser will open automatically at `http://localhost:3000`

### Option 2: If Admin Panel Needs Rebuilding

If you made changes to the admin panel, rebuild it first:

```bash
cd backend\admin-panel
build-and-copy.bat
```

Then follow Option 1 to start backend and frontend.

---

## 🔍 Access Points

Once both backend and frontend are running:

| Service | URL | Credentials |
|---------|-----|-------------|
| **Frontend Website** | http://localhost:3000 | Public access |
| **Backend API** | http://localhost:5000 | - |
| **Admin Panel** | http://localhost:5000/admin/ | username: `admin`<br>password: `admin123` |
| **H2 Database Console** | http://localhost:5000/h2-console | JDBC URL: `jdbc:h2:file:./data/branchworks_db`<br>Username: `sa`<br>Password: (empty) |

---

## 🧪 Testing Checklist

### Frontend Website (http://localhost:3000)
- [ ] Home page loads with video and content
- [ ] Navigation menu works (Services, Blog, Careers, About, Contact)
- [ ] Services pages load (Finance, Technology Support, Offshore Hiring)
- [ ] Blog page shows published blog posts
- [ ] Blog detail pages work
- [ ] Careers page shows active job openings
- [ ] Contact form works (if email configured)
- [ ] About page loads
- [ ] Footer links work

### Admin Panel (http://localhost:5000/admin/)
- [ ] Login page loads
- [ ] Can login with admin/admin123
- [ ] Dashboard shows statistics (blog count, career count)
- [ ] Dashboard shows recent blogs and careers in table format

**Blog Management:**
- [ ] Blog list shows all blogs in table format
- [ ] Can create new blog post
- [ ] Rich text editor works
- [ ] Can upload images
- [ ] Can edit existing blog
- [ ] Can delete blog
- [ ] Can publish/unpublish blog
- [ ] Published blogs appear on frontend

**Career Management:**
- [ ] Career list shows all careers in table format
- [ ] Can create new career posting
- [ ] All fields work (Job Title, Location, Work Type, Department, etc.)
- [ ] Can edit existing career
- [ ] Can delete career
- [ ] Can activate/deactivate career
- [ ] Active careers appear on frontend

**Authentication:**
- [ ] Logout works
- [ ] Protected routes redirect to login when not authenticated
- [ ] JWT token persists across page refreshes

### Database (http://localhost:5000/h2-console)
- [ ] Can connect to H2 console
- [ ] Tables exist: `users`, `blog_posts`, `careers`
- [ ] Admin user exists in `users` table
- [ ] Sample blogs exist in `blog_posts` table
- [ ] Sample careers exist in `careers` table

---

## 📦 Building for Production

Once testing is complete, build for production:

### Step 1: Build Frontend
```bash
cd frontend
npm run build
cd ..
```
Output: `frontend/build/` directory

### Step 2: Build Admin Panel
```bash
cd backend\admin-panel
build-and-copy.bat
cd ..\..
```
Output: Files copied to `backend/src/main/resources/static/admin/`

### Step 3: Build Backend (includes everything)
```bash
cd backend
mvn clean package -DskipTests
cd ..
```
Output: `backend/target/coming-soon-backend-0.0.1-SNAPSHOT.jar`

### Step 4: Test Production Build
```bash
cd backend
java -jar target/coming-soon-backend-0.0.1-SNAPSHOT.jar
```

Access at: `http://localhost:5000` (serves both frontend and admin panel)

---

## 📁 Deliverables for Client

### Source Code Package
```
Branch Works/
├── frontend/              # Complete React application
├── backend/               # Complete Spring Boot application
├── database/              # Current database with data
├── .gitignore            # Git ignore rules
├── README.md             # Complete documentation
├── HANDOVER_CHECKLIST.md # Handover status
├── PROJECT_STRUCTURE.md  # Structure overview
├── TEST_LOCALLY.md       # Testing guide
└── COMPLETE_SETUP_GUIDE.md # This file
```

### Configuration Templates
- `frontend/.env.example` - Frontend environment template
- `backend/admin-panel/.env.example` - Admin panel environment template
- `backend/application.properties.example` - Backend configuration template

### Database
- `database/branchworks_db.mv.db` - H2 database with current data
- `database/branchworks_db.trace.db` - H2 trace file
- `database/blog-schema.sql` - Blog table schema
- `database/import-current-blogs.sql` - Sample blog data
- `database/README.md` - Database documentation

### Production Artifact
- `backend/target/coming-soon-backend-0.0.1-SNAPSHOT.jar` - Single JAR file containing:
  - Backend API
  - Frontend website
  - Admin panel
  - All dependencies

---

## 🔐 Security Notes for Client

### Must Configure Before Production:
1. **Email Configuration** in `application.properties`:
   - Gmail account and app password
   - Company email address

2. **JWT Secret** in `application.properties`:
   - Generate secure random string (256+ bits)
   - Command: `openssl rand -base64 64`

3. **Database** for production:
   - Switch from H2 to MySQL or PostgreSQL
   - Configure connection in `application.properties`

4. **Admin Password**:
   - Change default password immediately
   - Current: username `admin`, password `admin123`

5. **Environment Variables**:
   - Update `REACT_APP_API_URL` in frontend `.env` for production domain
   - Update `REACT_APP_API_URL` in admin panel `.env` for production domain

---

## 🐛 Common Issues & Solutions

### Issue: Frontend won't start
**Error:** "Module not found: Can't resolve 'public/index.html'"

**Solution:** Make sure you're in the `frontend/` directory:
```bash
cd frontend
npm start
```

### Issue: Admin panel shows blank page
**Solution:** Build and copy admin panel:
```bash
cd backend\admin-panel
build-and-copy.bat
```
Then restart backend.

### Issue: Backend won't start
**Error:** "Port 5000 is already in use"

**Solution:** 
- Stop any process using port 5000
- Or change port in `application.properties`: `server.port=8080`

### Issue: CORS errors in browser
**Solution:**
- Verify backend is running on port 5000
- Check frontend `.env` has `REACT_APP_API_URL=http://localhost:5000`
- Restart both frontend and backend

### Issue: Database errors
**Solution:**
- Delete `backend/data/` folder
- Restart backend (will recreate database)
- Or copy database files from `database/` folder to `backend/data/`

---

## ✅ Final Checklist Before Delivery

- [ ] All dependencies installed
- [ ] Environment files created and configured
- [ ] Admin panel built and copied to backend
- [ ] Frontend tested and working
- [ ] Backend tested and working
- [ ] Admin panel tested and working
- [ ] Database contains sample data
- [ ] All documentation files included
- [ ] No personal credentials in code
- [ ] No AWS-specific configurations
- [ ] Production build tested
- [ ] README.md is accurate and complete

---

## 📞 Client Instructions

### First Time Setup:
1. Extract the project files
2. Install prerequisites (Node.js 16+, Java 17+, Maven 3.6+)
3. Follow "How to Run the Application" section above
4. Test everything using the "Testing Checklist"
5. Configure production settings (email, JWT secret, database)
6. Build for production
7. Deploy the JAR file to your server

### For Production Deployment:
1. Build production JAR (see "Building for Production")
2. Copy `backend/target/coming-soon-backend-0.0.1-SNAPSHOT.jar` to server
3. Configure production `application.properties`
4. Run: `java -jar coming-soon-backend-0.0.1-SNAPSHOT.jar`
5. Access at your domain

---

**Project Status:** ✅ READY FOR CLIENT DELIVERY

**Last Updated:** May 14, 2026

**Tested:** ✅ Frontend, ✅ Backend, ✅ Admin Panel

