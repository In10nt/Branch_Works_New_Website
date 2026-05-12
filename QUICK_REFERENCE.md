# ⚡ BranchWorks Quick Reference

## 🚀 Start Application
```
Double-click: start-all.bat
```

## 🛑 Stop Application
```
Double-click: stop-all.bat
```

## 🌐 URLs

| Service | URL | Purpose |
|---------|-----|---------|
| **Website** | http://localhost:3000 | Main website |
| **Admin Panel** | http://localhost:8080 | Blog management |
| **Backend API** | http://localhost:5000/api | REST API |

## 🔐 Login Credentials

| Field | Value |
|-------|-------|
| **Username** | admin |
| **Password** | admin123 |

## 📁 Important Files

| File | Purpose |
|------|---------|
| `start-all.bat` | Start all services |
| `stop-all.bat` | Stop all services |
| `START_HERE.md` | Quick start guide |
| `USAGE_GUIDE.md` | Detailed usage instructions |
| `README.md` | Technical documentation |

## 🎯 Common Tasks

### Access Admin Panel
1. Open website: http://localhost:3000
2. Scroll to footer
3. Click "Admin" link
4. Login with credentials above

### Create Blog
1. Login to admin panel
2. Click "Create New Blog"
3. Fill form:
   - Title
   - Slug (URL-friendly)
   - Category (Finance/Technology Support/Offshore Hiring)
   - Content
   - Image
   - Status (Draft/Published)
4. Click "Publish Blog"

### View Blog on Website
1. Go to http://localhost:3000
2. Navigate to category page (Finance/Technology Support/Offshore Hiring)
3. Scroll to "Customer Stories"
4. Click "Read more" on blog card

## 📂 Folder Structure

```
Branch Works/
├── backend/              → Spring Boot API
├── blog-admin/           → Admin panel
├── src/                  → React website
├── public/               → Static files
├── start-all.bat         → START HERE
└── stop-all.bat          → STOP HERE
```

## 🎨 Blog Categories

| Category | Shows On |
|----------|----------|
| **Finance** | Finance page, Blog page, Home page |
| **Technology Support** | Technology Support page, Blog page, Home page |
| **Offshore Hiring** | Offshore Hiring page, Blog page, Home page |

## 🔧 Troubleshooting

| Problem | Solution |
|---------|----------|
| Services won't start | Run `stop-all.bat` first, then `start-all.bat` |
| Admin panel not loading | Check Python server is running (command window open) |
| Blogs not showing | Check status is "Published" and correct category |
| Port already in use | Close other applications, run `stop-all.bat` |

## 📞 Port Numbers

| Port | Service |
|------|---------|
| **3000** | React Website |
| **5000** | Spring Boot Backend |
| **8080** | Admin Panel |

## ⚙️ System Requirements

- ✅ Java 17+
- ✅ Maven 3.6+
- ✅ Node.js 14+
- ✅ Python 3.7+

## 📝 Content Formatting

| Format | Syntax |
|--------|--------|
| **Paragraph** | Double line break |
| **Heading** | Start line with # |
| **List** | Start line with - or * |

## 🎯 Daily Workflow

```
1. Double-click start-all.bat
2. Wait 30 seconds
3. Click Admin in footer
4. Login
5. Create/edit blogs
6. View on website
7. Double-click stop-all.bat when done
```

## 🆘 Emergency Commands

### Kill All Java Processes (Backend)
```cmd
taskkill /F /IM java.exe
```

### Kill All Node Processes (React)
```cmd
taskkill /F /IM node.exe
```

### Kill All Python Processes (Admin)
```cmd
taskkill /F /IM python.exe
```

### Check What's Using Port 3000
```cmd
netstat -ano | findstr :3000
```

### Check What's Using Port 5000
```cmd
netstat -ano | findstr :5000
```

### Check What's Using Port 8080
```cmd
netstat -ano | findstr :8080
```

---

**Keep this file handy for quick reference! 📌**
