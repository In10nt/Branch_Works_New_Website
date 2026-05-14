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
- **React 18.2.0** - Modern UI framework
- **React Router DOM 6.20.0** - Navigation
- **Axios 1.6.2** - HTTP client
- **React Quill 2.0.0** - Rich text editor

## 📁 Project Structure

```
Branch Works/
├── admin-panel/               # React Admin Panel
│   ├── src/
│   │   ├── components/       # Layout components
│   │   ├── pages/            # Admin pages
│   │   │   ├── Dashboard.jsx # Overview dashboard
│   │   │   ├── BlogList.jsx  # Blog management
│   │   │   ├── BlogEditor.jsx # Blog editor
│   │   │   ├── CareerList.jsx # Career management
│   │   │   └── CareerEditor.jsx # Career editor
│   │   └── App.js           # Admin app routing
│   ├── public/              # Admin static assets
│   └── package.json         # Admin dependencies
│
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

2. **Install React dependencies for main website:**
   ```bash
   npm install
   ```

3. **Install React dependencies for admin panel:**
   ```bash
   cd admin-panel
   npm install
   cd ..
   ```

4. **Start all services:**
   - **Windows:** Double-click `start-all.bat`
   - **Manual:** See START_HERE.md for individual commands

### Access the Application

- **Website:** http://localhost:3000
- **Admin Panel:** http://localhost:3001 (or click "Admin" in footer)
- **Backend API:** http://localhost:5000/api

### Admin Features
- **Dashboard:** Overview statistics for blogs and careers
- **Blog Management:** Create, edit, delete blog posts with rich text editor
- **Career Management:** Post, edit, delete career openings
- No separate login required - direct access to admin features

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
- ✅ Rich text editor with formatting options (React Quill)
- ✅ Image URL support
- ✅ Category assignment (Finance, Technology Support, Offshore Hiring)
- ✅ Draft/Publish status toggle
- ✅ SEO-friendly slug generation
- ✅ Modern React-based admin interface

### Career Management Features
- ✅ Post, edit, and delete career openings
- ✅ Job details: title, location, type, experience, salary
- ✅ Skills tags and requirements
- ✅ Responsibilities and qualifications
- ✅ Active/inactive status toggle
- ✅ Posted date tracking

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
cd admin-panel
npm start
```
Admin panel runs on http://localhost:3001

## 📡 API Endpoints

### Blog Endpoints
- `GET /api/blogs` - Get all published blogs
- `GET /api/blogs/{slug}` - Get blog by slug
- `GET /api/blogs/category/{category}` - Get blogs by category
- `GET /api/admin/blogs` - Get all blogs (including drafts)
- `GET /api/admin/blogs/{id}` - Get blog by ID
- `POST /api/admin/blogs` - Create new blog
- `PUT /api/admin/blogs/{id}` - Update blog
- `DELETE /api/admin/blogs/{id}` - Delete blog
- `PATCH /api/admin/blogs/{id}/publish` - Toggle publish status

### Career Endpoints
- `GET /api/careers` - Get all careers
- `GET /api/careers/{id}` - Get career by ID
- `POST /api/careers` - Create new career
- `PUT /api/careers/{id}` - Update career
- `DELETE /api/careers/{id}` - Delete career

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
- author (String)
- category (String)
- imageUrl (String)
- published (Boolean)
- createdAt (LocalDateTime)
- updatedAt (LocalDateTime)

**Career Table:**
- id (Long, Primary Key)
- title (String)
- description (Text)
- location (String)
- type (String: Full-time/Part-time/Contract/Internship)
- experience (String)
- salary (String)
- skills (String)
- responsibilities (Text)
- qualifications (Text)
- active (Boolean)
- postedDate (LocalDateTime)

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

- Admin panel runs on separate port (3001) for isolation
- CORS is configured for localhost development
- Input validation on both frontend and backend
- For production: implement proper authentication (JWT/OAuth)

## 🚢 Deployment

### Frontend (React Website)
```bash
npm run build
```
Deploy the `build/` folder to any static hosting (Netlify, Vercel, AWS S3, etc.)

### Admin Panel (React)
```bash
cd admin-panel
npm run build
```
Deploy the `build/` folder to a separate subdomain or path (e.g., admin.yourdomain.com)

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
netstat -ano | findstr :3001
netstat -ano | findstr :5000
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
