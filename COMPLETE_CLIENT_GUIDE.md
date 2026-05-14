# BranchWorks Global - Complete Setup & Deployment Guide

## 📋 Table of Contents

1. [What You Received](#what-you-received)
2. [Prerequisites](#prerequisites)
3. [Database Setup Options](#database-setup-options)
4. [Configuration Guide](#configuration-guide)
5. [First Time Setup](#first-time-setup)
6. [Running Locally](#running-locally)
7. [Testing the Application](#testing-the-application)
8. [Building for Production](#building-for-production)
9. [Production Deployment](#production-deployment)
10. [Security Checklist](#security-checklist)
11. [Troubleshooting](#troubleshooting)

---

## 📦 What You Received

```
Branch Works/
├── frontend/                          # React Website Application
│   ├── public/                       # Static assets (images, videos)
│   ├── src/                          # React source code
│   ├── package.json                  # Dependencies
│   └── .env.example                  # Environment template
│
├── backend/                           # Spring Boot Backend + Admin Panel
│   ├── admin-panel/                  # Admin CMS React App
│   │   ├── src/                     # Admin panel source
│   │   ├── package.json             # Dependencies
│   │   └── .env.example             # Environment template
│   ├── src/main/                     # Java source code
│   ├── pom.xml                       # Maven configuration
│   └── application.properties.example # Backend config template
│
├── database/                          # ⭐ Your Current Database
│   ├── branchworks_db.mv.db          # H2 database with your data
│   ├── branchworks_db.trace.db       # H2 trace file
│   ├── blog-schema.sql               # Blog table schema
│   ├── import-current-blogs.sql      # Sample blog data
│   └── README.md                     # Database documentation
│
└── Documentation/
    ├── README.md                      # Full project documentation
    ├── COMPLETE_CLIENT_GUIDE.md       # This file
    └── Other guides...
```

### What's Included in the Database:
- ✅ 2 published blog posts
- ✅ Career postings with all fields
- ✅ Admin user (username: `admin`, password: `admin123`)
- ✅ All database tables pre-configured

---

## ✅ Prerequisites

Before you begin, install the following:

### Required Software:
- **Node.js** 16.x or higher → [Download](https://nodejs.org/)
- **npm** 8.x or higher (comes with Node.js)
- **Java JDK** 17 or higher → [Download](https://www.oracle.com/java/technologies/downloads/)
- **Maven** 3.6 or higher → [Download](https://maven.apache.org/download.cgi)

### Optional (for production):
- **MySQL** 8.0+ → [Download](https://dev.mysql.com/downloads/mysql/)
- **PostgreSQL** 13+ → [Download](https://www.postgresql.org/download/)

### Verify Installation:
```bash
node --version    # Should show v16.x or higher
npm --version     # Should show 8.x or higher
java --version    # Should show 17 or higher
mvn --version     # Should show 3.6 or higher
```

---

## 🗄️ Database Setup Options

You have **3 options** for setting up the database. Choose based on your needs:

### Option 1: Use Existing H2 Database ⭐ RECOMMENDED FOR TESTING

**Best for:** Quick setup, testing, development, small deployments

**Pros:**
- ✅ No additional software needed
- ✅ All your data already included
- ✅ Works immediately
- ✅ Perfect for testing

**Cons:**
- ❌ Not recommended for high-traffic production
- ❌ File-based (single file can be a bottleneck)

**Setup Steps:**

1. **Copy database files:**
   ```bash
   # From project root
   mkdir backend/data
   cp database/branchworks_db.mv.db backend/data/
   cp database/branchworks_db.trace.db backend/data/
   ```

2. **Configure in `application.properties`:**
   ```properties
   # H2 Database Configuration
   spring.datasource.url=jdbc:h2:file:./data/branchworks_db
   spring.datasource.username=sa
   spring.datasource.password=
   spring.datasource.driver-class-name=org.h2.Driver
   spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
   
   # H2 Console (for database management)
   spring.h2.console.enabled=true
   spring.h2.console.path=/h2-console
   
   # JPA Configuration
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=false
   ```

3. **Access H2 Console (optional):**
   - URL: `http://localhost:5000/h2-console`
   - JDBC URL: `jdbc:h2:file:./data/branchworks_db`
   - Username: `sa`
   - Password: (leave empty)

---

### Option 2: Use MySQL Database ⭐ RECOMMENDED FOR PRODUCTION

**Best for:** Production deployments, high traffic, scalability

**Pros:**
- ✅ Production-ready
- ✅ Better performance
- ✅ Supports high concurrent access
- ✅ Advanced features (replication, backup)
- ✅ Industry standard

**Cons:**
- ❌ Requires MySQL installation
- ❌ Additional configuration

**Setup Steps:**

1. **Install MySQL:**
   - Download from: https://dev.mysql.com/downloads/mysql/
   - Or use cloud MySQL (AWS RDS, Google Cloud SQL, Azure Database)

2. **Create Database:**
   ```sql
   # Connect to MySQL
   mysql -u root -p
   
   # Create database
   CREATE DATABASE branchworks_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   
   # Create user (optional but recommended)
   CREATE USER 'branchworks'@'localhost' IDENTIFIED BY 'your_secure_password';
   GRANT ALL PRIVILEGES ON branchworks_db.* TO 'branchworks'@'localhost';
   FLUSH PRIVILEGES;
   ```

3. **Import Data (Optional - or let app create tables):**
   ```bash
   # If you want to import existing data
   mysql -u root -p branchworks_db < database/blog-schema.sql
   mysql -u root -p branchworks_db < database/import-current-blogs.sql
   ```

4. **Configure in `application.properties`:**
   ```properties
   # MySQL Database Configuration
   spring.datasource.url=jdbc:mysql://localhost:3306/branchworks_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
   spring.datasource.username=branchworks
   spring.datasource.password=your_secure_password
   spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
   spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
   
   # JPA Configuration
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=false
   
   # Disable H2 Console
   spring.h2.console.enabled=false
   ```

5. **Add MySQL Dependency (already included in pom.xml):**
   ```xml
   <dependency>
       <groupId>com.mysql</groupId>
       <artifactId>mysql-connector-j</artifactId>
       <scope>runtime</scope>
   </dependency>
   ```

---

### Option 3: Use PostgreSQL Database

**Best for:** Production deployments, advanced features, JSON support

**Setup Steps:**

1. **Install PostgreSQL:**
   - Download from: https://www.postgresql.org/download/
   - Or use cloud PostgreSQL

2. **Create Database:**
   ```sql
   # Connect to PostgreSQL
   psql -U postgres
   
   # Create database
   CREATE DATABASE branchworks_db;
   
   # Create user (optional)
   CREATE USER branchworks WITH PASSWORD 'your_secure_password';
   GRANT ALL PRIVILEGES ON DATABASE branchworks_db TO branchworks;
   ```

3. **Configure in `application.properties`:**
   ```properties
   # PostgreSQL Database Configuration
   spring.datasource.url=jdbc:postgresql://localhost:5432/branchworks_db
   spring.datasource.username=branchworks
   spring.datasource.password=your_secure_password
   spring.datasource.driver-class-name=org.postgresql.Driver
   spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
   
   # JPA Configuration
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=false
   
   # Disable H2 Console
   spring.h2.console.enabled=false
   ```

---

## ⚙️ Configuration Guide

### 1. Backend Configuration

**File:** `backend/src/main/resources/application.properties`

Create this file from the template:
```bash
cp backend/application.properties.example backend/src/main/resources/application.properties
```

**Complete Configuration Template:**

```properties
# ============================================
# SERVER CONFIGURATION
# ============================================
server.port=5000

# ============================================
# DATABASE CONFIGURATION (Choose one option)
# ============================================

# Option 1: H2 Database (for testing)
spring.datasource.url=jdbc:h2:file:./data/branchworks_db
spring.datasource.username=sa
spring.datasource.password=
spring.datasource.driver-class-name=org.h2.Driver
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

# Option 2: MySQL Database (for production)
# spring.datasource.url=jdbc:mysql://localhost:3306/branchworks_db?useSSL=false&serverTimezone=UTC
# spring.datasource.username=YOUR_MYSQL_USERNAME
# spring.datasource.password=YOUR_MYSQL_PASSWORD
# spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
# spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
# spring.h2.console.enabled=false

# Option 3: PostgreSQL Database (for production)
# spring.datasource.url=jdbc:postgresql://localhost:5432/branchworks_db
# spring.datasource.username=YOUR_POSTGRES_USERNAME
# spring.datasource.password=YOUR_POSTGRES_PASSWORD
# spring.datasource.driver-class-name=org.postgresql.Driver
# spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
# spring.h2.console.enabled=false

# ============================================
# JPA/HIBERNATE CONFIGURATION
# ============================================
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.format_sql=true

# ============================================
# EMAIL CONFIGURATION (REQUIRED)
# ============================================
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=YOUR_EMAIL@gmail.com
spring.mail.password=YOUR_16_CHAR_APP_PASSWORD
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
company.email=info@yourcompany.com

# ============================================
# JWT CONFIGURATION (REQUIRED)
# ============================================
jwt.secret=YOUR_SECURE_JWT_SECRET_KEY_HERE_MINIMUM_64_CHARACTERS
jwt.expiration=86400000

# ============================================
# FILE UPLOAD CONFIGURATION
# ============================================
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB
file.upload-dir=./uploads

# ============================================
# LOGGING CONFIGURATION
# ============================================
logging.level.root=INFO
logging.level.com.branchworks=DEBUG
```

#### How to Get Gmail App Password:

1. Go to your Google Account: https://myaccount.google.com/
2. Click **Security** in the left menu
3. Under "Signing in to Google," click **2-Step Verification** (enable if not already)
4. Scroll down and click **App passwords**
5. Select **Mail** and **Other (Custom name)**
6. Enter "BranchWorks" and click **Generate**
7. Copy the 16-character password (format: xxxx xxxx xxxx xxxx)
8. Paste it in `application.properties` as `spring.mail.password`

#### How to Generate JWT Secret:

**Option A: Using OpenSSL (Linux/Mac/Git Bash):**
```bash
openssl rand -base64 64
```

**Option B: Using PowerShell (Windows):**
```powershell
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 64 | ForEach-Object {[char]$_})
```

**Option C: Using Online Generator:**
- Visit: https://www.grc.com/passwords.htm
- Copy the "63 random alpha-numeric characters" string

**Important:** Use a minimum of 64 characters for security!

---

### 2. Frontend Configuration

**File:** `frontend/.env`

Create this file from the template:
```bash
cd frontend
cp .env.example .env
```

**Configuration:**

```env
# Backend API URL
# For local development
REACT_APP_API_URL=http://localhost:5000

# For production (update with your actual domain)
# REACT_APP_API_URL=https://api.yourdomain.com
# or if backend serves everything:
# REACT_APP_API_URL=https://yourdomain.com
```

---

### 3. Admin Panel Configuration

**File:** `backend/admin-panel/.env`

Create this file from the template:
```bash
cd backend/admin-panel
cp .env.example .env
```

**Configuration:**

```env
# Backend API URL
# For local development
REACT_APP_API_URL=http://localhost:5000

# For production (update with your actual domain)
# REACT_APP_API_URL=https://api.yourdomain.com
# or if backend serves everything:
# REACT_APP_API_URL=https://yourdomain.com
```

---

## 🚀 First Time Setup

Follow these steps in order:

### Step 1: Clone/Download the Repository

```bash
# If using Git
git clone https://github.com/In10nt/Branch_Works_New_Website.git
cd Branch_Works_New_Website

# Or download and extract the ZIP file
```

---

### Step 2: Setup Database

**If using H2 (Option 1):**
```bash
# Create data directory
mkdir -p backend/data

# Copy database files
cp database/branchworks_db.mv.db backend/data/
cp database/branchworks_db.trace.db backend/data/
```

**If using MySQL (Option 2):**
```bash
# Create database
mysql -u root -p
CREATE DATABASE branchworks_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
exit;
```

**If using PostgreSQL (Option 3):**
```bash
# Create database
psql -U postgres
CREATE DATABASE branchworks_db;
\q
```

---

### Step 3: Configure Backend

```bash
# Copy configuration template
cp backend/application.properties.example backend/src/main/resources/application.properties

# Edit the file with your settings
# Use your preferred text editor (nano, vim, notepad, VS Code, etc.)
nano backend/src/main/resources/application.properties
```

**Required configurations:**
- ✅ Database connection (H2/MySQL/PostgreSQL)
- ✅ Email settings (Gmail App Password)
- ✅ JWT secret (64+ characters)

---

### Step 4: Setup Frontend

```bash
cd frontend

# Copy environment template
cp .env.example .env

# Edit if needed (default is correct for local development)
# nano .env

# Install dependencies
npm install

cd ..
```

---

### Step 5: Setup Admin Panel

```bash
cd backend/admin-panel

# Copy environment template
cp .env.example .env

# Edit if needed (default is correct for local development)
# nano .env

# Install dependencies
npm install

# Build admin panel
npm run build

# Or use the batch script (Windows)
# build-and-copy.bat

cd ../..
```

**Note:** The build process copies admin panel files to `backend/src/main/resources/static/admin/`

---

## ▶️ Running Locally

### Start the Backend

Open a terminal and run:

```bash
cd backend
mvn spring-boot:run
```

**Wait for the application to start.** You should see:
```
Started ComingSoonApplication in X.XXX seconds (JVM running for X.XXX)
Tomcat started on port(s): 5000 (http)
```

**Backend is now running at:** `http://localhost:5000`

---

### Start the Frontend

Open a **NEW terminal** (keep backend running) and run:

```bash
cd frontend
npm start
```

**The browser will automatically open at:** `http://localhost:3000`

If it doesn't open automatically, manually visit: `http://localhost:3000`

---

### Access Points

Once both are running:

| Service | URL | Credentials |
|---------|-----|-------------|
| **Frontend Website** | http://localhost:3000 | Public access |
| **Backend API** | http://localhost:5000 | - |
| **Admin Panel** | http://localhost:5000/admin/ | username: `admin`<br>password: `admin123` |
| **H2 Console** (if using H2) | http://localhost:5000/h2-console | JDBC URL: `jdbc:h2:file:./data/branchworks_db`<br>Username: `sa`<br>Password: (empty) |

---

## 🧪 Testing the Application

### Test Frontend Website

Visit: `http://localhost:3000`

**Check:**
- [ ] Home page loads with video and content
- [ ] Navigation menu works (Services, Blog, Careers, About, Contact)
- [ ] Service pages load:
  - [ ] Finance
  - [ ] Technology Support
  - [ ] Offshore Hiring
- [ ] Blog page shows published blog posts (should see 2 posts)
- [ ] Click on a blog post to view details
- [ ] Careers page shows active job openings
- [ ] Contact form displays correctly
- [ ] About page loads
- [ ] Footer links work
- [ ] All images load correctly
- [ ] Video plays on home page

---

### Test Admin Panel

Visit: `http://localhost:5000/admin/`

**Login:**
- Username: `admin`
- Password: `admin123`

**Check Dashboard:**
- [ ] Dashboard loads after login
- [ ] Statistics show correct counts (blogs, careers)
- [ ] Recent blogs table displays
- [ ] Recent careers table displays

**Test Blog Management:**
- [ ] Blog list shows all blogs in table format
- [ ] Click "Create New Blog" button
- [ ] Fill in blog details:
  - Title
  - Author
  - Excerpt
  - Content (rich text editor works)
  - Upload image
- [ ] Save as draft
- [ ] Edit the blog
- [ ] Publish the blog
- [ ] Verify published blog appears on frontend
- [ ] Delete a test blog

**Test Career Management:**
- [ ] Career list shows all careers in table format
- [ ] Click "Create New Career" button
- [ ] Fill in career details:
  - Job Title
  - Location
  - Work Type (Full-time, Part-time, Contract)
  - Department
  - Description
  - Requirements
  - LinkedIn URL
- [ ] Save career
- [ ] Edit the career
- [ ] Activate the career
- [ ] Verify active career appears on frontend
- [ ] Deactivate/Delete test career

**Test Authentication:**
- [ ] Logout works
- [ ] After logout, redirected to login page
- [ ] Cannot access admin pages without login
- [ ] Login again successfully
- [ ] Session persists across page refreshes

---

### Test Database (if using H2)

Visit: `http://localhost:5000/h2-console`

**Connect:**
- JDBC URL: `jdbc:h2:file:./data/branchworks_db`
- Username: `sa`
- Password: (leave empty)
- Click "Connect"

**Verify Tables:**
```sql
-- Check users table
SELECT * FROM users;

-- Check blog_posts table
SELECT * FROM blog_posts;

-- Check careers table
SELECT * FROM careers;
```

**Expected Results:**
- `users` table: Should have admin user
- `blog_posts` table: Should have 2 blog posts
- `careers` table: Should have career postings

---

## 📦 Building for Production

Once testing is complete, build the application for production deployment.

### Step 1: Build Frontend

```bash
cd frontend
npm run build
cd ..
```

**Output:** `frontend/build/` directory with optimized production files

---

### Step 2: Build Admin Panel

```bash
cd backend/admin-panel
npm run build
cd ../..

# Or use the batch script (Windows)
# cd backend/admin-panel
# build-and-copy.bat
# cd ../..
```

**Output:** Admin panel files copied to `backend/src/main/resources/static/admin/`

---

### Step 3: Build Backend (includes everything)

```bash
cd backend
mvn clean package -DskipTests
cd ..
```

**Output:** `backend/target/coming-soon-backend-0.0.1-SNAPSHOT.jar`

**This single JAR file contains:**
- ✅ Backend API
- ✅ Frontend website
- ✅ Admin panel
- ✅ All dependencies

---

### Step 4: Test Production Build

```bash
cd backend

# Run the JAR file
java -jar target/coming-soon-backend-0.0.1-SNAPSHOT.jar
```

**Access at:** `http://localhost:5000`

**Note:** In production mode, the backend serves both the frontend and admin panel:
- Frontend: `http://localhost:5000/`
- Admin Panel: `http://localhost:5000/admin/`

---

## 🚢 Production Deployment

### Option 1: Traditional Server Deployment

**Requirements:**
- Linux server (Ubuntu, CentOS, etc.)
- Java 17+ installed
- MySQL/PostgreSQL installed
- Domain name (optional but recommended)

**Steps:**

1. **Prepare Server:**
   ```bash
   # Install Java 17
   sudo apt update
   sudo apt install openjdk-17-jdk
   
   # Verify installation
   java --version
   ```

2. **Create Application Directory:**
   ```bash
   sudo mkdir -p /opt/branchworks
   sudo chown $USER:$USER /opt/branchworks
   ```

3. **Copy JAR File to Server:**
   ```bash
   # From your local machine
   scp backend/target/coming-soon-backend-0.0.1-SNAPSHOT.jar user@your-server:/opt/branchworks/
   ```

4. **Copy Database Files (if using H2):**
   ```bash
   scp -r backend/data user@your-server:/opt/branchworks/
   ```

5. **Create Production Configuration:**
   ```bash
   # On server
   nano /opt/branchworks/application.properties
   ```

   **Production `application.properties`:**
   ```properties
   server.port=5000
   
   # Use MySQL/PostgreSQL for production
   spring.datasource.url=jdbc:mysql://localhost:3306/branchworks_db
   spring.datasource.username=branchworks
   spring.datasource.password=your_secure_password
   spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
   spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
   
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=false
   
   # Disable H2 console in production
   spring.h2.console.enabled=false
   
   # Email configuration
   spring.mail.host=smtp.gmail.com
   spring.mail.port=587
   spring.mail.username=your.email@gmail.com
   spring.mail.password=your_app_password
   spring.mail.properties.mail.smtp.auth=true
   spring.mail.properties.mail.smtp.starttls.enable=true
   company.email=info@yourcompany.com
   
   # JWT secret
   jwt.secret=your_production_jwt_secret_64_characters_minimum
   jwt.expiration=86400000
   
   # File upload
   spring.servlet.multipart.max-file-size=10MB
   spring.servlet.multipart.max-request-size=10MB
   file.upload-dir=/opt/branchworks/uploads
   
   # Logging
   logging.level.root=WARN
   logging.level.com.branchworks=INFO
   logging.file.name=/opt/branchworks/logs/application.log
   ```

6. **Run Application:**
   ```bash
   cd /opt/branchworks
   java -jar coming-soon-backend-0.0.1-SNAPSHOT.jar \
     --spring.config.location=./application.properties
   ```

7. **Run as Background Service:**
   ```bash
   nohup java -jar coming-soon-backend-0.0.1-SNAPSHOT.jar \
     --spring.config.location=./application.properties > app.log 2>&1 &
   ```

8. **Create Systemd Service (Recommended):**
   ```bash
   sudo nano /etc/systemd/system/branchworks.service
   ```

   **Service file content:**
   ```ini
   [Unit]
   Description=BranchWorks Application
   After=syslog.target network.target
   
   [Service]
   User=branchworks
   WorkingDirectory=/opt/branchworks
   ExecStart=/usr/bin/java -jar /opt/branchworks/coming-soon-backend-0.0.1-SNAPSHOT.jar --spring.config.location=/opt/branchworks/application.properties
   SuccessExitStatus=143
   Restart=always
   RestartSec=10
   
   [Install]
   WantedBy=multi-user.target
   ```

   **Enable and start service:**
   ```bash
   sudo systemctl daemon-reload
   sudo systemctl enable branchworks
   sudo systemctl start branchworks
   sudo systemctl status branchworks
   ```

9. **Setup Nginx Reverse Proxy (Optional but recommended):**
   ```bash
   sudo apt install nginx
   sudo nano /etc/nginx/sites-available/branchworks
   ```

   **Nginx configuration:**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com www.yourdomain.com;
       
       location / {
           proxy_pass http://localhost:5000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

   **Enable site:**
   ```bash
   sudo ln -s /etc/nginx/sites-available/branchworks /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

10. **Setup SSL with Let's Encrypt (Recommended):**
    ```bash
    sudo apt install certbot python3-certbot-nginx
    sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
    ```

---

### Option 2: AWS Deployment

**Using AWS EC2:**

1. Launch EC2 instance (Ubuntu 22.04 LTS)
2. Install Java 17
3. Follow traditional server deployment steps above
4. Configure security groups (ports 80, 443, 5000)
5. Use Elastic IP for static IP address

**Using AWS Elastic Beanstalk:**

1. Create Elastic Beanstalk application
2. Choose Java platform
3. Upload JAR file
4. Configure environment variables
5. Deploy

---

### Option 3: Docker Deployment

**Create `Dockerfile` in backend directory:**

```dockerfile
FROM openjdk:17-jdk-slim

WORKDIR /app

COPY target/coming-soon-backend-0.0.1-SNAPSHOT.jar app.jar
COPY data ./data

EXPOSE 5000

ENTRYPOINT ["java", "-jar", "app.jar"]
```

**Build and run:**

```bash
# Build Docker image
docker build -t branchworks-app .

# Run container
docker run -d \
  -p 5000:5000 \
  -v /path/to/data:/app/data \
  -v /path/to/uploads:/app/uploads \
  --name branchworks \
  branchworks-app
```

---

## 🔒 Security Checklist

Before deploying to production, complete this security checklist:

### Critical Security Items:

- [ ] **Change Default Admin Password**
  - Login to admin panel
  - Change password from `admin123` to a strong password
  - Use minimum 12 characters with mix of uppercase, lowercase, numbers, symbols

- [ ] **Generate Secure JWT Secret**
  - Minimum 64 characters
  - Use random alphanumeric characters
  - Never reuse secrets across environments
  - Store securely (environment variables recommended)

- [ ] **Use Gmail App Password**
  - Never use your regular Gmail password
  - Generate app-specific password
  - Enable 2-Step Verification

- [ ] **Switch to Production Database**
  - Use MySQL or PostgreSQL (not H2)
  - Use strong database password
  - Restrict database access to localhost or specific IPs
  - Enable SSL for database connections

- [ ] **Disable H2 Console**
  - Set `spring.h2.console.enabled=false` in production
  - Remove H2 dependency if not using H2

- [ ] **Disable Debug Logging**
  - Set `spring.jpa.show-sql=false`
  - Set `logging.level.root=WARN`
  - Only log errors and warnings in production

- [ ] **Use HTTPS**
  - Install SSL certificate (Let's Encrypt is free)
  - Force HTTPS redirect
  - Update frontend/admin `.env` files with HTTPS URLs

- [ ] **Configure CORS Properly**
  - Update allowed origins in `CorsConfig.java` if needed
  - Don't use `*` (allow all) in production

- [ ] **Setup Firewall**
  - Only expose ports 80 (HTTP) and 443 (HTTPS)
  - Block direct access to port 5000 (use reverse proxy)
  - Use security groups (AWS) or firewall rules

- [ ] **Regular Backups**
  - Setup automated database backups
  - Backup uploaded files regularly
  - Test restore procedures

- [ ] **Update Dependencies**
  - Check for security updates regularly
  - Run `npm audit` for frontend and admin panel
  - Update Maven dependencies

- [ ] **Environment Variables**
  - Consider using environment variables for sensitive data
  - Don't commit `.env` or `application.properties` with real credentials

- [ ] **Rate Limiting**
  - Consider adding rate limiting for API endpoints
  - Protect login endpoint from brute force attacks

- [ ] **File Upload Security**
  - Validate file types
  - Limit file sizes (already configured: 10MB)
  - Scan uploaded files for malware (optional)

---

## 🐛 Troubleshooting

### Common Issues and Solutions

#### Issue: "Database not found" or "Table doesn't exist"

**Symptoms:**
- Application starts but shows database errors
- Cannot access admin panel
- H2 console shows no tables

**Solutions:**

1. **If using H2:**
   ```bash
   # Verify database files exist
   ls -la backend/data/
   
   # Should see: branchworks_db.mv.db and branchworks_db.trace.db
   
   # If missing, copy from database folder
   cp database/branchworks_db.mv.db backend/data/
   cp database/branchworks_db.trace.db backend/data/
   ```

2. **If using MySQL/PostgreSQL:**
   ```bash
   # Verify database exists
   mysql -u root -p -e "SHOW DATABASES;"
   
   # If missing, create it
   mysql -u root -p -e "CREATE DATABASE branchworks_db;"
   
   # Let application create tables (set ddl-auto=update)
   ```

3. **Check application.properties:**
   - Verify database URL is correct
   - Check username and password
   - Ensure driver class name matches database type

---

#### Issue: "Email not sending" or "Contact form not working"

**Symptoms:**
- Contact form submits but no email received
- Error in logs about email authentication

**Solutions:**

1. **Verify Gmail App Password:**
   - Must use App Password, not regular password
   - Enable 2-Step Verification first
   - Generate new App Password if needed

2. **Check application.properties:**
   ```properties
   spring.mail.username=your.email@gmail.com  # Must be full email
   spring.mail.password=xxxx xxxx xxxx xxxx   # 16-character app password
   spring.mail.properties.mail.smtp.auth=true
   spring.mail.properties.mail.smtp.starttls.enable=true
   ```

3. **Test email settings:**
   - Try sending test email from admin panel (if feature exists)
   - Check application logs for detailed error messages

4. **Gmail Security:**
   - Check if Gmail blocked the login attempt
   - Visit: https://myaccount.google.com/security
   - Review recent security events

---

#### Issue: "Admin panel shows blank page"

**Symptoms:**
- Login works but dashboard is blank
- Browser console shows 404 errors for JS/CSS files

**Solutions:**

1. **Rebuild admin panel:**
   ```bash
   cd backend/admin-panel
   npm run build
   # Or use: build-and-copy.bat
   ```

2. **Verify files copied:**
   ```bash
   ls -la backend/src/main/resources/static/admin/
   # Should see: index.html, static/ folder with JS and CSS
   ```

3. **Clear browser cache:**
   - Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
   - Or clear browser cache completely

4. **Check browser console:**
   - Press F12 to open developer tools
   - Look for error messages
   - Check Network tab for failed requests

---

#### Issue: "Port 5000 already in use"

**Symptoms:**
- Backend won't start
- Error: "Port 5000 is already in use"

**Solutions:**

1. **Find and kill process using port 5000:**
   ```bash
   # Windows
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F
   
   # Linux/Mac
   lsof -i :5000
   kill -9 <PID>
   ```

2. **Change port in application.properties:**
   ```properties
   server.port=8080  # Or any other available port
   ```

3. **Update frontend and admin panel .env files:**
   ```env
   REACT_APP_API_URL=http://localhost:8080
   ```

---

#### Issue: "JWT token errors" or "Unauthorized" errors

**Symptoms:**
- Cannot login to admin panel
- Login works but immediately logged out
- API returns 401 Unauthorized

**Solutions:**

1. **Generate new JWT secret:**
   ```bash
   openssl rand -base64 64
   ```

2. **Update application.properties:**
   ```properties
   jwt.secret=YOUR_NEW_SECRET_HERE
   jwt.expiration=86400000
   ```

3. **Clear browser storage:**
   - Open browser developer tools (F12)
   - Go to Application tab
   - Clear Local Storage
   - Clear Session Storage
   - Try logging in again

4. **Check token expiration:**
   - Default is 24 hours (86400000 milliseconds)
   - Increase if needed: `jwt.expiration=172800000` (48 hours)

---

#### Issue: "CORS errors" in browser console

**Symptoms:**
- Browser console shows CORS policy errors
- API requests fail with CORS errors
- Frontend cannot communicate with backend

**Solutions:**

1. **Verify API URL in .env files:**
   ```env
   # frontend/.env
   REACT_APP_API_URL=http://localhost:5000
   
   # backend/admin-panel/.env
   REACT_APP_API_URL=http://localhost:5000
   ```

2. **Check CorsConfig.java:**
   - Located at: `backend/src/main/java/com/branchworks/comingsoon/config/CorsConfig.java`
   - Verify allowed origins include your frontend URL

3. **Restart both frontend and backend:**
   - Stop both applications
   - Start backend first
   - Then start frontend

4. **For production:**
   - Update CORS configuration to include production domain
   - Use HTTPS URLs

---

#### Issue: "Frontend won't start" or "Module not found"

**Symptoms:**
- `npm start` fails
- Error about missing modules
- Cannot resolve dependencies

**Solutions:**

1. **Delete node_modules and reinstall:**
   ```bash
   cd frontend
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Check Node.js version:**
   ```bash
   node --version  # Should be 16.x or higher
   ```

3. **Clear npm cache:**
   ```bash
   npm cache clean --force
   npm install
   ```

4. **Check for port conflicts:**
   - Frontend uses port 3000 by default
   - If in use, React will prompt to use different port

---

#### Issue: "Maven build fails"

**Symptoms:**
- `mvn clean package` fails
- Compilation errors
- Dependency resolution errors

**Solutions:**

1. **Check Java version:**
   ```bash
   java --version  # Should be 17 or higher
   mvn --version   # Should show Java 17
   ```

2. **Clean Maven cache:**
   ```bash
   mvn clean
   rm -rf ~/.m2/repository
   mvn clean install
   ```

3. **Update Maven:**
   - Download latest Maven from: https://maven.apache.org/download.cgi
   - Update PATH environment variable

4. **Check pom.xml:**
   - Verify no syntax errors
   - Check all dependencies are available

---

#### Issue: "Cannot upload images" or "File upload fails"

**Symptoms:**
- Image upload in blog editor fails
- Error about file size or type

**Solutions:**

1. **Check file size:**
   - Maximum size is 10MB (configurable)
   - Reduce image size if needed

2. **Verify upload directory exists:**
   ```bash
   mkdir -p backend/uploads
   # Or the path specified in application.properties
   ```

3. **Check permissions:**
   ```bash
   chmod 755 backend/uploads
   ```

4. **Increase size limit in application.properties:**
   ```properties
   spring.servlet.multipart.max-file-size=20MB
   spring.servlet.multipart.max-request-size=20MB
   ```

---

#### Issue: "Database connection timeout"

**Symptoms:**
- Application starts but cannot connect to database
- Timeout errors in logs

**Solutions:**

1. **Verify database is running:**
   ```bash
   # MySQL
   sudo systemctl status mysql
   
   # PostgreSQL
   sudo systemctl status postgresql
   ```

2. **Check database credentials:**
   - Verify username and password in application.properties
   - Test connection manually:
   ```bash
   mysql -u username -p -h localhost
   ```

3. **Check firewall:**
   - Ensure database port is accessible
   - MySQL: port 3306
   - PostgreSQL: port 5432

4. **Increase timeout in application.properties:**
   ```properties
   spring.datasource.hikari.connection-timeout=30000
   spring.datasource.hikari.maximum-pool-size=10
   ```

---

## 📞 Support and Resources

### Documentation Files

- **README.md** - Complete project documentation
- **COMPLETE_CLIENT_GUIDE.md** - This comprehensive guide
- **TEST_LOCALLY.md** - Step-by-step testing guide
- **HANDOVER_CHECKLIST.md** - Delivery checklist
- **PROJECT_STRUCTURE.md** - Project structure overview
- **database/README.md** - Database documentation

### Useful Links

- **Project Repository:** https://github.com/In10nt/Branch_Works_New_Website.git
- **Spring Boot Documentation:** https://spring.io/projects/spring-boot
- **React Documentation:** https://react.dev/
- **MySQL Documentation:** https://dev.mysql.com/doc/
- **PostgreSQL Documentation:** https://www.postgresql.org/docs/

### Getting Help

1. **Check Documentation:** Review all documentation files
2. **Check Logs:** Look at application logs for error messages
3. **Browser Console:** Check browser console (F12) for frontend errors
4. **Search Errors:** Google specific error messages
5. **Stack Overflow:** Search for similar issues

---

## 📋 Quick Command Reference

### Development Commands

```bash
# Start backend
cd backend && mvn spring-boot:run

# Start frontend
cd frontend && npm start

# Build admin panel
cd backend/admin-panel && npm run build

# Build everything for production
cd frontend && npm run build && cd ..
cd backend/admin-panel && npm run build && cd ..
cd backend && mvn clean package -DskipTests
```

### Database Commands

```bash
# MySQL
mysql -u root -p
CREATE DATABASE branchworks_db;
SHOW DATABASES;
USE branchworks_db;
SHOW TABLES;

# PostgreSQL
psql -U postgres
CREATE DATABASE branchworks_db;
\l
\c branchworks_db
\dt
```

### Server Commands

```bash
# Run JAR file
java -jar backend/target/coming-soon-backend-0.0.1-SNAPSHOT.jar

# Run with custom config
java -jar app.jar --spring.config.location=./application.properties

# Run in background
nohup java -jar app.jar > app.log 2>&1 &

# Check if running
ps aux | grep java

# Stop application
kill <PID>
```

### Systemd Commands

```bash
# Start service
sudo systemctl start branchworks

# Stop service
sudo systemctl stop branchworks

# Restart service
sudo systemctl restart branchworks

# Check status
sudo systemctl status branchworks

# View logs
sudo journalctl -u branchworks -f
```

---

## ✅ Final Checklist

Before going live, verify:

### Configuration
- [ ] Database configured (H2/MySQL/PostgreSQL)
- [ ] Email settings configured with App Password
- [ ] JWT secret generated (64+ characters)
- [ ] Frontend .env file configured
- [ ] Admin panel .env file configured
- [ ] All API URLs point to correct domain

### Security
- [ ] Admin password changed from default
- [ ] H2 console disabled in production
- [ ] HTTPS enabled
- [ ] Firewall configured
- [ ] Database backups configured
- [ ] Strong passwords used everywhere

### Testing
- [ ] Frontend website works
- [ ] Admin panel login works
- [ ] Blog management works
- [ ] Career management works
- [ ] Contact form sends emails
- [ ] All images load correctly
- [ ] Mobile responsive design works

### Production
- [ ] Application built for production
- [ ] JAR file tested
- [ ] Server configured
- [ ] Domain name configured
- [ ] SSL certificate installed
- [ ] Monitoring setup (optional)

---

## 🎉 Congratulations!

You have successfully set up the BranchWorks Global application!

### What You Have:
- ✅ Full-featured corporate website
- ✅ Content Management System for blogs
- ✅ Career management system
- ✅ Admin panel with authentication
- ✅ Contact form with email integration
- ✅ Responsive design for all devices
- ✅ Production-ready application

### Next Steps:
1. Customize content via admin panel
2. Add your own blog posts
3. Post job openings
4. Update company information
5. Configure your domain
6. Monitor application performance

### Need Help?
- Review documentation files
- Check troubleshooting section
- Review application logs
- Check browser console for errors

---

**Project Repository:** https://github.com/In10nt/Branch_Works_New_Website.git

**Last Updated:** May 14, 2026

**Version:** 1.0.0

---

**Built with ❤️ for BranchWorks Global**

