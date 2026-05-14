FROM amazoncorretto:17-alpine

WORKDIR /app

COPY target/coming-soon-backend-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 5000

ENV SERVER_PORT=5000

ENTRYPOINT ["java", "-jar", "app.jar"]
