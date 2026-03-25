FROM amazoncorretto:17-alpine

# Set working directory
WORKDIR /app

# Copy the JAR file
COPY coming-soon-backend-0.0.1-SNAPSHOT.jar app.jar

# Expose port 5000
EXPOSE 5000

# Run the application on port 5000
ENTRYPOINT ["java", "-Dserver.port=5000", "-jar", "app.jar"]
