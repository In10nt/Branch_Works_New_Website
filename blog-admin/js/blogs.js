checkAuth();

let allBlogs = [];
let currentFilter = 'all';
let currentCategory = 'all';

// Load blogs on page load
window.addEventListener('DOMContentLoaded', loadBlogs);

async function loadBlogs() {
    try {
        const response = await fetch(API_ENDPOINTS.blogs);
        allBlogs = await response.json();
        updateCounts();
        displayBlogs();
    } catch (error) {
        console.error('Error loading blogs:', error);
        document.getElementById('loading').textContent = 'Error loading blogs';
    }
}

function updateCounts() {
    const all = allBlogs.length;
    const published = allBlogs.filter(b => b.status === 'PUBLISHED').length;
    const draft = allBlogs.filter(b => b.status === 'DRAFT').length;
    
    document.getElementById('count-all').textContent = all;
    document.getElementById('count-published').textContent = published;
    document.getElementById('count-draft').textContent = draft;
}

function filterByStatus(status) {
    currentFilter = status;
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    displayBlogs();
}

function filterByCategory() {
    currentCategory = document.getElementById('category-filter').value;
    displayBlogs();
}

function displayBlogs() {
    let filteredBlogs = allBlogs;
    
    // Filter by status
    if (currentFilter !== 'all') {
        filteredBlogs = filteredBlogs.filter(b => b.status === currentFilter);
    }
    
    // Filter by category
    if (currentCategory !== 'all') {
        filteredBlogs = filteredBlogs.filter(b => b.category === currentCategory);
    }
    
    const loading = document.getElementById('loading');
    const noBlogs = document.getElementById('no-blogs');
    const tableContainer = document.getElementById('blog-table-container');
    const tableBody = document.getElementById('blog-table-body');
    
    loading.style.display = 'none';
    
    if (filteredBlogs.length === 0) {
        noBlogs.style.display = 'block';
        tableContainer.style.display = 'none';
    } else {
        noBlogs.style.display = 'none';
        tableContainer.style.display = 'block';
        
        tableBody.innerHTML = filteredBlogs.map(blog => {
            // Construct full image URL
            const imageUrl = blog.featuredImage 
                ? (blog.featuredImage.startsWith('http') 
                    ? blog.featuredImage 
                    : `http://localhost:5000${blog.featuredImage}`)
                : null;
            
            return `
            <tr>
                <td>
                    ${imageUrl 
                        ? `<img src="${imageUrl}" alt="${blog.title}" class="blog-thumbnail">` 
                        : '<div class="blog-thumbnail-placeholder">No Image</div>'}
                </td>
                <td>
                    <strong>${blog.title}</strong><br>
                    <small style="color: #A3A3A3;">/${blog.slug}</small>
                </td>
                <td><span class="category-badge">${blog.category || 'Uncategorized'}</span></td>
                <td><span class="status-badge status-${blog.status}">${blog.status}</span></td>
                <td>${formatDate(blog.publishedAt || blog.createdAt)}</td>
                <td>
                    <a href="editor.html?id=${blog.id}" class="action-link">Edit</a>
                    <a href="#" onclick="deleteBlog(${blog.id}, '${blog.title.replace(/'/g, "\\'")}'); return false;" class="action-link action-delete">Delete</a>
                </td>
            </tr>
        `}).join('');
    }
}

async function deleteBlog(id, title) {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
        return;
    }
    
    try {
        await fetch(`${API_ENDPOINTS.blogs}/${id}`, {
            method: 'DELETE'
        });
        alert('Blog deleted successfully');
        loadBlogs();
    } catch (error) {
        console.error('Error deleting blog:', error);
        alert('Failed to delete blog');
    }
}
