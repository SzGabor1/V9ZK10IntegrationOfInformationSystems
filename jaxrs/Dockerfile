FROM ubuntu:latest AS build
LABEL authors="Szendrei Gábor"

RUN apt-get update
RUN apt-get install openjdk-21-jdk maven -y

WORKDIR /app
COPY . .

# Build the project and list the contents of the target directory
RUN mvn clean package && ls -l /app/target

FROM openjdk:21-jdk-slim
EXPOSE 8080

# Copy the JAR file from the build stage
COPY --from=build /app/target/JAXRS-1.0-SNAPSHOT.jar /app/app.jar

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
