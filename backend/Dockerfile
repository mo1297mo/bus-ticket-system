# Use the official OpenJDK 17 Debian-based base image for the build stage
FROM openjdk:17-jdk-slim AS build

# Set the working directory in the container to /app
WORKDIR /app

# Install necessary tools and dependencies for Gradle
RUN apt-get update && apt-get install -y wget unzip

# Download and install Gradle
RUN wget https://services.gradle.org/distributions/gradle-8.3-bin.zip -P /tmp && \
    unzip -d /opt/gradle /tmp/gradle-*.zip && \
    ln -s /opt/gradle/gradle-8.3/bin/gradle /usr/bin/gradle && \
    rm /tmp/gradle-*.zip

# Check Gradle version
RUN gradle --version

# Copy the Gradle files and your source code into the container
COPY . .


# Use the installed Gradle to build the application but -x test to skip tests
RUN gradle clean build -x test

# Final stage
FROM openjdk:17-jdk-slim

# Set the working directory in the container to /app
WORKDIR /app

# Copy only the built JAR from the build stage to the final image
COPY --from=build /app/build/libs/backend-0.0.1-SNAPSHOT.jar /app/

# Add the entrypoint script (assumes entrypoint.sh is in the same directory as the Dockerfile)
COPY entrypoint.sh /app/

# Make sure the script is executable
RUN chmod +x /app/entrypoint.sh

# Use the script as the ENTRYPOINT
ENTRYPOINT ["/app/entrypoint.sh"]
