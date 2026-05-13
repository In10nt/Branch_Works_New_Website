# 📖 BranchWorks Usage Guide

## 🎯 For Daily Use

### Starting the Application

1. **Navigate to the project folder:**
   ```
   C:\Users\DELL\OneDrive\Desktop\Branch Works
   ```

2. **Double-click `start-all.bat`**
   - Three command windows will open
   - Wait 30-60 seconds for backend to fully start
   - React website will open automatically in your browser

3. **You'll see:**
   - ✅ Backend Server (black window with Spring Boot logo)
   - ✅ Admin Panel (black window showing "Serving HTTP on port 8080")
   - ✅ React Website (black window with webpack info)

### Using the Website

1. **View the website:** http://localhost:3000
2. **Browse pages:**
   - Home
   - Finance
   - Technology Support
   - Offshore Hiring
   - Blog
   - About Us
   - Careers

3. **View blogs:**
   - Scroll to "Customer Stories" section on any page
   - Click "Read more" on any blog card
   - Blog detail page opens with full content

### Managing Blogs

#### Method 1: From Website Footer
1. Scroll to bottom of any page
2. Click **"Admin"** link in footer
3. Login page opens in new tab

#### Method 2: Direct URL
1. Open browser
2. Go to: http://localhost:8080
3. Login page appears

#### Login
- **Username:** admin
- **Password:** admin123
- Click "Sign In"
- Success popup appears
- Click "Continue to Dashboard" or wait 5 seconds

#### Create New Blog
1. Click **"Create New Blog"** button
2. Fill in details:
   - **Title:** Your blog title (e.g., "Finance Tips for 2026")
   - **Slug:** URL-friendly name (e.g., "finance-tips-2026")
   - **Category:** Select from dropdown
     - Finance
     - Technology Support
     - Offshore Hiring
   - **Content:** Write your blog content
     - Use double line breaks for paragraphs
     - Start lines with # for headings
     - Use - or * for bullet points
   - **Excerpt:** Short summary (optional)
   - **Image:** Click "Choose File" to upload
   - **Status:** Draft or Published

3. Click **"Publish Blog"** or **"Save Draft"**
4. Blog appears in list

#### Edit Existing Blog
1. Find blog in list
2. Click **"Edit"** link
3. Make changes
4. Click **"Update Blog"**

#### Delete Blog
1. Find blog in list
2. Click **"Delete"** link
3. Confirm deletion
4. Blog removed from database

#### View Blog on Website
1. After creating/editing blog
2. Go to website: http://localhost:3000
3. Navigate to relevant page:
   - Finance blogs → Finance page
   - Technology Support blogs → Technology Support page
   - Offshore Hiring blogs → Offshore Hiring page
   - All blogs → Blog page or Home page
4. Scroll to "Customer Stories" section
5. Your blog appears in the cards

### Stopping the Application

#### Method 1: Quick Stop (Recommended)
1. Double-click `stop-all.bat`
2. All services stop automatically

#### Method 2: Manual Stop
1. Go to each command window
2. Press `Ctrl + C`
3. Type `Y` when asked "Terminate batch job?"
4. Close the window

## 🎨 Blog Content Formatting Tips

### Paragraphs
```
This is paragraph one.

This is paragraph two.
```
Use double line breaks between paragraphs.

### Headings
```
# Main Heading

## Subheading

### Smaller Heading
```

### Lists
```
- First item
- Second item
- Third item

* Alternative bullet
* Another item
```

### Example Blog Content
```
# Introduction to Offshore Hiring

Offshore hiring has become a strategic advantage for modern businesses.

## Key Benefits

- Cost efficiency
- Access to global talent
- 24/7 operations
- Scalability

## Why Choose Sri Lanka?

Sri Lanka offers a unique combination of skilled workforce and competitive pricing.

The country maintains a 93.2% literacy rate, the highest in South Asia.

## Conclusion

Partnering with BranchWork Global gives you access to this elite talent pool.
```

## 📊 Blog Categories Explained

### Finance
- Accounting tips
- Financial planning
- Tax strategies
- Bookkeeping guides
- CFO insights

**Appears on:** Finance page, Blog page, Home page

### Technology Support
- IT solutions
- Tech troubleshooting
- Software guides
- Digital transformation
- Cybersecurity

**Appears on:** Technology Support page, Blog page, Home page

### Offshore Hiring
- Hiring strategies
- Talent acquisition
- Remote work tips
- BPO insights
- Global workforce

**Appears on:** Offshore Hiring page, Blog page, Home page

## ⚡ Quick Tips

### For Best Results
1. ✅ Always keep all three command windows open
2. ✅ Wait for backend to fully start before accessing admin panel
3. ✅ Use descriptive slugs (e.g., "finance-tips-2026" not "blog1")
4. ✅ Choose correct category for proper page display
5. ✅ Upload images for better visual appeal
6. ✅ Write clear excerpts for blog cards
7. ✅ Use "Draft" status while working, "Published" when ready

### Common Mistakes to Avoid
1. ❌ Closing command windows while using the app
2. ❌ Using spaces in slugs (use hyphens instead)
3. ❌ Forgetting to select category
4. ❌ Not uploading images
5. ❌ Using very long titles (keep under 100 characters)

## 🔄 Daily Workflow Example

### Morning Routine
```
1. Double-click start-all.bat
2. Wait for services to start
3. Open http://localhost:3000
4. Check website is working
5. Click Admin in footer
6. Login to admin panel
7. Ready to work!
```

### Creating a Blog Post
```
1. Click "Create New Blog"
2. Write title: "5 Finance Tips for Small Businesses"
3. Set slug: "5-finance-tips-small-businesses"
4. Select category: "Finance"
5. Write content with formatting
6. Upload relevant image
7. Write excerpt: "Discover essential finance tips..."
8. Set status: "Published"
9. Click "Publish Blog"
10. Go to Finance page on website
11. Verify blog appears in Customer Stories
12. Click "Read more" to check detail page
```

### End of Day
```
1. Save any draft blogs
2. Double-click stop-all.bat
3. All services stop
4. Close browser tabs
5. Done!
```

## 🆘 Need Help?

### Services Not Starting?
- Check if ports 3000, 5000, 8080 are free
- Run stop-all.bat first
- Try start-all.bat again

### Admin Panel Not Loading?
- Check if Python HTTP server is running (command window open)
- Try: http://localhost:8080/index.html
- Restart admin panel

### Blogs Not Showing on Website?
- Check blog status is "Published" not "Draft"
- Check correct category is selected
- Refresh website page (Ctrl + F5)
- Check backend is running

### Images Not Uploading?
- Check file is an image (jpg, png, gif, webp)
- Check file size is reasonable (< 5MB)
- Check backend is running
- Try different image

---

**Happy Blogging! 🎉**
