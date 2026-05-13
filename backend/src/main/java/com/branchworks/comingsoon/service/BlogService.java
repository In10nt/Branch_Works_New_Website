package com.branchworks.comingsoon.service;

import com.branchworks.comingsoon.model.BlogPost;
import com.branchworks.comingsoon.model.BlogPost.PostStatus;
import com.branchworks.comingsoon.repository.BlogPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class BlogService {
    
    @Autowired
    private BlogPostRepository blogPostRepository;
    
    // Get all blogs (for admin)
    public List<BlogPost> getAllBlogs() {
        return blogPostRepository.findAll();
    }
    
    // Get blogs by status (for admin)
    public List<BlogPost> getBlogsByStatus(PostStatus status) {
        return blogPostRepository.findByStatus(status);
    }
    
    // Get blogs by category (for admin)
    public List<BlogPost> getBlogsByCategory(String category) {
        return blogPostRepository.findByCategory(category);
    }
    
    // Get blogs by status and category (for admin)
    public List<BlogPost> getBlogsByStatusAndCategory(PostStatus status, String category) {
        return blogPostRepository.findByStatusAndCategory(status, category);
    }
    
    // Get published blogs (for public)
    public List<BlogPost> getPublishedBlogs() {
        return blogPostRepository.findByStatusOrderByPublishedAtDesc(PostStatus.PUBLISHED);
    }
    
    // Get published blogs by category (for public)
    public List<BlogPost> getPublishedBlogsByCategory(String category) {
        return blogPostRepository.findByStatusAndCategoryOrderByPublishedAtDesc(PostStatus.PUBLISHED, category);
    }
    
    // Get blog by ID
    public Optional<BlogPost> getBlogById(Long id) {
        return blogPostRepository.findById(id);
    }
    
    // Get blog by slug (for public blog detail page)
    public Optional<BlogPost> getBlogBySlug(String slug) {
        return blogPostRepository.findBySlug(slug);
    }
    
    // Create new blog
    public BlogPost createBlog(BlogPost blogPost) {
        if (blogPost.getStatus() == PostStatus.PUBLISHED && blogPost.getPublishedAt() == null) {
            blogPost.setPublishedAt(LocalDateTime.now());
        }
        return blogPostRepository.save(blogPost);
    }
    
    // Update blog
    public BlogPost updateBlog(Long id, BlogPost updatedBlog) {
        Optional<BlogPost> existingBlog = blogPostRepository.findById(id);
        if (existingBlog.isPresent()) {
            BlogPost blog = existingBlog.get();
            blog.setTitle(updatedBlog.getTitle());
            blog.setSlug(updatedBlog.getSlug());
            blog.setContent(updatedBlog.getContent());
            blog.setExcerpt(updatedBlog.getExcerpt());
            blog.setFeaturedImage(updatedBlog.getFeaturedImage());
            blog.setCategory(updatedBlog.getCategory());
            blog.setTags(updatedBlog.getTags());
            blog.setAuthorName(updatedBlog.getAuthorName());
            
            // Update published date if status changes to PUBLISHED
            if (updatedBlog.getStatus() == PostStatus.PUBLISHED && blog.getStatus() != PostStatus.PUBLISHED) {
                blog.setPublishedAt(LocalDateTime.now());
            }
            blog.setStatus(updatedBlog.getStatus());
            
            return blogPostRepository.save(blog);
        }
        throw new RuntimeException("Blog not found with id: " + id);
    }
    
    // Delete blog
    public void deleteBlog(Long id) {
        blogPostRepository.deleteById(id);
    }
    
    // Increment view count
    public void incrementViewCount(Long id) {
        Optional<BlogPost> blog = blogPostRepository.findById(id);
        if (blog.isPresent()) {
            BlogPost post = blog.get();
            post.setViewCount(post.getViewCount() + 1);
            blogPostRepository.save(post);
        }
    }
}
