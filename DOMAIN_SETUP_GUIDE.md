# Domain Setup Guide - Connect branchworksglobal.com to AWS

## Prerequisites
- ✅ Domain already purchased (branchworksglobal.com)
- ✅ AWS Elastic Beanstalk environment running
- ✅ Access to domain registrar account

---

## STEP 1: Get Your AWS Elastic Beanstalk URL

1. Login to AWS Console: https://console.aws.amazon.com
2. Go to **Elastic Beanstalk** service
3. Click on your environment: `Branchworks-coming-soon-env`
4. Copy the **Environment URL** at the top
   - Example: `branchworks-coming-soon-env.eba-abc123.eu-north-1.elasticbeanstalk.com`
5. **Save this URL** - you'll need it in the next steps

---

## STEP 2: Login to Your Domain Registrar

Your domain is registered with one of these providers. Login to the correct one:

### Common Domain Registrars:
- **GoDaddy**: https://www.godaddy.com/signin
- **Namecheap**: https://www.namecheap.com/myaccount/login/
- **Google Domains**: https://domains.google.com
- **Cloudflare**: https://dash.cloudflare.com/login
- **HostGator**: https://portal.hostgator.com
- **Bluehost**: https://my.bluehost.com

**Don't know which one?**
- Check your email for domain purchase confirmation
- Or search: https://www.whois.com/whois/branchworksglobal.com

---

## STEP 3: Update DNS Records

### For GoDaddy:

1. Login to GoDaddy
2. Go to **My Products** → **Domains**
3. Click **DNS** next to your domain
4. Scroll to **Records** section
5. Click **Add** button

**Add Record #1:**
```
Type: CNAME
Name: www
Value: [Your Elastic Beanstalk URL from Step 1]
TTL: 1 Hour (or 3600 seconds)
```

**Add Record #2:**
```
Type: CNAME
Name: @
Value: [Your Elastic Beanstalk URL from Step 1]
TTL: 1 Hour
```

6. Click **Save**

---

### For Namecheap:

1. Login to Namecheap
2. Go to **Domain List**
3. Click **Manage** next to your domain
4. Go to **Advanced DNS** tab
5. Click **Add New Record**

**Add Record #1:**
```
Type: CNAME Record
Host: www
Value: [Your Elastic Beanstalk URL from Step 1]
TTL: Automatic
```

**Add Record #2:**
```
Type: CNAME Record
Host: @
Value: [Your Elastic Beanstalk URL from Step 1]
TTL: Automatic
```

6. Click **Save All Changes**

---

### For Google Domains:

1. Login to Google Domains
2. Click on your domain
3. Go to **DNS** section
4. Scroll to **Custom resource records**

**Add Record #1:**
```
Name: www
Type: CNAME
TTL: 1H
Data: [Your Elastic Beanstalk URL from Step 1]
```

**Add Record #2:**
```
Name: @
Type: CNAME
TTL: 1H
Data: [Your Elastic Beanstalk URL from Step 1]
```

5. Click **Add**

---

### For Cloudflare:

1. Login to Cloudflare
2. Select your domain
3. Go to **DNS** → **Records**
4. Click **Add record**

**Add Record #1:**
```
Type: CNAME
Name: www
Target: [Your Elastic Beanstalk URL from Step 1]
Proxy status: DNS only (gray cloud)
TTL: Auto
```

**Add Record #2:**
```
Type: CNAME
Name: @
Target: [Your Elastic Beanstalk URL from Step 1]
Proxy status: DNS only (gray cloud)
TTL: Auto
```

5. Click **Save**

---

## STEP 4: Wait for DNS Propagation

After updating DNS records:

1. **Wait time**: 5 minutes to 48 hours (usually 1-2 hours)
2. **Check propagation status**: https://dnschecker.org
   - Enter: `branchworksglobal.com`
   - Should show your AWS URL globally

3. **Test your domain**:
   - Open browser
   - Go to: `http://branchworksglobal.com`
   - Should load your coming soon page

---

## STEP 5: Setup HTTPS (SSL Certificate) - IMPORTANT!

### 5.1: Request SSL Certificate in AWS

1. Go to AWS Console → **Certificate Manager**
2. Click **Request certificate**
3. Choose **Request a public certificate**
4. Click **Next**

5. **Add domain names**:
   ```
   branchworksglobal.com
   *.branchworksglobal.com
   ```
   (The * covers www and any subdomains)

6. **Validation method**: Choose **DNS validation**
7. Click **Request**

### 5.2: Validate Domain Ownership

1. After requesting, click on your certificate
2. You'll see **CNAME records** for validation
3. Copy these CNAME records (Name and Value)

**Example:**
```
Name: _abc123.branchworksglobal.com
Value: _xyz789.acm-validations.aws
```

4. **Go back to your domain registrar** (Step 2)
5. **Add these CNAME records** to your DNS
6. **Wait 5-30 minutes** for AWS to validate
7. Certificate status will change to **Issued**

### 5.3: Add Certificate to Elastic Beanstalk

1. Go to **Elastic Beanstalk** → Your environment
2. Click **Configuration** in left menu
3. Find **Load balancer** section → Click **Edit**
4. Scroll to **Listeners** section
5. Click **Add listener**

**Configure HTTPS Listener:**
```
Port: 443
Protocol: HTTPS
SSL certificate: [Select your certificate from dropdown]
```

6. Click **Add**
7. Click **Apply** at bottom
8. Wait 5-10 minutes for changes to apply

### 5.4: Force HTTPS Redirect (Optional but Recommended)

1. In Elastic Beanstalk → **Configuration** → **Load balancer**
2. Edit the **HTTP:80** listener
3. Change **Default process** to redirect to HTTPS
4. Or add redirect rules in your application

---

## STEP 6: Verify Everything Works

Test these URLs in your browser:

1. ✅ `http://branchworksglobal.com` → Should load
2. ✅ `https://branchworksglobal.com` → Should load with padlock icon
3. ✅ `http://www.branchworksglobal.com` → Should load
4. ✅ `https://www.branchworksglobal.com` → Should load with padlock icon

---

## STEP 7: Update SEO Files

After domain is working, update these files:

### Update `public/index.html`:
Replace all instances of AWS URL with your actual domain:
```html
<meta property="og:url" content="https://branchworksglobal.com/" />
<link rel="canonical" href="https://branchworksglobal.com/" />
```

### Update `public/sitemap.xml`:
```xml
<loc>https://branchworksglobal.com/</loc>
```

### Update `public/robots.txt`:
```
Sitemap: https://branchworksglobal.com/sitemap.xml
```

Then rebuild and redeploy your application.

---

## STEP 8: Submit to Google Search Console

1. Go to: https://search.google.com/search-console
2. Click **Add property**
3. Enter: `https://branchworksglobal.com`
4. Choose verification method: **HTML file**
5. Download the verification file (e.g., `google1234567890.html`)
6. Place it in your `public/` folder
7. Rebuild and redeploy
8. Click **Verify** in Search Console
9. Submit sitemap: `https://branchworksglobal.com/sitemap.xml`
10. Request indexing for your homepage

---

## Troubleshooting

### Domain not loading?
- Check DNS propagation: https://dnschecker.org
- Wait longer (up to 48 hours)
- Clear browser cache (Ctrl + Shift + Delete)
- Try incognito/private browsing

### SSL certificate not working?
- Make sure validation CNAME records are added
- Wait 30 minutes for validation
- Check certificate status in AWS Certificate Manager
- Ensure listener is on port 443 in Load Balancer

### "Not Secure" warning?
- SSL certificate not installed or not validated
- Go back to Step 5

### 502 Bad Gateway error?
- Check if Elastic Beanstalk environment is healthy
- Check application logs in Elastic Beanstalk
- Verify Spring Boot is running on port 5000

---

## Quick Reference: DNS Records

**What you need to add to your domain registrar:**

```
# For website access
Type: CNAME
Host: www
Value: branchworks-coming-soon-env.eba-xyz.eu-north-1.elasticbeanstalk.com

Type: CNAME
Host: @
Value: branchworks-coming-soon-env.eba-xyz.eu-north-1.elasticbeanstalk.com

# For SSL validation (AWS will provide these)
Type: CNAME
Host: _abc123.branchworksglobal.com
Value: _xyz789.acm-validations.aws
```

---

## Summary Checklist

- [ ] Get Elastic Beanstalk URL from AWS
- [ ] Login to domain registrar
- [ ] Add CNAME records for www and @
- [ ] Wait for DNS propagation (1-2 hours)
- [ ] Request SSL certificate in AWS Certificate Manager
- [ ] Add validation CNAME records to domain
- [ ] Wait for certificate validation (5-30 minutes)
- [ ] Add HTTPS listener to Elastic Beanstalk Load Balancer
- [ ] Test all URLs (http/https, with/without www)
- [ ] Update SEO files with actual domain
- [ ] Submit to Google Search Console
- [ ] Done! 🎉

---

## Need Help?

**Common Issues:**
- DNS not propagating → Wait longer, check dnschecker.org
- SSL not working → Verify validation records are added
- 502 error → Check Elastic Beanstalk health and logs

**AWS Support:**
- AWS Documentation: https://docs.aws.amazon.com
- AWS Support Center: https://console.aws.amazon.com/support

**Domain Registrar Support:**
- Contact your domain provider's support team
- They can help add DNS records if you're stuck

---

**Last Updated**: March 24, 2026
**For**: Branchworks Global Coming Soon Page
