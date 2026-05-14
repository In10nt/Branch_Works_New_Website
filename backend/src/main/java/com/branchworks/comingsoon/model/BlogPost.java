package com.branchworks.comingsoon.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "blog_posts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BlogPost {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 200)
    private String title;
    
    @Column(nullable = false, unique = true, length = 250)
    private String slug;
    
    @Column(columnDefinition = "TEXT")
    private String excerpt;
    
    @Column(columnDefinition = "LONGTEXT", nullable = false)
    private String content;
    
    @Column(name = "featured_image")
    private String featuredImage;
    
    @Column(name = "category", length = 100)
    private String category; // Finance, Technology Support, Offshore Hiring
    
    @ElementCollection
    @CollectionTable(name = "blog_post_tags", joinColumns = @JoinColumn(name = "blog_post_id"))
    @Column(name = "tag")
    private List<String> tags = new ArrayList<>();
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PostStatus status = PostStatus.DRAFT;
    
    @Column(name = "author_name")
    private String authorName;
    
    @Column(name = "view_count")
    private Long viewCount = 0L;
    
    @Column(name = "published_at")
    private LocalDateTime publishedAt;
    
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    public enum PostStatus {
        DRAFT, PUBLISHED, ARCHIVED
    }
    
    // Helper method for admin panel compatibility
    @Transient
    public boolean isPublished() {
        return this.status == PostStatus.PUBLISHED;
    }
    
    public void setPublished(boolean published) {
        this.status = published ? PostStatus.PUBLISHED : PostStatus.DRAFT;
    }
    
    // Helper method to generate slug from title
    @PrePersist
    @PreUpdate
    public void generateSlug() {
        if (this.slug == null || this.slug.isEmpty()) {
            this.slug = this.title.toLowerCase()
                .replaceAll("[^a-z0-9\\s-]", "")
                .replaceAll("\\s+", "-")
                .replaceAll("-+", "-")
                .trim();
        }
    }
}
