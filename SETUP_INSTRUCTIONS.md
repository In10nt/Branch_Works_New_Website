# BranchWorks - Complete Setup Instructions

## 🎯 Quick Setup (First Time Only)

### Step 1: Install Dependencies for Main Website
```bash
npm install
```

### Step 2: Install Dependencies for Admin Panel
```bash
cd admin-panel
npm install
cd ..
```

### Step 3: Start Everything
```bash
# Double-click this file or run:
start-all.bat
```

---

## 🌐 Access Your Applications

After running `start-all.bat`, you can access:

| Application | URL | Description |
|------------|-----|-------------|
| **Main Website** | http://localhost:3000 | Public-facing website |
| **Admin Panel** | http://localhost:3001 | Blog & Career management |
| **Backend API** | http://localhost:5000 | REST API server |

---

## 📋 What Each Service Does

### 1. Backend Server (Port 5000)
- Spring Boot Java application
- Provides REST API endpoints
- Manages database (H2 file-based)
- Handles blog and career data

### 2. Admin Panel (Port 3001)
- React application for content management
- Dashboard with statistics
- Blog post editor with rich text
- Career posting management
- No login required (development mode)

### 3. Main Website (Port 3000)
- React application for public users
- Landing page
- Blog listing and detail pages
- Career listings
- Industry-specific pages

---

## 🔗 How They Connect

```
┌─────────────────┐
│  Main Website   │ ──┐
│  (Port 3000)    │   │
└─────────────────┘   │
                      │
┌─────────────────┐   │    ┌─────────────────┐
│  Admin Panel    │ ──┼───▶│  Backend API    │
│  (Port 3001)    │   │    │  (Port 5000)    │
└─────────────────┘   │    └─────────────────┘
                      │            │
                      └────────────┘
                                   │
                            ┌──────▼──────┐
                            │  H2 Database│
                            └─────────────┘
```

---

## 🎨 Admin Panel Features

### Dashboard
- Total blog posts (published/draft)
- Total career openings (active/inactive)
- Quick action buttons

### Blog Management
- Create new blog posts
- Edit existing posts
- Delete posts
- Rich text editor with formatting
- Image URL support
- Category assignment
- Publish/Unpublish toggle
- View all blogs in card layout

### Career Management
- Post new career openings
- Edit existing postings
- Delete postings
- Job details (title, location, type, experience, salary)
- Skills tags
- Responsibilities and qualifications
- Active/Inactive toggle
- View all careers in card layout

---

## 🛠️ Development Workflow

### Daily Use
1. Run `start-all.bat`
2. Wait 30-60 seconds for backend to start
3. Website opens automatically
4. Click "Admin" in footer to manage content
5. Make changes in admin panel
6. View changes immediately on website
7. Run `stop-all.bat` when done

### Making Code Changes

**Frontend (Main Website):**
```bash
# Edit files in src/components/
# Changes auto-reload in browser
```

**Admin Panel:**
```bash
# Edit files in admin-panel/src/
# Changes auto-reload in browser
```

**Backend:**
```bash
# Edit files in backend/src/main/java/
# Restart backend server to see changes
```

---

## 📁 Project Structure

```
Branch Works/
├── admin-panel/              # React Admin Panel
│   ├── src/
│   │   ├── components/       # Layout components
│   │   ├── pages/            # Admin pages
│   │   └── App.js           # Admin routing
│   └── package.json
│
├── backend/                  # Spring Boot Backend
│   ├── src/main/java/       # Java source code
│   ├── data/                # H2 database files
│   └── pom.xml              # Maven config
│
├── src/                     # Main Website
│   ├── components/          # React components
│   └── App.js              # Main routing
│
├── public/                  # Static assets
├── start-all.bat           # Start all services
├── stop-all.bat            # Stop all services
└── README.md               # Technical docs
```

---

## 🔧 Troubleshooting

### Services Won't Start
**Problem:** Port already in use
**Solution:**
```bash
# Run stop-all.bat first
stop-all.bat

# Then start again
start-all.bat
```

### Backend Takes Long to Start
**Normal:** Backend takes 30-60 seconds to fully start
**Wait for:** "Started ComingSoonApplication" message in backend window

### Admin Panel Not Loading
**Check:**
1. Did you run `npm install` in admin-panel folder?
2. Is the admin panel command window open?
3. Is port 3001 available?

### Changes Not Showing
**Website/Admin:** Changes auto-reload (wait a few seconds)
**Backend:** Must restart backend server after code changes

### Database Issues
**Solution:** Delete database file and restart
```bash
# Delete: backend/data/branchworks_db.mv.db
# Restart backend - database will be recreated
```

---

## 🚀 Production Deployment

### Main Website
```bash
npm run build
# Deploy build/ folder to hosting (Netlify, Vercel, AWS S3)
```

### Admin Panel
```bash
cd admin-panel
npm run build
# Deploy build/ folder to admin.yourdomain.com
```

### Backend
```bash
cd backend
mvn clean package
# Deploy JAR file to server
java -jar target/coming-soon-backend-0.0.1-SNAPSHOT.jar
```

### Important for Production
- [ ] Add authentication to admin panel
- [ ] Update CORS settings in backend
- [ ] Use production database (PostgreSQL/MySQL)
- [ ] Enable HTTPS
- [ ] Set environment variables
- [ ] Update API URLs in frontend

---

## 📞 Support

### Documentation Files
- `README.md` - Technical documentation
- `START_HERE.md` - Quick start guide
- `00_START_HERE_FIRST.txt` - Simple instructions
- `admin-panel/README.md` - Admin panel docs
- `CLEANUP_SUMMARY.md` - Recent changes

### Common Commands
```bash
# Start everything
start-all.bat

# Stop everything
stop-all.bat

# Install dependencies
npm install
cd admin-panel && npm install && cd ..

# Build for production
npm run build
cd admin-panel && npm run build && cd ..
```

---

## ✅ Checklist

### First Time Setup
- [ ] Install Java 17+
- [ ] Install Maven 3.6+
- [ ] Install Node.js 14+
- [ ] Run `npm install` in root
- [ ] Run `npm install` in admin-panel
- [ ] Run `start-all.bat`
- [ ] Verify all three services start
- [ ] Access website at http://localhost:3000
- [ ] Access admin at http://localhost:3001

### Daily Use
- [ ] Run `start-all.bat`
- [ ] Wait for backend to fully start
- [ ] Use website and admin panel
- [ ] Run `stop-all.bat` when done

---

**You're all set!** 🎉

For detailed technical information, see `README.md`
