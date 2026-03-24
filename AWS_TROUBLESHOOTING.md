# AWS Elastic Beanstalk Troubleshooting - Connection Timeout

## Error: ERR_CONNECTION_TIMED_OUT

Your website shows "This site can't be reached" with ERR_CONNECTION_TIMED_OUT error.

---

## Quick Diagnosis Checklist

### 1. Check Environment Health

**Steps:**
1. AWS Console → Elastic Beanstalk
2. Click on: `Branchworks-coming-soon-env`
3. Look at the health indicator at the top

**What it means:**
- 🟢 **Green (OK)** - Environment is healthy, issue is elsewhere
- 🟡 **Yellow (Warning)** - Some issues, but running
- 🔴 **Red (Severe)** - Environment has critical issues
- ⚫ **Grey (Unknown)** - Environment is starting or stopped

**If Red or Grey:**
- Click "Causes" to see error details
- Go to "Logs" → "Request Logs" → "Last 100 Lines"
- Look for error messages

---

### 2. Check CodePipeline Deployment

**Steps:**
1. AWS Console → CodePipeline
2. Click on: `branchworks-pipeline`
3. Check all 3 stages

**Expected:**
```
Source (GitHub)  → ✅ Succeeded
Build (CodeBuild) → ✅ Succeeded  
Deploy (Elastic Beanstalk) → ✅ Succeeded
```

**If any stage failed:**
- Click "Details" on the failed stage
- Read the error message
- Common issues:
  - Build failed: Check buildspec.yml syntax
  - Deploy failed: Check Elastic Beanstalk logs

---

### 3. Check Security Group (MOST COMMON ISSUE)

**Steps:**
1. AWS Console → EC2 → Security Groups
2. Find security group with name containing "elasticbeanstalk"
3. Click on it
4. Go to "Inbound rules" tab

**Required rules:**
```
Type        Protocol    Port Range    Source
HTTP        TCP         80            0.0.0.0/0
HTTPS       TCP         443           0.0.0.0/0
```

**If missing:**
1. Click "Edit inbound rules"
2. Click "Add rule"
3. Add HTTP rule:
   - Type: HTTP
   - Source: Anywhere-IPv4 (0.0.0.0/0)
4. Add HTTPS rule:
   - Type: HTTPS
   - Source: Anywhere-IPv4 (0.0.0.0/0)
5. Click "Save rules"

---

### 4. Check Application Logs

**Steps:**
1. Elastic Beanstalk → Your environment
2. Click "Logs" in left menu
3. Click "Request Logs" → "Last 100 Lines"
4. Wait for logs to generate
5. Click "Download"

**Look for these errors:**

**Port Error:**
```
Caused by: java.net.BindException: Address already in use
```
**Solution:** We already fixed this (port 5000)

**Connection Refused:**
```
connect() failed (111: Connection refused) while connecting to upstream
```
**Solution:** Application not starting, check Java errors in logs

**Out of Memory:**
```
java.lang.OutOfMemoryError: Java heap space
```
**Solution:** Increase instance size or memory allocation

---

### 5. Check Instance Status

**Steps:**
1. Elastic Beanstalk → Your environment
2. Click "Configuration" in left menu
3. Click "Instances" section
4. Check instance type and status

**Verify:**
- Instance is running (not stopped)
- Instance type is at least t2.micro or t3.micro
- Auto Scaling is enabled

---

### 6. Verify Application is Running

**Steps:**
1. Elastic Beanstalk → Your environment
2. Click "Monitoring" in left menu
3. Check these metrics:
   - **Environment Health** - Should be OK
   - **Requests** - Should show activity
   - **CPU Utilization** - Should be > 0%

**If all metrics are 0:**
- Application is not running
- Check logs for startup errors

---

## Common Solutions

### Solution 1: Restart Environment

1. Elastic Beanstalk → Your environment
2. Click "Actions" dropdown
3. Click "Restart app server(s)"
4. Wait 2-3 minutes
5. Try accessing URL again

### Solution 2: Rebuild Environment

1. Elastic Beanstalk → Your environment
2. Click "Actions" dropdown
3. Click "Rebuild environment"
4. Wait 5-10 minutes
5. Try accessing URL again

### Solution 3: Check Environment Variables

1. Elastic Beanstalk → Configuration → Software
2. Check environment properties:
   ```
   PORT = 5000 (should be set by default)
   ```

### Solution 4: Redeploy Application

1. CodePipeline → branchworks-pipeline
2. Click "Release change"
3. Wait for all stages to complete
4. Try accessing URL again

---

## Step-by-Step Fix for Connection Timeout

### If Environment is Red/Grey:

1. **Check Recent Events:**
   - Elastic Beanstalk → Events
   - Look for error messages in last 30 minutes

2. **Check Logs:**
   - Download and read logs
   - Look for Java exceptions or startup errors

3. **Common fixes:**
   - Restart app server
   - Rebuild environment
   - Check security groups

### If Environment is Green but Still Timeout:

1. **Security Group Issue:**
   - Go to EC2 → Security Groups
   - Add HTTP (port 80) and HTTPS (port 443) inbound rules
   - Source: 0.0.0.0/0

2. **Load Balancer Issue:**
   - Elastic Beanstalk → Configuration → Load Balancer
   - Verify listener on port 80 exists
   - Verify health check path is "/"

3. **VPC/Network Issue:**
   - Elastic Beanstalk → Configuration → Network
   - Ensure instance is in public subnet
   - Ensure "Public IP address" is enabled

---

## Emergency: Start Fresh

If nothing works, create a new environment:

1. **Elastic Beanstalk → Create New Environment**
2. **Platform:** Java 17 (Corretto)
3. **Application code:** Upload your JAR file
4. **Presets:** Single instance (free tier)
5. **Configure more options:**
   - Software: Set PORT = 5000
   - Instances: t3.micro
   - Security: Allow HTTP/HTTPS
6. **Create environment**
7. **Update CodePipeline** to deploy to new environment

---

## Test Checklist

After fixing, test these:

- [ ] Environment health is Green
- [ ] Can open URL on computer browser
- [ ] Can open URL on mobile browser
- [ ] Can open URL on mobile data (not WiFi)
- [ ] Form submission works
- [ ] Email notification received

---

## Still Not Working?

**Provide these details:**

1. Environment health status (color)
2. Last 100 lines of logs
3. CodePipeline status (all stages)
4. Security group inbound rules
5. Error message from browser
6. Does it work on computer browser?

**Contact AWS Support:**
- AWS Console → Support → Create Case
- Issue: "Elastic Beanstalk environment not accessible"
- Include environment name and region

---

**Last Updated:** March 24, 2026
