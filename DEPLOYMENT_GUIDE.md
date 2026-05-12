# 🚀 BranchWorks Deployment Guide

## Overview

Your BranchWorks application consists of:
1. **React Frontend** (Website + Admin Panel)
2. **Spring Boot Backend** (API + Database)

After deployment, the admin panel will be accessible at: `https://yourdomain.com/admin/`

## 📦 What's Included

### Frontend (React)
- Main website (all pages)
- Blog management system (admin panel in `/public/admin/`)
- Static assets (images, CSS, JS)

### Backend (Spring Boot)
- REST API endpoints
- Blog data management
- Image upload handling
- H2 Database

## 🌐 Deployment Options

### Option 1: AWS (Recommended)

#### Frontend Deployment (AWS Amplify)
1. **Build React App:**
   ```bash
   npm run build
   ```

2. **Deploy to AWS Amplify:**
   - Connect your GitHub repository
   - Amplify will auto-build and deploy
   - Admin panel included automatically at `/admin/`

3. **Configuration:**
   - Build command: `npm run build`
   - Build output directory: `build`
   - Environment variables: None needed for frontend

#### Backend Deployment (AWS Elastic Beanstalk)
1. **Package Backend:**
   ```bash
   cd backend
   mvn clean package
   ```

2. **Deploy to Elastic Beanstalk:**
   - Upload `target/coming-soon-backend-0.0.1-SNAPSHOT.jar`
   - Configure environment variables
   - Set up RDS database (replace H2)

3. **Environment Variables:**
   ```
   SERVER_PORT=5000
   SPRING_DATASOURCE_URL=jdbc:mysql://your-rds-endpoint:3306/branchworks
   SPRING_DATASOURCE_USERNAME=admin
   SPRING_DATASOURCE_PASSWORD=your-password
   CORS_ALLOWED_ORIGINS=https://yourdomain.com
   ```

4. **Update Frontend API URL:**
   - In `public/admin/js/config.js`, the API will automatically use your domain
   - No changes needed if backend is on same domain

---

### Option 2: Netlify + Heroku

#### Frontend (Netlify)
1. **Build:**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify:**
   - Drag & drop `build` folder to Netlify
   - Or connect GitHub for auto-deploy
   - Admin panel at `https://yourdomain.netlify.app/admin/`

3. **Netlify Configuration (_redirects file already included):**
   ```
   /api/*  https://your-backend.herokuapp.com/api/:splat  200
   /*      /index.html                                      200
   ```

#### Backend (Heroku)
1. **Create Heroku App:**
   ```bash
   heroku create branchworks-api
   ```

2. **Deploy:**
   ```bash
   cd backend
   git push heroku main
   ```

3. **Configure Database:**
   - Add Heroku Postgres addon
   - Update `application.properties` for PostgreSQL

4. **Environment Variables:**
   ```bash
   heroku config:set CORS_ALLOWED_ORIGINS=https://yourdomain.netlify.app
   ```

---

### Option 3: Vercel + Railway

#### Frontend (Vercel)
1. **Connect GitHub repository**
2. **Vercel auto-detects React**
3. **Admin panel accessible at `/admin/`**

#### Backend (Railway)
1. **Connect GitHub repository**
2. **Railway auto-detects Spring Boot**
3. **Add PostgreSQL database**
4. **Set environment variables**

---

## 🔧 Pre-Deployment Checklist

### Frontend Updates

1. **Update API URLs in admin panel:**
   - Already configured to auto-detect environment
   - No changes needed if backend on same domain

2. **Update CORS in Backend:**
   ```java
   // backend/src/main/java/com/branchworks/comingsoon/config/CorsConfig.java
   @Value("${cors.allowed.origins:https://yourdomain.com}")
   private String allowedOrigins;
   ```

3. **Update application.properties:**
   ```properties
   # Production database (replace H2)
   spring.datasource.url=${DATABASE_URL}
   spring.datasource.username=${DB_USERNAME}
   spring.datasource.password=${DB_PASSWORD}
   
   # CORS
   cors.allowed.origins=${CORS_ALLOWED_ORIGINS:https://yourdomain.com}
   
   # File upload path
   file.upload.dir=/var/app/uploads
   ```

### Database Migration (H2 → Production DB)

1. **Export current data:**
   ```bash
   # From H2 console or use SQL export
   ```

2. **Set up production database:**
   - AWS RDS (MySQL/PostgreSQL)
   - Heroku Postgres
   - Railway PostgreSQL

3. **Update dependencies in pom.xml:**
   ```xml
   <!-- Remove H2 -->
   <!-- <dependency>
       <groupId>com.h2database</groupId>
       <artifactId>h2</artifactId>
   </dependency> -->
   
   <!-- Add PostgreSQL or MySQL -->
   <dependency>
       <groupId>org.postgresql</groupId>
       <artifactId>postgresql</artifactId>
   </dependency>
   ```

4. **Import data to production database**

---

## 🔐 Security Updates for Production

### 1. Change Admin Credentials
Update `blog-admin/js/login.js`:
```javascript
// Use environment variables or secure authentication
// Replace hardcoded credentials
```

### 2. Enable HTTPS
- All deployment platforms provide free SSL
- Ensure all API calls use HTTPS

### 3. Secure File Uploads
- Validate file types
- Limit file sizes
- Scan for malware

### 4. Environment Variables
Never commit:
- Database passwords
- API keys
- Secret tokens

---

## 📱 Testing After Deployment

### 1. Test Website
- [ ] All pages load correctly
- [ ] Images display properly
- [ ] Navigation works
- [ ] Blog posts show correctly

### 2. Test Admin Panel
- [ ] Access at `https://yourdomain.com/admin/`
- [ ] Login works
- [ ] Can create new blog
- [ ] Can upload images
- [ ] Can edit existing blogs
- [ ] Can delete blogs

### 3. Test Blog Display
- [ ] New blogs appear on website
- [ ] Category filtering works
- [ ] Blog detail pages load
- [ ] Images display correctly

---

## 🆘 Troubleshooting

### Admin Panel Not Loading
- Check if `/admin/` folder exists in build
- Verify `_redirects` file is in build folder
- Check browser console for errors

### API Calls Failing
- Verify CORS configuration
- Check API URL in `config.js`
- Ensure backend is running
- Check network tab in browser

### Images Not Displaying
- Verify image upload path in backend
- Check file permissions
- Ensure images are served correctly
- Update image URLs to use CDN if needed

### Database Connection Issues
- Verify database credentials
- Check database is running
- Ensure network access allowed
- Review connection string format

---

## 📊 Monitoring

### Frontend
- Use Netlify/Vercel/Amplify analytics
- Monitor page load times
- Track errors with Sentry

### Backend
- Monitor API response times
- Track error rates
- Set up health checks
- Monitor database performance

---

## 🔄 Continuous Deployment

### GitHub Actions (Example)
```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build
        run: npm install && npm run build
      - name: Deploy to Netlify
        uses: netlify/actions/cli@master
        with:
          args: deploy --prod
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

---

## 📝 Post-Deployment

1. **Update DNS records** (if using custom domain)
2. **Set up monitoring and alerts**
3. **Configure backups** for database
4. **Document admin credentials** securely
5. **Train team** on blog management system

---

## 🎯 Quick Deployment Commands

### Build Everything
```bash
# Frontend
npm run build

# Backend
cd backend
mvn clean package
```

### Test Locally Before Deploy
```bash
# Test production build locally
npm run build
npx serve -s build

# Backend
cd backend
java -jar target/coming-soon-backend-0.0.1-SNAPSHOT.jar
```

---

## 📞 Support

For deployment issues:
1. Check logs in deployment platform
2. Review browser console errors
3. Verify environment variables
4. Test API endpoints directly

---

**Last Updated:** May 2026
**Version:** 1.0.0
