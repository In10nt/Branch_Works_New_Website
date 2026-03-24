package com.branchworks.comingsoon.service;

import com.branchworks.comingsoon.dto.WaitlistRequest;
import com.sendgrid.*;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@Slf4j
public class SendGridEmailService {

    @Value("${sendgrid.api.key}")
    private String sendGridApiKey;

    @Value("${sendgrid.from.email}")
    private String fromEmail;

    @Value("${company.email}")
    private String companyEmail;

    public void sendWaitlistNotification(WaitlistRequest request) {
        try {
            Email from = new Email(fromEmail);
            Email to = new Email(companyEmail);
            String subject = "New Waitlist Entry - " + request.getName();
            Content content = new Content("text/plain", buildEmailContent(request));
            
            Mail mail = new Mail(from, subject, to, content);
            
            SendGrid sg = new SendGrid(sendGridApiKey);
            Request sgRequest = new Request();
            
            sgRequest.setMethod(Method.POST);
            sgRequest.setEndpoint("mail/send");
            sgRequest.setBody(mail.build());
            
            Response response = sg.api(sgRequest);
            
            if (response.getStatusCode() >= 200 && response.getStatusCode() < 300) {
                log.info("Email sent successfully via SendGrid to {}", companyEmail);
            } else {
                log.error("SendGrid returned status code: {}", response.getStatusCode());
            }
        } catch (IOException e) {
            log.error("Failed to send email via SendGrid: {}", e.getMessage());
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
