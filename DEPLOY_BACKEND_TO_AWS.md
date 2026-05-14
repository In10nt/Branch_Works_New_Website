# Deploy Spring Boot Backend to AWS Elastic Beanstalk

## 🎯 Goal
Deploy your Spring Boot backend so your admin panel works with your live website.

---

## 📋 Prerequisites

1. ✅ AWS Account
2. ✅ AWS CLI installed (optional but helpful)
3. ✅ Java 17 and Maven installed locally

---

## 🚀 Step-by-Step Deployment

### Step 1: Prepare Your Backend for Production

#### 1.1 Update application.properties

Open: `backend/src/main/resources/application.properties`

Add/Update these settings:

```properties
# Server Configuration
server.port=5000

# Database Configuration (H2 for now, will upgrade to RDS later)
spring.datasource.url=jdbc:h2:file:./data/branchworks_db
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=update

# CORS Configuration - UPDATE THIS WITH YOUR AMPLIFY URL
cors.allowed.origins=https://your-amplify-url.amplifyapp.com,http://localhost:3000

# File Upload Configuration
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB

# Logging
logging.level.root=INFO
logging.level.com.branchworks=DEBUG
```

#### 1.2 Update CORS Configuration

Open: `backend/src/main/java/com/branchworks/comingsoon/config/CorsConfig.java`

Make sure it reads from properties:

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    
    @Value("${cors.allowed.origins}")
    private String allowedOrigins;
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(allowedOrigins.split(","))
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
```

---

### Step 2: Build the Backend JAR

```bash
cd backend
mvn clean package -DskipTests
```

This creates: `backend/target/coming-soon-backend-0.0.1-SNAPSHOT.jar`

**Verify the JAR works locally:**
```bash
java -jar target/coming-soon-backend-0.0.1-SNAPSHOT.jar
```

Test at: http://localhost:5000/api/blogs

---

### Step 3: Deploy to AWS Elastic Beanstalk

#### Option A: Using AWS Console (Easiest)

1. **Go to AWS Elastic Beanstalk Console:**
   - https://console.aws.amazon.com/elasticbeanstalk

2. **Create New Application:**
   - Click "Create Application"
   - Application name: `branchworks-backend`
   - Platform: `Java`
   - Platform branch: `Corretto 17`
   - Platform version: Latest

3. **Upload Your Code:**
   - Choose "Upload your code"
   - Click "Choose file"
   - Select: `backend/target/coming-soon-backend-0.0.1-SNAPSHOT.jar`
   - Version label: `v1.0`

4. **Configure Environment:**
   - Click "Configure more options"
   - Capacity: Single instance (for testing) or Load balanced (for production)
   - Instance type: `t3.small` (recommended) or `t3.micro` (cheaper)

5. **Set Environment Variables:**
   - Go to "Software" configuration
   - Add environment properties:
     ```
     SERVER_PORT=5000
     CORS_ALLOWED_ORIGINS=https://your-amplify-url.amplifyapp.com
     ```

6. **Create Application:**
   - Click "Create application"
   - Wait 5-10 minutes for deployment

7. **Get Your Backend URL:**
   - After deployment, you'll see: `http://branchworks-backend.elasticbeanstalk.com`
   - Test it: `http://branchworks-backend.elasticbeanstalk.com/api/blogs`

#### Option B: Using EB CLI (Advanced)

```bash
# Install EB CLI
pip install awsebcli

# Initialize EB
cd backend
eb init

# Select:
# - Region: Your preferred region
# - Application name: branchworks-backend
# - Platform: Java
# - Platform version: Corretto 17

# Create environment and deploy
eb create branchworks-backend-env

# Deploy updates later
eb deploy
```

---

### Step 4: Update Your Frontend to Use Backend URL

#### 4.1 Update Admin Panel

Open: `backend/admin-panel/package.json`

Remove or update the proxy:
```json
{
  "proxy": "http://branchworks-backend.elasticbeanstalk.com"
}
```

Or create an environment variable file:

Create: `backend/admin-panel/.env.production`
```
REACT_APP_API_URL=http://branchworks-backend.elasticbeanstalk.com
```

Update API calls to use:
```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
```

#### 4.2 Rebuild Admin Panel

```bash
cd backend/admin-panel
npm run build
```

#### 4.3 Deploy Admin Panel

**Option 1: Deploy with Main Website (Recommended)**

Copy admin build to your main website:
```bash
# From root directory
xcopy /E /I backend\admin-panel\build build\admin
```

Then redeploy your Amplify app with the admin folder included.

**Option 2: Separate Amplify App for Admin**

Create a new Amplify app just for the admin panel:
- Upload `backend/admin-panel/build` folder
- Access at: `https://admin.your-domain.com`

---

### Step 5: Update Website API Calls

If your main website makes API calls, update them too:

Create: `src/config/api.js`
```javascript
export const API_BASE_URL = process.env.REACT_APP_API_URL || 
  'http://branchworks-backend.elasticbeanstalk.com';
```

Use in components:
```javascript
import { API_BASE_URL } from '../config/api';

// In your API calls
axios.get(`${API_BASE_URL}/api/blogs`)
```

Rebuild and redeploy your website.

---

## 🔒 Step 6: Secure Your Backend (Important!)

### 6.1 Use HTTPS

1. **Get a domain name** (e.g., api.branchworks.com)

2. **Add SSL Certificate:**
   - In Elastic Beanstalk console
   - Go to Configuration → Load Balancer
   - Add HTTPS listener
   - Use AWS Certificate Manager (ACM) for free SSL

3. **Update CORS to use HTTPS:**
   ```properties
   cors.allowed.origins=https://your-amplify-url.amplifyapp.com
   ```

### 6.2 Add Authentication (Recommended)

For production, add authentication to admin endpoints:
- Use Spring Security
- Implement JWT tokens
- Protect `/api/admin/*` endpoints

---

## 💾 Step 7: Upgrade to Production Database (Optional)

Currently using H2 (file-based). For production, use RDS:

### 7.1 Create RDS Database

1. Go to AWS RDS Console
2. Create database:
   - Engine: PostgreSQL or MySQL
   - Template: Free tier (for testing)
   - DB instance: db.t3.micro
   - Storage: 20 GB

3. Note the endpoint: `your-db.xxxxx.rds.amazonaws.com`

### 7.2 Update Backend Configuration

Update `application.properties`:
```properties
# PostgreSQL
spring.datasource.url=jdbc:postgresql://your-db.xxxxx.rds.amazonaws.com:5432/branchworks
spring.datasource.username=admin
spring.datasource.password=your-password
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
```

Add PostgreSQL dependency to `pom.xml`:
```xml
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
```

Rebuild and redeploy.

---

## 🧪 Testing Your Deployment

### Test Backend API:
```bash
# Test health
curl http://branchworks-backend.elasticbeanstalk.com/api/health

# Test blogs endpoint
curl http://branchworks-backend.elasticbeanstalk.com/api/blogs

# Test careers endpoint
curl http://branchworks-backend.elasticbeanstalk.com/api/careers
```

### Test Admin Panel:
1. Go to your website
2. Click "Admin" in footer
3. Try creating a blog post
4. Check if it appears on the website

---

## 📊 Monitoring and Logs

### View Logs:
1. Go to Elastic Beanstalk Console
2. Select your environment
3. Click "Logs" → "Request Logs" → "Last 100 Lines"

### Monitor Health:
- Dashboard shows health status
- Set up CloudWatch alarms for errors

---

## 💰 Cost Estimate

### Elastic Beanstalk (t3.small):
- EC2 instance: ~$15-20/month
- Load balancer (if used): ~$15/month
- Data transfer: ~$1-5/month

### With RDS (db.t3.micro):
- Database: ~$15-20/month

**Total: ~$30-60/month**

### Cost Saving Tips:
- Use t3.micro instead of t3.small (~$8/month)
- Single instance (no load balancer)
- Use H2 database instead of RDS (free)

---

## 🐛 Troubleshooting

### Backend not starting:
- Check logs in EB console
- Verify Java version (must be 17)
- Check if JAR file is valid

### CORS errors:
- Update `cors.allowed.origins` with your Amplify URL
- Include both http and https versions
- Restart backend after changes

### Admin panel can't connect:
- Verify backend URL is correct
- Check if backend is running
- Test API endpoints directly

### Database errors:
- Check database connection string
- Verify credentials
- Ensure security group allows connections

---

## 🔄 Updating Your Backend

When you make changes:

```bash
# 1. Build new JAR
cd backend
mvn clean package -DskipTests

# 2. Upload to Elastic Beanstalk
# - Go to EB Console
# - Click "Upload and Deploy"
# - Select new JAR file
# - Click "Deploy"

# Or using EB CLI:
eb deploy
```

---

## ✅ Checklist

- [ ] Backend JAR built successfully
- [ ] Deployed to Elastic Beanstalk
- [ ] Backend URL obtained
- [ ] CORS configured with Amplify URL
- [ ] Admin panel updated with backend URL
- [ ] Admin panel rebuilt and deployed
- [ ] Tested admin panel functionality
- [ ] SSL certificate added (optional)
- [ ] RDS database configured (optional)
- [ ] Authentication added (recommended)

---

## 🎉 Success!

Your backend is now deployed! Your admin panel should work with your live website.

**Access your admin panel at:**
- https://your-amplify-url.amplifyapp.com/admin

**Backend API at:**
- http://branchworks-backend.elasticbeanstalk.com/api

---

## 📞 Need Help?

Common issues and solutions are in the Troubleshooting section above.

For AWS-specific issues, check:
- AWS Elastic Beanstalk Documentation
- AWS Support (if you have a support plan)
