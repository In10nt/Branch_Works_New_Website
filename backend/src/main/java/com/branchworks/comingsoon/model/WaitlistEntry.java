package com.branchworks.comingsoon.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "waitlist_entries")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WaitlistEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is required")
    @Size(max = 100, message = "Name must be less than 100 characters")
    @Column(nullable = false, length = 100)
    private String name;

    @NotBlank(message = "Company is required")
    @Size(max = 100, message = "Company must be less than 100 characters")
    @Column(nullable = false, length = 100)
    private String company;

    @NotBlank(message = "Company size is required")
    @Column(nullable = false, length = 20)
    private String companySize;

    @NotBlank(message = "Message is required")
    @Size(max = 250, message = "Message must be less than 250 characters")
    @Column(nullable = false, length = 250)
    private String message;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}