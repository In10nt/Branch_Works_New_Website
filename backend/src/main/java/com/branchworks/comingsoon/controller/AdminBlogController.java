package com.branchworks.comingsoon.controller;

import com.branchworks.comingsoon.model.BlogPost;
import com.branchworks.comingsoon.model.BlogPost.PostStatus;
import com.branchworks.comingsoon.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin/blogs")
@CrossOrigin(origins = "*")
public class AdminBlogController {
    
    @Autowired
    private BlogService blogService;
    
    // Get all blogs with optional filters (for admin blog list)
    @GetMapping
    public ResponseEntity<List<BlogPost>> getAllBlogs(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String category) {
        
        List<BlogPost> blogs;
        
        if (status != null && category != null && !category.equals("all")) {
            // Filter by both status and category
            PostStatus postStatus = PostStatus.valueOf(status.toUpperCase());
            blogs = blogService.getBlogsByStatusAndCategory(postStatus, category);
        } else if (status != null) {
            // Filter by status only
            PostStatus postStatus = PostStatus.valueOf(status.toUpperCase());
            blogs = blogService.getBlogsByStatus(postStatus);
        } else if (category != null && !category.equals("all")) {
            // Filter by category only
            blogs = blogService.getBlogsByCategory(category);
        } else {
            // No filters, get all blogs
            blogs = blogService.getAllBlogs();
        }
        
        return ResponseEntity.ok(blogs);
    }
    
    // Get single blog by ID (for admin edit page)
    @GetMapping("/{id}")
    public ResponseEntity<BlogPost> getBlogById(@PathVariable Long id) {
        Optional<BlogPost> blog = blogService.getBlogById(id);
        return blog.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }
    
    // Create new blog
    @PostMapping
    public ResponseEntity<BlogPost> createBlog(@RequestBody BlogPost blogPost) {
        BlogPost createdBlog = blogService.createBlog(blogPost);
        return ResponseEntity.ok(createdBlog);
    }
    
    // Update existing blog
    @PutMapping("/{id}")
    public ResponseEntity<BlogPost> updateBlog(
            @PathVariable Long id,
            @RequestBody BlogPost blogPost) {
        try {
            BlogPost updatedBlog = blogService.updateBlog(id, blogPost);
            return ResponseEntity.ok(updatedBlog);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Delete blog
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBlog(@PathVariable Long id) {
        blogService.deleteBlog(id);
        return ResponseEntity.ok().build();
    }
    
    // Toggle publish status
    @PatchMapping("/{id}/publish")
    public ResponseEntity<BlogPost> togglePublishStatus(
            @PathVariable Long id,
            @RequestParam boolean published) {
        try {
            BlogPost blog = blogService.getBlogById(id)
                    .orElseThrow(() -> new RuntimeException("Blog not found"));
            
            blog.setStatus(published ? PostStatus.PUBLISHED : PostStatus.DRAFT);
            BlogPost updatedBlog = blogService.updateBlog(id, blog);
            return ResponseEntity.ok(updatedBlog);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
