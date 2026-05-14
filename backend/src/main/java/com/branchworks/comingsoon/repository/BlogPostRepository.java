package com.branchworks.comingsoon.repository;

import com.branchworks.comingsoon.model.BlogPost;
import com.branchworks.comingsoon.model.BlogPost.PostStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BlogPostRepository extends JpaRepository<BlogPost, Long> {
    
    // Find by slug for public blog detail page
    Optional<BlogPost> findBySlug(String slug);
    
    // Find by status
    List<BlogPost> findByStatus(PostStatus status);
    
    // Find by category
    List<BlogPost> findByCategory(String category);
    
    // Find by status and category
    List<BlogPost> findByStatusAndCategory(PostStatus status, String category);
    
    // Find published blogs ordered by date (handle null publishedAt)
    List<BlogPost> findByStatusOrderByCreatedAtDesc(PostStatus status);
    
    // Find published blogs by category ordered by date (handle null publishedAt)
    List<BlogPost> findByStatusAndCategoryOrderByCreatedAtDesc(PostStatus status, String category);
}
