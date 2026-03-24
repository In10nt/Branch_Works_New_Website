package com.branchworks.comingsoon.service;

import com.branchworks.comingsoon.dto.WaitlistRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${company.email:}")
    private String companyEmail;

    public void sendWaitlistNotification(WaitlistRequest request) {
        try {
            if (companyEmail == null || companyEmail.isEmpty()) {
                log.warn("Company email not configured, skipping email notification");
                return;
            }
            
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(companyEmail);
            message.setSubject("New Waitlist Entry - " + request.getName());
            message.setText(buildEmailContent(request));
            
            mailSender.send(message);
            log.info("Email sent successfully to {}", companyEmail);
        } catch (Exception e) {
            log.error("Failed to send email: {}", e.getMessage());
            // Don't throw exception - we still want to save the entry even if email fails
        }
    }

    private String buildEmailContent(WaitlistRequest request) {
        return String.format("""
                New Waitlist Entry Received
                
                Name: %s
                Company: %s
                Company Size: %s
                Message: %s
                
                ---
                This is an automated message from Branchworks Coming Soon page.
                """,
                request.getName(),
                request.getCompany(),
                request.getCompanySize(),
                request.getMessage()
        );
    }
}