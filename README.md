# BranchWorks - Coming Soon Website with Blog Management

A full-stack web application featuring a modern landing page with integrated blog management system.

## 🏗️ Technology Stack

### Frontend
- **React 18.2.0** - UI framework
- **React Router DOM 7.14.2** - Client-side routing
- **Axios 1.4.0** - HTTP client for API calls
- **CSS3** - Custom styling with responsive design

### Backend
- **Spring Boot 3.2.0** - Java backend framework
- **Java 17** - Programming language
- **H2 Database** - File-based database for blog storage
- **Maven** - Build and dependency management

### Admin Panel
- **Vanilla JavaScript** - No framework dependencies
- **Python HTTP Server** - Static file serving
- **HTML5/CSS3** - Modern web standards

## 📁 Project Structure

```
Branch Works/
├── backend/                    # Spring Boot backend
│   ├── src/main/java/         # Java source code
│   │   └── com/branchworks/comingsoon/
│   │       ├── controller/    # REST API endpoints
│   │       ├── service/       # Business logic
│   │       ├── model/         # Data models
│   │       ├── repository/    # Database access
│   │       └── config/        # Configuration
│   ├── src/main/resources/    # Application resources
│   │   ├── application.properties
│   │   └── static/uploads/    # Blog images storage
│   ├── data/                  # H2 database files
│   └── pom.xml               # Maven configuration
│
├── blog-admin/                # Admin panel
│   ├── index.html            # Login page
│   ├── blogs.html            # Blog list page
│   ├── editor.html           # Blog editor
│   ├── css/                  # Stylesheets
│   ├── js/                   # JavaScript files
│   └── README.md             # Admin documentation
│
├── src/                      # React source code
│   ├── components/           # React components
│   │   ├── HomePage.jsx      # Landing page
│   │   ├── Blog.jsx          # Blog listing
│   │   ├── BlogDetail.jsx    # Blog detail page
│   │   ├── Finance.jsx       # Finance page
│   │   ├── TechnologySupport.jsx
│   │   ├── OffshoreHiring.jsx
│   │   └── Footer.jsx        # Footer with Admin link
│   └── App.js               # Main app component
│
├── public/                   # Static assets
│   ├── images/              # Image files
│   └── index.html           # HTML template
│
├── start-all.bat            # Start all services (Windows)
├── stop-all.bat             # Stop all services (Windows)
└── START_HERE.md            # Quick start guide
```

## 🚀 Quick Start

### Prerequisites
- **Java 17+** - [Download](https://www.oracle.com/java/technologies/downloads/)
- **Maven 3.6+** - [Download](https://maven.apache.org/download.cgi)
- **Node.js 14+** - [Download](https://nodejs.org/)
- **Python 3.7+** - [Download](https://www.python.org/downloads/)

### Installation

1. **Clone or download the project**

2. **Install React dependencies:**
   ```bash
   npm install
   ```

3. **Start all services:**
   - **Windows:** Double-click `start-all.bat`
   - **Manual:** See START_HERE.md for individual commands

### Access the Application

- **Website:** http://localhost:3000
- **Admin Panel:** http://localhost:8080 (or click "Admin" in footer)
- **Backend API:** http://localhost:5000/api

### Admin Credentials
- **Username:** admin
- **Password:** admin123

## 📋 Features

### Website Features
- ✅ Modern, responsive landing page
- ✅ Dynamic blog system with category filtering
- ✅ Industry-specific pages (Finance, Technology Support, Offshore Hiring)
- ✅ Customer stories section with dynamic blogs
- ✅ Mobile-responsive design
- ✅ SEO-friendly blog detail pages

### Blog Management Features
- ✅ Create, edit, and delete blog posts
- ✅ Rich text content with automatic formatting
- ✅ Image upload and management
- ✅ Category assignment (Finance, Technology Support, Offshore Hiring)
- ✅ Draft/Publish status
- ✅ SEO-friendly slug generation
- ✅ Blog import from existing data

### Category Filtering
- **Finance Page** → Shows only Finance category blogs
- **Technology Support Page** → Shows only Technology Support blogs
- **Offshore Hiring Page** → Shows only Offshore Hiring blogs
- **Home & Blog Pages** → Shows all published blogs

## 🔧 Development

### Backend Development
```bash
cd backend
mvn spring-boot:run
```
Backend runs on http://localhost:5000

### Frontend Development
```bash
npm start
```
React app runs on http://localhost:3000

### Admin Panel Development
```bash
cd blog-admin
python -m http.server 8080
```
Admin panel runs on http://localhost:8080

## 📡 API Endpoints

### Blog Endpoints
- `GET /api/blogs` - Get all published blogs
- `GET /api/blogs/{slug}` - Get blog by slug
- `GET /api/blogs/category/{category}` - Get blogs by category
- `POST /api/blogs` - Create new blog
- `PUT /api/blogs/{id}` - Update blog
- `DELETE /api/blogs/{id}` - Delete blog

### File Upload
- `POST /api/upload` - Upload blog image

## 🗄️ Database

- **Type:** H2 File-based Database
- **Location:** `backend/data/branchworks_db.mv.db`
- **Console:** http://localhost:5000/h2-console (if enabled)

### Database Schema

**WaitlistEntry Table:**
- id (Long, Primary Key)
- email (String)
- createdAt (LocalDateTime)

**BlogPost Table:**
- id (Long, Primary Key)
- title (String)
- slug (String, Unique)
- content (Text)
- excerpt (String)
- category (String)
- imageUrl (String)
- status (String: DRAFT/PUBLISHED)
- createdAt (LocalDateTime)
- updatedAt (LocalDateTime)

## 🎨 Styling

- **Primary Color:** #172554 (Dark Blue)
- **Accent Color:** #3B82F6 (Blue)
- **Font:** System fonts (-apple-system, BlinkMacSystemFont, Segoe UI, Roboto)
- **Design:** Modern, clean, professional

## 📱 Responsive Breakpoints

- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

## 🔒 Security Notes

- Default admin credentials should be changed in production
- CORS is configured for localhost development
- File uploads are restricted to images
- Input validation on both frontend and backend

## 🚢 Deployment

### Frontend (React)
```bash
npm run build
```
Deploy the `build/` folder to any static hosting (Netlify, Vercel, AWS S3, etc.)

### Backend (Spring Boot)
```bash
cd backend
mvn clean package
java -jar target/coming-soon-backend-0.0.1-SNAPSHOT.jar
```

### Environment Variables
Update `backend/src/main/resources/application.properties` for production:
- Database connection
- CORS allowed origins
- File upload paths

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :3000
netstat -ano | findstr :5000
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

### Backend Won't Start
- Check Java version: `java -version` (need 17+)
- Check Maven: `mvn -version`
- Delete `backend/target/` and rebuild

### React Won't Start
- Delete `node_modules/` and `package-lock.json`
- Run `npm install` again
- Clear npm cache: `npm cache clean --force`

### Database Issues
- Delete `backend/data/branchworks_db.mv.db`
- Restart backend (database will be recreated)
- Re-import blogs using admin panel

## 📝 License

Private project - All rights reserved

## 👥 Support

For issues or questions, contact the development team.

---

**Last Updated:** May 2026
**Version:** 1.0.0
