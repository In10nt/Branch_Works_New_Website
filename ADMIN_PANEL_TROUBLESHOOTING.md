# 🔧 Admin Panel Not Showing - Troubleshooting Guide

## ✅ Good News!

Your admin panel IS being built correctly! I verified:
- ✅ Admin folder exists in `public/admin/`
- ✅ Admin folder is copied to `build/admin/` during build
- ✅ All HTML, CSS, and JS files are present
- ✅ `_redirects` file is configured correctly

---

## 🔍 Common Issues and Solutions

### Issue 1: Wrong URL

**Problem:** Trying to access admin panel with wrong URL

**❌ Wrong URLs:**
```
https://your-site.amplifyapp.com/admin
https://your-site.amplifyapp.com/admin.html
```

**✅ Correct URL:**
```
https://your-site.amplifyapp.com/admin/
https://your-site.amplifyapp.com/admin/index.html
```

**Note the trailing slash `/` after admin!**

---

### Issue 2: Amplify Build Not Complete

**Problem:** Amplify is still building/deploying

**Solution:**
1. Go to AWS Amplify Console
2. Check build status
3. Wait for "Deployed" status (green checkmark)
4. Build takes 5-10 minutes

**Check build logs:**
1. Amplify Console → Your app
2. Click on latest build
3. Check "Build" phase logs
4. Look for: "Verifying admin folder in build..."

---

### Issue 3: Cache Issue

**Problem:** Browser showing old version

**Solution:**
1. Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
2. Clear browser cache
3. Try incognito/private window
4. Try different browser

---

### Issue 4: Amplify Redirects Not Applied

**Problem:** Amplify not using `_redirects` file

**Solution:**

#### Option A: Add Redirects in Amplify Console (Recommended)

1. Go to AWS Amplify Console
2. Select your app
3. Go to "Rewrites and redirects"
4. Add these rules:

```
Source: /admin/<*>
Target: /admin/<*>
Type: 200 (Rewrite)

Source: /<*>
Target: /index.html
Type: 200 (Rewrite)
```

#### Option B: Verify _redirects File

1. Check if `public/_redirects` exists
2. Content should be:
```
/admin/*  /admin/:splat  200
/*  /index.html  200
```

---

### Issue 5: Footer Link Incorrect

**Problem:** Footer "Admin" link goes to wrong place

**Solution:**

Check `src/components/Footer.jsx`:

**Should be:**
```jsx
<a href="/admin/" className="footer-link">Admin</a>
```

**NOT:**
```jsx
<a href="/admin" className="footer-link">Admin</a>
<a href="/admin/index.html" className="footer-link">Admin</a>
```

---

## 🧪 Testing Steps

### Step 1: Check Build Output
```bash
# Build locally
npm run build

# Check admin folder exists
ls build/admin/

# Should show:
# - index.html
# - dashboard.html
# - blogs.html
# - careers.html
# - etc.
```

### Step 2: Test Locally
```bash
# Serve build folder
npx serve -s build

# Open browser
http://localhost:3000/admin/

# Should show login page
```

### Step 3: Check Amplify Build Logs

1. Go to Amplify Console
2. Click on latest build
3. Expand "Build" phase
4. Look for:
```
Verifying admin folder in build...
total 8
drwxr-xr-x 4 root root  128 May 13 10:54 .
drwxr-xr-x 6 root root  192 May 13 10:54 ..
drwxr-xr-x 2 root root   64 May 13 10:54 css
drwxr-xr-x 2 root root  256 May 13 10:54 js
-rw-r--r-- 1 root root 1234 May 13 10:43 index.html
...
```

### Step 4: Check Deployed Site

1. Get your Amplify URL (e.g., `https://main.d1234.amplifyapp.com`)
2. Open: `https://main.d1234.amplifyapp.com/admin/`
3. Should see login page

### Step 5: Check Browser Console

1. Open admin URL
2. Press F12 (Developer Tools)
3. Check Console tab for errors
4. Check Network tab for 404 errors

---

## 🔧 Quick Fixes

### Fix 1: Update Amplify Redirects

**In Amplify Console:**
1. App Settings → Rewrites and redirects
2. Click "Edit"
3. Add:
```json
[
  {
    "source": "/admin/<*>",
    "target": "/admin/<*>",
    "status": "200",
    "condition": null
  },
  {
    "source": "/<*>",
    "target": "/index.html",
    "status": "200",
    "condition": null
  }
]
```
4. Save
5. Redeploy

### Fix 2: Force Rebuild

```bash
# Make a small change
git commit --allow-empty -m "Trigger Amplify rebuild"
git push origin master
```

### Fix 3: Check Footer Link

Edit `src/components/Footer.jsx`:

Find the Admin link and ensure it has trailing slash:
```jsx
<a href="/admin/" className="footer-link">Admin</a>
```

Commit and push:
```bash
git add src/components/Footer.jsx
git commit -m "Fix admin panel link"
git push origin master
```

---

## 📊 Verification Checklist

After deployment, verify:

- [ ] Amplify build completed successfully (green checkmark)
- [ ] Build logs show "Verifying admin folder in build..."
- [ ] Can access: `https://your-site.amplifyapp.com/admin/`
- [ ] Login page displays correctly
- [ ] CSS and JS files load (check Network tab)
- [ ] No 404 errors in console
- [ ] Footer "Admin" link works
- [ ] Can login with credentials
- [ ] Dashboard loads after login

---

## 🆘 Still Not Working?

### Check These:

1. **Amplify URL:**
   - What's your exact Amplify URL?
   - Try: `https://[your-url]/admin/` (with trailing slash)

2. **Build Status:**
   - Is build complete?
   - Any errors in build logs?

3. **Browser:**
   - Try incognito mode
   - Try different browser
   - Clear cache

4. **Network:**
   - Check browser Network tab
   - Are files loading?
   - Any 404 errors?

5. **Console Errors:**
   - Open browser console (F12)
   - Any JavaScript errors?
   - Any CORS errors?

---

## 📞 Debug Information to Collect

If still not working, collect this info:

1. **Amplify URL:** `https://_____.amplifyapp.com`
2. **URL you're trying:** `https://_____.amplifyapp.com/admin/`
3. **What you see:** (blank page, 404, error message, etc.)
4. **Browser console errors:** (screenshot or copy errors)
5. **Network tab:** (any 404 or failed requests)
6. **Amplify build logs:** (copy relevant sections)

---

## ✅ Expected Behavior

**When working correctly:**

1. Visit: `https://your-site.amplifyapp.com/admin/`
2. See: Login page with Branchworks logo
3. Enter: admin / admin123
4. Redirected to: Dashboard
5. Can navigate to: Blogs, Careers sections
6. Can create/edit/delete blogs and careers

---

## 🎯 Most Common Solution

**90% of the time, the issue is:**

1. **Missing trailing slash** - Use `/admin/` not `/admin`
2. **Build not complete** - Wait for Amplify to finish deploying
3. **Browser cache** - Hard refresh or use incognito mode

**Try these first!**

---

**Last Updated:** May 13, 2026
