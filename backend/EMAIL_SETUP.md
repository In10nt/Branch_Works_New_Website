# Email Setup Guide

## Overview
The application now sends email notifications to your company email whenever someone submits the waitlist form.

## Configuration Steps

### Option 1: Using Gmail (Recommended for testing)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Copy the 16-character password

3. **Update application.properties**:
```properties
spring.mail.username=your-email@gmail.com
spring.mail.password=your-16-char-app-password
company.email=company@branchworks.com
```

### Option 2: Using Your Own SMTP Server

Update `application.properties`:
```properties
spring.mail.host=smtp.yourcompany.com
spring.mail.port=587
spring.mail.username=noreply@yourcompany.com
spring.mail.password=your-password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true

company.email=info@yourcompany.com
```

### Option 3: Using Office 365 / Outlook

```properties
spring.mail.host=smtp.office365.com
spring.mail.port=587
spring.mail.username=your-email@yourcompany.com
spring.mail.password=your-password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true

company.email=info@yourcompany.com
```

## Email Content

When a form is submitted, you'll receive an email like:

```
Subject: New Waitlist Entry - John Doe

New Waitlist Entry Received

Name: John Doe
Company: Google
Company Size: 0 - 5
Message: I want to learn more about your services

---
This is an automated message from Branchworks Coming Soon page.
```

## Testing

1. Start the backend server
2. Submit a test form
3. Check your company email inbox
4. Check backend logs for email status

## Troubleshooting

### Email not sending?

1. **Check logs**: Look for "Email sent successfully" or error messages
2. **Verify credentials**: Make sure username/password are correct
3. **Check firewall**: Ensure port 587 is not blocked
4. **Gmail users**: Make sure you're using an App Password, not your regular password

### Common Issues

**"Authentication failed"**
- Use App Password for Gmail
- Check username/password are correct

**"Connection timeout"**
- Check your firewall settings
- Try port 465 with SSL instead of 587 with TLS

**"Email not received"**
- Check spam folder
- Verify company.email is correct
- Check email server logs

## Security Notes

- Never commit `application.properties` with real credentials to Git
- Use environment variables in production:
  ```bash
  export MAIL_USERNAME=your-email@gmail.com
  export MAIL_PASSWORD=your-app-password
  export COMPANY_EMAIL=company@branchworks.com
  ```

- Update `application.properties` to use environment variables:
  ```properties
  spring.mail.username=${MAIL_USERNAME}
  spring.mail.password=${MAIL_PASSWORD}
  company.email=${COMPANY_EMAIL}
  ```

## Production Deployment

For production, consider:
1. Using a dedicated SMTP service (your company's email server)
2. Setting up SPF and DKIM records
3. Using environment variables for credentials
4. Implementing email rate limiting
5. Adding email templates with HTML formatting

## Support

If you need help setting up email, contact your IT department or email provider for SMTP server details.