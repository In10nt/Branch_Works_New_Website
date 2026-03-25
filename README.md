# Branchworks Coming Soon Website

A modern coming soon page with email waitlist functionality, built with React and Spring Boot.

## Features

- 🎨 Modern, responsive design
- 📧 Email waitlist with validation
- ☁️ AWS Elastic Beanstalk deployment
- 🔒 Secure email handling with Gmail SMTP
- ✅ Health check endpoint

## Tech Stack

**Frontend:**
- React 18
- CSS3 with modern animations
- Responsive design

**Backend:**
- Spring Boot 3.2.0
- Java 17
- H2 Database (in-memory)
- JavaMail for email notifications

**Deployment:**
- AWS Elastic Beanstalk (Docker platform)
- Amazon Linux 2023
- Docker containerization

## Project Structure

```
├── src/                          # React frontend
│   ├── components/
│   │   ├── ComingSoon.jsx       # Main component
│   │   └── ComingSoon.css       # Styles
│   └── App.js
├── backend/                      # Spring Boot backend
│   ├── src/main/java/
│   │   └── com/branchworks/comingsoon/
│   │       ├── controller/      # REST controllers
│   │       ├── service/         # Business logic
│   │       ├── model/           # Data models
│   │       └── repository/      # Data access
│   └── pom.xml
├── deployment/
│   └── Dockerfile               # Docker configuration
├── .ebextensions/
│   └── environment.config       # Beanstalk configuration
└── buildspec.yml                # AWS CodeBuild configuration
```

## Local Development

### Prerequisites

- Node.js 18+
- Java 17+
- Maven 3.6+

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd Branch_Works_New_Website
```

2. **Configure environment variables**
```bash
cp .env.example .env
# Edit .env with your email credentials
```

3. **Start the backend**
```bash
cd backend
mvn spring-boot:run
```

4. **Start the frontend** (in a new terminal)
```bash
npm install
npm start
```

5. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:7000
- Health check: http://localhost:7000/health

## Deployment to AWS

### Quick Deploy

```powershell
# Install EB CLI (one-time)
pip install awsebcli --upgrade --user

# Deploy
./deploy-working.ps1
```

### Manual Deployment

See **DEPLOYMENT_GUIDE.md** for detailed instructions including:
- EB CLI setup
- Alternative deployment methods
- Troubleshooting guide
- Configuration details

### Application URL

Production: http://Branchworks-coming-soon-env.eba-h4dbjcip.eu-north-1.elasticbeanstalk.com

## Configuration

### Environment Variables

**Backend (.env or Beanstalk environment):**
```
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
COMPANY_EMAIL=notifications@yourcompany.com
SERVER_PORT=7000
```

**Frontend (.env):**
```
REACT_APP_API_URL=http://localhost:7000
```

### Email Setup

The application uses Gmail SMTP. To set up:

1. Enable 2-factor authentication on your Gmail account
2. Generate an app password: https://myaccount.google.com/apppasswords
3. Use the app password in `MAIL_PASSWORD`

See `backend/EMAIL_SETUP.md` for detailed instructions.

## API Endpoints

### Waitlist

**POST** `/api/waitlist`
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "message": "Successfully added to waitlist!",
  "email": "user@example.com",
  "timestamp": "2024-03-25T10:30:00"
}
```

### Health Check

**GET** `/health`
```json
{
  "status": "UP"
}
```

## Files Overview

- **deploy-working.ps1** - Deployment script (requires EB CLI)
- **DEPLOYMENT_GUIDE.md** - Complete deployment documentation
- **README_DEPLOYMENT.md** - Quick deployment summary
- **buildspec.yml** - AWS CodeBuild configuration
- **.ebextensions/environment.config** - Beanstalk settings
- **deployment/Dockerfile** - Docker container configuration

## Troubleshooting

### Common Issues

1. **Email not sending**
   - Verify Gmail app password is correct
   - Check 2FA is enabled on Gmail account
   - Review backend logs for SMTP errors

2. **CORS errors**
   - Ensure `REACT_APP_API_URL` points to correct backend
   - Check CORS configuration in `CorsConfig.java`

3. **Deployment fails**
   - See DEPLOYMENT_GUIDE.md troubleshooting section
   - Check AWS CloudWatch logs
   - Verify Dockerfile is in deployment package

## License

Private - Branchworks

## Support

For deployment issues, see **DEPLOYMENT_GUIDE.md**
