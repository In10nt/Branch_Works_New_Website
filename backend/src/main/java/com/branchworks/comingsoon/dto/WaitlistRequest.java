package com.branchworks.comingsoon.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WaitlistRequest {

    @NotBlank(message = "Name is required")
    @Size(max = 100, message = "Name must be less than 100 characters")
    private String name;

    @NotBlank(message = "Company is required")
    @Size(max = 100, message = "Company must be less than 100 characters")
    private String company;

    @NotBlank(message = "Company size is required")
    private String companySize;

    @NotBlank(message = "Message is required")
    @Size(max = 250, message = "Message must be less than 250 characters")
    private String message;
}