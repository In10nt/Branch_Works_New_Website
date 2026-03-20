package com.branchworks.comingsoon.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WaitlistResponse {
    private Long id;
    private String name;
    private String company;
    private String companySize;
    private String message;
    private LocalDateTime createdAt;
}