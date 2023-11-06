#!/bin/sh

# Find the JAR file
JAR_FILE=$(ls /app/*.jar | head -n 1)

# Execute the JAR file
exec java -jar "$JAR_FILE"
