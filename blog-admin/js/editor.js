checkAuth();

let blogId = null;
let uploadedImageUrl = '';

// Check if editing existing blog
window.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    blogId = urlParams.get('id');
    
    if (blogId) {
        document.getElementById('page-title').textContent = 'Edit Blog Post';
        loadBlog(blogId);
    }
});

async function loadBlog(id) {
    try {
        const response = await fetch(`${API_ENDPOINTS.blogs}/${id}`);
        const blog = await response.json();
        
        document.getElementById('blog-title').value = blog.title;
        document.getElementById('blog-excerpt').value = blog.excerpt || '';
        document.getElementById('blog-content').value = blog.content;
        document.getElementById('blog-category').value = blog.category;
        document.getElementById('blog-tags').value = (blog.tags || []).join(', ');
        document.getElementById('blog-author').value = blog.authorName || 'Admin';
        
        if (blog.featuredImage) {
            uploadedImageUrl = blog.featuredImage;
            showImagePreview(blog.featuredImage);
        }
    } catch (error) {
        console.error('Error loading blog:', error);
        alert('Failed to load blog');
    }
}

async function uploadImage() {
    const fileInput = document.getElementById('featured-image');
    const file = fileInput.files[0];
    
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
    }
    
    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
    }
    
    const uploadText = document.getElementById('upload-text');
    uploadText.textContent = 'Uploading...';
    
    try {
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await fetch(API_ENDPOINTS.upload, {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (result.url) {
            uploadedImageUrl = result.url;
            showImagePreview(result.url);
        } else {
            alert('Failed to upload image');
        }
    } catch (error) {
        console.error('Error uploading image:', error);
        alert('Failed to upload image');
    } finally {
        uploadText.textContent = 'Upload Image';
    }
}

function showImagePreview(imageUrl) {
    document.getElementById('preview-img').src = imageUrl;
    document.getElementById('image-preview').style.display = 'block';
    document.getElementById('image-upload').style.display = 'none';
}

function removeImage() {
    uploadedImageUrl = '';
    document.getElementById('image-preview').style.display = 'none';
    document.getElementById('image-upload').style.display = 'block';
    document.getElementById('featured-image').value = '';
}

async function saveBlog(status) {
    const title = document.getElementById('blog-title').value.trim();
    const content = document.getElementById('blog-content').value.trim();
    const category = document.getElementById('blog-category').value;
    
    if (!title || !content || !category) {
        alert('Please fill in all required fields (Title, Content, Category)');
        return;
    }
    
    const excerpt = document.getElementById('blog-excerpt').value.trim();
    const tagsString = document.getElementById('blog-tags').value.trim();
    const tags = tagsString ? tagsString.split(',').map(t => t.trim()).filter(t => t) : [];
    const authorName = document.getElementById('blog-author').value.trim();
    
    const blogData = {
        title,
        content,
        excerpt,
        category,
        tags,
        authorName,
        featuredImage: uploadedImageUrl,
        status
    };
    
    // Disable buttons
    document.getElementById('save-draft-btn').disabled = true;
    document.getElementById('publish-btn').disabled = true;
    
    try {
        const method = blogId ? 'PUT' : 'POST';
        const url = blogId ? `${API_ENDPOINTS.blogs}/${blogId}` : API_ENDPOINTS.blogs;
        
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(blogData)
        });
        
        if (response.ok) {
            alert(`Blog ${status === 'PUBLISHED' ? 'published' : 'saved as draft'} successfully!`);
            window.location.href = 'blogs.html';
        } else {
            alert('Failed to save blog');
        }
    } catch (error) {
        console.error('Error saving blog:', error);
        alert('Failed to save blog');
    } finally {
        document.getElementById('save-draft-btn').disabled = false;
        document.getElementById('publish-btn').disabled = false;
    }
}
