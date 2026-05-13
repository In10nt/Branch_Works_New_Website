# 🗄️ Shared Database Setup - Use Same Database Locally and in Production

## Overview

This guide shows you how to use the **same AWS RDS MySQL database** for both:
- 🖥️ Local development (your computer)
- ☁️ Production (AWS Elastic Beanstalk)

**Benefits:**
- ✅ Same data everywhere
- ✅ No need to migrate data
- ✅ Test with real production data locally
- ✅ Changes reflect immediately in both places

---

## 🚀 Quick Setup (3 Steps)

### Step 1: Create AWS RDS Database (One Time)

Follow the RDS creation steps from `AWS_DEPLOYMENT_GUIDE.md`, but with one important change:

**Security Group Configuration:**
1. Go to RDS Console → Your database → Security
2. Click on the security group
3. Edit Inbound Rules
4. Add rule:
   - Type: MySQL/Aurora
   - Port: 3306
   - Source: **My IP** (this allows your local computer to connect)
   - Description: "Allow local development"

**Save these details:**
```
RDS Endpoint: branchworks-db.xxxxxxxxx.us-east-1.rds.amazonaws.com
Port: 3306
Database: branchworks
Username: admin
Password: [your password]
```

---

### Step 2: Configure Local Backend

1. Open `backend/src/main/resources/application-local-with-rds.properties`

2. Replace these values with your RDS details:

```properties
# Replace [YOUR-RDS-ENDPOINT] with your actual RDS endpoint
spring.datasource.url=jdbc:mysql://branchworks-db.xxxxxxxxx.us-east-1.rds.amazonaws.com:3306/branchworks

# Replace [YOUR-RDS-PASSWORD] with your actual password
spring.datasource.password=YourActualPassword123
```

**Example:**
```properties
spring.datasource.url=jdbc:mysql://branchworks-db.c9abc123xyz.us-east-1.rds.amazonaws.com:3306/branchworks
spring.datasource.username=admin
spring.datasource.password=MySecurePass123!
```

---

### Step 3: Start Backend with RDS

**Option A: Use the batch script (Easy)**
```bash
# Double-click this file:
start-backend-with-rds.bat
```

**Option B: Manual command**
```bash
cd backend
mvn spring-boot:run -Dspring-boot.run.profiles=local-with-rds
```

**Option C: From IntelliJ/Eclipse**
1. Edit Run Configuration
2. Add VM options: `-Dspring.profiles.active=local-with-rds`
3. Run

---

## 🔄 Switching Between Local H2 and AWS RDS

You can easily switch between databases:

### Use Local H2 Database (Default)
```bash
# Just run normally
cd backend
mvn spring-boot:run
```
or
```bash
start-backend.bat
```

### Use AWS RDS Database
```bash
# Use the RDS profile
cd backend
mvn spring-boot:run -Dspring-boot.run.profiles=local-with-rds
```
or
```bash
start-backend-with-rds.bat
```

---

## 📊 Database Profiles Comparison

| Profile | Database | Use Case | Data Location |
|---------|----------|----------|---------------|
| **default** | H2 | Local dev only | `./data/branchworks_db` |
| **local-with-rds** | AWS RDS MySQL | Local dev with prod data | AWS RDS |
| **prod** | AWS RDS MySQL | Production | AWS RDS |

---

## 🔐 Security Configuration

### Allow Your IP to Access RDS

**Method 1: AWS Console (Recommended)**
1. Go to RDS → Your database → Connectivity & security
2. Click on VPC security group
3. Edit inbound rules
4. Add rule:
   - Type: MySQL/Aurora (3306)
   - Source: My IP
   - Save

**Method 2: Add Specific IP**
1. Find your IP: https://whatismyipaddress.com/
2. Add inbound rule:
   - Type: MySQL/Aurora (3306)
   - Source: Custom → Your IP/32
   - Example: 203.0.113.45/32

**Method 3: Allow All (Not Recommended for Production)**
1. Add inbound rule:
   - Type: MySQL/Aurora (3306)
   - Source: Anywhere-IPv4 (0.0.0.0/0)
   - ⚠️ Only use for testing!

---

## 🧪 Testing the Connection

### Test 1: Check if RDS is Accessible
```bash
# Using MySQL client (if installed)
mysql -h branchworks-db.xxxxxxxxx.us-east-1.rds.amazonaws.com -P 3306 -u admin -p

# Enter password when prompted
# If successful, you'll see: mysql>
```

### Test 2: Start Backend and Check Logs
```bash
cd backend
mvn spring-boot:run -Dspring-boot.run.profiles=local-with-rds
```

Look for these log messages:
```
✅ HikariPool-1 - Start completed.
✅ Started ComingSoonApplication in X.XXX seconds
```

If you see errors:
```
❌ Communications link failure
❌ Access denied for user
```
→ Check security group and credentials

### Test 3: Test API Endpoints
```bash
# Health check
curl http://localhost:5000/api/health

# Get blogs
curl http://localhost:5000/api/blogs

# Get careers
curl http://localhost:5000/api/careers
```

---

## 📝 Complete Workflow

### Initial Setup (One Time)
1. Create AWS RDS MySQL database
2. Configure security group to allow your IP
3. Update `application-local-with-rds.properties` with RDS details
4. Test connection

### Daily Development
```bash
# Terminal 1: Start backend with RDS
start-backend-with-rds.bat

# Terminal 2: Start frontend
npm start

# Browser: Open admin panel
http://localhost:3000/admin/

# Create/edit blogs and careers
# Data is saved to AWS RDS
# Same data visible in production!
```

### Deployment
```bash
# Backend is already using RDS
# Just deploy to Elastic Beanstalk
cd backend
eb deploy

# Frontend automatically deploys via Amplify
git push origin main
```

---

## 🔄 Data Synchronization

### Scenario 1: You Create Blog Locally
1. Start backend with RDS: `start-backend-with-rds.bat`
2. Open admin panel: `http://localhost:3000/admin/`
3. Create a blog
4. **Data is saved to AWS RDS**
5. Deploy frontend to Amplify
6. Blog appears on production website immediately!

### Scenario 2: You Create Blog in Production
1. Go to production admin panel: `https://your-amplify-url/admin/`
2. Create a blog
3. **Data is saved to AWS RDS**
4. Start local backend with RDS: `start-backend-with-rds.bat`
5. Open local admin panel: `http://localhost:3000/admin/`
6. Same blog appears locally!

---

## 🆘 Troubleshooting

### Error: "Communications link failure"
**Cause:** Can't connect to RDS

**Solutions:**
1. Check RDS security group allows your IP
2. Verify RDS endpoint is correct
3. Check if RDS is running (not stopped)
4. Verify port 3306 is not blocked by firewall

```bash
# Test connection
telnet branchworks-db.xxxxxxxxx.us-east-1.rds.amazonaws.com 3306
# Should connect successfully
```

### Error: "Access denied for user 'admin'"
**Cause:** Wrong username or password

**Solutions:**
1. Verify username is correct (default: `admin`)
2. Check password in `application-local-with-rds.properties`
3. Reset RDS password if needed (RDS Console → Modify)

### Error: "Unknown database 'branchworks'"
**Cause:** Database doesn't exist

**Solutions:**
1. Connect to RDS with MySQL client
2. Create database:
```sql
CREATE DATABASE branchworks;
```

### Your IP Changed
**Cause:** Dynamic IP address changed

**Solutions:**
1. Go to RDS security group
2. Update inbound rule with new IP
3. Or use "My IP" option (auto-updates)

---

## 💡 Best Practices

### Development Workflow
1. **Use RDS for testing production features**
   - Test with real data
   - Verify production behavior

2. **Use H2 for experimental changes**
   - Quick prototyping
   - No risk to production data

3. **Backup before major changes**
   - RDS automated backups enabled
   - Manual snapshot before big updates

### Security
1. **Never commit passwords**
   - Add `application-local-with-rds.properties` to `.gitignore`
   - Use environment variables for sensitive data

2. **Restrict RDS access**
   - Only allow your IP
   - Use VPN for team access
   - Enable SSL/TLS for connections

3. **Use strong passwords**
   - Minimum 12 characters
   - Mix of letters, numbers, symbols
   - Change periodically

---

## 📁 File Structure

```
backend/
├── src/main/resources/
│   ├── application.properties              ← Default (H2)
│   ├── application-local-with-rds.properties  ← Local with RDS (NEW)
│   └── application-prod.properties         ← Production (RDS)
└── pom.xml                                 ← MySQL driver added

start-backend-with-rds.bat                  ← Quick start script (NEW)
```

---

## 🎯 Quick Reference

### Start Backend with RDS
```bash
start-backend-with-rds.bat
```

### Start Backend with H2 (Local Only)
```bash
start-backend.bat
```

### Check Which Database You're Using
Look at the startup logs:
```
H2: jdbc:h2:file:./data/branchworks_db
RDS: jdbc:mysql://branchworks-db.xxxxxxxxx.us-east-1.rds.amazonaws.com:3306/branchworks
```

### Switch Databases
Just stop the backend and start with different profile:
- H2: `start-backend.bat`
- RDS: `start-backend-with-rds.bat`

---

## ✅ Verification Checklist

After setup, verify:

- [ ] RDS database created
- [ ] Security group allows your IP
- [ ] `application-local-with-rds.properties` updated with RDS details
- [ ] Backend starts successfully with RDS profile
- [ ] Can access admin panel locally
- [ ] Can create blog locally
- [ ] Blog saved to RDS (check in MySQL client)
- [ ] Same blog visible in production (after deployment)

---

## 🎉 Benefits of This Setup

1. **No Data Migration Needed**
   - Create data locally, it's already in production

2. **Consistent Testing**
   - Test with real production data
   - No surprises after deployment

3. **Team Collaboration**
   - Everyone uses same database
   - See each other's changes immediately

4. **Simplified Workflow**
   - One source of truth
   - No sync issues

5. **Production-Like Environment**
   - Develop with production database
   - Catch issues early

---

## 📞 Support

If you have issues:
1. Check RDS is running (AWS Console)
2. Verify security group settings
3. Test connection with MySQL client
4. Check backend logs for errors
5. Verify credentials are correct

---

**Last Updated:** May 13, 2026
**Status:** Ready to Use 🚀
