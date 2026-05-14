package com.branchworks.comingsoon.controller;

import com.branchworks.comingsoon.model.BlogPost;
import com.branchworks.comingsoon.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/blogs")
@CrossOrigin(origins = "*")
public class BlogController {
    
    @Autowired
    private BlogService blogService;
    
    // Get all published blogs (for public blog list page)
    @GetMapping
    public ResponseEntity<List<BlogPost>> getPublishedBlogs(
            @RequestParam(required = false) String category) {
        
        List<BlogPost> blogs;
        if (category != null && !category.equals("All")) {
            blogs = blogService.getPublishedBlogsByCategory(category);
        } else {
            blogs = blogService.getPublishedBlogs();
        }
        return ResponseEntity.ok(blogs);
    }
    
    // Debug endpoint - get all blogs regardless of status
    @GetMapping("/debug/all")
    public ResponseEntity<List<BlogPost>> getAllBlogsDebug() {
        return ResponseEntity.ok(blogService.getAllBlogs());
    }
    
    // Get single blog by slug (for public blog detail page)
    @GetMapping("/{slug}")
    public ResponseEntity<BlogPost> getBlogBySlug(@PathVariable String slug) {
        Optional<BlogPost> blog = blogService.getBlogBySlug(slug);
        if (blog.isPresent()) {
            // Increment view count
            blogService.incrementViewCount(blog.get().getId());
            return ResponseEntity.ok(blog.get());
        }
        return ResponseEntity.notFound().build();
    }
}
