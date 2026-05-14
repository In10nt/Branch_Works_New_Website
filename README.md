# BranchWorks Global - Corporate Website & CMS

A full-stack web application featuring a corporate website with an integrated Content Management System (CMS) for managing blog posts and career openings.

## 🚀 Quick Start for Clients

**New to this project?** Start here:
- 📖 **[COMPLETE_CLIENT_GUIDE.md](COMPLETE_CLIENT_GUIDE.md)** - Complete all-in-one guide with everything you need

This comprehensive guide includes:
- Database setup (H2, MySQL, PostgreSQL)
- Complete configuration steps
- Local testing instructions
- Production deployment
- Security checklist
- Troubleshooting

The project includes a **pre-configured database** with sample data (2 blogs, careers, admin user).

## 📋 Table of Contents

- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [Admin Panel Setup](#admin-panel-setup)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Building for Production](#building-for-production)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)
- [Default Admin Credentials](#default-admin-credentials)
- [Features](#features)
- [API Documentation](#api-documentation)

## 📁 Project Structure

```
branchworks-global/
├── frontend/                  # Frontend React Application
│   ├── public/               # Static assets
│   ├── src/                  # React source code
│   │   ├── components/      # React components
│   │   ├── config/          # API configuration
│   │   └── App.js           # Main React app
│   ├── package.json         # Frontend dependencies
│   └── .env.example         # Frontend environment template
├── backend/                  # Backend Spring Boot Application
│   ├── admin-panel/         # Admin CMS React app
│   │   ├── src/            # Admin panel source
│   │   ├── package.json    # Admin dependencies
│   │   └── .env.example    # Admin environment template
│   ├── src/main/
│   │   ├── java/           # Java source code
│   │   └── resources/      # Application resources
│   ├── data/               # H2 database files (auto-created)
│   ├── pom.xml             # Maven configuration
│   └── application.properties.example  # Backend config template
├── database/                 # Database Files & Schemas
│   ├── branchworks_db.mv.db      # H2 database with current data
│   ├── branchworks_db.trace.db   # H2 trace file
│   ├── blog-schema.sql           # Blog table schema
│   ├── import-current-blogs.sql  # Sample blog data
│   └── README.md                 # Database documentation
├── .gitignore               # Git ignore rules
├── README.md                # This file
└── HANDOVER_CHECKLIST.md    # Client handover checklist
```

## 🛠 Technology Stack

### Frontend
- **React** 18.x - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client

### Backend
- **Spring Boot** 3.2.0 - Java framework
- **Spring Security** - Authentication & authorization
- **JWT** - Token-based authentication
- **Spring Data JPA** - Database ORM
- **H2 Database** - Embedded database (development)
- **MySQL/PostgreSQL** - Production database options
- **Maven** - Build tool

### Admin Panel
- **React** 18.x - CMS interface
- **React Router** - Admin routing
- **Axios** - API communication

## ✅ Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 16.x or higher ([Download](https://nodejs.org/))
- **npm** 8.x or higher (comes with Node.js)
- **Java JDK** 17 or higher ([Download](https://www.oracle.com/java/technologies/downloads/))
- **Maven** 3.6 or higher ([Download](https://maven.apache.org/download.cgi))
- **Git** (optional, for version control)

### Verify Installation

```bash
node --version
npm --version
java --version
mvn --version
```

## 🚀 Frontend Setup

### 1. Navigate to Frontend Directory

```bash
cd frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the frontend directory:

```bash
cp .env.example .env
```

Edit `.env` and set your backend API URL:

```env
REACT_APP_API_URL=http://localhost:5000
```

### 4. Run Development Server

```bash
npm start
```

The frontend will be available at `http://localhost:3000`

### 5. Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` directory.

## 🔧 Backend Setup

### 1. Navigate to Backend Directory

```bash
cd backend
```

### 2. Configure Application Properties

Create `application.properties` from the example:

```bash
cp application.properties.example src/main/resources/application.properties
```

Edit `src/main/resources/application.properties` and configure:

```properties
# Server Port
server.port=5000

# Database (H2 for development)
spring.datasource.url=jdbc:h2:file:./data/branchworks_db
spring.datasource.username=sa
spring.datasource.password=

# Email Configuration
spring.mail.username=YOUR_EMAIL@gmail.com
spring.mail.password=YOUR_APP_PASSWORD
company.email=YOUR_COMPANY_EMAIL@example.com

# JWT Secret (Generate a secure random string)
jwt.secret=YOUR_SECURE_JWT_SECRET_KEY_HERE
```

**Important:** 
- Replace `YOUR_EMAIL@gmail.com` with your Gmail address
- Replace `YOUR_APP_PASSWORD` with a Gmail App Password ([How to generate](https://support.google.com/accounts/answer/185833))
- Replace `YOUR_SECURE_JWT_SECRET_KEY_HERE` with a secure random string (at least 256 bits)

### 3. Build the Backend

```bash
mvn clean package -DskipTests
```

### 4. Run the Backend

```bash
java -jar target/coming-soon-backend-0.0.1-SNAPSHOT.jar
```

Or use Maven:

```bash
mvn spring-boot:run
```

The backend will be available at `http://localhost:5000`

## 👨‍💼 Admin Panel Setup

The admin panel is a separate React application embedded in the backend.

### 1. Navigate to Admin Panel Directory

```bash
cd backend/admin-panel
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create `.env` file:

```bash
cp .env.template .env
```

Edit `.env`:

```env
REACT_APP_API_URL=http://localhost:5000
```

### 4. Build Admin Panel

```bash
npm run build
```

The build files will be automatically copied to `backend/src/main/resources/static/admin/`

### 5. Access Admin Panel

After building and running the backend, access the admin panel at:

```
http://localhost:5000/admin/
```

## 🗄 Database Setup

### Development (H2 Database)

The application uses H2 embedded database by default. No setup required - the database is created automatically on first run.

**H2 Console Access:**
- URL: `http://localhost:5000/h2-console`
- JDBC URL: `jdbc:h2:file:./data/branchworks_db`
- Username: `sa`
- Password: (leave empty)

### Production (MySQL)

1. **Create Database:**

```sql
CREATE DATABASE branchworks_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2. **Update `application.properties`:**

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/branchworks_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=your_mysql_username
spring.datasource.password=your_mysql_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
```

3. **Disable H2 Console:**

```properties
spring.h2.console.enabled=false
```

### Production (PostgreSQL)

1. **Create Database:**

```sql
CREATE DATABASE branchworks_db;
```

2. **Update `application.properties`:**

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/branchworks_db
spring.datasource.username=your_postgres_username
spring.datasource.password=your_postgres_password
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
```

### Create Admin User

After first run, create an admin user via H2 Console or your database client:

```sql
INSERT INTO users (username, password, role, created_at, updated_at) 
VALUES ('admin', '$2a$10$xqz8Qz8Qz8Qz8Qz8Qz8Qz8Qz8Qz8Qz8Qz8Qz8Qz8Qz8Qz8Qz8', 'ADMIN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
```

**Note:** The password above is BCrypt hashed. You'll need to generate your own hash or use the application to create users.

## ▶️ Running the Application

### Development Mode

1. **Start Backend (from project root):**
```bash
cd backend
mvn spring-boot:run
```

2. **Start Frontend (in a new terminal, from project root):**
```bash
cd frontend
npm start
```

3. **Access:**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5000`
   - Admin Panel: `http://localhost:5000/admin/`
   - H2 Console: `http://localhost:5000/h2-console`

### Production Mode

1. **Build Frontend (from project root):**
```bash
cd frontend
npm run build
cd ..
```

2. **Build Admin Panel (from project root):**
```bash
cd backend/admin-panel
npm run build
cd ../..
```

3. **Build Backend (from project root):**
```bash
cd backend
mvn clean package -DskipTests
```

4. **Run Backend (serves both frontend and admin):**
```bash
java -jar target/coming-soon-backend-0.0.1-SNAPSHOT.jar
```

5. **Access:**
   - Application: `http://localhost:5000`
   - Admin Panel: `http://localhost:5000/admin/`

## 🏗 Building for Production

### Complete Build Process (from project root)

```bash
# 1. Build Frontend
cd frontend
npm run build
cd ..

# 2. Build Admin Panel
cd backend/admin-panel
npm run build
cd ../..

# 3. Build Backend (includes frontend and admin panel)
cd backend
mvn clean package -DskipTests
cd ..
```

### Output

- Frontend build: `frontend/build/`
- Admin Panel build: `backend/admin-panel/build/` (copied to backend resources)
- Backend JAR: `backend/target/coming-soon-backend-0.0.1-SNAPSHOT.jar`

## 🚢 Deployment

### Option 1: Traditional Server Deployment

1. **Prepare Server:**
   - Install Java 17+
   - Install MySQL/PostgreSQL
   - Configure firewall (ports 80, 443, 5000)

2. **Deploy Backend:**
```bash
# Copy JAR to server
scp backend/target/coming-soon-backend-0.0.1-SNAPSHOT.jar user@server:/opt/branchworks/

# SSH to server
ssh user@server

# Run application
cd /opt/branchworks
java -jar coming-soon-backend-0.0.1-SNAPSHOT.jar
```

3. **Setup as Service (systemd):**

Create `/etc/systemd/system/branchworks.service`:

```ini
[Unit]
Description=BranchWorks Application
After=syslog.target

[Service]
User=branchworks
ExecStart=/usr/bin/java -jar /opt/branchworks/coming-soon-backend-0.0.1-SNAPSHOT.jar
SuccessExitStatus=143

[Install]
WantedBy=multi-user.target
```

Enable and start:
```bash
sudo systemctl enable branchworks
sudo systemctl start branchworks
```

### Option 2: AWS Deployment

#### Frontend (S3 + CloudFront)

1. **Create S3 Bucket**
2. **Upload build files**
3. **Configure CloudFront distribution**
4. **Update REACT_APP_API_URL to backend URL**

#### Backend (EC2 or Elastic Beanstalk)

**EC2:**
1. Launch EC2 instance
2. Install Java 17
3. Copy JAR file
4. Run as service

**Elastic Beanstalk:**
1. Create application
2. Upload JAR file
3. Configure environment variables

### Option 3: Docker Deployment

Create `Dockerfile` in backend directory:

```dockerfile
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/coming-soon-backend-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 5000
ENTRYPOINT ["java","-jar","app.jar"]
```

Build and run:
```bash
docker build -t branchworks-backend .
docker run -p 5000:5000 branchworks-backend
```

## 🔐 Environment Variables

### Frontend (.env)

```env
REACT_APP_API_URL=http://localhost:5000
```

### Admin Panel (backend/admin-panel/.env)

```env
REACT_APP_API_URL=http://localhost:5000
```

### Backend (application.properties)

See `backend/application.properties.example` for all available configuration options.

## 🔑 Default Admin Credentials

**Important:** Change these credentials immediately after first login!

- **Username:** `admin`
- **Password:** `admin123`

To change the password:
1. Login to admin panel
2. Go to Settings (if available) or
3. Update directly in database using BCrypt hash

## ✨ Features

### Public Website
- Responsive corporate website
- Service pages (Finance, Technology Support, Offshore Hiring)
- Blog listing and detail pages
- Career openings page
- Contact form
- About page

### Admin CMS
- **Dashboard:** Overview of blogs and careers
- **Blog Management:**
  - Create, edit, delete blog posts
  - Rich text editor
  - Image upload
  - Publish/unpublish
  - SEO fields (title, excerpt, slug)
- **Career Management:**
  - Post job openings
  - Edit job details
  - Activate/deactivate listings
  - LinkedIn integration
- **Authentication:**
  - JWT-based login
  - Protected routes
  - Session management

## 📚 API Documentation

### Public Endpoints

```
GET  /api/blogs              - Get all published blogs
GET  /api/blogs/{slug}       - Get blog by slug
GET  /api/careers            - Get all active careers
POST /api/contact            - Submit contact form
GET  /api/health             - Health check
```

### Admin Endpoints (Requires Authentication)

```
POST /api/auth/login         - Admin login

GET    /api/admin/blogs      - Get all blogs
GET    /api/admin/blogs/{id} - Get blog by ID
POST   /api/admin/blogs      - Create blog
PUT    /api/admin/blogs/{id} - Update blog
DELETE /api/admin/blogs/{id} - Delete blog
PATCH  /api/admin/blogs/{id}/publish - Publish/unpublish blog

GET    /api/admin/careers      - Get all careers
GET    /api/admin/careers/{id} - Get career by ID
POST   /api/admin/careers      - Create career
PUT    /api/admin/careers/{id} - Update career
DELETE /api/admin/careers/{id} - Delete career

POST /api/admin/upload       - Upload image
```

### Authentication

Include JWT token in Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## 🐛 Troubleshooting

### Frontend won't start
- Check Node.js version: `node --version` (should be 16+)
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check port 3000 is not in use

### Backend won't start
- Check Java version: `java --version` (should be 17+)
- Verify `application.properties` is configured
- Check port 5000 is not in use
- Check database connection settings

### Admin panel shows blank page
- Rebuild admin panel: `cd backend/admin-panel && npm run build`
- Rebuild backend: `cd backend && mvn clean package`
- Clear browser cache
- Check browser console for errors

### Database errors
- For H2: Delete `backend/data/` folder and restart
- For MySQL/PostgreSQL: Verify connection settings and credentials
- Check `spring.jpa.hibernate.ddl-auto=update` is set

### Email not sending
- Verify Gmail App Password is correct
- Check Gmail account allows less secure apps
- Verify SMTP settings in `application.properties`

## 📞 Support

For issues or questions:
1. Check this README
2. Review application logs
3. Check browser console for frontend errors
4. Review backend logs for API errors

## 📄 License

Proprietary - All rights reserved by BranchWorks Global

---

**Built with ❤️ for BranchWorks Global**
