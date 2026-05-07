package com.branchworks.comingsoon.controller;

import com.branchworks.comingsoon.model.BlogPost;
import com.branchworks.comingsoon.model.BlogPost.PostStatus;
import com.branchworks.comingsoon.repository.BlogPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/import")
@CrossOrigin(origins = "*")
public class DataImportController {
    
    @Autowired
    private BlogPostRepository blogPostRepository;
    
    @PostMapping("/current-blogs")
    public ResponseEntity<Map<String, Object>> importCurrentBlogs() {
        try {
            // Check if blogs already exist
            long existingCount = blogPostRepository.count();
            if (existingCount > 0) {
                Map<String, Object> response = new HashMap<>();
                response.put("message", "Blogs already exist in database");
                response.put("count", existingCount);
                return ResponseEntity.ok(response);
            }
            
            // Create current static blogs
            BlogPost blog1 = new BlogPost();
            blog1.setTitle("Async First: Cut Meetings, Boost Remote Wins");
            blog1.setSlug("async-first-cut-meetings-boost-remote-wins");
            blog1.setExcerpt("Learn how async-first approach can transform your remote team productivity and reduce meeting fatigue.");
            blog1.setContent("<h2>Offshore vs. In-House Assistants: Smarter Support for Buyer's Agents in Australia</h2><p>Running a successful buyer's agent business in Australia means managing far more than just inspections and negotiations.</p>");
            blog1.setFeaturedImage("/images/customer_story_image_1.jpg");
            blog1.setCategory("Technology Support");
            blog1.setStatus(PostStatus.PUBLISHED);
            blog1.setAuthorName("Admin");
            blog1.setPublishedAt(LocalDateTime.of(2026, 4, 18, 10, 0));
            blog1.setTags(Arrays.asList("Remote Work", "Productivity", "Async Communication"));
            
            BlogPost blog2 = new BlogPost();
            blog2.setTitle("5 Finance Automation Tips for Growing Businesses");
            blog2.setSlug("finance-automation-tips-growing-businesses");
            blog2.setExcerpt("Discover how finance automation can streamline your business operations and improve accuracy.");
            blog2.setContent("<h2>5 Finance Automation Tips for Growing Businesses</h2><p>As your business grows, manual finance processes become bottlenecks.</p>");
            blog2.setFeaturedImage("/images/customer_story_image_1.jpg");
            blog2.setCategory("Finance");
            blog2.setStatus(PostStatus.PUBLISHED);
            blog2.setAuthorName("Admin");
            blog2.setPublishedAt(LocalDateTime.of(2026, 4, 17, 10, 0));
            blog2.setTags(Arrays.asList("Finance", "Automation", "Business Growth"));
            
            BlogPost blog3 = new BlogPost();
            blog3.setTitle("Building High-Performance Offshore Teams");
            blog3.setSlug("building-high-performance-offshore-teams");
            blog3.setExcerpt("A comprehensive guide to recruiting, onboarding, and managing successful offshore development teams.");
            blog3.setContent("<h2>Building High-Performance Offshore Teams</h2><p>Offshore teams can be a game-changer for businesses looking to scale quickly and cost-effectively.</p>");
            blog3.setFeaturedImage("/images/customer_story_image_1.jpg");
            blog3.setCategory("Offshore Hiring");
            blog3.setStatus(PostStatus.PUBLISHED);
            blog3.setAuthorName("Admin");
            blog3.setPublishedAt(LocalDateTime.of(2026, 4, 16, 10, 0));
            blog3.setTags(Arrays.asList("Offshore", "Team Building", "Management"));
            
            BlogPost blog4 = new BlogPost();
            blog4.setTitle("Remote Team Success: Building Culture Across Borders");
            blog4.setSlug("remote-team-success-building-culture-across-borders");
            blog4.setExcerpt("Learn strategies for building strong team culture in distributed remote teams across different time zones.");
            blog4.setContent("<h2>Remote Team Success: Building Culture Across Borders</h2><p>Building a strong team culture in a remote environment requires intentional effort.</p>");
            blog4.setFeaturedImage("/images/customer_story_image_1.jpg");
            blog4.setCategory("Technology Support");
            blog4.setStatus(PostStatus.PUBLISHED);
            blog4.setAuthorName("Admin");
            blog4.setPublishedAt(LocalDateTime.of(2026, 4, 20, 10, 0));
            blog4.setTags(Arrays.asList("Remote Work", "Team Culture", "Communication"));
            
            BlogPost blog5 = new BlogPost();
            blog5.setTitle("Digital Transformation: Scaling Teams Globally");
            blog5.setSlug("digital-transformation-scaling-teams-globally");
            blog5.setExcerpt("How digital transformation enables businesses to scale their teams globally and compete effectively.");
            blog5.setContent("<h2>Digital Transformation: Scaling Teams Globally</h2><p>Digital transformation is not just about technology—it's about enabling your business to scale globally.</p>");
            blog5.setFeaturedImage("/images/customer_story_image_1.jpg");
            blog5.setCategory("Technology Support");
            blog5.setStatus(PostStatus.PUBLISHED);
            blog5.setAuthorName("Admin");
            blog5.setPublishedAt(LocalDateTime.of(2026, 4, 20, 10, 0));
            blog5.setTags(Arrays.asList("Digital Transformation", "Scaling", "Technology"));
            
            BlogPost blog6 = new BlogPost();
            blog6.setTitle("Cost Optimization: 40% Savings with Offshore Teams");
            blog6.setSlug("cost-optimization-40-percent-savings-offshore-teams");
            blog6.setExcerpt("Real-world case study showing how businesses achieve significant cost savings through strategic offshore hiring.");
            blog6.setContent("<h2>Cost Optimization: 40% Savings with Offshore Teams</h2><p>Discover how companies are achieving 40% cost savings while maintaining or improving quality.</p>");
            blog6.setFeaturedImage("/images/customer_story_image_1.jpg");
            blog6.setCategory("Offshore Hiring");
            blog6.setStatus(PostStatus.PUBLISHED);
            blog6.setAuthorName("Admin");
            blog6.setPublishedAt(LocalDateTime.of(2026, 4, 22, 10, 0));
            blog6.setTags(Arrays.asList("Cost Savings", "Offshore", "ROI"));
            
            // Save all blogs
            blogPostRepository.save(blog1);
            blogPostRepository.save(blog2);
            blogPostRepository.save(blog3);
            blogPostRepository.save(blog4);
            blogPostRepository.save(blog5);
            blogPostRepository.save(blog6);
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Successfully imported 6 current blogs");
            response.put("count", 6);
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Failed to import blogs: " + e.getMessage());
            return ResponseEntity.internalServerError().body(error);
        }
    }
}
