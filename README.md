# Branchworks Coming Soon Website

A full-stack coming soon page with React frontend and Spring Boot backend.

## Project Structure

```
Branch Works_New_Website/
├── src/                          # React Frontend
│   ├── components/
│   │   ├── ComingSoon.jsx
│   │   └── ComingSoon.css
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── backend/                      # Spring Boot Backend
│   ├── src/main/java/com/branchworks/comingsoon/
│   │   ├── ComingSoonApplication.java
│   │   ├── controller/
│   │   │   └── WaitlistController.java
│   │   ├── service/
│   │   │   └── WaitlistService.java
│   │   ├── repository/
│   │   │   └── WaitlistRepository.java
│   │   ├── model/
│   │   │   └── WaitlistEntry.java
│   │   ├── dto/
│   │   │   ├── WaitlistRequest.java
│   │   │   └── WaitlistResponse.java
│   │   ├── config/
│   │   │   └── CorsConfig.java
│   │   └── exception/
│   │       └── GlobalExceptionHandler.java
│   └── src/main/resources/
│       └── application.properties
├── images/                       # Static assets
├── package.json
└── pom.xml
```

## Features

### Frontend (React)
- Modern, responsive UI
- Form validation
- Real-time character counter
- Success/error notifications
- Axios for API calls
- Mobile-friendly design

### Backend (Spring Boot)
- RESTful API
- JPA/Hibernate for database operations
- Input validation
- CORS configuration
- Exception handling
- H2 in-memory database (development)
- PostgreSQL support (production)

## Prerequisites

- Node.js (v16 or higher)
- Java 17 or higher
- Maven 3.6+

## Installation & Setup

### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The React app will run on `http://localhost:3000`

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Build the project:
```bash
mvn clean install
```

3. Run the Spring Boot application:
```bash
mvn spring-boot:run
```

The backend API will run on `http://localhost:7000`

## API Endpoints

### POST /api/waitlist
Add a new entry to the waitlist

**Request Body:**
```json
{
  "name": "John Doe",
  "company": "Google",
  "companySize": "0 - 5",
  "message": "I want to learn more about your services"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully joined the waitlist!",
  "data": {
    "id": 1,
    "name": "John Doe",
    "company": "Google",
    "companySize": "0 - 5",
    "message": "I want to learn more about your services",
    "createdAt": "2024-03-19T10:30:00"
  }
}
```

### GET /api/waitlist
Get all waitlist entries

### GET /api/waitlist/count
Get total count of waitlist entries

### GET /api/waitlist/stats
Get statistics about waitlist entries

## Database

### Development (H2)
- Access H2 Console: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:comingsoondb`
- Username: `sa`
- Password: (leave empty)

### Production (PostgreSQL)
Update `application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/comingsoon
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
```

## Building for Production

### Frontend
```bash
npm run build
```

### Backend
```bash
cd backend
mvn clean package
java -jar target/coming-soon-backend-0.0.1-SNAPSHOT.jar
```

## Environment Variables

### Frontend
Create `.env` file:
```
REACT_APP_API_URL=http://localhost:8080
```

### Backend
Update `application.properties` or use environment variables:
```
SERVER_PORT=8080
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

## Technologies Used

### Frontend
- React 18
- Axios
- CSS3

### Backend
- Spring Boot 3.2
- Spring Data JPA
- Spring Validation
- H2 Database
- PostgreSQL
- Lombok
- Maven

## License

MIT License

## Contact

For questions or support, contact: support@branchworks.com